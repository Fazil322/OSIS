import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, Outlet } from 'react-router-dom';
import { NavLink as NavLinkType } from '../../types';

const publicNavLinks: NavLinkType[] = [
  { name: 'Beranda', path: '/' },
  { name: 'Profil', path: '/profil' },
  { name: 'Jurusan', path: '/jurusan' },
  { name: 'Guru', path: '/guru' },
  { name: 'Ekstrakurikuler', path: '/ekstrakurikuler' },
  { name: 'Alumni', path: '/alumni'},
  { name: 'Berita', path: '/berita' },
  { name: 'Kalender', path: '/agenda' },
  { name: 'Galeri', path: '/galeri' },
  { name: 'PPDB', path: '/ppdb' },
  { name: 'Hubungi Kami', path: '/kontak' },
];

const Navbar: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${hasScrolled ? 'shadow-lg bg-white/95 backdrop-blur-sm' : 'bg-white shadow-md'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
           <svg className="h-12 w-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3.5a1 1 0 00.788 1.84L4 7.23V14a1 1 0 001 1h2a1 1 0 001-1v-2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5V14a1 1 0 001 1h2a1 1 0 001-1V7.23l.606.302a1 1 0 00.788-1.84l-7-3.5zM10 5.13L15 7.63v5.12h-2V10.5a1.5 1.5 0 00-3 0v2.25H5V7.63L10 5.13z"/>
          </svg>
          <h1 className="text-xl font-bold text-gray-800">SMK LPPMRI 2 KEDUNGREJA</h1>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          {publicNavLinks.map((link) => (
            <RouterNavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-gray-600 transition duration-300 group ${isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`
              }
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </RouterNavLink>
          ))}
          <RouterNavLink
              to="/e-voting"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition duration-300 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
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