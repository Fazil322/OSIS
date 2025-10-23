
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Agenda } from '../../types';
import Modal from '../../components/common/Modal';

const ManageAgendaPage: React.FC = () => {
    const { agenda, addAgenda, updateAgenda, deleteAgenda } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAgenda, setCurrentAgenda] = useState<Partial<Agenda>>({});

    const openModalForNew = () => {
        setCurrentAgenda({});
        setIsModalOpen(true);
    };

    const openModalForEdit = (agendaItem: Agenda) => {
        // Format date for input[type=date] which expects YYYY-MM-DD
        const dateForInput = agendaItem.date.toISOString().split('T')[0];
        setCurrentAgenda({...agendaItem, date: dateForInput as any});
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const agendaDataToSave = {
            ...currentAgenda,
            date: new Date(currentAgenda.date as any),
        };

        if (agendaDataToSave.id) {
            updateAgenda(agendaDataToSave as Agenda);
        } else {
            addAgenda(agendaDataToSave as Omit<Agenda, 'id'>);
        }
        setIsModalOpen(false);
        setCurrentAgenda({});
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus agenda ini?')) {
            deleteAgenda(id);
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Manajemen Agenda</h1>
                <button onClick={openModalForNew} className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">
                    Tambah Agenda Baru
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Daftar Agenda Kegiatan</h2>
                <div className="space-y-3">
                    {agenda.map(item => (
                         <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                            <div>
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => openModalForEdit(item)} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Hapus</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentAgenda.id ? "Edit Agenda" : "Tambah Agenda Baru"}>
                 <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Judul Agenda</label>
                        <input type="text" value={currentAgenda.title || ''} onChange={e => setCurrentAgenda({...currentAgenda, title: e.target.value})} className="w-full p-2 border rounded-md mt-1" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                         <input type="date" value={currentAgenda.date as any || ''} onChange={e => setCurrentAgenda({...currentAgenda, date: e.target.value as any})} className="w-full p-2 border rounded-md mt-1" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea rows={4} className="w-full p-2 border rounded-md mt-1" value={currentAgenda.description || ''} onChange={e => setCurrentAgenda({...currentAgenda, description: e.target.value})} required></textarea>
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

export default ManageAgendaPage;
