
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Berita, Agenda } from '../types';
import { mockAgenda } from '../services/mockData';

const initialBerita: Berita[] = [
  {
    id: 1,
    title: 'Prestasi Gemilang Siswa SMK LPPMRI 2 di Lomba Kompetensi Siswa',
    excerpt: 'Siswa kami kembali mengukir prestasi di tingkat nasional...',
    content: 'Detail lengkap tentang prestasi siswa kami...',
    imageUrl: 'https://picsum.photos/seed/news1/800/600',
    date: '2024-07-28',
    category: 'Prestasi',
  },
  {
    id: 2,
    title: 'Kegiatan Class Meeting Semester Genap 2024',
    excerpt: 'Menjaga semangat sportivitas dan kebersamaan antar siswa...',
    content: 'Detail lengkap tentang kegiatan class meeting...',
    imageUrl: 'https://picsum.photos/seed/news2/800/600',
    date: '2024-07-25',
    category: 'Kegiatan',
  },
];


interface DataContextType {
  berita: Berita[];
  agenda: Agenda[];
  addBerita: (berita: Omit<Berita, 'id'|'date'|'imageUrl'|'excerpt'>) => void;
  updateBerita: (updatedBerita: Berita) => void;
  deleteBerita: (id: number) => void;
  addAgenda: (agenda: Omit<Agenda, 'id'>) => void;
  updateAgenda: (updatedAgenda: Agenda) => void;
  deleteAgenda: (id: number) => void;
  getBeritaById: (id: number) => Berita | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [berita, setBerita] = useState<Berita[]>(initialBerita);
  const [agenda, setAgenda] = useState<Agenda[]>(mockAgenda);

  const getBeritaById = (id: number) => berita.find(b => b.id === id);

  const addBerita = (newBeritaData: Omit<Berita, 'id'|'date'|'imageUrl'|'excerpt'>) => {
    const newBerita: Berita = {
      ...newBeritaData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      imageUrl: `https://picsum.photos/seed/news${Date.now()}/800/600`,
      excerpt: newBeritaData.content.substring(0, 100) + '...'
    };
    setBerita(prev => [newBerita, ...prev]);
  };

  const updateBerita = (updatedBerita: Berita) => {
    setBerita(prev => prev.map(b => b.id === updatedBerita.id ? {...updatedBerita, excerpt: updatedBerita.content.substring(0, 100) + '...'} : b));
  };

  const deleteBerita = (id: number) => {
    setBerita(prev => prev.filter(b => b.id !== id));
  };
  
  const addAgenda = (newAgendaData: Omit<Agenda, 'id'>) => {
    const newAgenda: Agenda = { ...newAgendaData, id: Date.now() };
    setAgenda(prev => [newAgenda, ...prev].sort((a,b) => a.date.getTime() - b.date.getTime()));
  };

  const updateAgenda = (updatedAgenda: Agenda) => {
    setAgenda(prev => prev.map(a => a.id === updatedAgenda.id ? updatedAgenda : a).sort((a,b) => a.date.getTime() - b.date.getTime()));
  };
  
  const deleteAgenda = (id: number) => {
    setAgenda(prev => prev.filter(a => a.id !== id));
  };

  return (
    <DataContext.Provider value={{ berita, agenda, addBerita, updateBerita, deleteBerita, getBeritaById, addAgenda, updateAgenda, deleteAgenda }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
