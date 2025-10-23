
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';

const BuatSesiPemilihanPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const { addSesi } = useVoting();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(`${endDate}T${endTime}`);
        
        if (!title || !startDate || !startTime || !endDate || !endTime || end <= start) {
            alert('Harap isi semua field dengan benar. Tanggal selesai harus setelah tanggal mulai.');
            return;
        }

        const newSesi = addSesi({ title, start, end });
        navigate(`/admin/pemilihan/${newSesi.id}`);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Buat Sesi Pemilihan Baru</h1>

            <div className="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Pemilihan</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Contoh: Pemilihan Ketua OSIS 2025/2026"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Jam Mulai</label>
                            <input
                                type="time"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Jam Selesai</label>
                            <input
                                type="time"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Buat Sesi & Lanjut
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BuatSesiPemilihanPage;
