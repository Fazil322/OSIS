
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useVoting } from '../../context/VotingContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const { sesiPemilihan } = useVoting();
    const { berita } = useData();
    const activeSesi = sesiPemilihan.find(s => s.status === 'Aktif');

    const chartData = activeSesi?.kandidat.map(k => ({
        name: k.name,
        Suara: k.voteCount,
    })) || [];
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Pengunjung Hari Ini</h3>
                    <p className="text-3xl font-bold text-gray-800">1,234</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Berita</h3>
                    <p className="text-3xl font-bold text-gray-800">{berita.length}</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Sesi Pemilihan Aktif</h3>
                    <p className="text-3xl font-bold text-gray-800">{activeSesi ? '1' : '0'}</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Suara Masuk</h3>
                    <p className="text-3xl font-bold text-gray-800">{activeSesi?.kandidat.reduce((acc, k) => acc + k.voteCount, 0) || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Hasil Suara Real-time: {activeSesi?.title || "Tidak ada pemilihan aktif"}
                    </h2>
                    {activeSesi ? (
                         <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={chartData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Suara" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-center text-gray-500 py-20">Tidak ada data untuk ditampilkan.</p>
                        </div>
                    )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                     <h2 className="text-xl font-bold text-gray-800 mb-4">Berita Terbaru</h2>
                     <div className="space-y-4">
                        {berita.slice(0, 5).map(item => (
                            <div key={item.id} className="border-b pb-2">
                                <Link to="/admin/konten" className="font-semibold text-blue-600 hover:underline">{item.title}</Link>
                                <p className="text-sm text-gray-500">{item.date}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardPage;
