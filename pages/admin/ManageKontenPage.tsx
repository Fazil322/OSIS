import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Berita } from '../../types';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';

const ManageKontenPage: React.FC = () => {
    const { berita, addBerita, updateBerita, deleteBerita } = useData();
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBerita, setCurrentBerita] = useState<Partial<Berita>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<Berita | null>(null);

    const openModalForNew = () => {
        setCurrentBerita({});
        setIsModalOpen(true);
    };

    const openModalForEdit = (beritaItem: Berita) => {
        setCurrentBerita(beritaItem);
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            if (currentBerita.id) {
                updateBerita(currentBerita as Berita);
                showToast('Berita berhasil diperbarui!', 'success');
            } else {
                addBerita(currentBerita as Omit<Berita, 'id'|'date'|'imageUrl'|'excerpt'>);
                showToast('Berita baru berhasil ditambahkan!', 'success');
            }
            setIsLoading(false);
            setIsModalOpen(false);
            setCurrentBerita({});
        }, 500);
    };

    const handleDelete = () => {
        if (showDeleteConfirm) {
            deleteBerita(showDeleteConfirm.id);
            showToast(`Berita "${showDeleteConfirm.title}" telah dihapus.`, 'error');
            setShowDeleteConfirm(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Manajemen Konten</h1>
                <button onClick={openModalForNew} className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">
                    Tambah Berita Baru
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Daftar Berita/Artikel</h2>
                {berita.length > 0 ? (
                    <div className="space-y-3">
                        {berita.map(item => (
                             <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.date} - {item.category}</p>
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => openModalForEdit(item)} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">Edit</button>
                                    <button onClick={() => setShowDeleteConfirm(item)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Hapus</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        title="Belum Ada Berita"
                        message="Mulai dengan menambahkan berita, pengumuman, atau artikel baru untuk ditampilkan di website."
                        buttonText="Tambah Berita Pertama"
                        onButtonClick={openModalForNew}
                    />
                )}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentBerita.id ? "Edit Berita" : "Tambah Berita Baru"}>
                 <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Judul Artikel</label>
                        <input type="text" value={currentBerita.title || ''} onChange={e => setCurrentBerita({...currentBerita, title: e.target.value})} className="w-full p-2 border rounded-md mt-1" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Kategori</label>
                        <select value={currentBerita.category || 'Kegiatan'} onChange={e => setCurrentBerita({...currentBerita, category: e.target.value})} className="w-full p-2 border rounded-md mt-1">
                            <option>Kegiatan</option>
                            <option>Prestasi</option>
                            <option>Pengumuman</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Konten Artikel</label>
                        <textarea rows={8} className="w-full p-2 border rounded-md mt-1" value={currentBerita.content || ''} onChange={e => setCurrentBerita({...currentBerita, content: e.target.value})} required></textarea>
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
                    <p>Apakah Anda yakin ingin menghapus berita berjudul <span className="font-bold">"{showDeleteConfirm?.title}"</span>? Tindakan ini tidak dapat dibatalkan.</p>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button onClick={() => setShowDeleteConfirm(null)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">Batal</button>
                        <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Ya, Hapus</button>
                    </div>
                 </div>
            </Modal>
        </div>
    );
};

export default ManageKontenPage;