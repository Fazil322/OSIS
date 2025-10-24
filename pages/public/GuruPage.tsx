import React, { useState } from 'react';
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

const GuruCard: React.FC<{ guru: Guru, delay: number }> = ({ guru, delay }) => (
    <div 
        className="bg-white rounded-lg shadow-lg text-center p-6 transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up"
        style={{ animationDelay: `${delay}ms` }}
    >
        <img src={guru.imageUrl} alt={guru.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100" />
        <h3 className="text-xl font-semibold text-gray-800">{guru.name}</h3>
        <p className="text-cyan-600 font-medium">{guru.subject}</p>
    </div>
);

const GuruPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('Semua');

    const subjects = ['Semua', ...new Set(mockGuru.map(g => g.subject))];

    const filteredGuru = mockGuru.filter(guru => {
        const nameMatch = guru.name.toLowerCase().includes(searchTerm.toLowerCase());
        const subjectMatch = selectedSubject === 'Semua' || guru.subject === selectedSubject;
        return nameMatch && subjectMatch;
    });

    return (
        <div className="bg-gray-50">
            <PageHeader />
            <div className="py-16 px-6">
                <div className="container mx-auto">
                    <div className="mb-12 bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-4 justify-center items-center">
                        <input
                            type="text"
                            placeholder="Cari nama guru..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            {subjects.map(subject => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredGuru.length > 0 ? (
                            filteredGuru.map((guru, index) => <GuruCard key={guru.id} guru={guru} delay={index * 100} />)
                        ) : (
                            <p className="col-span-full text-center text-gray-500 text-xl">Guru tidak ditemukan.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuruPage;