import React, { useState } from 'react';

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
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Alur Pendaftaran</h2>
        <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-green-200 hidden md:block"></div>
            <div className="space-y-12 md:space-y-0 md:grid grid-cols-3 gap-8 text-center">
                 <div className="flex flex-col items-center">
                    <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold z-10 mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Isi Formulir</h3>
                    <p className="text-gray-600">Calon siswa mengisi formulir pendaftaran secara online melalui link yang tersedia.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold z-10 mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Verifikasi Data</h3>
                    <p className="text-gray-600">Panitia akan melakukan verifikasi berkas dan data yang telah dikirimkan.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold z-10 mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Pengumuman</h3>
                    <p className="text-gray-600">Hasil seleksi akan diumumkan di website ini sesuai jadwal yang ditentukan.</p>
                </div>
            </div>
        </div>
    </div>
);

const SyaratDanJadwal: React.FC = () => (
    <div className="bg-gray-50 py-16 px-6">
        <div className="container mx-auto grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Syarat & Ketentuan</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 bg-white p-6 rounded-lg shadow">
                    <li>Lulusan SMP/MTs atau sederajat.</li>
                    <li>Fotokopi Ijazah dan SKHUN yang telah dilegalisir.</li>
                    <li>Pas foto ukuran 3x4 (2 lembar).</li>
                    <li>Fotokopi Kartu Keluarga dan Akta Kelahiran.</li>
                    <li>Mengisi formulir pendaftaran dengan lengkap dan benar.</li>
                </ul>
            </div>
            <div className="md:col-span-3">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Jadwal Penting</h2>
                 <div className="relative border-l-4 border-green-500 pl-6 space-y-8">
                     <div className="relative">
                        <div className="absolute -left-[38px] top-1 w-6 h-6 bg-green-500 rounded-full"></div>
                        <h4 className="font-bold text-lg">Pendaftaran Online</h4>
                        <p className="text-green-700 font-semibold">1 Mei - 30 Juni 2025</p>
                     </div>
                     <div className="relative">
                        <div className="absolute -left-[38px] top-1 w-6 h-6 bg-green-500 rounded-full"></div>
                        <h4 className="font-bold text-lg">Verifikasi Berkas</h4>
                        <p className="text-green-700 font-semibold">1 - 5 Juli 2025</p>
                     </div>
                     <div className="relative">
                        <div className="absolute -left-[38px] top-1 w-6 h-6 bg-green-500 rounded-full"></div>
                        <h4 className="font-bold text-lg">Pengumuman Hasil</h4>
                        <p className="text-green-700 font-semibold">10 Juli 2025</p>
                     </div>
                     <div className="relative">
                        <div className="absolute -left-[38px] top-1 w-6 h-6 bg-green-500 rounded-full"></div>
                        <h4 className="font-bold text-lg">Daftar Ulang</h4>
                        <p className="text-green-700 font-semibold">11 - 15 Juli 2025</p>
                     </div>
                 </div>
            </div>
        </div>
    </div>
);

const FaqSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqs = [
        { q: 'Jurusan apa saja yang tersedia?', a: 'Saat ini kami memiliki dua jurusan unggulan: Teknik Komputer dan Jaringan (TKJ) dan Teknik Kendaraan Ringan (TKR).' },
        { q: 'Berapa biaya pendaftaran?', a: 'Informasi detail mengenai biaya pendaftaran dan biaya pendidikan akan disampaikan saat proses daftar ulang.' },
        { q: 'Apakah ada jalur prestasi?', a: 'Ya, kami menyediakan jalur prestasi bagi siswa yang memiliki pencapaian di bidang akademik maupun non-akademik. Silakan lampirkan sertifikat saat pendaftaran.' },
        { q: 'Kapan pendaftaran akan ditutup?', a: 'Pendaftaran online akan ditutup pada tanggal 30 Juni 2025. Pastikan Anda mendaftar sebelum tanggal tersebut.' },
    ];

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Pertanyaan Umum (FAQ)</h2>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                        <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none">
                            <span className="font-semibold text-lg text-left">{faq.q}</span>
                            <span>{openIndex === index ? '-' : '+'}</span>
                        </button>
                        <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                            <div className="p-4 bg-white text-gray-700">
                                {faq.a}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PpdbPage: React.FC = () => {
    
    const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        alert('Terima kasih atas minat Anda. Formulir pendaftaran akan segera dibuka sesuai jadwal.');
    }

    return (
        <div>
            <PageHeader />
            <AlurPendaftaran />
            <SyaratDanJadwal />
            <FaqSection />
            <div className="text-center py-12 bg-gray-50">
                <a 
                    href="#" 
                    onClick={handleRegisterClick}
                    className="bg-green-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    Formulir Pendaftaran (Segera Dibuka)
                </a>
            </div>
        </div>
    );
};

export default PpdbPage;