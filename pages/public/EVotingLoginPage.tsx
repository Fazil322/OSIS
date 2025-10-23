
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';

const EVotingLoginPage: React.FC = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { validateVoterCode, setVoter } = useVoting();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const result = validateVoterCode(code.toUpperCase());
        if (result.valid) {
            setVoter(code.toUpperCase());
            navigate('/e-voting/ballot');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Pemilihan Umum Sekolah
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Silakan masukkan kode pemilih unik Anda untuk melanjutkan.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="voter-code" className="sr-only">Kode Pemilih</label>
                            <input
                                id="voter-code"
                                name="code"
                                type="text"
                                required
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center uppercase"
                                placeholder="KODE PEMILIH UNIK"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Gunakan Hak Suara
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EVotingLoginPage;
