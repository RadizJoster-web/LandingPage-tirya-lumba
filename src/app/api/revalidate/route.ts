import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { success: false, message: 'Server configuration error: secret is not configured.' },
      { status: 500 },
    );
  }

  const providedSecret = request.headers.get('x-revalidate-secret');

  if (!providedSecret) {
    return NextResponse.json(
      { success: false, message: 'Invalid or missing revalidation secret.' },
      { status: 401 },
    );
  }

  const bufProvided = Buffer.from(providedSecret);
  const bufExpected = Buffer.from(secret);

  // Timing-safe comparison
  const isValid =
    bufProvided.length === bufExpected.length &&
    crypto.timingSafeEqual(bufProvided, bufExpected);

  if (!isValid) {
    return NextResponse.json(
      { success: false, message: 'Invalid or missing revalidation secret.' },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json().catch(() => ({}))) as {
      tags?: string[] | string;
    };

    const tagsToRevalidate = Array.isArray(body.tags)
      ? body.tags
      : typeof body.tags === 'string'
        ? [body.tags]
        : [];

    if (tagsToRevalidate.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No tags provided for revalidation.' },
        { status: 400 },
      );
    }

    for (const tag of tagsToRevalidate) {
      if (typeof tag === 'string' && tag.trim()) {
        revalidateTag(tag.trim(), 'max');
      }
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : 'Internal server error during revalidation.',
      },
      { status: 500 },
    );
  }
}
