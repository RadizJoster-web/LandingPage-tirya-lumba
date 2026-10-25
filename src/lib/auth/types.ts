import { AuthUser, RegistrationSnapshot } from '@/types';

export interface AuthContextType {
  /** Profil akun hasil login (userId, email, role, fullName, foto profil) atau null bila belum masuk. */
  user: AuthUser | null;
  /** Snapshot pendaftaran murid/guru terakhir yang sukses dikirim ke server. */
  registration: RegistrationSnapshot | null;
  isLoading: boolean;
  /** Status apakah data registrasi dari server sedang diambil/disinkronkan. */
  isRegistrationLoading: boolean;
  /** Fungsi untuk memicu pengambilan ulang data registrasi dari server secara eksplisit. */
  refreshRegistration: () => Promise<RegistrationSnapshot | null>;
  /** POST /api/auth/register — kirim OTP. Mengembalikan email tujuan OTP. */
  register: (input: { fullName: string; email: string; password: string }) => Promise<string>;
  /** POST /api/auth/verify-otp */
  verifyOtp: (email: string, otpCode: string) => Promise<void>;
  /** POST /api/auth/login */
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  /** Simpan hasil pendaftaran agar /profile bisa menampilkannya setelah redirect. */
  persistRegistration: (snapshot: RegistrationSnapshot) => void;
}
