
import React from 'react';

const PageHeader: React.FC = () => (
    <div className="bg-indigo-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Galeri Kegiatan</h1>
        </div>
    </div>
);

const Album: React.FC<{ title: string, images: string[] }> = ({ title, images }) => (
    <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imgSeed, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md aspect-w-1 aspect-h-1">
                    <img src={`https://picsum.photos/seed/${imgSeed}/500/500`} alt={`${title} image ${index + 1}`} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 cursor-pointer" />
                </div>
            ))}
        </div>
    </div>
);

const GaleriPage: React.FC = () => {
    const albums = [
        {
            title: "Lomba Kompetensi Siswa 2024",
            images: ["lks1", "lks2", "lks3", "lks4", "lks5", "lks6", "lks7", "lks8"]
        },
        {
            title: "Peringatan Hari Kemerdekaan",
            images: ["hutri1", "hutri2", "hutri3", "hutri4"]
        },
        {
            title: "Kegiatan Praktik Jurusan",
            images: ["praktik1", "praktik2", "praktik3", "praktik4", "praktik5", "praktik6"]
        }
    ];

    return (
        <div>
            <PageHeader />
            <div className="py-16 px-6">
                <div className="container mx-auto">
                    {albums.map(album => (
                        <Album key={album.title} title={album.title} images={album.images} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GaleriPage;
