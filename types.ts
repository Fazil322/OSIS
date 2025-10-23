
export interface NavLink {
  name: string;
  path: string;
}

export interface Berita {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface Agenda {
  id: number;
  title: string;
  date: Date;
  description: string;
}

export interface Guru {
  id: number;
  name: string;
  subject: string;
  imageUrl: string;
}

export interface Kandidat {
  id: string;
  name: string;
  photoUrl: string;
  visi: string;
  misi: string;
  voteCount: number;
  nomorUrut: number;
}

export interface SesiPemilihan {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'Aktif' | 'Tidak Aktif' | 'Selesai';
  kandidat: Kandidat[];
  voterCodes: VoterCode[];
}

export interface VoterCode {
  code: string;
  used: boolean;
}
