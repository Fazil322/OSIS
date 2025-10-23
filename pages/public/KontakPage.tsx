
import React from 'react';

const PageHeader: React.FC = () => (
    <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Hubungi Kami</h1>
        </div>
    </div>
);

const KontakPage: React.FC = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan segera merespons.');
        e.currentTarget.reset(); // Reset form fields
    };

    return (
        <div>
            <PageHeader />
            <div className="container mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Informasi Kontak</h2>
                    <div className="space-y-4 text-gray-700">
                        <p><strong>Alamat:</strong> Jl. Raya Tambakreja, Kedungreja, Cilacap, Jawa Tengah 53263</p>
                        <p><strong>Telepon:</strong> (0280) 123-456</p>
                        <p><strong>Email:</strong> info@smklppmri2.sch.id</p>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Lokasi Sekolah</h3>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.918939227653!2d108.8286088147768!3d-7.583594194532889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e650d30c451523d%3A0x6b876483505d9a5b!2sSMK%20LPPMRI%202%20KEDUNGREJA!5e0!3m2!1sen!2sid!4v1690552781491!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Kirim Pesan</h2>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                            <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
                            <textarea id="message" rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                            Kirim Pesan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default KontakPage;
