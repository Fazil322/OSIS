
import { Guru, SesiPemilihan, Agenda } from '../types';

export const mockGuru: Guru[] = [
    { id: 1, name: 'Budi Santoso, S.Pd.', subject: 'Kepala Sekolah', imageUrl: 'https://picsum.photos/seed/guru1/400/400' },
    { id: 2, name: 'Citra Lestari, M.Kom.', subject: 'Teknik Komputer & Jaringan', imageUrl: 'https://picsum.photos/seed/guru2/400/400' },
    { id: 3, name: 'Doni Firmansyah, S.T.', subject: 'Teknik Kendaraan Ringan', imageUrl: 'https://picsum.photos/seed/guru3/400/400' },
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
