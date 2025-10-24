import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VotingProvider } from './context/VotingContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/common/ToastContainer';

import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';

import HomePage from './pages/public/HomePage';
import ProfilePage from './pages/public/ProfilePage';
import JurusanPage from './pages/public/JurusanPage';
import GuruPage from './pages/public/GuruPage';
import BeritaPage from './pages/public/BeritaPage';
import GaleriPage from './pages/public/GaleriPage';
import PpdbPage from './pages/public/PpdbPage';
import KontakPage from './pages/public/KontakPage';
import EVotingLoginPage from './pages/public/EVotingLoginPage';
import EVotingBallotPage from './pages/public/EVotingBallotPage';
import BeritaDetailPage from './pages/public/BeritaDetailPage';
import AgendaPage from './pages/public/AgendaPage';
import EkstrakurikulerPage from './pages/public/EkstrakurikulerPage';
import AlumniPage from './pages/public/AlumniPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ManageKontenPage from './pages/admin/ManageKontenPage';
import ManageAgendaPage from './pages/admin/ManageAgendaPage';
import ManagePemilihanPage from './pages/admin/ManagePemilihanPage';
import BuatSesiPemilihanPage from './pages/admin/BuatSesiPemilihanPage';
import DetailSesiPemilihanPage from './pages/admin/DetailSesiPemilihanPage';
import ManageEkstrakurikulerPage from './pages/admin/ManageEkstrakurikulerPage';
import ManageAlumniPage from './pages/admin/ManageAlumniPage';

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
        <Route path="kalender" element={<ManageAgendaPage />} />
        <Route path="ekstrakurikuler" element={<ManageEkstrakurikulerPage />} />
        <Route path="alumni" element={<ManageAlumniPage />} />
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
          <ToastProvider>
            <HashRouter>
              <Routes>
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="profil" element={<ProfilePage />} />
                  <Route path="jurusan" element={<JurusanPage />} />
                  <Route path="guru" element={<GuruPage />} />
                  <Route path="ekstrakurikuler" element={<EkstrakurikulerPage />} />
                  <Route path="alumni" element={<AlumniPage />} />
                  <Route path="berita" element={<BeritaPage />} />
                  <Route path="berita/:id" element={<BeritaDetailPage />} />
                  <Route path="agenda" element={<AgendaPage />} />
                  <Route path="galeri" element={<GaleriPage />} />
                  <Route path="ppdb" element={<PpdbPage />} />
                  <Route path="kontak" element={<KontakPage />} />
                  <Route path="e-voting" element={<EVotingLoginPage />} />
                  <Route path="e-voting/ballot" element={<EVotingBallotPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </HashRouter>
            <ToastContainer />
          </ToastProvider>
        </VotingProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;