
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Agenda } from '../../types';
import Modal from '../../components/common/Modal';

const PageHeader: React.FC = () => (
    <div className="bg-purple-600 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Kalender Akademik</h1>
            <p className="text-purple-200 mt-2 text-lg">Jadwal Kegiatan dan Acara Sekolah</p>
        </div>
    </div>
);

const Calendar: React.FC = () => {
    const { agenda } = useData();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedAgenda, setSelectedAgenda] = useState<Agenda | null>(null);

    const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());
    const endDate = new Date(endOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay()));

    const dates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
    }

    const getEventsForDate = (date: Date): Agenda[] => {
        return agenda.filter(a => 
            a.date.getFullYear() === date.getFullYear() &&
            a.date.getMonth() === date.getMonth() &&
            a.date.getDate() === date.getDate()
        );
    };

    const changeMonth = (offset: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };
    
    return (
        <div className="container mx-auto py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100">&larr;</button>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100">&rarr;</button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600">
                    {daysOfWeek.map(day => <div key={day} className="py-2">{day}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {dates.map((date, index) => {
                        const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                        const isToday = new Date().toDateString() === date.toDateString();
                        const events = getEventsForDate(date);
                        return (
                            <div 
                                key={index} 
                                className={`h-24 md:h-32 border rounded-md p-2 flex flex-col ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}`}
                            >
                                <span className={`font-bold ${isToday ? 'bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center' : ''}`}>
                                    {date.getDate()}
                                </span>
                                <div className="mt-1 overflow-y-auto text-xs">
                                    {events.map(event => (
                                        <div 
                                            key={event.id}
                                            onClick={() => setSelectedAgenda(event)}
                                            className="bg-purple-100 text-purple-800 p-1 rounded mb-1 cursor-pointer hover:bg-purple-200 truncate"
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {selectedAgenda && (
                <Modal isOpen={!!selectedAgenda} onClose={() => setSelectedAgenda(null)} title={selectedAgenda.title}>
                    <p className="text-lg text-gray-600 mb-2"><strong>Tanggal:</strong> {selectedAgenda.date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-gray-700">{selectedAgenda.description}</p>
                </Modal>
            )}
        </div>
    );
};


const AgendaPage: React.FC = () => {
    return (
        <div>
            <PageHeader />
            <Calendar />
        </div>
    );
};

export default AgendaPage;
