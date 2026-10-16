export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateAge(birthDateString: string): number {
  if (!birthDateString) return 0;
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return Math.max(0, age);
}

export function calculatePackagePrice(
  basePrice: number,
  classType: string,
  sessionCount = 8
): number {
  let singleSessionPrice = basePrice;
  if (classType === 'Prestasi') {
    singleSessionPrice = Math.round((basePrice * 1.2) / 1000) * 1000;
  } else if (classType === 'Ekstrakurikuler') {
    singleSessionPrice = Math.round((basePrice * 0.8) / 1000) * 1000;
  }
  return singleSessionPrice * sessionCount;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
