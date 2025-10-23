
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const HeroSection: React.FC = () => (
    <div className="relative bg-cover bg-center h-96 md:h-[500px]" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white p-4 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Selamat Datang di SMK LPPMRI 2 Kedungreja</h1>
                <p className="text-lg md:text-xl mb-8">Mencetak Generasi Unggul, Kreatif, dan Berkarakter</p>
                <Link to="/ppdb" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                    Penerimaan Siswa Baru
                </Link>
            </div>
        </div>
        <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
      `}</style>
    </div>
);

const SambutanKepsek: React.FC = () => (
    <div className="bg-white py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
                <img src="https://picsum.photos/seed/kepsek/400/400" alt="Kepala Sekolah" className="rounded-full h-48 w-48 object-cover shadow-lg"/>
            </div>
            <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Sambutan Kepala Sekolah</h2>
                <p className="text-gray-600 leading-relaxed">
                    Assalamualaikum Warahmatullahi Wabarakatuh. Puji syukur kami panjatkan kehadirat Tuhan Yang Maha Esa atas rahmat dan karunia-Nya, sehingga kami berhasil membangun website resmi SMK LPPMRI 2 Kedungreja. Kami berharap website ini dapat menjadi jembatan informasi antara sekolah dengan siswa, orang tua, dan masyarakat luas.
                </p>
            </div>
        </div>
    </div>
);

const BeritaTerbaru: React.FC = () => {
    const { berita } = useData();
    return (
        <div className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Berita & Informasi Terbaru</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {berita.slice(0, 3).map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <span className="text-sm text-gray-500">{item.date}</span>
                            <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-3">{item.title}</h3>
                            <p className="text-gray-600 mb-4">{item.excerpt}</p>
                            <Link to={`/berita/${item.id}`} className="text-blue-600 font-semibold hover:underline">Baca Selengkapnya</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AgendaKegiatan: React.FC = () => {
    const { agenda } = useData();
    const upcomingAgenda = agenda.filter(a => a.date >= new Date()).slice(0, 3);
    
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Agenda Kegiatan</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {upcomingAgenda.map(item => (
                        <div key={item.id} className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-5">
                            <div className="text-center bg-blue-600 text-white rounded-md p-3">
                                <span className="block text-3xl font-bold">{item.date.getDate()}</span>
                                <span className="block text-sm uppercase">{item.date.toLocaleString('id-ID', { month: 'short' })}</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const GaleriTerbaru: React.FC = () => {
    const images = ["lks1", "hutri1", "praktik1", "lks2"];
    return (
        <div className="py-16">
            <div className="container mx-auto px-6">
                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Galeri Terbaru</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map(seed => (
                        <div key={seed} className="overflow-hidden rounded-lg shadow-lg">
                            <img src={`https://picsum.photos/seed/${seed}/500/500`} alt="Galeri" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"/>
                        </div>
                    ))}
                 </div>
                 <div className="text-center mt-8">
                    <Link to="/galeri" className="text-blue-600 font-semibold hover:underline">Lihat Semua Galeri &rarr;</Link>
                 </div>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
  return (
    <div>
        <HeroSection />
        <SambutanKepsek />
        <BeritaTerbaru />
        <AgendaKegiatan />
        <GaleriTerbaru />
    </div>
  );
};

export default HomePage;
