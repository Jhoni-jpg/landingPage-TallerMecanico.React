import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const ContactInfo = () => {
    const contactItems = [
        {
            id: 1,
            icon: Clock,
            iconColor: 'from-blue-500 to-indigo-600',
            iconBg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
            iconStroke: 'stroke-blue-600',
            title: 'Horario de Atención',
            content: [
                'Lunes a Viernes: 8:00 AM - 6:00 PM',
                'Sábados: 8:00 AM - 2:00 PM',
                'Domingos: Cerrado'
            ],
            animationClass: 'sweep-right-1'
        },
        {
            id: 2,
            icon: Phone,
            iconColor: 'from-green-500 to-emerald-600',
            iconBg: 'bg-gradient-to-br from-green-50 to-emerald-50',
            iconStroke: 'stroke-green-600',
            title: 'Teléfono',
            content: [
                { text: '(305) 555-0123', style: 'text-lg sm:text-xl font-bold text-gray-900' },
                { text: 'WhatsApp disponible', style: 'text-xs sm:text-sm mt-1 text-green-600 font-medium flex items-center gap-1' }
            ],
            animationClass: 'sweep-right-2',
            badge: '24/7'
        },
        {
            id: 3,
            icon: MapPin,
            iconColor: 'from-red-500 to-rose-600',
            iconBg: 'bg-gradient-to-br from-red-50 to-rose-50',
            iconStroke: 'stroke-red-600',
            title: 'Ubicación',
            content: [
                'Calle 45 #23-67',
                'Barranquilla, Atlántico'
            ],
            link: {
                url: 'https://maps.app.goo.gl/wB2Pfg5MiPGkRnet9',
                text: 'Ver en Google Maps'
            },
            animationClass: 'sweep-right-3'
        },
        {
            id: 4,
            icon: Mail,
            iconColor: 'from-purple-500 to-violet-600',
            iconBg: 'bg-gradient-to-br from-purple-50 to-violet-50',
            iconStroke: 'stroke-purple-600',
            title: 'Correo Electrónico',
            content: [
                'info@tallermecanico.com',
                'servicios@tallermecanico.com'
            ],
            animationClass: 'sweep-right-4'
        }
    ];

    return (
        <div className="space-y-5">
            {contactItems.map((item) => {
                const IconComponent = item.icon;
                return (
                    <div
                        key={item.id}
                        className={`contact-card ${item.animationClass}`}
                    >
                        <div className="contact-card-inner group">
                            {/* Badge opcional */}
                            {item.badge && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse z-20">
                                    {item.badge}
                                </div>
                            )}

                            {/* Icono con gradiente - Responsive */}
                            <div className="relative flex-shrink-0">
                                <div className={`icon-container ${item.iconBg} w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]`}>
                                    <IconComponent
                                        className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconStroke} icon-element relative z-10`}
                                        strokeWidth={2.5}
                                    />
                                    {/* Círculo decorativo detrás */}
                                    <div className={`icon-glow bg-gradient-to-br ${item.iconColor}`}></div>
                                </div>
                            </div>

                            {/* Contenido - Responsive */}
                            <div className="flex-1 min-w-0">
                                <h4 className="contact-title text-base sm:text-lg">
                                    {item.title}
                                </h4>

                                <div className="space-y-1 mt-2">
                                    {item.content.map((line, index) => (
                                        typeof line === 'string' ? (
                                            <p key={index} className="contact-text text-sm sm:text-base">
                                                {line}
                                            </p>
                                        ) : (
                                            <p key={index} className={`contact-text ${line.style}`}>
                                                {line.text}
                                                {line.text === 'WhatsApp disponible' && (
                                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
                                                )}
                                            </p>
                                        )
                                    ))}
                                </div>

                                {/* Link con animación - Responsive */}
                                {item.link && (
                                    <a
                                        href={item.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-link text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5"
                                    >
                                        <span>{item.link.text}</span>
                                        <svg
                                            className="link-arrow w-4 h-4 sm:w-5 sm:h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </a>
                                )}
                            </div>

                            {/* Efecto de brillo en hover */}
                            <div className="card-shine"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ContactInfo;