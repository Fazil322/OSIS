import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useVoting } from '../../context/VotingContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ label: string, value: number }> = ({ label, value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        if (start === end) return;

        const duration = 1500;
        const incrementTime = (duration / end) * Math.max(1, end / 100);
        
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
                clearInterval(timer);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-xl">
            <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
            <p className="text-3xl font-bold text-gray-800">{count}</p>
        </div>
    );
}

const DashboardPage: React.FC = () => {
    const { sesiPemilihan } = useVoting();
    const { berita, agenda, ekstrakurikuler, alumni } = useData();
    const activeSesi = sesiPemilihan.find(s => s.status === 'Aktif');

    const chartData = activeSesi?.kandidat.map(k => ({
        name: k.name,
        Suara: k.voteCount,
    })) || [];
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Berita" value={berita.length} />
                <StatCard label="Total Ekskul" value={ekstrakurikuler.length} />
                <StatCard label="Total Alumni" value={alumni.length} />
                <StatCard label="Total Suara Masuk (Sesi Aktif)" value={activeSesi?.kandidat.reduce((acc, k) => acc + k.voteCount, 0) || 0} />
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
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Tindakan Cepat</h2>
                        <div className="space-y-3">
                            <Link to="/admin/konten" className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Tambah Berita Baru</Link>
                            <Link to="/admin/kalender" className="block w-full text-center bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors">Tambah Agenda Baru</Link>
                            <Link to="/admin/pemilihan/baru" className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Buat Sesi Pemilihan</Link>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Aktivitas Terbaru</h2>
                         <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-700 text-sm mb-2">Berita Terakhir Dipublikasikan</h3>
                                 <div className="space-y-2">
                                    {berita.slice(0, 2).map(item => (
                                        <div key={item.id} className="border-l-4 border-blue-500 pl-3">
                                            <Link to="/admin/konten" className="font-semibold text-blue-600 hover:underline text-sm">{item.title}</Link>
                                            <p className="text-xs text-gray-500">{item.date}</p>
                                        </div>
                                    ))}
                                 </div>
                            </div>
                             <div>
                                <h3 className="font-semibold text-gray-700 text-sm mb-2">Agenda Terdekat</h3>
                                 <div className="space-y-2">
                                    {agenda.filter(a => a.date >= new Date()).slice(0, 2).map(item => (
                                        <div key={item.id} className="border-l-4 border-purple-500 pl-3">
                                            <Link to="/admin/kalender" className="font-semibold text-purple-600 hover:underline text-sm">{item.title}</Link>
                                            <p className="text-xs text-gray-500">{item.date.toLocaleDateString('id-ID')}</p>
                                        </div>
                                    ))}
                                 </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;