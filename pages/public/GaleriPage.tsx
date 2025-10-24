import React, { useState } from 'react';

const PageHeader: React.FC = () => (
    <div className="bg-indigo-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Galeri Kegiatan</h1>
        </div>
    </div>
);

const Lightbox: React.FC<{ images: string[]; startIndex: number; onClose: () => void }> = ({ images, startIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    const goToPrevious = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    const goToNext = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" onClick={onClose}>
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl z-50">&times;</button>
            <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute left-4 text-white text-4xl z-50">&#8249;</button>
            <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-4 text-white text-4xl z-50">&#8250;</button>
            <div className="relative max-w-4xl max-h-full p-4" onClick={e => e.stopPropagation()}>
                <img src={`https://picsum.photos/seed/${images[currentIndex]}/1200/800`} alt="Enlarged view" className="max-h-[80vh] w-auto object-contain"/>
            </div>
        </div>
    );
};


const Album: React.FC<{ title: string; images: string[]; onImageClick: (index: number) => void }> = ({ title, images, onImageClick }) => (
    <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imgSeed, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md aspect-w-1 aspect-h-1 cursor-pointer group" onClick={() => onImageClick(index)}>
                    <img src={`https://picsum.photos/seed/${imgSeed}/500/500`} alt={`${title} image ${index + 1}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
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

    const [lightbox, setLightbox] = useState<{ albumIndex: number; imageIndex: number } | null>(null);

    const openLightbox = (albumIndex: number, imageIndex: number) => {
        setLightbox({ albumIndex, imageIndex });
    };

    const closeLightbox = () => {
        setLightbox(null);
    };

    return (
        <div>
            <PageHeader />
            <div className="py-16 px-6">
                <div className="container mx-auto">
                    {albums.map((album, albumIndex) => (
                        <Album key={album.title} title={album.title} images={album.images} onImageClick={(imageIndex) => openLightbox(albumIndex, imageIndex)} />
                    ))}
                </div>
            </div>
            {lightbox !== null && (
                <Lightbox
                    images={albums[lightbox.albumIndex].images}
                    startIndex={lightbox.imageIndex}
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
};

export default GaleriPage;