import { Award, Clock, Shield, Star, TrendingUp, Users } from 'lucide-react';
import { useChatContext } from '../../hooks/useChatContext';

const BenefitsSection = () => {
    const benefits = [
        {
            id: 1,
            icon: Shield,
            title: 'Calidad Garantizada',
            description: 'Materiales premium y técnicas profesionales en cada proyecto. Cumplimos con los más altos estándares de la industria.',
            badge: 'Certificados',
            badgeIcon: <Star className="w-4 h-4" />,
            gradient: 'from-blue-600 to-blue-700',
            bgGlow: 'bg-blue-500/20',
            badgeBg: 'bg-blue-50',
            badgeText: 'text-blue-700',
            iconRotate: 'group-hover:rotate-12',
            delay: '',
            stats: { value: '100%', label: 'Satisfacción' }
        },
        {
            id: 2,
            icon: Award,
            title: '20+ Años de Experiencia',
            description: 'Especialistas certificados en customización vehicular. Líderes en innovación y técnicas avanzadas.',
            badge: 'Desde 2004',
            badgeIcon: <TrendingUp className="w-4 h-4" />,
            gradient: 'from-purple-600 to-indigo-700',
            bgGlow: 'bg-purple-500/20',
            badgeBg: 'bg-purple-50',
            badgeText: 'text-purple-700',
            iconRotate: 'group-hover:-rotate-12',
            delay: 'animate-delay-1',
            stats: { value: '500+', label: 'Proyectos' }
        },
        {
            id: 3,
            icon: Clock,
            title: 'Servicio Express',
            description: 'Entregas rápidas sin comprometer la calidad del trabajo. Tu tiempo es valioso para nosotros.',
            badge: '2-10 días',
            badgeIcon: <Users className="w-4 h-4" />,
            gradient: 'from-emerald-600 to-teal-700',
            bgGlow: 'bg-emerald-500/20',
            badgeBg: 'bg-emerald-50',
            badgeText: 'text-emerald-700',
            iconRotate: 'group-hover:rotate-12',
            delay: 'animate-delay-2',
            stats: { value: '98%', label: 'Entregas a tiempo' }
        }
    ];

    const { openChat } = useChatContext();

    return (
        <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-gray-100 via-white to-gray-100 overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="floating-decoration absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="floating-decoration-slow absolute bottom-20 right-10 w-40 h-40 sm:w-52 sm:h-52 bg-purple-400/10 rounded-full blur-3xl"></div>
                <div className="floating-decoration-reverse absolute top-1/2 left-1/3 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200/50 mb-4 sm:mb-6">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                            Nuestros Valores
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                        ¿Por Qué <span className="bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 text-transparent bg-clip-text">Elegirnos</span>?
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                        Experiencia, calidad y compromiso en cada proyecto que realizamos
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-start">
                    {benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                            <div
                                key={benefit.id}
                                className={`
                                    floating-card ${benefit.delay}
                                    group relative
                                    bg-white 
                                    rounded-2xl sm:rounded-3xl 
                                    p-6 sm:p-8 lg:p-10
                                    shadow-lg hover:shadow-2xl
                                    border border-gray-100 hover:border-gray-200
                                    transition-all duration-500
                                    ${index === 1 ? 'md:-mt-8' : index === 2 ? 'md:mt-8' : ''}
                                `}
                            >
                                {/* Glow effect background */}
                                <div className={`absolute -inset-1 ${benefit.bgGlow} rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                {/* Shine effect */}
                                <div className="card-shine"></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon Container */}
                                    <div className="relative mb-6 sm:mb-8">
                                        <div className={`
                                            w-16 h-16 sm:w-20 sm:h-20 
                                            bg-gradient-to-br ${benefit.gradient} 
                                            rounded-2xl sm:rounded-3xl
                                            mx-auto 
                                            flex items-center justify-center
                                            shadow-xl
                                            transform transition-all duration-500
                                            ${benefit.iconRotate}
                                            group-hover:scale-110
                                        `}>
                                            <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2} />
                                        </div>

                                        {/* Decorative ring */}
                                        <div className={`
                                            absolute inset-0 
                                            border-4 border-dashed
                                            ${benefit.gradient.includes('blue') ? 'border-blue-200' : benefit.gradient.includes('purple') ? 'border-purple-200' : 'border-emerald-200'}
                                            rounded-2xl sm:rounded-3xl
                                            opacity-0 group-hover:opacity-100
                                            scale-125 group-hover:scale-150
                                            transition-all duration-700
                                        `}></div>
                                    </div>

                                    {/* Title & Description */}
                                    <div className="text-center space-y-3 sm:space-y-4 mb-6">
                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                                            {benefit.title}
                                        </h3>

                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                                        <div className="text-center">
                                            <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${benefit.gradient} text-transparent bg-clip-text`}>
                                                {benefit.stats.value}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-500 font-medium">
                                                {benefit.stats.label}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    <div className="flex justify-center">
                                        <div className={`
                                            inline-flex items-center gap-2 
                                            px-4 py-2 
                                            ${benefit.badgeBg} ${benefit.badgeText} 
                                            rounded-full 
                                            text-xs sm:text-sm font-bold
                                            shadow-sm
                                            transform group-hover:scale-105
                                            transition-all duration-300
                                        `}>
                                            {benefit.badgeIcon}
                                            <span>{benefit.badge}</span>
                                        </div>
                                    </div>

                                    {/* Bottom decorative line */}
                                    <div className={`
                                        absolute bottom-0 left-1/2 -translate-x-1/2
                                        w-0 group-hover:w-3/4
                                        h-1 
                                        bg-gradient-to-r ${benefit.gradient}
                                        rounded-full
                                        transition-all duration-700
                                    `}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12 sm:mt-16 md:mt-20">
                    <p className="text-base sm:text-lg text-gray-600 mb-6">
                        ¿Listo para empezar tu proyecto?
                    </p>
                    <a
                        onClick={() => openChat(true)}
                        className="cta-button-curtain cursor-pointer group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-gray-900 font-bold rounded-xl sm:rounded-2xl border-2 border-gray-300 hover:text-white transition-colors duration-500 overflow-hidden"
                    >
                        {/* Cortina izquierda */}
                        <span className="curtain-left"></span>

                        {/* Cortina derecha */}
                        <span className="curtain-right"></span>

                        {/* Contenido del botón */}
                        <Shield className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                        <span className="text-sm sm:text-base relative z-10">Solicitar Cotización</span>
                    </a>
                </div>
            </div>
        </section >
    );
};

export default BenefitsSection;