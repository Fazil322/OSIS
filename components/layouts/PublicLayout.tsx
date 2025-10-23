
import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, Outlet } from 'react-router-dom';
import { NavLink as NavLinkType } from '../../types';

const publicNavLinks: NavLinkType[] = [
  { name: 'Beranda', path: '/' },
  { name: 'Profil', path: '/profil' },
  { name: 'Jurusan', path: '/jurusan' },
  { name: 'Berita', path: '/berita' },
  { name: 'Agenda', path: '/agenda' },
  { name: 'Galeri', path: '/galeri' },
  { name: 'PPDB', path: '/ppdb' },
  { name: 'Hubungi Kami', path: '/kontak' },
];

const Navbar: React.FC = () => {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${hasShadow ? 'shadow-lg' : 'shadow-md'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="https://via.placeholder.com/40" alt="Logo Sekolah" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-gray-800">SMK LPPMRI 2 KEDUNGREJA</h1>
        </div>
        <nav className="hidden md:flex space-x-6 items-center">
          {publicNavLinks.map((link) => (
            <RouterNavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 transition duration-300 ${isActive ? 'text-blue-600 font-semibold' : ''}`
              }
            >
              {link.name}
            </RouterNavLink>
          ))}
          <RouterNavLink
              to="/e-voting"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
            >
              E-Voting
            </RouterNavLink>
        </nav>
        {/* Mobile Menu Button can be added here */}
      </div>
    </header>
  );
};


const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white">
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">SMK LPPMRI 2 KEDUNGREJA</h3>
          <p className="text-gray-400">Jl. Raya Tambakreja, Kedungreja, Cilacap, Jawa Tengah 53263</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
          <ul className="space-y-2">
            {publicNavLinks.map(link => (
                <li key={`footer-${link.name}`}>
                  <RouterNavLink to={link.path} className="text-gray-400 hover:text-white">
                    {link.name}
                  </RouterNavLink>
                </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
          <p className="text-gray-400">Email: info@smklppmri2.sch.id</p>
          <p className="text-gray-400">Telepon: (0280) 123-456</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} SMK LPPMRI 2 Kedungreja. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
