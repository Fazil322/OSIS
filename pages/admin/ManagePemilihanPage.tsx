
import React from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';

const ManagePemilihanPage: React.FC = () => {
    const { sesiPemilihan } = useVoting();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manajemen Pemilihan Umum</h1>
                <Link 
                    to="/admin/pemilihan/baru"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                    Buat Sesi Baru
                </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">Judul Pemilihan</th>
                            <th>Jadwal</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sesiPemilihan.map(sesi => (
                            <tr key={sesi.id} className="border-b hover:bg-gray-50">
                                <td className="py-4 font-semibold">{sesi.title}</td>
                                <td>{sesi.start.toLocaleDateString()} - {sesi.end.toLocaleDateString()}</td>
                                <td>
                                    <span className={`px-3 py-1 text-sm rounded-full ${
                                        sesi.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                                        sesi.status === 'Selesai' ? 'bg-gray-200 text-gray-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {sesi.status}
                                    </span>
                                </td>
                                <td>
                                    <Link 
                                        to={`/admin/pemilihan/${sesi.id}`}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagePemilihanPage;
