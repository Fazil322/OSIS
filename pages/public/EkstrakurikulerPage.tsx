import React from 'react';
import { useData } from '../../context/DataContext';
import { Ekstrakurikuler } from '../../types';

const PageHeader: React.FC = () => (
    <div className="bg-orange-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Ekstrakurikuler</h1>
            <p className="text-orange-200 mt-2 text-lg">Temukan Bakat dan Kembangkan Potensimu di Luar Kelas!</p>
        </div>
    </div>
);

const EkskulCard: React.FC<{ ekskul: Ekstrakurikuler, delay: number }> = ({ ekskul, delay }) => (
    <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col animate-fade-in-up"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="relative">
            <img src={ekskul.imageUrl} alt={ekskul.name} className="w-full h-56 object-cover"/>
            <div className="absolute top-0 right-0 bg-orange-600 text-white px-3 py-1 m-2 rounded-md text-sm font-semibold">Populer</div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{ekskul.name}</h3>
            <p className="text-gray-600 leading-relaxed flex-grow">{ekskul.description}</p>
        </div>
    </div>
);

const EkstrakurikulerPage: React.FC = () => {
    const { ekstrakurikuler } = useData();

    return (
        <div className="bg-gray-50">
            <PageHeader />
            <div className="py-16 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ekstrakurikuler.map((ekskul, index) => <EkskulCard key={ekskul.id} ekskul={ekskul} delay={index * 100} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EkstrakurikulerPage;