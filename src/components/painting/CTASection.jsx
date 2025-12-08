import { Phone } from 'lucide-react';

const CTASection = () => {
    const stats = [
        { number: '500+', label: 'Proyectos Completados' },
        { number: '98%', label: 'Satisfacción del Cliente' },
        { number: '20+', label: 'Años de Experiencia' }
    ];

    return (
        <section className="relative py-16 sm:py-20 md:py-24 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

            <div className="absolute inset-0 opacity-10 bg-pattern"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                    ¿Listo para tu <span className="text-blue-400">Transformación</span>?
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 opacity-90 leading-relaxed px-4">
                    Contáctanos hoy y recibe una cotización personalizada sin compromiso
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                    <a
                        href="/?scrollTo=contacto"
                        className="px-8 sm:px-10 py-4 sm:py-5 bg-blue-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                    >
                        Solicitar Cotización Gratis
                    </a>

                    <a
                        href="tel:+573001234567"
                        className="px-8 sm:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Phone className="w-5 h-5" />
                        Llamar Ahora
                    </a>
                </div>

                <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-14 md:mt-16 pt-8 sm:pt-10 md:pt-12 border-t border-white/30">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-1 sm:mb-2">
                                {stat.number}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-300">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CTASection;