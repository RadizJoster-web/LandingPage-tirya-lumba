import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10 animate-pulse">
      {/* Hero skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="h-6 w-48 bg-slate-200 rounded-full" />
          <div className="h-12 w-3/4 bg-slate-200 rounded-2xl" />
          <div className="h-4 w-full bg-slate-200 rounded-md" />
          <div className="h-4 w-5/6 bg-slate-200 rounded-md" />
          <div className="flex gap-4 pt-4">
            <div className="h-11 w-36 bg-slate-200 rounded-full" />
            <div className="h-11 w-36 bg-slate-200 rounded-full" />
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md h-72 bg-slate-200 rounded-3xl" />
        </div>
      </div>

      {/* Program grid skeleton */}
      <div className="space-y-4 pt-12">
        <div className="h-8 w-64 bg-slate-200 rounded-lg" />
        <div className="h-4 w-96 bg-slate-200 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-56 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
