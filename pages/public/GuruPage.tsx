
import React from 'react';
import { mockGuru } from '../../services/mockData';
import { Guru } from '../../types';

const PageHeader: React.FC = () => (
    <div className="bg-cyan-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Pendidik & Tenaga Kependidikan</h1>
            <p className="text-cyan-200 mt-2 text-lg">Mereka adalah pilar utama di balik kesuksesan siswa kami.</p>
        </div>
    </div>
);

const GuruCard: React.FC<{ guru: Guru }> = ({ guru }) => (
    <div className="bg-white rounded-lg shadow-lg text-center p-6 transform hover:-translate-y-2 transition-transform duration-300">
        <img src={guru.imageUrl} alt={guru.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100" />
        <h3 className="text-xl font-semibold text-gray-800">{guru.name}</h3>
        <p className="text-cyan-600 font-medium">{guru.subject}</p>
    </div>
);

const GuruPage: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <PageHeader />
            <div className="py-16 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {mockGuru.map(guru => <GuruCard key={guru.id} guru={guru} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuruPage;
