
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VotingProvider } from './context/VotingContext';
import { DataProvider } from './context/DataContext';

import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';

import HomePage from './pages/public/HomePage';
import ProfilePage from './pages/public/ProfilePage';
import JurusanPage from './pages/public/JurusanPage';
import BeritaPage from './pages/public/BeritaPage';
import GaleriPage from './pages/public/GaleriPage';
import PpdbPage from './pages/public/PpdbPage';
import KontakPage from './pages/public/KontakPage';
import EVotingLoginPage from './pages/public/EVotingLoginPage';
import EVotingBallotPage from './pages/public/EVotingBallotPage';
import BeritaDetailPage from './pages/public/BeritaDetailPage';
import AgendaPage from './pages/public/AgendaPage'; // Import baru

import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ManageKontenPage from './pages/admin/ManageKontenPage';
import ManageAgendaPage from './pages/admin/ManageAgendaPage'; // Import baru
import ManagePemilihanPage from './pages/admin/ManagePemilihanPage';
import BuatSesiPemilihanPage from './pages/admin/BuatSesiPemilihanPage';
import DetailSesiPemilihanPage from './pages/admin/DetailSesiPemilihanPage';

const AdminRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="konten" element={<ManageKontenPage />} />
        <Route path="agenda" element={<ManageAgendaPage />} /> {/* Route baru */}
        <Route path="pemilihan" element={<ManagePemilihanPage />} />
        <Route path="pemilihan/baru" element={<BuatSesiPemilihanPage />} />
        <Route path="pemilihan/:id" element={<DetailSesiPemilihanPage />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <VotingProvider>
          <HashRouter>
            <Routes>
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
              
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="profil" element={<ProfilePage />} />
                <Route path="jurusan" element={<JurusanPage />} />
                <Route path="berita" element={<BeritaPage />} />
                <Route path="berita/:id" element={<BeritaDetailPage />} />
                <Route path="agenda" element={<AgendaPage />} /> {/* Route baru */}
                <Route path="galeri" element={<GaleriPage />} />
                <Route path="ppdb" element={<PpdbPage />} />
                <Route path="kontak" element={<KontakPage />} />
                <Route path="e-voting" element={<EVotingLoginPage />} />
                <Route path="e-voting/ballot" element={<EVotingBallotPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </VotingProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
