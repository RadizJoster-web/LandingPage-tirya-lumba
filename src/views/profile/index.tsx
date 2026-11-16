'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { request, toErrorMessage } from '@/lib/http';
import { InstructorRegistrationSnapshot, StudentRegistrationSnapshot } from '@/types';

interface AttendanceRecord {
  id: string;
  date: string;
  locationName: string;
  status: string;
}

export default function ProfileParent() {
  const router = useRouter();
  const { user, registration, isLoading, logout } = useAuth();
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (registration?.kind === 'student' && registration.status === 'APPROVED') {
      setAttendanceLoading(true);
      request<AttendanceRecord[]>('/attendances/my-history', { method: 'GET' })
        .then((res) => {
          setAttendances(res.data ?? []);
        })
        .catch((err) => {
          setAttendanceError(toErrorMessage(err));
        })
        .finally(() => {
          setAttendanceLoading(false);
        });
    }
  }, [registration]);

  if (isLoading || !user) {
    return (
      <div>
        <p>Loading data user...</p>
      </div>
    );
  }

  const isStudent = registration?.kind === 'student';
  const isInstructor = registration?.kind === 'instructor' || user.role === 'INSTRUCTOR';
  const studentSnap = isStudent ? (registration as StudentRegistrationSnapshot) : null;
  const instructorSnap = isInstructor
    ? (registration as InstructorRegistrationSnapshot) || {
        kind: 'instructor',
        fullName: user.fullName || user.email,
        phone: '',
        birthDate: '',
        gender: 'Laki-Laki',
        address: '',
        shortBio: '',
        license: '',
        experience: '',
        schedules: [],
        profilePictureUrl: user.profilePictureUrl || '',
        cvUrl: '',
        registrationId: 'REG-' + user.userId.slice(0, 8),
        status: 'APPROVED',
        submittedAt: Date.now(),
        scheduleLabels: [],
      }
    : null;

  return (
    <main>
      <h1>DATA MENTAH PROFIL PENGGUNA (RAW DATA - NO STYLE)</h1>
      <hr />

      <nav>
        <p><strong>Aksi &amp; Navigasi:</strong></p>
        <ul>
          <li><Link href="/">Kembali ke Beranda (/)</Link></li>
          <li><Link href="/daftar">Pilih Jalur Pendaftaran (/daftar)</Link></li>
          {isInstructor && (
            <li><Link href="/guru/atur-ulang-jadwal">Atur Ulang Jadwal Pelatih (/guru/atur-ulang-jadwal)</Link></li>
          )}
          <li><button onClick={logout}>Keluar Akun (Logout)</button></li>
        </ul>
      </nav>
      <hr />

      <section>
        <h2>1. DATA AKUN UTAMA (AUTH USER)</h2>
        <table border={1} cellPadding={6} cellSpacing={0}>
          <tbody>
            <tr><th>User ID</th><td>{user.userId}</td></tr>
            <tr><th>Email</th><td>{user.email}</td></tr>
            <tr><th>Nama Lengkap (Auth)</th><td>{user.fullName || '-'}</td></tr>
            <tr><th>Role Sistem</th><td>{user.role}</td></tr>
            <tr><th>Profile Picture URL</th><td>{user.profilePictureUrl || '-'}</td></tr>
          </tbody>
        </table>
      </section>
      <hr />

      <section>
        <h2>2. STATUS PENDAFTARAN &amp; REGISTRASI SISTEM</h2>
        <table border={1} cellPadding={6} cellSpacing={0}>
          <tbody>
            <tr><th>Status Pendaftaran</th><td>{registration ? registration.status : 'BELUM TERDAFTAR (UNREGISTERED)'}</td></tr>
            <tr><th>Tipe Registrasi (Kind)</th><td>{registration ? registration.kind : 'USER'}</td></tr>
            <tr><th>Registration ID</th><td>{registration ? registration.registrationId : '-'}</td></tr>
            <tr><th>Submitted At</th><td>{registration?.submittedAt ? new Date(registration.submittedAt).toLocaleString('id-ID') : '-'}</td></tr>
            <tr><th>Catatan Penolakan (Rejection Reason)</th><td>{registration?.rejectionReason || '-'}</td></tr>
          </tbody>
        </table>
      </section>
      <hr />

      {/* JIKA MURID */}
      {isStudent && studentSnap && (
        <>
          <section>
            <h2>3. DATA DETAIL IDENTITAS MURID (STUDENT DATA)</h2>
            <table border={1} cellPadding={6} cellSpacing={0}>
              <tbody>
                <tr><th>Nama Lengkap Siswa</th><td>{studentSnap.fullName}</td></tr>
                <tr><th>Nomor WhatsApp / HP</th><td>{studentSnap.phone || '-'}</td></tr>
                <tr><th>Tempat Lahir</th><td>{studentSnap.birthPlace || '-'}</td></tr>
                <tr><th>Tanggal Lahir</th><td>{studentSnap.birthDate || '-'}</td></tr>
                <tr><th>Jenis Kelamin</th><td>{studentSnap.gender || '-'}</td></tr>
                <tr><th>Alamat Domisili</th><td>{studentSnap.address || '-'}</td></tr>
                <tr><th>Asal Sekolah / Kantor</th><td>{studentSnap.schoolOrOffice || '-'}</td></tr>
                <tr><th>Ukuran Kaos Renang</th><td>{studentSnap.tshirtSize || '-'}</td></tr>
                <tr><th>Metode Pembayaran</th><td>{studentSnap.paymentMethod || '-'}</td></tr>
                <tr><th>Bukti Pembayaran (URL)</th><td>{studentSnap.paymentProofUrl || '-'}</td></tr>
                <tr><th>Foto Profil Murid (URL)</th><td>{studentSnap.profilePictureUrl || '-'}</td></tr>
              </tbody>
            </table>
          </section>
          <hr />

          <section>
            <h2>4. PROGRAM KURSUS &amp; JADWAL LATIHAN SISWA</h2>
            <table border={1} cellPadding={6} cellSpacing={0}>
              <tbody>
                <tr><th>Tipe Paket Kursus</th><td>{studentSnap.packageType || '-'}</td></tr>
                <tr><th>Biaya / Harga Kursus</th><td>{studentSnap.packagePrice ? `Rp ${studentSnap.packagePrice.toLocaleString('id-ID')}` : '-'}</td></tr>
                <tr><th>Sisa Pertemuan Aktif</th><td>{studentSnap.activeSessions ?? 0} Sesi</td></tr>
                <tr><th>Location ID</th><td>{studentSnap.locationId || '-'}</td></tr>
                <tr><th>Nama Kolam Renang Mitra</th><td>{studentSnap.locationLabel || '-'}</td></tr>
                <tr><th>Tanggal Pertemuan Pertama</th><td>{studentSnap.firstMeetDate || '-'}</td></tr>
                <tr><th>Nama Sesi</th><td>{studentSnap.firstMeetSession || '-'}</td></tr>
                <tr><th>Rentang Jam (Time Range)</th><td>{studentSnap.timeRange || '-'}</td></tr>
                <tr><th>Jam Mulai (Start Time)</th><td>{studentSnap.startTime || '-'}</td></tr>
                <tr><th>Jam Selesai (End Time)</th><td>{studentSnap.endTime || '-'}</td></tr>
              </tbody>
            </table>
          </section>
          <hr />

          <section>
            <h2>5. DATA PELATIH PEMBIMBING SISWA</h2>
            <table border={1} cellPadding={6} cellSpacing={0}>
              <tbody>
                <tr><th>Instructor ID</th><td>{studentSnap.instructorId || '-'}</td></tr>
                <tr><th>Nama Lengkap Pelatih</th><td>{studentSnap.instructorName || '-'}</td></tr>
                <tr><th>Lisensi Pelatih</th><td>{studentSnap.instructorLicense || '-'}</td></tr>
                <tr><th>Pengalaman Pelatih</th><td>{studentSnap.instructorExperience || '-'}</td></tr>
                <tr><th>Biografi Pelatih</th><td>{studentSnap.instructorBio || '-'}</td></tr>
                <tr><th>Foto Profil Pelatih (URL)</th><td>{studentSnap.instructorProfilePictureUrl || '-'}</td></tr>
              </tbody>
            </table>
          </section>
          <hr />

          <section>
            <h2>6. RIWAYAT PRESENSI SISWA (ATTENDANCE LOG)</h2>
            {attendanceLoading ? (
              <p>Memuat riwayat presensi siswa...</p>
            ) : attendanceError ? (
              <p>Error saat memuat presensi: {attendanceError}</p>
            ) : attendances.length === 0 ? (
              <p>Belum ada log catatan presensi kehadiran pada sistem.</p>
            ) : (
              <table border={1} cellPadding={6} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>ID Presensi</th>
                    <th>Tanggal Pertemuan</th>
                    <th>Lokasi Kolam</th>
                    <th>Status Presensi</th>
                  </tr>
                </thead>
                <tbody>
                  {attendances.map((att, i) => (
                    <tr key={att.id}>
                      <td>{i + 1}</td>
                      <td>{att.id}</td>
                      <td>{att.date}</td>
                      <td>{att.locationName}</td>
                      <td>{att.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
          <hr />
        </>
      )}

      {/* JIKA GURU */}
      {isInstructor && instructorSnap && (
        <>
          <section>
            <h2>3. DATA DETAIL IDENTITAS PELATIH (INSTRUCTOR DATA)</h2>
            <table border={1} cellPadding={6} cellSpacing={0}>
              <tbody>
                <tr><th>Nama Lengkap Pelatih</th><td>{instructorSnap.fullName}</td></tr>
                <tr><th>Nomor WhatsApp / HP</th><td>{instructorSnap.phone || '-'}</td></tr>
                <tr><th>Tanggal Lahir</th><td>{instructorSnap.birthDate || '-'}</td></tr>
                <tr><th>Jenis Kelamin</th><td>{instructorSnap.gender || '-'}</td></tr>
                <tr><th>Alamat Domisili</th><td>{instructorSnap.address || '-'}</td></tr>
                <tr><th>Lisensi Kepelatihan</th><td>{instructorSnap.license || '-'}</td></tr>
                <tr><th>Pengalaman Mengajar</th><td>{instructorSnap.experience || '-'}</td></tr>
                <tr><th>Biografi Pelatih</th><td>{instructorSnap.shortBio || '-'}</td></tr>
                <tr><th>Foto Profil Guru (URL)</th><td>{instructorSnap.profilePictureUrl || '-'}</td></tr>
                <tr><th>Dokumen CV (URL)</th><td>{instructorSnap.cvUrl || '-'}</td></tr>
              </tbody>
            </table>
          </section>
          <hr />

          <section>
            <h2>4. JADWAL KETERSEDIAAN MENGAJAR PELATIH (INSTRUCTOR SCHEDULES)</h2>
            {!instructorSnap.schedules || instructorSnap.schedules.length === 0 ? (
              <p>Belum ada slot mengajar yang terdaftar di sistem.</p>
            ) : (
              <table border={1} cellPadding={6} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Hari</th>
                    <th>Sesi</th>
                    <th>Jam Mulai</th>
                    <th>Jam Selesai</th>
                    <th>Rentang Waktu</th>
                    <th>Nama Kolam</th>
                    <th>Location ID</th>
                    <th>Jumlah Murid</th>
                  </tr>
                </thead>
                <tbody>
                  {instructorSnap.schedules.map((sch, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{sch.dayOfWeek || '-'}</td>
                      <td>{sch.sessionName || '-'}</td>
                      <td>{sch.startTime || '-'}</td>
                      <td>{sch.endTime || '-'}</td>
                      <td>{sch.timeRange || '-'}</td>
                      <td>{sch.locationName || '-'}</td>
                      <td>{sch.locationId || '-'}</td>
                      <td>{sch.totalStudents ?? 0} Siswa</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
          <hr />
        </>
      )}

      {/* JIKA USER BELUM TERDAFTAR */}
      {!registration && (
        <section>
          <h2>3. STATUS PENGGUNA BELUM TERDAFTAR</h2>
          <p>Akun ini belum memiliki berkas pendaftaran kursus (Murid) maupun pelatih (Guru).</p>
          <p>Silakan klik tombol di navigasi atas atau buka tautan <Link href="/daftar">Halaman Pendaftaran</Link> untuk mendaftar.</p>
        </section>
      )}
      <hr />

      <section>
        <h2>DUMP DATA JSON MENTAH DARI SERVER</h2>
        <pre>{JSON.stringify({ user, registration, attendances }, null, 2)}</pre>
      </section>
    </main>
  );
}
