
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Berita } from '../../types';
import Modal from '../../components/common/Modal';

const ManageKontenPage: React.FC = () => {
    const { berita, addBerita, updateBerita, deleteBerita } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBerita, setCurrentBerita] = useState<Partial<Berita>>({});

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
        if (currentBerita.id) { // Editing existing
            updateBerita(currentBerita as Berita);
        } else { // Adding new
            addBerita(currentBerita as Omit<Berita, 'id'|'date'|'imageUrl'|'excerpt'>);
        }
        setIsModalOpen(false);
        setCurrentBerita({});
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            deleteBerita(id);
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
                <div className="space-y-3">
                    {berita.map(item => (
                         <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                            <div>
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.date} - {item.category}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => openModalForEdit(item)} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Hapus</button>
                            </div>
                        </div>
                    ))}
                </div>
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
                        <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">Batal</button>
                        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Simpan</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageKontenPage;
