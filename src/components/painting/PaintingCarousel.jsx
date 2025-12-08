import { useState, useEffect } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    Star, 
    Award, 
    Zap,
    Layers,
    Paintbrush,
    Palette,
    FileText,
    CheckCircle2,
    Clock,
    Shield,
    Sparkles
} from 'lucide-react';
import { useChatContext } from '../../hooks/useChatContext';

const PaintingCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            title: 'Vinilo',
            subtitle: 'Personalizado',
            description: 'Protección UV de alto rendimiento con acabados espectaculares. Más de 300 opciones de colores y texturas disponibles.',
            badge: 'Más Popular',
            badgeIcon: <Star className="w-4 h-4" />,
            badgeColor: 'bg-blue-600',
            price: '$1.200.000',
            priceColor: 'text-blue-600',
            buttonColor: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
            buttonText: 'Cotizar Ahora',
            gradient: 'from-blue-50 via-indigo-50 to-white',
            iconBg: 'from-blue-600 to-indigo-600',
            mainIcon: Layers,
            iconTitle: 'Vinilo Premium',
            iconSubtitle: 'Acabado profesional y de alta calidad',
            features: [
                { icon: Shield, title: 'Durabilidad', description: '5 años garantía' },
                { icon: Clock, title: 'Instalación', description: '2-3 días hábiles' },
                { icon: Sparkles, title: 'Protección UV', description: 'Incluida' },
                { icon: CheckCircle2, title: 'Reversible', description: 'Sin dañar pintura' }
            ],
        },
        {
            id: 2,
            title: 'Pintura',
            subtitle: 'Personalizada',
            description: 'Tecnología de última generación con 500+ opciones de color. Acabados mate, brillante o satinado de calidad automotriz.',
            badge: 'Premium',
            badgeIcon: <Award className="w-4 h-4" />,
            badgeColor: 'bg-gradient-to-r from-gray-800 to-gray-900',
            price: '$3.200.000',
            priceColor: 'text-gray-900',
            buttonColor: 'from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black',
            buttonText: 'Ver Catálogo',
            gradient: 'from-gray-50 via-slate-50 to-white',
            iconBg: 'from-gray-800 to-gray-900',
            mainIcon: Paintbrush,
            iconTitle: 'Pintura Premium',
            iconSubtitle: 'Acabado profesional',
            features: [
                { icon: Palette, title: 'Catálogo', description: '500+ colores' },
                { icon: Clock, title: 'Tiempo', description: '5-7 días hábiles' },
                { icon: Shield, title: 'Garantía', description: '3 años' },
                { icon: Sparkles, title: 'Acabados', description: 'Mate/Brillante' }
            ]
        },
        {
            id: 3,
            title: 'Aerografía',
            subtitle: 'Artística',
            description: 'Arte personalizado creado por artistas certificados. Convierte tu vehículo en una obra maestra rodante única.',
            badge: 'Exclusivo',
            badgeIcon: <Star className="w-4 h-4" />,
            badgeColor: 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500',
            price: '$5.200.000',
            priceColor: 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent',
            buttonColor: 'from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600',
            buttonText: 'Consultar Artista',
            gradient: 'from-orange-50 via-red-50 to-pink-50',
            iconBg: 'from-orange-500 via-red-500 to-pink-500',
            mainIcon: Palette,
            iconTitle: 'Arte Personalizado',
            iconSubtitle: 'Diseños únicos',
            features: [
                { icon: Sparkles, title: 'Diseño', description: '100% único' },
                { icon: Clock, title: 'Tiempo', description: '7-10 días' },
                { icon: Award, title: 'Artistas', description: 'Certificados' },
                { icon: Shield, title: 'Protección', description: 'Sellado premium' }
            ]
        },
        {
            id: 4,
            title: 'Rotulación',
            subtitle: 'Comercial',
            description: 'Convierte tu flota en publicidad móvil efectiva. Diseño corporativo profesional con materiales de larga duración.',
            badge: 'Empresarial',
            badgeIcon: <Zap className="w-4 h-4" />,
            badgeColor: 'bg-gradient-to-r from-blue-600 to-cyan-600',
            price: '$2.000.000',
            priceColor: 'text-blue-600',
            buttonColor: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
            buttonText: 'Cotizar Flota',
            gradient: 'from-blue-50 via-cyan-50 to-white',
            iconBg: 'from-blue-600 to-cyan-600',
            mainIcon: FileText,
            iconTitle: 'Marketing Móvil',
            iconSubtitle: 'Para empresas',
            features: [
                { icon: Palette, title: 'Diseño', description: 'Corporativo incluido' },
                { icon: Clock, title: 'Instalación', description: '24-48 horas' },
                { icon: Sparkles, title: 'Material', description: 'Reflectivo opcional' },
                { icon: Award, title: 'Descuentos', description: 'Para flotas' }
            ]
        }
    ];

    const { openChat } = useChatContext();
    const totalSlides = slides.length;

    useEffect(() => {
        if (isAutoPlaying) {
            const interval = setInterval(() => {
                nextSlide();
            }, 7000);
            return () => clearInterval(interval);
        }
    }, [currentSlide, isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section id="productos" className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-gray-100 via-white to-gray-100 mb-20 sm:mb-32 md:mb-40">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado mejorado */}
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200/50 mb-4 sm:mb-6">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                            Portafolio de Servicios
                        </span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                        Servicios <span className="bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 text-transparent bg-clip-text">Especializados</span>
                    </h2>
                    
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                        Cada proyecto es único. Conoce nuestros servicios premium de customización vehicular
                    </p>
                </div>

                <div className="relative">
                    {/* Carrusel Container */}
                    <div
                        className="carousel-container relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        <div
                            className="carousel-track flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {slides.map((slide) => {
                                const MainIcon = slide.mainIcon;
                                return (
                                    <div key={slide.id} className="carousel-slide min-w-full">
                                        <div className={`relative h-[550px] sm:h-[600px] md:h-[650px] bg-gradient-to-br ${slide.gradient}`}>
                                            <div className="absolute inset-0 grid md:grid-cols-2">
                                                {/* Sección del icono con efectos mejorados */}
                                                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                                    {/* Círculos decorativos de fondo */}
                                                    <div className="absolute inset-0 overflow-hidden">
                                                        <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br ${slide.iconBg} rounded-full opacity-10 blur-3xl animate-pulse`}></div>
                                                        <div className={`absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br ${slide.iconBg} rounded-full opacity-10 blur-2xl animate-pulse delay-1000`}></div>
                                                    </div>
                                                    
                                                    <div className="relative z-10 text-center">
                                                        {/* Icono principal con animación */}
                                                        <div className={`w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br ${slide.iconBg} rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500 group`}>
                                                            <MainIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                                            
                                                            {/* Anillo decorativo */}
                                                            <div className={`absolute inset-0 border-4 border-dashed border-white/30 rounded-full scale-125 group-hover:scale-150 group-hover:rotate-180 transition-all duration-700`}></div>
                                                        </div>
                                                        
                                                        <p className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-2">
                                                            {slide.iconTitle}
                                                        </p>
                                                        <p className="text-gray-600 text-base sm:text-lg md:text-xl px-4">
                                                            {slide.iconSubtitle}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Contenido mejorado */}
                                                <div className="flex items-center p-6 sm:p-8 md:p-10 lg:p-12 relative z-10 bg-white/50 backdrop-blur-sm">
                                                    <div className="w-full">
                                                        {/* Badge mejorado */}
                                                        <div className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 ${slide.badgeColor} text-white rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 shadow-lg animate-pulse-subtle`}>
                                                            {slide.badgeIcon}
                                                            {slide.badge}
                                                        </div>

                                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-gray-900 leading-tight">
                                                            {slide.title}
                                                            <span className="block text-blue-600">{slide.subtitle}</span>
                                                        </h3>

                                                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                                                            {slide.description}
                                                        </p>

                                                        {/* Features con iconos de Lucide */}
                                                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                                                            {slide.features.map((feature, index) => {
                                                                const FeatureIcon = feature.icon;
                                                                return (
                                                                    <div key={index} className="group flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl hover:bg-white/80 transition-all duration-300">
                                                                        <div className={`w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br ${slide.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                                                            <FeatureIcon className="w-5 h-5 text-white" strokeWidth={2} />
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-bold text-gray-900 text-sm sm:text-base">{feature.title}</p>
                                                                            <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Precio y CTA mejorados */}
                                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 border-t-2 rounded-md">
                                                            <div className="flex-shrink-0">
                                                                <p className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">Desde</p>
                                                                <p className={`text-3xl sm:text-4xl font-extrabold ${slide.priceColor}`}>{slide.price}</p>
                                                                <p className="text-xs sm:text-sm text-gray-500 font-medium">COP</p>
                                                            </div>
                                                            <button
                                                                onClick={() => openChat(true)}
                                                                className={`flex-1 w-full sm:w-auto group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${slide.buttonColor} text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center text-sm sm:text-base`}
                                                            >
                                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                                                    {slide.buttonText}
                                                                </span>
                                                                
                                                                {/* Efecto de brillo en hover */}
                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Controles mejorados */}
                    <button
                        onClick={prevSlide}
                        className="carousel-btn absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md hover:bg-blue-600 text-gray-800 hover:text-white w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 border-2 border-gray-100 hover:border-transparent"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="carousel-btn absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md hover:bg-blue-600 text-gray-800 hover:text-white w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 border-2 border-gray-100 hover:border-transparent"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
                    </button>

                    {/* Indicadores mejorados */}
                    <div className="flex justify-center mt-8 sm:mt-10 space-x-2 sm:space-x-3 overflow-x-auto pb-2 px-4">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => goToSlide(index)}
                                className="carousel-indicator group flex-shrink-0"
                            >
                                <div className={`relative w-14 sm:w-16 md:w-20 h-1.5 rounded-full transition-all duration-500 overflow-hidden ${
                                    currentSlide === index 
                                        ? 'bg-blue-600 shadow-lg' 
                                        : 'bg-gray-300 group-hover:bg-gray-400'
                                }`}>
                                    {currentSlide === index && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                                    )}
                                </div>
                                <span className={`block text-xs sm:text-sm mt-2 font-semibold transition-colors duration-300 ${
                                    currentSlide === index ? 'text-blue-600' : 'text-gray-600'
                                }`}>
                                    {slide.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaintingCarousel;