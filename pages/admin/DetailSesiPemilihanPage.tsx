import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { SesiPemilihan, VoterCode, Kandidat } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import Spinner from '../../components/common/Spinner';

const DetailSesiPemilihanPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getSesiById, addKandidat, generateVoterCodes, updateSesi, updateKandidat, deleteKandidat } = useVoting();
    const { showToast } = useToast();
    const [sesi, setSesi] = useState<SesiPemilihan | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentKandidat, setCurrentKandidat] = useState<Partial<Kandidat>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [codeCount, setCodeCount] = useState(100);
    const [newlyGeneratedCodes, setNewlyGeneratedCodes] = useState<VoterCode[]>([]);

    const [confirmAction, setConfirmAction] = useState<{ type: 'status' | 'deleteKandidat'; payload: any; message: string } | null>(null);

    useEffect(() => {
        if (id) {
            const foundSesi = getSesiById(id);
            if (foundSesi) {
                setSesi(foundSesi);
            } else {
                navigate('/admin/pemilihan');
            }
        }
    }, [id, getSesiById, navigate, sesi]);
    
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
        setIsLoading(true);

        setTimeout(() => {
             if (currentKandidat.id) {
                updateKandidat(sesi.id, currentKandidat as Kandidat);
                showToast('Data kandidat berhasil diperbarui.', 'success');
            } else {
                 if (currentKandidat.name && currentKandidat.nomorUrut && currentKandidat.visi && currentKandidat.misi && currentKandidat.photoUrl) {
                    addKandidat(sesi.id, currentKandidat as Omit<Kandidat, 'id' | 'voteCount'>);
                    showToast('Kandidat baru berhasil ditambahkan.', 'success');
                }
            }
            setIsLoading(false);
            setIsModalOpen(false);
        }, 500);
    };

    const handleDeleteKandidat = (kandidatId: string) => {
        if (sesi) {
            deleteKandidat(sesi.id, kandidatId);
            showToast('Kandidat telah dihapus.', 'error');
            setConfirmAction(null);
        }
    };
    
    const handleGenerateCodes = () => {
        if(sesi && codeCount > 0) {
            const newCodes = generateVoterCodes(sesi.id, codeCount);
            setNewlyGeneratedCodes(newCodes);
            showToast(`${newCodes.length} kode pemilih baru berhasil dibuat.`, 'success');
        } else {
            showToast('Jumlah kode harus lebih dari 0.', 'error');
        }
    };

    const downloadCodes = (codes: VoterCode[]) => {
        const data = codes.length > 0 ? codes : sesi?.voterCodes;
        if (!data || data.length === 0) {
            showToast('Tidak ada kode untuk diunduh.', 'info');
            return;
        }
        const csvContent = "data:text/csv;charset=utf-8," + "Kode Pemilih\n" + data.map(c => c.code).join("\n");
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
            showToast(`Status sesi pemilihan diubah menjadi ${newStatus}.`, 'info');
            setConfirmAction(null);
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
                        <span className={`ml-2 px-3 py-1 text-sm rounded-full font-semibold ${
                            sesi.status === 'Aktif' ? 'bg-green-100 text-green-800 animate-pulse-fast' :
                            sesi.status === 'Selesai' ? 'bg-gray-200 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>{sesi.status}</span>
                    </span>
                    <button onClick={() => setConfirmAction({ type: 'status', payload: 'Aktif', message: 'Apakah Anda yakin ingin mengaktifkan sesi ini? Sesi yang aktif akan dapat diakses oleh pemilih.' })} className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 disabled:opacity-50" disabled={sesi.status === 'Aktif'}>Aktifkan</button>
                    <button onClick={() => setConfirmAction({ type: 'status', payload: 'Tidak Aktif', message: 'Apakah Anda yakin ingin menon-aktifkan sesi ini? Pemilih tidak akan dapat mengakses surat suara.' })} className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 disabled:opacity-50" disabled={sesi.status === 'Tidak Aktif'}>Non-aktifkan</button>
                    <button onClick={() => setConfirmAction({ type: 'status', payload: 'Selesai', message: 'Apakah Anda yakin ingin menyelesaikan sesi ini? Tindakan ini tidak dapat diubah dan akan mengunci hasil suara.' })} className="bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600 disabled:opacity-50" disabled={sesi.status === 'Selesai'}>Selesaikan</button>
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
                    <h2 className="text-xl font-bold text-gray-800">Manajemen Kandidat ({sesi.kandidat.length})</h2>
                    <button onClick={openModalForNew} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Tambah Kandidat</button>
                </div>
                {sesi.kandidat.length > 0 ? (
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
                                    <button onClick={() => setConfirmAction({ type: 'deleteKandidat', payload: k, message: `Anda yakin ingin menghapus kandidat ${k.name}?` })} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Hapus</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-center text-gray-500 py-4">Belum ada kandidat. Silakan tambahkan kandidat.</p>}
            </div>
            
             <div className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-xl font-bold text-gray-800 mb-4">Generator Kode Pemilih</h2>
                 <p className="mb-4 text-sm">Total kode saat ini: <strong>{sesi.voterCodes.length}</strong> | Digunakan: <strong>{sesi.voterCodes.filter(c => c.used).length}</strong></p>
                 <div className="flex items-center space-x-4 mb-4">
                     <input type="number" value={codeCount} onChange={e => setCodeCount(parseInt(e.target.value))} className="w-40 p-2 border rounded-md"/>
                     <button onClick={handleGenerateCodes} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Generate Kode Baru</button>
                     <button onClick={() => downloadCodes([])} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">Unduh Semua Kode</button>
                 </div>
                 {newlyGeneratedCodes.length > 0 && (
                     <div>
                         <h3 className="font-semibold mb-2">Pratinjau Kode Baru (Total: {newlyGeneratedCodes.length})</h3>
                         <div className="grid grid-cols-5 gap-2 p-3 bg-gray-100 rounded-md font-mono text-sm">
                            {newlyGeneratedCodes.slice(0, 10).map(c => <span key={c.code}>{c.code}</span>)}
                         </div>
                         <button onClick={() => downloadCodes(newlyGeneratedCodes)} className="mt-3 text-sm text-blue-600 hover:underline">Unduh hanya kode yang baru dibuat</button>
                     </div>
                 )}
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
                    <div className="flex justify-end space-x-3"><button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300" disabled={isLoading}>Batal</button>
                    <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex items-center" disabled={isLoading}>
                           {isLoading && <Spinner size="h-4 w-4 mr-2" />}
                           {isLoading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </Modal>
            
            <Modal isOpen={!!confirmAction} onClose={() => setConfirmAction(null)} title="Konfirmasi Tindakan">
                 <div>
                    <p>{confirmAction?.message}</p>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button onClick={() => setConfirmAction(null)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">Batal</button>
                        <button onClick={() => {
                            if (confirmAction?.type === 'status') handleStatusChange(confirmAction.payload);
                            if (confirmAction?.type === 'deleteKandidat') handleDeleteKandidat(confirmAction.payload.id);
                        }} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Ya, Lanjutkan</button>
                    </div>
                 </div>
            </Modal>
        </div>
    );
};

export default DetailSesiPemilihanPage;