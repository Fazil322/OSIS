
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { SesiPemilihan, Kandidat, VoterCode } from '../types';
import { mockSesiPemilihan } from '../services/mockData';

interface VotingContextType {
  sesiPemilihan: SesiPemilihan[];
  activeVoterCode: string | null;
  getSesiById: (id: string) => SesiPemilihan | undefined;
  addSesi: (sesi: Omit<SesiPemilihan, 'id' | 'kandidat' | 'voterCodes' | 'status'>) => SesiPemilihan;
  updateSesi: (sesi: SesiPemilihan) => void;
  addKandidat: (sesiId: string, kandidat: Omit<Kandidat, 'id' | 'voteCount'>) => void;
  updateKandidat: (sesiId: string, kandidat: Kandidat) => void;
  deleteKandidat: (sesiId: string, kandidatId: string) => void;
  generateVoterCodes: (sesiId: string, count: number) => VoterCode[];
  validateVoterCode: (code: string) => { valid: boolean; message: string; sesi: SesiPemilihan | null };
  setVoter: (code: string) => void;
  castVote: (sesiId: string, kandidatId: string) => boolean;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sesiPemilihan, setSesiPemilihan] = useState<SesiPemilihan[]>(mockSesiPemilihan);
  const [activeVoterCode, setActiveVoterCode] = useState<string | null>(sessionStorage.getItem('activeVoterCode'));

  const getSesiById = useCallback((id: string) => {
    return sesiPemilihan.find(s => s.id === id);
  }, [sesiPemilihan]);

  const addSesi = (sesiData: Omit<SesiPemilihan, 'id' | 'kandidat' | 'voterCodes' | 'status'>): SesiPemilihan => {
    const newSesi: SesiPemilihan = {
      ...sesiData,
      id: `sesi-${Date.now()}`,
      kandidat: [],
      voterCodes: [],
      status: 'Tidak Aktif'
    };
    setSesiPemilihan(prev => [...prev, newSesi]);
    return newSesi;
  };
  
  const updateSesi = (updatedSesi: SesiPemilihan) => {
    setSesiPemilihan(prev => prev.map(s => s.id === updatedSesi.id ? updatedSesi : s));
  };
  
  const addKandidat = (sesiId: string, kandidatData: Omit<Kandidat, 'id' | 'voteCount'>) => {
    setSesiPemilihan(prev => prev.map(sesi => {
      if (sesi.id === sesiId) {
        const newKandidat: Kandidat = {
          ...kandidatData,
          id: `kandidat-${Date.now()}`,
          voteCount: 0,
        };
        return { ...sesi, kandidat: [...sesi.kandidat, newKandidat] };
      }
      return sesi;
    }));
  };

  const updateKandidat = (sesiId: string, updatedKandidat: Kandidat) => {
    setSesiPemilihan(prev => prev.map(sesi => {
        if (sesi.id === sesiId) {
            const updatedKandidatList = sesi.kandidat.map(k => k.id === updatedKandidat.id ? updatedKandidat : k);
            return { ...sesi, kandidat: updatedKandidatList };
        }
        return sesi;
    }));
  };

  const deleteKandidat = (sesiId: string, kandidatId: string) => {
    setSesiPemilihan(prev => prev.map(sesi => {
        if (sesi.id === sesiId) {
            return { ...sesi, kandidat: sesi.kandidat.filter(k => k.id !== kandidatId) };
        }
        return sesi;
    }));
  };


  const generateVoterCodes = (sesiId: string, count: number): VoterCode[] => {
    const newCodes: VoterCode[] = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < count; i++) {
        let result = '';
        for (let j = 0; j < 6; j++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        newCodes.push({ code: result, used: false });
    }

    setSesiPemilihan(prev => prev.map(sesi => {
      if (sesi.id === sesiId) {
        return { ...sesi, voterCodes: [...sesi.voterCodes, ...newCodes] };
      }
      return sesi;
    }));
    return newCodes;
  };
  
  const validateVoterCode = (code: string): { valid: boolean; message: string, sesi: SesiPemilihan | null } => {
    const now = new Date();
    for (const sesi of sesiPemilihan) {
        if (sesi.status === 'Aktif' && now >= sesi.start && now <= sesi.end) {
            const voterCode = sesi.voterCodes.find(vc => vc.code === code);
            if (voterCode) {
                if (voterCode.used) {
                    return { valid: false, message: "Kode pemilih sudah digunakan.", sesi: null };
                }
                return { valid: true, message: "Kode valid.", sesi };
            }
        }
    }
    return { valid: false, message: "Kode pemilih tidak valid atau sesi pemilihan tidak aktif.", sesi: null };
  };

  const setVoter = (code: string) => {
      setActiveVoterCode(code);
      sessionStorage.setItem('activeVoterCode', code);
  };

  const castVote = (sesiId: string, kandidatId: string): boolean => {
    if (!activeVoterCode) return false;

    let success = false;
    setSesiPemilihan(prev => prev.map(sesi => {
      if (sesi.id === sesiId) {
        const codeIndex = sesi.voterCodes.findIndex(vc => vc.code === activeVoterCode && !vc.used);
        if (codeIndex !== -1) {
          const updatedKandidat = sesi.kandidat.map(k => 
            k.id === kandidatId ? { ...k, voteCount: k.voteCount + 1 } : k
          );
          const updatedVoterCodes = [...sesi.voterCodes];
          updatedVoterCodes[codeIndex] = { ...updatedVoterCodes[codeIndex], used: true };
          success = true;
          return { ...sesi, kandidat: updatedKandidat, voterCodes: updatedVoterCodes };
        }
      }
      return sesi;
    }));
    
    if (success) {
      setActiveVoterCode(null);
      sessionStorage.removeItem('activeVoterCode');
    }
    return success;
  };


  return (
    <VotingContext.Provider value={{ sesiPemilihan, activeVoterCode, getSesiById, addSesi, updateSesi, addKandidat, updateKandidat, deleteKandidat, generateVoterCodes, validateVoterCode, setVoter, castVote }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (context === undefined) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};
