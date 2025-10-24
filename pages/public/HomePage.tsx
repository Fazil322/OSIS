import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const HeroSection: React.FC = () => (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center animate-bg-zoom-in" 
            style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white p-4 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Selamat Datang di SMK LPPMRI 2 Kedungreja</h1>
                <p className="text-lg md:text-xl mb-8">Mencetak Generasi Unggul, Kreatif, dan Berkarakter</p>
                <Link to="/ppdb" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                    Penerimaan Siswa Baru
                </Link>
            </div>
        </div>
    </div>
);

const SambutanKepsek: React.FC = () => (
    <div className="bg-white py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 flex justify-center">
                <div className="relative w-64">
                    <img src="https://picsum.photos/seed/kepsek/400/600" alt="Kepala Sekolah" className="rounded-lg h-80 w-64 object-cover shadow-2xl z-10 relative"/>
                    <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-500 rounded-lg transform -rotate-3"></div>
                </div>
            </div>
            <div className="md:w-2/3 mt-8 md:mt-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Sambutan Kepala Sekolah</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                    Assalamualaikum Warahmatullahi Wabarakatuh. Puji syukur kami panjatkan kehadirat Tuhan Yang Maha Esa atas rahmat dan karunia-Nya, sehingga kami berhasil membangun website resmi SMK LPPMRI 2 Kedungreja. Kami berharap website ini dapat menjadi jembatan informasi antara sekolah dengan siswa, orang tua, dan masyarakat luas.
                </p>
            </div>
        </div>
    </div>
);

const StatsCounter: React.FC = () => {
    const stats = [
        { value: 500, label: 'Siswa', suffix: '+' },
        { value: 45, label: 'Guru & Staf' },
        { value: 2, label: 'Program Keahlian' },
        { value: 10, label: 'Ekstrakurikuler', suffix: '+' },
    ];

    const StatItem: React.FC<{ end: number; label: string; suffix?: string }> = ({ end, label, suffix }) => {
        const [count, setCount] = useState(0);
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        let start = 0;
                        const duration = 2000;
                        const stepTime = Math.abs(Math.floor(duration / end));
                        const timer = setInterval(() => {
                            start += 1;
                            setCount(start);
                            if (start === end) {
                                clearInterval(timer);
                            }
                        }, stepTime);
                    }
                },
                { threshold: 0.5 }
            );
            if (ref.current) {
                observer.observe(ref.current);
            }
            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }, [end]);

        return (
            <div ref={ref} className="text-center">
                <p className="text-5xl font-bold text-blue-600">{count}{suffix}</p>
                <p className="text-lg text-gray-600 mt-2">{label}</p>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <StatItem key={stat.label} end={stat.value} label={stat.label} suffix={stat.suffix} />
                    ))}
                </div>
            </div>
        </div>
    );
};


const BeritaTerbaru: React.FC = () => {
    const { berita } = useData();
    return (
        <div className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Berita & Informasi Terbaru</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {berita.slice(0, 3).map((item, index) => (
                    <div 
                        key={item.id} 
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <div className="overflow-hidden">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"/>
                        </div>
                        <div className="p-6">
                            <span className="text-sm text-gray-500">{item.date}</span>
                            <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                            <p className="text-gray-600 mb-4">{item.excerpt}</p>
                            <Link to={`/berita/${item.id}`} className="text-blue-600 font-semibold hover:underline">Baca Selengkapnya &rarr;</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EkstrakurikulerUnggulan: React.FC = () => {
    const { ekstrakurikuler } = useData();
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ekstrakurikuler Unggulan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ekstrakurikuler.slice(0, 4).map((item, index) => (
                        <div 
                            key={item.id} 
                            className="group bg-gray-50 rounded-lg shadow-md overflow-hidden text-center transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                             <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity" />
                             <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                             </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/ekstrakurikuler" className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300">
                        Lihat Semua Ekskul &rarr;
                    </Link>
                 </div>
            </div>
        </div>
    );
};

const TestimoniAlumni: React.FC = () => {
    const { alumni } = useData();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (alumni.length > 1) {
            const timer = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % alumni.length);
            }, 5000); // Change testimonial every 5 seconds
            return () => clearTimeout(timer);
        }
    }, [currentIndex, alumni.length]);

    if (alumni.length === 0) return null;

    return (
        <div className="bg-gray-800 text-white py-20 overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-8">Kata Alumni</h2>
                <div className="relative max-w-3xl mx-auto h-64">
                    {alumni.map((item, index) => (
                        <div
                            key={item.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-400"/>
                            <p className="text-lg italic text-gray-300">"{item.story}"</p>
                            <p className="mt-4 font-semibold text-xl">{item.name}</p>
                            <p className="text-blue-400">Lulusan Tahun {item.graduationYear}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link to="/alumni" className="text-white font-semibold hover:underline">
                        Lihat Lebih Banyak Cerita &rarr;
                    </Link>
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
        <StatsCounter />
        <BeritaTerbaru />
        <EkstrakurikulerUnggulan />
        <TestimoniAlumni />
    </div>
  );
};

export default HomePage;