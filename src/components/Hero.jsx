import {
    Wrench, Car, Settings, Gauge, MapPin, MessageCircle,
    Shield, Clock, CheckCircle, Star
} from 'lucide-react';
import { useChatContext } from '../hooks/useChatContext';

const Hero = ({
    location = "Barranquilla, Colombia",
    badge = "Taller Certificado",
    title = "Servicio Automotriz",
    highlightedTitle = "Profesional",
    subtitle = "y Confiable",
    description = "Expertos en diagnóstico, mantenimiento y reparación de vehículos. Con tecnología de punta y mecánicos certificados, tu auto está en las mejores manos.",
    features = [
        { icon: Shield, title: "Garantía Total", subtitle: "En todos los trabajos" },
        { icon: Clock, title: "Atención Rápida", subtitle: "Servicio express disponible" }
    ],
    primaryButton = { text: "Agendar Cita" },
    secondaryButton = { text: "Ver Servicios", href: "#servicios" },
    services = [
        {
            icon: Wrench,
            title: "Revisión General",
            description: "Inspección de 50 puntos",
            price: "Desde $119.000"
        },
        {
            icon: Settings,
            title: "Diagnóstico Motor",
            description: "Con escáner profesional",
            price: "Desde $121.000"
        },
        {
            icon: Gauge,
            title: "Mantenimiento",
            description: "Por kilometraje",
            price: "Desde $250.000"
        }
    ],
    backgroundImage = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000",
    trustBadge = "Taller Certificado con 20+ Años de Experiencia",
    stats = [
        { number: "5000+", label: "Autos Reparados" },
        { number: "98%", label: "Satisfacción" },
        { number: "20+", label: "Años" }
    ]
}) => {
    const { openChat } = useChatContext();

    return (
        <>
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
                {/* Patrón de fondo sutil */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                </div>

                {/* Imagen de fondo con overlay */}
                <div className="absolute inset-0 opacity-20">
                    <img src={backgroundImage} alt="Taller mecánico" className="w-full h-full object-cover" />
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Columna izquierda: Información */}
                        <div className="text-white">
                            {/* Breadcrumb/Ubicación */}
                            <div className="flex items-center gap-2 text-sm text-blue-300 mb-6">
                                <MapPin className="w-4 h-4" />
                                <span>{location}</span>
                                <span className="mx-2">•</span>
                                <span>{badge}</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                {title} <br />
                                <span className="text-blue-400">{highlightedTitle}</span>
                                {subtitle && <><br />{subtitle}</>}
                            </h1>

                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                {description}
                            </p>

                            {/* Características destacadas */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                {features.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{feature.title}</p>
                                                <p className="text-sm text-gray-400">{feature.subtitle}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    onClick={() => openChat(true)}
                                    className="relative overflow-hidden cursor-pointer px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-xl text-center group"
                                >
                                    <span className="relative flex items-center justify-center gap-2">
                                        <MessageCircle className="w-5 h-5" />
                                        {primaryButton.text}
                                    </span>
                                </a>

                                <a
                                    href={secondaryButton.href}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 text-center"
                                >
                                    {secondaryButton.text}
                                </a>
                            </div>

                            {/* Estadísticas en mobile */}
                            <div className="grid grid-cols-3 gap-4 mt-10 md:hidden">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl font-bold text-blue-400 mb-1">{stat.number}</div>
                                        <div className="text-xs text-gray-300">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Columna derecha: Servicios destacados */}
                        <div className="hidden md:block">
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-white text-2xl font-bold">Servicios Populares</h3>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        <span className="text-white font-semibold">4.9</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {services.map((service, index) => {
                                        const Icon = service.icon;
                                        return (
                                            <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-semibold mb-1">{service.title}</h4>
                                                    <p className="text-gray-400 text-sm">{service.description}</p>
                                                </div>
                                                <span className="text-blue-400 font-bold text-sm text-right whitespace-nowrap">{service.price}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Badge de confianza */}
                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                                        <CheckCircle className="w-5 h-5 text-blue-400" />
                                        <span>{trustBadge}</span>
                                    </div>
                                </div>

                                {/* Estadísticas */}
                                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="text-center">
                                            <div className="text-3xl font-bold text-blue-400 mb-1">{stat.number}</div>
                                            <div className="text-xs text-gray-300">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave decorativo */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f3f4f6" />
                    </svg>
                </div>
            </section>
        </>
    );
};

export default Hero;