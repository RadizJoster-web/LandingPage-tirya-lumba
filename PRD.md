# Frontend 1 PRD — Landing Page & Portal Siswa/Pelatih (`client/landing-page`)
## Spesifikasi Fungsional, Alur Multi-Step Form, Logika Bisnis UI, dan Panduan Restyle

> **Tujuan Dokumen:**
> Dokumen ini adalah acuan mutlak bagi pengembang atau AI yang akan **merombak gaya desain antarmuka (UI/UX Styling)** pada aplikasi Landing Page PT Tirya Lumba. Pastikan seluruh nama state, field form, urutan wizard, dan logika validasi yang tercantum di sini tetap terjaga utuh.

---

## 1. Ikhtisar & Tumpukan Teknologi Frontend 1

- **Framework:** Next.js (App Router), React, TypeScript.
- **Styling:** Tailwind CSS.
- **State Management & Fetching:** Custom React Hooks bawaan, fetch API dengan ISR (Incremental Static Regeneration), dan safe API wrappers (`lib/http.ts`).
- **Target Persona Pengguna:**
  1. Calon Murid (anak-anak / dewasa / orang tua).
  2. Murid Aktif yang sedang menjalani kursus renang.
  3. Calon Pelatih Renang.
  4. Pelatih Aktif yang mengajar di kolam mitra.

---

## 2. Struktur Halaman & Fitur Antarmuka

### 2.1 Halaman Beranda (`/` — `src/app/page.tsx`)
1. **Hero Section (`HeroSection`):**
   - Headline selamat datang unik bernuansa renang profesional.
   - Menampilkan total kolam mitra yang bekerja sama (`totalPartnerPools`).
   - Tombol CTA: *"Daftar Sekarang"* (`/daftar`) dan *"Tentang Kami"* (`/#tentang-kami`).
2. **Brand Section (`BrandSection`):**
   - Menampilkan deretan logo merek atau instansi mitra PT Tirya Lumba.
3. **Katalog Program & Kolam Renang (`ProgramSection`):**
   - Menampilkan kartu program kursus renang per lokasi kolam.
   - **Pagination:** 6 kartu per halaman (`?halaman=N`).
   - Informasi Kartu: Nama kolam renang, kategori kemitraan, wilayah, perbandingan harga kelas Reguler vs Privat, dan tombol tautan langsung ke Google Maps (`mapUrl`).
   - Tombol CTA header: *"Daftar Sebagai Murid"* (`/daftar/murid`).
4. **Tentang Kami (`AboutSection` — `/#tentang-kami`):**
   - Rangkuman pengalaman melatih anak hingga atlet.
   - Tautan modern dengan animasi hover dari bawah (*modern underline reveal*): *"Kenal kami lebih dalam"*.
5. **Kenapa Pilih Kami (`WhyUsSection` — `/#kenapa-pilih-kami`):**
   - Menampilkan 4 kartu statistik riil yang ditarik dari endpoint server `GET /api/stats`:
     1. `totalStudents`: Total Murid Terdaftar
     2. `totalInstructors`: Pelatih Berlisensi
     3. `totalPartnerPools`: Kolam Renang Mitra
     4. `totalAreas`: Wilayah Layanan
   - Tombol CTA *"Daftar Sebagai Murid"*.
6. **Header / Navbar:**
   - Deteksi status login dinamis: Menampilkan tombol Login & Register jika belum login; berubah menjadi tombol Profil Saya jika sudah login.
7. **Footer:**
   - Navigasi sitemap, kontak WhatsApp CS, dan sosial media.

---

### 2.2 Modul Autentikasi

#### A. Registrasi Akun (`/register`)
- Input: Nama Lengkap (`fullName`), Email (`email`), Password (`password` min 6 karakter).
- Submit memanggil `POST /api/auth/register`.
- Menampilkan modal/layar verifikasi OTP 6 digit dengan countdown timer 60 detik.
- Submit OTP memanggil `POST /api/auth/verify-otp`.

#### B. Login Akun (`/login`)
- Input: Email & Password dengan fitur Show/Hide Password.
- Submit memanggil `POST /api/auth/login`.
- **Aksi Lupa Password Cepat:** Tombol *"Lupa Password?"* pada form login langsung memicu request ke `POST /api/auth/forgot-password` jika field email sudah terisi, menampilkan notifikasi hijau sukses tanpa memindahkan user ke halaman kosong.

#### C. Lupa & Reset Password (`/forgot-password`, `/reset-password`)
- Halaman `/forgot-password` menerima query string `?email=...` secara aman di dalam boundary `<Suspense>`.
- Halaman `/reset-password?token=...` memverifikasi token dan menginput password baru.

---

### 2.3 Portal Pemilihan Jalur Pendaftaran (`/daftar`)
- Route terproteksi wajib login.
- Menampilkan 2 kartu pilihan dengan visual menarik:
  1. **Daftar sebagai Murid** (mengarahkan ke `/daftar/murid`).
  2. **Daftar sebagai Pelatih / Guru** (mengarahkan ke `/daftar/guru`).

---

### 2.4 Multi-Step Booking Wizard Murid (`/daftar/murid`)

Formulir interaktif 3 tahap yang mendukung pemulihan data otomatis saat pendaftaran ulang.

```
Step 1: Biodata Diri & Pas Foto 4x6 cm
  ↓
Step 2: Wilayah, Kolam, Paket Kelas, Tanggal, Sesi & Pilihan Pelatih
  ↓
Step 3: Nota Rincian Biaya, Metode Bayar & Upload Bukti Transfer
```

#### Step 1: Biodata Pribadi & Pas Foto (`StepBiodata.tsx`)
- **Field Data Diri:**
  - `name`: Nama Lengkap Murid (wajib).
  - `birthPlace` & `birthDate`: Tempat & Tanggal Lahir (wajib).
  - `currentAge`: Usia saat ini (otomatis terhitung dari tanggal lahir).
  - `gender`: Jenis Kelamin (Radio: Laki-laki / Perempuan).
  - `address`: Alamat Rumah Domisili (wajib).
  - `phone`: Nomor Telepon / WhatsApp Aktif (wajib).
  - `email`: Terisi otomatis dari sesi login pengguna.
  - `schoolOrOffice`: Nama Sekolah / Kantor (wajib).
  - `shirtSize`: Ukuran Kaos Renang (Radio: XS, S, M, L, XL, XXL).
- **Unggah Pas Foto Profil:**
  - Upload file pas foto 4x6 cm (format JPG/PNG, ukuran maks 5 MB).
  - Menampilkan indikator file terunggah atau nama file sebelumnya jika mendaftar ulang.
- Tombol *"Selanjutnya"*: Memvalidasi kelengkapan biodata dan keberadaan file foto sebelum melangkah ke Step 2.

#### Step 2: Kelas, Jadwal & Pemilihan Pelatih (`StepKelasJadwal.tsx`)
- **Pemilihan Kolam Renang:**
  - Memilih Wilayah (`areaId`) untuk memfilter Kolam Renang (`locationId`).
- **Pemilihan Paket Kursus:**
  - Memilih paket kelas (`packageId`): Reguler, Privat, Prestasi, dll.
- **Pemilihan Hari & Jam Latihan:**
  - `firstMeetDate`: Tanggal pertemuan pertama (validasi minimal hari ini).
  - `sessionName`: Jam sesi latihan (ditarik dinamis sesuai jadwal kolam terpilih).
- **Pemilihan Pelatih (`CoachSelector.tsx`):**
  - Mengambil daftar pelatih dari `GET /api/instructor/available?locationId=...&dayOfWeek=...&sessionName=...&packageType=...`.
  - **LOGIKA MUTLAK MUTUAL EXCLUSION (PRIVAT vs REGULER):**
    - **Kelas Privat:** Pelatih HANYA MUNCUL jika di hari dan sesi tersebut **BENAR-BENAR KOSONG (0 murid)**. Sesi privat bersifat 1-on-1.
    - **Kelas Reguler:** Pelatih HANYA MUNCUL jika di hari dan sesi tersebut **TIDAK ADA murid Privat**, dan jumlah murid reguler saat ini `< 5 orang`.
    - Jika slot sudah terisi murid Privat, pelatih otomatis disembunyikan dari pilihan calon murid Reguler.
  - Menampilkan kartu pelatih: Foto, nama, pengalaman, lisensi, badge kapasitas, dan tombol modal profil detail.

#### Step 3: Pembayaran & Bukti Transfer (`StepPembayaran.tsx`)
- **Nota Rincian Biaya Kursus (`CourseReceipt.tsx`):**
  - Menampilkan rincian: Nama Murid, Kolam Renang, Paket Kelas, Pelatih, Tanggal Pertama, Jam Sesi, Biaya Kursus, Biaya Admin (Rp5.000), dan Total Pembayaran.
- **Pilihan Metode Pembayaran:**
  - `QRIS`: Menampilkan barcode QR pembayaran resmi.
  - `Transfer Bank`: Menampilkan Nama Bank & Nomor Rekening PT Tirya Lumba.
  - `Cash (Tunai)`: Menampilkan instruksi serah terima ke pengelola kolam dan mewajibkan upload foto penyerahan uang.
- **Unggah Bukti Pembayaran (`paymentProofFile`):**
  - File JPG/PNG maks 5 MB.
- **Tombol "Bayar Sekarang":**
  - Mengirim seluruh data dalam bentuk `FormData` ke `POST /api/register/student`.
  - Setelah berhasil, pengguna langsung diarahkan ke halaman `/profile`.

---

### 2.5 Multi-Step Wizard Pendaftaran Pelatih (`/daftar/guru`)
1. **Step 1:** Nama Lengkap, Tanggal Lahir, Usia (otomatis), Jenis Kelamin, No WhatsApp, Alamat Domisili.
2. **Step 2:** Lisensi/Sertifikasi Pelatih, Pengalaman Mengajar, Unggah Berkas CV (PDF maks 10 MB).
3. **Step 3:** Pemilihan multi-kolam renang tempat mengajar, serta matriks pemilihan hari dan sesi ketersediaan waktu.
4. **Submit:** Mengirim data ke `POST /api/register/instructor`.

---

### 2.6 Portal Dasbor Pengguna Dinamis (`/profile` — `src/views/profile`)

Menyesuaikan konten secara dinamis berdasarkan status registrasi dan peran pengguna:

#### A. Belum Mendaftar (Role `USER`):
- Menampilkan `EmptyProfile.tsx` yang berisi ajakan untuk memilih pendaftaran sebagai Murid atau Pelatih.

#### B. Status `PENDING` (Sedang Ditinjau):
- Menampilkan kerangka dasbor blur (`BlurredDashboard.tsx`).
- Menampilkan banner amber: *"Pendaftaran Berhasil Dikirim & Menunggu Verifikasi"*.
- Tombol WhatsApp CS (tombol pendaftaran ulang disembunyikan untuk mencegah duplikasi).

#### C. Status `REJECTED` (Pendaftaran Ditolak):
- Menampilkan banner merah penolakan beserta alasan resmi dari admin (`rejectionReason`).
- Tombol WhatsApp CS.
- Tombol **"Ajukan Pendaftaran Ulang"**: Membuka form pendaftaran dengan data Step 1 terisi otomatis.

#### D. Status `APPROVED` — Murid Aktif:
1. **Widget Profil Pelatih (`InstructorProfileWidget.tsx`):**
   - Menampilkan foto pelatih, nama lengkap, ringkasan pengalaman, dan tombol *"Kualifikasi & Lisensi"*.
   - Mengklik tombol membuka modal sertifikasi lisensi resmi dan biografi pelatih.
2. **Kartu Jadwal & Pengingat Latihan (`StudentScheduleCard.tsx`):**
   - Menampilkan hari latihan utama, nama sesi, jam, lokasi kolam renang, dan sisa pertemuan aktif (`activeSessions`).
   - Panduan persiapan kehadiran latihan.
3. **Riwayat Pertemuan & Presensi (`StudentAttendanceHistory.tsx`):**
   - Tabel riwayat log presensi resmi dari `GET /api/attendances/my-history`.
   - Menampilkan nomor sesi, tanggal, lokasi kolam, dan status kehadiran (`Hadir` [hijau] atau `Tidak Hadir` [merah]).
4. **Rincian Data Kesiswaan (`StudentDetail.tsx`):**
   - Data paket kelas, sekolah/kantor, ukuran kaos, alamat, dan metode pembayaran.
5. **Banner Perpanjangan Paket (Daftar Ulang Mandiri):**
   - **Logika Kritis:** HANYA MUNCUL saat `activeSessions === 0`.
   - Akun user tetap aktif (tidak diblokir).
   - Menampilkan banner: *"Waktunya Melanjutkan Latihan Renang Anda!"* dengan tombol **"Daftar Ulang Sekarang"** yang mengarahkan ke form pendaftaran murid dengan data diri terisi otomatis.

#### E. Status `APPROVED` — Pelatih Aktif:
1. **Highlight Jadwal Mengajar (`ScheduleHighlightCard.tsx`):**
   - Menampilkan jadwal mengajar pelatih per hari, sesi, jam, dan lokasi kolam.
   - **Total Murid Aktif per Sesi:** Menampilkan badge jumlah murid aktif yang diajar pada sesi tersebut.
2. **Tombol "Atur Ulang Jadwal":** Mengarahkan ke `/guru/atur-ulang-jadwal`.

---

### 2.7 Portal Atur Ulang Jadwal Pelatih (`/guru/atur-ulang-jadwal`)
- Khusus diakses oleh pelatih aktif (`INSTRUCTOR`).
- Mengambil status kuota token bulanan dari `GET /api/instructors/reschedule/status`.
- Kuota atur ulang: **1 kali per 30 hari** (`canReschedule`).
- **Validasi Mutlak:**
  - Pelatih **TIDAK BISA MENGHAPUS** sesi atau kolam yang sedang aktif memiliki murid (`hasStudent === true`).
  - Pelatih minimal harus menyisakan 1 sesi mengajar.
- Submit pembaruan jadwal via `PUT /api/instructors/reschedule`.

---

## 3. Panduan Restyle UI untuk AI Berikutnya

### Hal yang BOLEH Dirombak:
- Desain visual, palet warna, gradients, shadows, border-radius, dan estetika tema air (*modern aquatic theme*).
- Tipografi, hierarki font, spasi antar-seksi, margin, dan padding.
- Tata letak layout kartu (*cards*), dialog modal, tab, dan tabel agar lebih bersih, elegan, dan profesional.
- Penambahan animasi transisi halus, micro-interactions, skeleton loaders, dan indikator status interaktif.
- Peningkatan responsivitas pada layar mobile, tablet, dan desktop besar.

### Hal yang DILARANG KERAS Diubah:
1. **Dilarang Mengubah Urutan Step Wizard Pendaftaran:**
   - Step 1: Wajib Biodata Diri + Upload Pas Foto 4x6 cm.
   - Step 2: Wajib Kolam, Paket Kelas, Tanggal/Sesi, dan Pemilihan Pelatih.
   - Step 3: Wajib Rincian Biaya, Metode Bayar, dan Upload Bukti Pembayaran.
2. **Dilarang Mengubah Logika Mutual Exclusion Kelas Privat vs Reguler.**
3. **Dilarang Mengubah Logika Sesi 0:** Siswa dengan `activeSessions === 0` harus tetap dapat login dan melihat banner Daftar Ulang.
4. **Dilarang Mengubah Nama Key/Properti Payload API:** Properti seperti `firstMeetDate`, `firstMeetSession`, `packageId`, `instructorId`, dll., wajib sesuai dengan kontrak API backend.
