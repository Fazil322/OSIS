import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Alumni } from '../../types';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';

const ManageAlumniPage: React.FC = () => {
    const { alumni, addAlumni, updateAlumni, deleteAlumni } = useData();
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAlumni, setCurrentAlumni] = useState<Partial<Alumni>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<Alumni | null>(null);

    const openModalForNew = () => {
        setCurrentAlumni({ graduationYear: new Date().getFullYear() - 1 });
        setIsModalOpen(true);
    };

    const openModalForEdit = (alumniItem: Alumni) => {
        setCurrentAlumni(alumniItem);
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            if (currentAlumni.id) {
                updateAlumni(currentAlumni as Alumni);
                showToast('Data alumni berhasil diperbarui!', 'success');
            } else {
                addAlumni(currentAlumni as Omit<Alumni, 'id'>);
                showToast('Data alumni baru berhasil ditambahkan!', 'success');
            }
            setIsLoading(false);
            setIsModalOpen(false);
            setCurrentAlumni({});
        }, 500);
    };

    const handleDelete = () => {
        if (showDeleteConfirm) {
            deleteAlumni(showDeleteConfirm.id);
            showToast(`Data alumni "${showDeleteConfirm.name}" telah dihapus.`, 'error');
            setShowDeleteConfirm(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Manajemen Alumni</h1>
                <button onClick={openModalForNew} className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">
                    Tambah Alumni Baru
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Daftar Alumni</h2>
                {alumni.length > 0 ? (
                    <div className="space-y-4">
                        {alumni.map(item => (
                             <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                                <div className="flex items-center space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-full object-cover"/>
                                    <div>
                                        <p className="font-semibold text-lg">{item.name}</p>
                                        <p className="text-sm text-gray-500">Lulusan {item.graduationYear}</p>
                                    </div>
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
                        title="Belum Ada Data Alumni"
                        message="Bagikan kisah sukses para lulusan untuk menginspirasi siswa dan calon siswa baru."
                        buttonText="Tambah Alumni Pertama"
                        onButtonClick={openModalForNew}
                    />
                )}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentAlumni.id ? "Edit Alumni" : "Tambah Alumni Baru"}>
                 <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                            <input type="text" value={currentAlumni.name || ''} onChange={e => setCurrentAlumni({...currentAlumni, name: e.target.value})} className="w-full p-2 border rounded-md mt-1" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tahun Lulus</label>
                            <input type="number" value={currentAlumni.graduationYear || ''} onChange={e => setCurrentAlumni({...currentAlumni, graduationYear: parseInt(e.target.value)})} className="w-full p-2 border rounded-md mt-1" required />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">URL Foto</label>
                        <input type="text" placeholder="https://picsum.photos/seed/..." value={currentAlumni.imageUrl || ''} onChange={e => setCurrentAlumni({...currentAlumni, imageUrl: e.target.value})} className="w-full p-2 border rounded-md mt-1" required />
                        {currentAlumni.imageUrl && <img src={currentAlumni.imageUrl} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-full"/>}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Kisah / Testimoni</label>
                        <textarea rows={4} className="w-full p-2 border rounded-md mt-1" value={currentAlumni.story || ''} onChange={e => setCurrentAlumni({...currentAlumni, story: e.target.value})} required></textarea>
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
                    <p>Apakah Anda yakin ingin menghapus data alumni <span className="font-bold">"{showDeleteConfirm?.name}"</span>?</p>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button onClick={() => setShowDeleteConfirm(null)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">Batal</button>
                        <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Ya, Hapus</button>
                    </div>
                 </div>
            </Modal>
        </div>
    );
};

export default ManageAlumniPage;