# Frontend Landing Page PRD — PT Tirya Lumba
## Dokumen Kebutuhan Produk & Arsitektur Teknis Portal Publik

> **Status:** Resmi — Versi 2.1  
> **Framework:** Next.js (App Router), React 19, TypeScript, Tailwind CSS  
> **Port Standar:** 3000  
> **Batasan Kode:** Maksimal 150 baris per file `.ts` / `.tsx`

---

## 1. Lingkup Modul & Halaman

1. **Beranda (`/`):**
   - Katalog kolam renang mitra dengan visual foto kolam riil (`imageUrl`), alamat, dan fasilitas.
   - Statistik riil total murid dan pelatih aktif via ISR.
   - Penjelasan paket kursus renang (Reguler, Privat, Prestasi).
2. **Portal Pemilihan Pendaftaran (`/daftar`):**
   - Pengecekan real-time status kolam via `revalidate: 0`.
   - Jika semua kolam **TUTUP** pendaftaran pelatihnya: Otomatis me-redirect calon pengguna ke `/daftar/murid`.
3. **Formulir Pendaftaran Murid Multi-Step (`/daftar/murid`):**
   - Step 1: Data diri, kontak, dan unggah pas foto.
   - Step 2: Pemilihan kolam renang, paket kursus, hari latihan pertama, dan **wajib memilih 1 pelatih yang tersedia** (Mutual Exclusion check).
   - Step 3: Rincian biaya administrasi & paket, metode pembayaran, serta upload bukti bayar.
4. **Formulir Pendaftaran Pelatih Multi-Step (`/daftar/guru`):**
   - Proteksi `CoachClosedNotice`: Jika seluruh kolam berstatus TUTUP, form terkunci dan menampilkan notifikasi ramah beserta opsi alternatif.
   - Step 1: Data identitas diri & upload foto.
   - Step 2: Lisensi, pengalaman, CV PDF, dan pemilihan kolam (hanya kolam berstatus BUKA) serta slot hari mengajar.
5. **Portal Profil Pengguna (`/profile`):**
   - Menampilkan status pendaftaran aktif, sisa sesi pertemuan, riwayat kehadiran, dan jadwal kursus/mengajar.

---

## 2. Ketahanan Data & LocalStorage Form Drafting

Mencegah hilangnya data pendaftar saat halaman ter-refresh di tengah proses pengisian multi-step:
- Utilitas `src/lib/draftStorage.ts` mengelola serialisasi draft ke `localStorage`:
  - `tl_draft_murid`: Draft pendaftaran murid.
  - `tl_draft_guru`: Draft pendaftaran pelatih.
- Data disimpan otomatis setiap pengguna mengklik tombol "Lanjut" (antar step 1, 2, dan 3).
- State foto dan bukti bayar yang berhasil di-upload dipulihkan secara instan saat refresh.
- Pembersihan draft (`clearDraft()`) dieksekusi saat pendaftaran berhasil disubmit (HTTP 201).

---

## 3. Strategi Pengambilan Data & HTTP Caching

- Master data statis (paket, area, sesi) menggunakan Next.js ISR tag-based revalidation (`revalidate: 3600`).
- Data lokasi kolam renang (`/locations`) di-fetch secara real-time (`revalidate: 0` + `cache: 'no-store'`) agar perubahan status buka/tutup pendaftaran pelatih langsung terbaca tanpa penundaan cache.
