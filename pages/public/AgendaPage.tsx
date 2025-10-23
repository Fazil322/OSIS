
import React from 'react';
import { useData } from '../../context/DataContext';

const PageHeader: React.FC = () => (
    <div className="bg-purple-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Agenda Sekolah</h1>
        </div>
    </div>
);

const AgendaPage: React.FC = () => {
    const { agenda } = useData();

    return (
        <div>
            <PageHeader />
            <div className="container mx-auto py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {agenda.map((item, index) => (
                            <div key={item.id} className="flex items-start space-x-6">
                                <div className="flex flex-col items-center">
                                    <div className="bg-purple-600 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg">
                                        <span className="text-3xl font-bold">{item.date.getDate()}</span>
                                        <span className="text-sm uppercase">{item.date.toLocaleString('id-ID', { month: 'short' })}</span>
                                    </div>
                                    {index < agenda.length - 1 && <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>}
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h2>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgendaPage;
