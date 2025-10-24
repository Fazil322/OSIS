import { Guru, SesiPemilihan, Agenda, Ekstrakurikuler, Alumni } from '../types';

export const mockGuru: Guru[] = [
    { id: 1, name: 'Budi Santoso, S.Pd.', subject: 'Kepala Sekolah', imageUrl: 'https://picsum.photos/seed/guru1/400/400' },
    { id: 2, name: 'Citra Lestari, M.Kom.', subject: 'Waka Kurikulum & Kajur TKJ', imageUrl: 'https://picsum.photos/seed/guru2/400/400' },
    { id: 3, name: 'Doni Firmansyah, S.T.', subject: 'Waka Kesiswaan & Kajur TKR', imageUrl: 'https://picsum.photos/seed/guru3/400/400' },
    { id: 4, name: 'Eka Wijayanti, S.Pd.', subject: 'Guru Matematika', imageUrl: 'https://picsum.photos/seed/guru4/400/400' },
    { id: 5, name: 'Fajar Nugroho, S.Kom.', subject: 'Guru Produktif TKJ', imageUrl: 'https://picsum.photos/seed/guru5/400/400' },
    { id: 6, name: 'Gita Permatasari, S.Pd.', subject: 'Guru Bahasa Inggris', imageUrl: 'https://picsum.photos/seed/guru6/400/400' },
    { id: 7, name: 'Hendra Setiawan, S.T.', subject: 'Guru Produktif TKR', imageUrl: 'https://picsum.photos/seed/guru7/400/400' },
    { id: 8, name: 'Indah Puspita, S.Pd.', subject: 'Guru Bahasa Indonesia', imageUrl: 'https://picsum.photos/seed/guru8/400/400' },
];

export const mockAgenda: Agenda[] = [
  {
    id: 1,
    title: "Ujian Akhir Semester (UAS) Genap",
    date: new Date(new Date().getFullYear(), 11, 10),
    description: "Pelaksanaan Ujian Akhir Semester untuk seluruh siswa kelas X, XI, dan XII."
  },
  {
    id: 2,
    title: "Lomba Cerdas Cermat Antar Kelas",
    date: new Date(new Date().getFullYear(), 10, 20),
    description: "Ajang adu wawasan dan pengetahuan untuk perwakilan setiap kelas."
  },
  {
    id: 3,
    title: "Peringatan Hari Guru Nasional",
    date: new Date(new Date().getFullYear(), 10, 25),
    description: "Upacara dan rangkaian kegiatan untuk menghormati jasa para guru."
  }
];

export const mockEkstrakurikuler: Ekstrakurikuler[] = [
    {
        id: 1,
        name: 'Pramuka',
        description: 'Kegiatan kepanduan yang mendidik kemandirian, kerjasama, dan cinta alam.',
        imageUrl: 'https://picsum.photos/seed/pramuka/600/400'
    },
    {
        id: 2,
        name: 'Paskibra',
        description: 'Pasukan Pengibar Bendera yang melatih kedisiplinan, ketegasan, dan rasa nasionalisme.',
        imageUrl: 'https://picsum.photos/seed/paskibra/600/400'
    },
    {
        id: 3,
        name: 'Futsal',
        description: 'Mengembangkan bakat dan strategi dalam bermain sepak bola mini, serta menjaga kebugaran jasmani.',
        imageUrl: 'https://picsum.photos/seed/futsal/600/400'
    },
    {
        id: 4,
        name: 'Rohis (Rohani Islam)',
        description: 'Mendalami ilmu agama Islam, meningkatkan keimanan dan ketaqwaan melalui kajian rutin.',
        imageUrl: 'https://picsum.photos/seed/rohis/600/400'
    },
];

export const mockAlumni: Alumni[] = [
    {
        id: 1,
        name: 'Rian Ardiansyah',
        graduationYear: 2018,
        story: 'Setelah lulus dari jurusan TKJ, saya berhasil membangun karir sebagai Network Engineer di perusahaan multinasional. Fondasi ilmu yang saya dapatkan di SMK LPPMRI 2 sangat berharga.',
        imageUrl: 'https://picsum.photos/seed/alumni1/400/400'
    },
    {
        id: 2,
        name: 'Siti Nurhaliza',
        graduationYear: 2019,
        story: 'Jurusan TKR tidak hanya untuk laki-laki. Saya membuktikannya dengan menjadi kepala mekanik di salah satu bengkel ternama. Jangan pernah ragu untuk mengejar passion!',
        imageUrl: 'https://picsum.photos/seed/alumni2/400/400'
    },
    {
        id: 3,
        name: 'Bagus Prasetyo',
        graduationYear: 2020,
        story: 'Ilmu dari SMK langsung saya terapkan dengan membuka usaha bengkel sendiri. Kini saya sudah memiliki beberapa karyawan dan terus berkembang. Terima kasih, guru-guruku!',
        imageUrl: 'https://picsum.photos/seed/alumni3/400/400'
    },
];


const start = new Date();
const end = new Date();
end.setDate(start.getDate() + 7);

export const mockSesiPemilihan: SesiPemilihan[] = [
    {
        id: 'sesi-1',
        title: 'Pemilihan Ketua OSIS Periode 2024/2025',
        start: start,
        end: end,
        status: 'Aktif',
        kandidat: [
            { id: 'kandidat-1', name: 'Ahmad Subarjo', nomorUrut: 1, photoUrl: 'https://picsum.photos/seed/k1/400/400', visi: 'Menjadikan OSIS sebagai wadah aspirasi siswa yang kreatif dan inovatif.', misi: '1. Mengadakan event rutin. 2. Meningkatkan kualitas ekskul.', voteCount: 120 },
            { id: 'kandidat-2', name: 'Siti Aminah', nomorUrut: 2, photoUrl: 'https://picsum.photos/seed/k2/400/400', visi: 'Mewujudkan siswa yang berprestasi, berakhlak mulia, dan peduli lingkungan.', misi: '1. Program jumat bersih. 2. Mengadakan lomba akademik.', voteCount: 95 },
        ],
        voterCodes: [
            { code: 'ABC123', used: false },
            { code: 'XYZ789', used: true },
            { code: 'QWE456', used: false },
        ]
    }
];