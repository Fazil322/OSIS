
import React from 'react';

const PageHeader: React.FC = () => (
    <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Program Keahlian</h1>
        </div>
    </div>
);

const JurusanCard: React.FC<{ title: string; description: string; imageUrl: string }> = ({ title, description, imageUrl }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <img src={imageUrl} alt={title} className="md:w-1/3 h-64 md:h-auto object-cover" />
        <div className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    </div>
);


const JurusanPage: React.FC = () => {
    const jurusanData = [
        {
            title: 'Teknik Komputer dan Jaringan (TKJ)',
            description: 'Siswa jurusan TKJ akan mempelajari tentang perakitan komputer, instalasi sistem operasi, administrasi jaringan, dan keamanan siber. Lulusan dipersiapkan menjadi teknisi komputer, administrator jaringan, atau profesional IT yang handal.',
            imageUrl: 'https://picsum.photos/seed/tkj/800/600',
        },
        {
            title: 'Teknik Kendaraan Ringan (TKR)',
            description: 'Jurusan TKR fokus pada perawatan dan perbaikan mesin otomotif, sistem chasis, pemindah tenaga, dan kelistrikan kendaraan ringan. Prospek karir meliputi mekanik di bengkel resmi, wirausaha bengkel, atau teknisi di industri otomotif.',
            imageUrl: 'https://picsum.photos/seed/tkr/800/600',
        },
    ];

    return (
        <div>
            <PageHeader />
            <div className="py-16 px-6 bg-gray-50">
                <div className="container mx-auto space-y-12">
                    {jurusanData.map(j => <JurusanCard key={j.title} {...j} />)}
                </div>
            </div>
        </div>
    );
};

export default JurusanPage;
