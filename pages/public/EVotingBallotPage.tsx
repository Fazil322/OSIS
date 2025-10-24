import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { SesiPemilihan, Kandidat } from '../../types';
import Modal from '../../components/common/Modal';

const EVotingBallotPage: React.FC = () => {
    const { activeVoterCode, validateVoterCode, castVote } = useVoting();
    const [sesi, setSesi] = useState<SesiPemilihan | null>(null);
    const [selectedKandidat, setSelectedKandidat] = useState<Kandidat | null>(null);
    const [isVoted, setIsVoted] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeVoterCode) {
            const result = validateVoterCode(activeVoterCode);
            if (result.valid && result.sesi) {
                setSesi(result.sesi);
            } else {
                navigate('/e-voting');
            }
        }
    }, [activeVoterCode, validateVoterCode, navigate]);
    
    const handleVote = () => {
        if (sesi && selectedKandidat) {
            const success = castVote(sesi.id, selectedKandidat.id);
            if(success) {
                setIsVoted(true);
            }
        }
        setShowConfirmModal(false);
    };

    if (!activeVoterCode) {
        return <Navigate to="/e-voting" replace />;
    }

    if (isVoted) {
        return (
             <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full text-center bg-white p-10 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-green-600">Terima Kasih!</h2>
                    <p className="mt-4 text-gray-700">Suara Anda telah berhasil direkam. Partisipasi Anda sangat berarti bagi kemajuan sekolah.</p>
                </div>
            </div>
        );
    }
    
    if (!sesi) {
        return <div className="text-center py-20">Memuat surat suara...</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-center mb-2">{sesi.title}</h1>
            <p className="text-center text-gray-600 mb-8">Pilih salah satu kandidat dengan bijak.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sesi.kandidat.map(k => (
                    <div 
                        key={k.id}
                        onClick={() => setSelectedKandidat(k)}
                        className={`bg-white rounded-lg shadow-md p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedKandidat?.id === k.id ? 'ring-4 ring-blue-500 scale-105' : 'hover:shadow-xl'}`}
                    >
                        <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mx-auto mb-4">{k.nomorUrut}</div>
                        <img src={k.photoUrl} alt={k.name} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200" />
                        <h3 className="text-2xl font-semibold text-gray-800">{k.name}</h3>
                        <div className="text-left mt-4">
                            <h4 className="font-bold text-gray-700">Visi:</h4>
                            <p className="text-sm text-gray-600 italic mb-2">"{k.visi}"</p>
                            <h4 className="font-bold text-gray-700">Misi:</h4>
                            <p className="text-sm text-gray-600">{k.misi}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedKandidat && (
                 <div className="mt-12 text-center">
                    <button
                        onClick={() => setShowConfirmModal(true)}
                        className="bg-green-600 text-white px-10 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Kirim Suara Saya untuk {selectedKandidat.name}
                    </button>
                </div>
            )}

            {selectedKandidat && (
                 <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} title="Konfirmasi Pilihan">
                     <div className="text-center">
                        <p className="text-lg mb-4">Anda akan memberikan suara untuk:</p>
                        <div className="bg-gray-100 p-4 rounded-lg inline-block">
                            <img src={selectedKandidat.photoUrl} alt={selectedKandidat.name} className="w-24 h-24 rounded-full mx-auto mb-2"/>
                             <h3 className="text-2xl font-bold text-blue-600">{selectedKandidat.name}</h3>
                        </div>
                        <p className="text-gray-600 mt-4">Pilihan ini tidak dapat diubah setelah dikonfirmasi. Apakah Anda yakin?</p>
                     </div>
                     <div className="flex justify-center space-x-4 mt-6">
                        <button onClick={() => setShowConfirmModal(false)} className="bg-gray-300 text-gray-800 px-8 py-2 rounded-md font-semibold hover:bg-gray-400">Batal</button>
                        <button onClick={handleVote} className="bg-green-600 text-white px-8 py-2 rounded-md font-semibold hover:bg-green-700">Ya, Kirim Suara</button>
                     </div>
                </Modal>
            )}
        </div>
    );
};

export default EVotingBallotPage;