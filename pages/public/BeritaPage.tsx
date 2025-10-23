
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Berita } from '../../types';

const PageHeader: React.FC = () => (
    <div className="bg-teal-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Berita & Informasi</h1>
        </div>
    </div>
);

const BeritaCard: React.FC<{ berita: Berita }> = ({ berita }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={berita.imageUrl} alt={berita.title} className="w-full h-56 object-cover" />
        <div className="p-6">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>{berita.date}</span>
                <span className="font-semibold text-teal-600">{berita.category}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{berita.title}</h3>
            <p className="text-gray-600 mb-4">{berita.excerpt}</p>
            <Link to={`/berita/${berita.id}`} className="font-semibold text-blue-600 hover:underline">Baca Selengkapnya &rarr;</Link>
        </div>
    </div>
);


const BeritaPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { berita } = useData();
    
    const filteredBerita = berita.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <PageHeader />
            <div className="py-16 px-6 bg-gray-50">
                <div className="container mx-auto">
                    <div className="mb-8 max-w-lg mx-auto">
                        <input
                            type="text"
                            placeholder="Cari berita..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBerita.map(item => (
                            <BeritaCard key={item.id} berita={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeritaPage;
