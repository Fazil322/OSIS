
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { SesiPemilihan, VoterCode, Kandidat } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Modal from '../../components/common/Modal';

const DetailSesiPemilihanPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getSesiById, addKandidat, generateVoterCodes, updateSesi, updateKandidat, deleteKandidat } = useVoting();
    const [sesi, setSesi] = useState<SesiPemilihan | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentKandidat, setCurrentKandidat] = useState<Partial<Kandidat>>({});

    const [codeCount, setCodeCount] = useState(100);

    useEffect(() => {
        if (id) {
            const foundSesi = getSesiById(id);
            if (foundSesi) {
                setSesi(foundSesi);
                if (!currentKandidat.id) { // Only set if not editing
                     setCurrentKandidat({nomorUrut: (foundSesi.kandidat.length || 0) + 1});
                }
            } else {
                navigate('/admin/pemilihan');
            }
        }
    }, [id, getSesiById, navigate, sesi]); // Re-run when sesi updates
    
    const openModalForNew = () => {
        setCurrentKandidat({ nomorUrut: (sesi?.kandidat.length || 0) + 1 });
        setIsModalOpen(true);
    };

    const openModalForEdit = (kandidat: Kandidat) => {
        setCurrentKandidat(kandidat);
        setIsModalOpen(true);
    };

    const handleSaveKandidat = (e: React.FormEvent) => {
        e.preventDefault();
        if (!sesi) return;

        if (currentKandidat.id) { // Editing
            updateKandidat(sesi.id, currentKandidat as Kandidat);
        } else { // Adding
             if (currentKandidat.name && currentKandidat.nomorUrut && currentKandidat.visi && currentKandidat.misi && currentKandidat.photoUrl) {
                addKandidat(sesi.id, currentKandidat as Omit<Kandidat, 'id' | 'voteCount'>);
            }
        }
        setIsModalOpen(false);
    };

    const handleDeleteKandidat = (kandidatId: string) => {
        if (sesi && window.confirm('Anda yakin ingin menghapus kandidat ini?')) {
            deleteKandidat(sesi.id, kandidatId);
        }
    };
    
    const handleGenerateCodes = () => {
        if(sesi) {
            const newCodes = generateVoterCodes(sesi.id, codeCount);
            alert(`${newCodes.length} kode pemilih baru berhasil dibuat.`);
            downloadCodes(newCodes);
        }
    };

    const downloadCodes = (codes: VoterCode[]) => {
        const csvContent = "data:text/csv;charset=utf-8," + "Kode Pemilih\n" + codes.map(c => c.code).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `kodepemilih_${sesi?.title.replace(/\s+/g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleStatusChange = (newStatus: SesiPemilihan['status']) => {
        if (sesi) {
            updateSesi({ ...sesi, status: newStatus });
        }
    }

    if (!sesi) return <div>Loading...</div>;

    const chartData = sesi.kandidat.map(k => ({ name: `No.${k.nomorUrut} ${k.name}`, Suara: k.voteCount }));

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">{sesi.title}</h1>
            
            <div className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-xl font-bold text-gray-800 mb-4">Kontrol Sesi</h2>
                 <div className="flex items-center space-x-4">
                    <span>Status Saat Ini: 
                        <span className={`ml-2 px-3 py-1 text-sm rounded-full ${
                            sesi.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                            sesi.status === 'Selesai' ? 'bg-gray-200 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>{sesi.status}</span>
                    </span>
                    <button onClick={() => handleStatusChange('Aktif')} className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 disabled:opacity-50" disabled={sesi.status === 'Aktif'}>Aktifkan</button>
                    <button onClick={() => handleStatusChange('Tidak Aktif')} className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 disabled:opacity-50" disabled={sesi.status === 'Tidak Aktif'}>Non-aktifkan</button>
                    <button onClick={() => handleStatusChange('Selesai')} className="bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600 disabled:opacity-50" disabled={sesi.status === 'Selesai'}>Selesaikan</button>
                 </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Hasil Suara</h2>
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="Suara" fill="#3B82F6" /></BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Manajemen Kandidat</h2>
                    <button onClick={openModalForNew} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Tambah Kandidat</button>
                </div>
                <div className="space-y-3">
                    {sesi.kandidat.map(k => (
                        <div key={k.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <div className="flex items-center space-x-4">
                                <img src={k.photoUrl} alt={k.name} className="h-12 w-12 rounded-full object-cover"/>
                                <div>
                                    <p className="font-semibold">{k.nomorUrut}. {k.name}</p>
                                    <p className="text-sm text-gray-500">Suara: {k.voteCount}</p>
                                </div>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => openModalForEdit(k)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">Edit</button>
                                <button onClick={() => handleDeleteKandidat(k.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Hapus</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
             <div className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-xl font-bold text-gray-800 mb-4">Generator Kode Pemilih</h2>
                 <p className="mb-4">Total kode saat ini: <strong>{sesi.voterCodes.length}</strong>. Kode yang sudah digunakan: <strong>{sesi.voterCodes.filter(c => c.used).length}</strong></p>
                 <div className="flex items-center space-x-4 mb-4">
                     <input type="number" value={codeCount} onChange={e => setCodeCount(parseInt(e.target.value))} className="w-40 p-2 border rounded-md"/>
                     <button onClick={handleGenerateCodes} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Generate & Unduh Kode</button>
                 </div>
                 <div className="max-h-64 overflow-y-auto border rounded-md">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0"><tr><th className="px-6 py-3">Kode</th><th className="px-6 py-3">Status</th></tr></thead>
                        <tbody>
                            {sesi.voterCodes.map(c => (
                                <tr key={c.code} className="bg-white border-b"><td className="px-6 py-2 font-mono">{c.code}</td><td className={`px-6 py-2 ${c.used ? 'text-red-500' : 'text-green-500'}`}>{c.used ? 'Sudah Digunakan' : 'Belum Digunakan'}</td></tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentKandidat.id ? 'Edit Kandidat' : 'Tambah Kandidat'}>
                <form onSubmit={handleSaveKandidat} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div><label>Nomor Urut</label><input type="number" value={currentKandidat.nomorUrut || ''} onChange={e => setCurrentKandidat({...currentKandidat, nomorUrut: parseInt(e.target.value)})} className="w-full p-2 border rounded-md" required /></div>
                         <div><label>Nama Lengkap</label><input type="text" value={currentKandidat.name || ''} onChange={e => setCurrentKandidat({...currentKandidat, name: e.target.value})} className="w-full p-2 border rounded-md" required /></div>
                    </div>
                    <div><label>Visi</label><textarea value={currentKandidat.visi || ''} onChange={e => setCurrentKandidat({...currentKandidat, visi: e.target.value})} className="w-full p-2 border rounded-md" rows={2} required /></div>
                    <div><label>Misi</label><textarea value={currentKandidat.misi || ''} onChange={e => setCurrentKandidat({...currentKandidat, misi: e.target.value})} className="w-full p-2 border rounded-md" rows={3} required /></div>
                    <div><label>URL Foto Kandidat</label><input type="text" placeholder="https://picsum.photos/seed/..." value={currentKandidat.photoUrl || ''} onChange={e => setCurrentKandidat({...currentKandidat, photoUrl: e.target.value})} className="w-full p-2 border rounded-md" required />{currentKandidat.photoUrl && <img src={currentKandidat.photoUrl} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-md"/>}</div>
                    <div className="flex justify-end space-x-3"><button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">Batal</button><button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Simpan</button></div>
                </form>
            </Modal>
        </div>
    );
};

export default DetailSesiPemilihanPage;
