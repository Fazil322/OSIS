import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Ekstrakurikuler } from '../../types';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';

const ManageEkstrakurikulerPage: React.FC = () => {
    const { ekstrakurikuler, addEkstrakurikuler, updateEkstrakurikuler, deleteEkstrakurikuler } = useData();
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEkskul, setCurrentEkskul] = useState<Partial<Ekstrakurikuler>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<Ekstrakurikuler | null>(null);

    const openModalForNew = () => {
        setCurrentEkskul({});
        setIsModalOpen(true);
    };

    const openModalForEdit = (ekskulItem: Ekstrakurikuler) => {
        setCurrentEkskul(ekskulItem);
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            if (currentEkskul.id) {
                updateEkstrakurikuler(currentEkskul as Ekstrakurikuler);
                showToast('Data ekstrakurikuler berhasil diperbarui!', 'success');
            } else {
                addEkstrakurikuler(currentEkskul as Omit<Ekstrakurikuler, 'id'>);
                showToast('Ekstrakurikuler baru berhasil ditambahkan!', 'success');
            }
            setIsLoading(false);
            setIsModalOpen(false);
            setCurrentEkskul({});
        }, 500);
    };

    const handleDelete = () => {
        if(showDeleteConfirm) {
            deleteEkstrakurikuler(showDeleteConfirm.id);
            showToast(`Ekstrakurikuler "${showDeleteConfirm.name}" telah dihapus.`, 'error');
            setShowDeleteConfirm(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Manajemen Ekstrakurikuler</h1>
                <button onClick={openModalForNew} className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">
                    Tambah Ekskul Baru
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Daftar Ekstrakurikuler</h2>
                {ekstrakurikuler.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ekstrakurikuler.map(item => (
                             <div key={item.id} className="bg-gray-50 rounded-md overflow-hidden shadow">
                                <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover"/>
                                <div className="p-4">
                                    <p className="font-semibold text-lg">{item.name}</p>
                                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                                </div>
                                <div className="p-4 bg-gray-100 flex justify-end space-x-2">
                                    <button onClick={() => openModalForEdit(item)} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 text-sm">Edit</button>
                                    <button onClick={() => setShowDeleteConfirm(item)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm">Hapus</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="Belum Ada Ekstrakurikuler"
                        message="Tambahkan kegiatan ekstrakurikuler yang ada di sekolah untuk menarik minat siswa."
                        buttonText="Tambah Ekskul Pertama"
                        onButtonClick={openModalForNew}
                    />
                )}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentEkskul.id ? "Edit Ekskul" : "Tambah Ekskul Baru"}>
                 <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Ekstrakurikuler</label>
                        <input type="text" value={currentEkskul.name || ''} onChange={e => setCurrentEkskul({...currentEkskul, name: e.target.value})} className="w-full p-2 border rounded-md mt-1" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
                        <input type="text" placeholder="https://picsum.photos/seed/..." value={currentEkskul.imageUrl || ''} onChange={e => setCurrentEkskul({...currentEkskul, imageUrl: e.target.value})} className="w-full p-2 border rounded-md mt-1" required />
                        {currentEkskul.imageUrl && <img src={currentEkskul.imageUrl} alt="Preview" className="mt-2 h-24 w-auto rounded-md object-cover"/>}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea rows={4} className="w-full p-2 border rounded-md mt-1" value={currentEkskul.description || ''} onChange={e => setCurrentEkskul({...currentEkskul, description: e.target.value})} required></textarea>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300" disabled={isLoading}>Batal</button>
                        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex items-center" disabled={isLoading}>
                           {isLoading && <Spinner size="h-4 w-4 mr-2" />}
                           {isLoading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </Modal>
            
            <Modal isOpen={!!showDeleteConfirm} onClose={() => setShowDeleteConfirm(null)} title="Konfirmasi Hapus">
                 <div>
                    <p>Apakah Anda yakin ingin menghapus ekstrakurikuler <span className="font-bold">"{showDeleteConfirm?.name}"</span>?</p>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button onClick={() => setShowDeleteConfirm(null)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">Batal</button>
                        <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Ya, Hapus</button>
                    </div>
                 </div>
            </Modal>
        </div>
    );
};

export default ManageEkstrakurikulerPage;