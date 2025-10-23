
import React from 'react';
import { NavLink as RouterNavLink, Outlet, useNavigate } from 'react-router-dom';
import { NavLink as NavLinkType } from '../../types';
import { useAuth } from '../../context/AuthContext';

const adminNavLinks: NavLinkType[] = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Manajemen Konten', path: '/admin/konten' },
  { name: 'Manajemen Agenda', path: '/admin/agenda' },
  { name: 'Manajemen Pemilihan', path: '/admin/pemilihan' },
];

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-gray-800 text-white flex flex-col">
    <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
      Admin Panel
    </div>
    <nav className="flex-1 px-4 py-6 space-y-2">
      {adminNavLinks.map((link) => (
        <RouterNavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          {link.name}
        </RouterNavLink>
      ))}
    </nav>
  </aside>
);

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-white shadow-sm flex-1">
      <div className="h-16 flex items-center justify-end px-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
