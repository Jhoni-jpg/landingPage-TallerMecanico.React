import { Calendar, Clock, Check } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ModelViewer from '../ModelViewer';
import { useChatContext } from '../../hooks/ChatBot/useChatContext';

const Hero = () => {
    const {
        setInternalOpen
    } = useChatContext();
    const counterRefs = useRef([]);

    useEffect(() => {
        // Animación de contadores
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 20);
        };

        counterRefs.current.forEach((el) => {
            if (el) {
                const target = parseInt(el.dataset.target);
                animateCounter(el, target);
            }
        });
    }, []);

    return (
        <section
            id="nosotros"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        >
            {/* Patrón de fondo animado */}
            <div className="absolute inset-0 opacity-10">
                <div className="grid-pattern w-full h-full" />
            </div>

            {/* Partículas flotantes (herramientas) */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="tool tool-1">🔧</div>
                <div className="tool tool-2">🔩</div>
                <div className="tool tool-3">⚙️</div>
                <div className="tool tool-4">🔨</div>
                <div className="tool tool-5">🛠️</div>
                <div className="tool tool-6">⚡</div>
            </div>

            {/* Contenedor principal */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido de texto */}
                    <div className="text-white space-y-8">
                        {/* Badge superior */}
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/50 rounded-full px-4 py-2 backdrop-blur-sm animate-fade-in">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
                            </span>
                            <span className="text-blue-400 text-sm font-semibold">
                                Abierto ahora • Lun-Sáb 7:00 AM - 6:00 PM
                            </span>
                        </div>

                        {/* Título principal */}
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-black leading-tight animate-slide-up">
                                <span className="block text-gray-300">Tu Vehículo en</span>
                                <span className="block bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                                    Manos Expertas
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed animate-slide-up-delay">
                                Más de 20 años brindando servicio mecánico de calidad.{' '}
                                <span className="text-blue-300 font-semibold">
                                    Reparaciones garantizadas
                                </span>{' '}
                                y atención personalizada.
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-3 gap-6 py-8 animate-fade-in-up">
                            <div className="text-center group">
                                <div
                                    ref={(el) => (counterRefs.current[0] = el)}
                                    className="text-4xl font-black text-blue-400 mb-2"
                                    data-target="2500"
                                >
                                    0
                                </div>
                                <div className="text-sm text-gray-400 font-medium">
                                    Vehículos Reparados
                                </div>
                            </div>
                            <div className="text-center group">
                                <div
                                    ref={(el) => (counterRefs.current[1] = el)}
                                    className="text-4xl font-black text-blue-100 mb-2"
                                    data-target="20"
                                >
                                    0
                                </div>
                                <div className="text-sm text-gray-400 font-medium">
                                    Años de Experiencia
                                </div>
                            </div>
                            <div className="text-center group">
                                <div
                                    ref={(el) => (counterRefs.current[2] = el)}
                                    className="text-4xl font-black text-blue-400 mb-2"
                                    data-target="98"
                                >
                                    0
                                </div>
                                <div className="text-sm text-gray-400 font-medium">
                                    % Satisfacción
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-delay-2">
                            <button
                                onClick={() => setInternalOpen(true)}
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-200 to-blue-500 text-gray-900 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                            >
                                <span className="relative z-10 flex items-center group-hover:text-blue-50 justify-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Agendar Cita
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-950 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>

                            <a
                                href="#servicios"
                                className="group px-8 py-4 bg-gray-800/50 text-white font-bold rounded-lg border-2 border-gray-700 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700 hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <Clock className="w-5 h-5" />
                                Ver Servicios
                            </a>
                        </div>

                        {/* Características destacadas */}
                        <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up-delay">
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-green-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span className="text-sm">Garantía extendida</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-green-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span className="text-sm">Pago flexible</span>
                            </div>
                        </div>
                    </div>

                    {/* Lado derecho: Ilustración animada */}
                    <div className="relative lg:h-[600px] flex items-center justify-center animate-fade-in-delay">
                        {/* Círculo de fondo animado */}
                        <div className="absolute inset-0 hidden md:flex items-center justify-center">
                            <div className="w-96 h-96 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
                        </div>

                        {/* Contenedor del auto - Puedes agregar tu modelo 3D aquí */}
                        <div className="relative car-container hidden md:block transition-transform duration-300 hover:scale-105">
                            {/* Placeholder para el modelo 3D */}
                            <div className="w-[600px] h-[400px] flex items-center justify-center">
                                {/* Aquí iría tu modelo 3D o imagen del auto */}
                                <div className="text-6xl animate-car-bounce">
                                    <ModelViewer
                                        src="../../../public/vehicle3D/scene.gltf"
                                        alt="Modelo 3D de Vehiculo"
                                        style={{
                                            width: "600px",
                                            height: "400px"
                                        }}
                                        camera-orbit="30deg 75deg 8m"
                                        min-camera-orbit="30deg 75deg 8m"
                                        max-camera-orbit="32deg 77deg 8m"
                                        disable-zoom
                                        disable-tap
                                        camera-controls
                                        exposure="1"
                                        shadow-intensity="1"
                                        interaction-prompt="none"
                                        auto-rotate />
                                </div>
                            </div>

                            {/* Herramientas flotantes alrededor del auto */}
                            <div className="floating-tool floating-tool-1">🔧</div>
                            <div className="floating-tool floating-tool-2">⚙️</div>
                            <div className="floating-tool floating-tool-3">🔩</div>
                            <div className="floating-tool floating-tool-4">🛠️</div>
                        </div>

                        {/* Cards de servicio flotantes */}
                        <div
                            className="absolute -top-4 md:top-10 -right-4 md:right-0 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4 transition-all duration-500 shadow-xl animate-float"
                            style={{ animationDelay: '0.5s' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Servicio Rápido</div>
                                    <div className="text-gray-400 text-xs">En 1 hora</div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="absolute -bottom-16 md:bottom-10 left-0 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg transition-all duration-500 p-4 shadow-xl animate-float"
                            style={{ animationDelay: '1s' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-500/40 rounded-lg flex items-center justify-center">
                                    <Check className="text-2xl text-blue-100" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Garantizado</div>
                                    <div className="text-gray-400 text-xs">12 meses</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicador de scroll */}
            <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-blue-400 rounded-full animate-scroll" />
                </div>
            </div>
        </section>
    );
};

export default Hero;