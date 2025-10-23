
import React from 'react';

const PageHeader: React.FC = () => (
    <div className="bg-green-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Penerimaan Peserta Didik Baru</h1>
            <p className="text-green-200 mt-2 text-lg">Tahun Ajaran 2025/2026</p>
        </div>
    </div>
);

const AlurPendaftaran: React.FC = () => (
    <div className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Alur Pendaftaran</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl text-green-600 mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Isi Formulir</h3>
                <p className="text-gray-600">Calon siswa mengisi formulir pendaftaran secara online melalui link yang tersedia.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl text-green-600 mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Verifikasi Data</h3>
                <p className="text-gray-600">Panitia akan melakukan verifikasi berkas dan data yang telah dikirimkan.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl text-green-600 mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Pengumuman</h3>
                <p className="text-gray-600">Hasil seleksi akan diumumkan di website ini sesuai jadwal yang ditentukan.</p>
            </div>
        </div>
    </div>
);

const SyaratKetentuan: React.FC = () => (
    <div className="bg-gray-50 py-16 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Syarat & Ketentuan</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li>Lulusan SMP/MTs atau sederajat.</li>
                    <li>Fotokopi Ijazah dan SKHUN yang telah dilegalisir.</li>
                    <li>Pas foto ukuran 3x4 (2 lembar).</li>
                    <li>Fotokopi Kartu Keluarga dan Akta Kelahiran.</li>
                    <li>Mengisi formulir pendaftaran dengan lengkap dan benar.</li>
                </ul>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Jadwal Penting</h2>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between border-b pb-2"><span>Pendaftaran Online:</span> <strong>1 Mei - 30 Juni 2025</strong></li>
                    <li className="flex justify-between border-b pb-2"><span>Verifikasi Berkas:</span> <strong>1 - 5 Juli 2025</strong></li>
                    <li className="flex justify-between border-b pb-2"><span>Pengumuman Hasil:</span> <strong>10 Juli 2025</strong></li>
                    <li className="flex justify-between"><span>Daftar Ulang:</span> <strong>11 - 15 Juli 2025</strong></li>
                </ul>
            </div>
        </div>
    </div>
);

const PpdbPage: React.FC = () => {
    
    const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        alert('Terima kasih atas minat Anda. Formulir pendaftaran akan segera dibuka sesuai jadwal.');
    }

    return (
        <div>
            <PageHeader />
            <AlurPendaftaran />
            <SyaratKetentuan />
            <div className="text-center py-12">
                <a 
                    href="#" 
                    onClick={handleRegisterClick}
                    className="bg-green-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-green-700 transition-colors"
                >
                    Formulir Pendaftaran (Segera Dibuka)
                </a>
            </div>
        </div>
    );
};

export default PpdbPage;
