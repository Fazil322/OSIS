
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const BeritaDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getBeritaById } = useData();
    const berita = getBeritaById(Number(id));

    if (!berita) {
        // Redirect to news page if article not found
        return <Navigate to="/berita" replace />;
    }

    return (
        <div>
            <div className="relative h-64 md:h-96">
                <img src={berita.imageUrl} alt={berita.title} className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end">
                    <div className="container mx-auto px-6 py-12">
                         <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{berita.title}</h1>
                         <div className="mt-4 text-gray-300">
                            <span>{berita.date}</span> | <span className="font-semibold">{berita.category}</span>
                         </div>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="prose lg:prose-xl text-gray-700 leading-relaxed">
                        <p>{berita.content}</p>
                        <p>
                           Ini adalah konten placeholder untuk artikel. Dalam aplikasi nyata, konten ini akan lebih panjang dan diformat menggunakan HTML dari editor WYSIWYG. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
                        </p>
                        <p>
                           Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.
                        </p>
                    </div>

                    <div className="mt-12 border-t pt-8">
                        <Link to="/berita" className="text-blue-600 hover:underline font-semibold">
                            &larr; Kembali ke semua berita
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeritaDetailPage;
