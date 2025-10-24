import React from 'react';

const PageHeader: React.FC = () => (
    <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Program Keahlian</h1>
        </div>
    </div>
);

const JurusanCard: React.FC<{ title: string; description: string; imageUrl: string, competencies: string[], reverse?: boolean }> = ({ title, description, imageUrl, competencies, reverse = false }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-fade-in-up">
        <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-5/12 overflow-hidden">
                <img src={imageUrl} alt={title} className="w-full h-64 md:h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">{description}</p>
                <div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-3">Kompetensi Utama:</h4>
                    <ul className="space-y-2">
                        {competencies.map((comp, index) => (
                             <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-600">{comp}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);


const JurusanPage: React.FC = () => {
    const jurusanData = [
        {
            title: 'Teknik Komputer dan Jaringan (TKJ)',
            description: 'Siswa jurusan TKJ akan mempelajari tentang perakitan komputer, instalasi sistem operasi, administrasi jaringan, dan keamanan siber. Lulusan dipersiapkan menjadi teknisi komputer, administrator jaringan, atau profesional IT yang handal.',
            imageUrl: 'https://picsum.photos/seed/tkj/800/600',
            competencies: [
                'Instalasi & Konfigurasi Jaringan (LAN, WAN)',
                'Administrasi Server & Sistem Operasi',
                'Keamanan Jaringan & Cyber Security',
                'Cloud Computing & Virtualization'
            ]
        },
        {
            title: 'Teknik Kendaraan Ringan (TKR)',
            description: 'Jurusan TKR fokus pada perawatan dan perbaikan mesin otomotif, sistem chasis, pemindah tenaga, dan kelistrikan kendaraan ringan. Prospek karir meliputi mekanik di bengkel resmi, wirausaha bengkel, atau teknisi di industri otomotif.',
            imageUrl: 'https://picsum.photos/seed/tkr/800/600',
            competencies: [
                'Perawatan Mesin Konvensional & Injeksi (EFI)',
                'Sistem Sasis, Suspensi, dan Kemudi',
                'Sistem Kelistrikan Bodi & AC Mobil',
                'Transmisi Otomatis & Manual'
            ]
        },
    ];

    return (
        <div>
            <PageHeader />
            <div className="py-16 px-6 bg-gray-50">
                <div className="container mx-auto space-y-12">
                    {jurusanData.map((j, index) => <JurusanCard key={j.title} {...j} reverse={index % 2 !== 0} />)}
                </div>
            </div>
        </div>
    );
};

export default JurusanPage;