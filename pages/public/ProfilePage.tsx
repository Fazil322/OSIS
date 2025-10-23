
import React from 'react';
import { Link } from 'react-router-dom';
import { mockGuru } from '../../services/mockData';
import { Guru } from '../../types';

const PageHeader: React.FC = () => (
    <div className="bg-gray-700 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Profil Sekolah</h1>
        </div>
    </div>
);

const VisiMisi: React.FC = () => (
    <div className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Visi, Misi, dan Tujuan</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-semibold text-blue-600 mb-2">Visi</h3>
                    <p className="text-gray-600 leading-relaxed">Terwujudnya lembaga pendidikan dan pelatihan kejuruan yang menghasilkan tamatan yang beriman, bertaqwa, berakhlak mulia, kompeten, dan mampu bersaing di era global.</p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-blue-600 mb-2">Misi</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Meningkatkan keimanan dan ketaqwaan terhadap Tuhan Yang Maha Esa.</li>
                        <li>Mengembangkan kurikulum yang adaptif dan relevan dengan dunia kerja.</li>
                        <li>Menyelenggarakan pembelajaran berbasis kompetensi dan produksi.</li>
                        <li>Meningkatkan kualitas sumber daya manusia melalui sertifikasi kompetensi.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const GuruCard: React.FC<{ guru: Guru }> = ({ guru }) => (
    <div className="bg-white rounded-lg shadow-md text-center p-6">
        <img src={guru.imageUrl} alt={guru.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
        <h3 className="text-xl font-semibold text-gray-800">{guru.name}</h3>
        <p className="text-blue-600">{guru.subject}</p>
    </div>
);

const TenagaPendidik: React.FC = () => (
    <div className="py-16 px-6">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Pimpinan & Sebagian Pendidik</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {mockGuru.slice(0, 4).map(guru => <GuruCard key={guru.id} guru={guru} />)}
            </div>
            <div className="text-center mt-12">
                <Link to="/guru" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
                    Lihat Semua Guru &rarr;
                </Link>
            </div>
        </div>
    </div>
);

const ProfilePage: React.FC = () => {
    return (
        <div>
            <PageHeader />
            <VisiMisi />
            <TenagaPendidik />
        </div>
    );
};

export default ProfilePage;
