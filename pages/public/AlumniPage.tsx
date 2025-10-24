import React from 'react';
import { useData } from '../../context/DataContext';
import { Alumni } from '../../types';

const PageHeader: React.FC = () => (
    <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Jejak Alumni</h1>
            <p className="text-gray-300 mt-2 text-lg">Kisah Inspiratif dari Para Lulusan Berprestasi.</p>
        </div>
    </div>
);

const AlumniCard: React.FC<{ alumni: Alumni, index: number }> = ({ alumni, index }) => (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
        <div className="md:flex">
            <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:w-48" src={alumni.imageUrl} alt={alumni.name} />
            </div>
            <div className="p-8 relative">
                <svg className="absolute top-4 right-4 w-12 h-12 text-gray-100" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.333 22.667h4L16 16V9.333H9.333v13.334zm13.334 0h4L29.333 16V9.333h-6.666v13.334z"></path>
                </svg>
                <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">Lulusan {alumni.graduationYear}</div>
                <p className="block mt-1 text-2xl leading-tight font-bold text-black">{alumni.name}</p>
                <p className="mt-4 text-gray-600 italic">"{alumni.story}"</p>
            </div>
        </div>
    </div>
);


const AlumniPage: React.FC = () => {
    const { alumni } = useData();

    return (
        <div className="bg-gray-50">
            <PageHeader />
            <div className="py-16 px-6">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto space-y-10">
                        {alumni.map((item, index) => <AlumniCard key={item.id} alumni={item} index={index} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniPage;