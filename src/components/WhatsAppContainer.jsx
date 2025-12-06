import { useState, useEffect, useRef } from 'react';
import { User, X } from 'lucide-react';

const WhatsAppWidget = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Función para abrir el menú
    const openMenu = () => {
        setIsMenuOpen(true);
    };

    // Función para cerrar el menú
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Alternar menú
    const toggleMenu = () => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    // Manejar clic en opción del menú
    const handleOptionClick = () => {
        setTimeout(closeMenu, 300);
    };

    // Cerrar menú con tecla Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <>
            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-[49]"
                    onClick={closeMenu}
                />
            )}

            {/* Contenedor de WhatsApp */}
            <div className="fixed bottom-[30px] left-[30px] z-50 md:bottom-5 md:left-5">
                {/* Menú desplegable */}
                <div
                    ref={menuRef}
                    className={`absolute bottom-20 left-0 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] min-w-[250px] md:min-w-[280px] transition-all duration-300 ease-in-out ${isMenuOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-5 pointer-events-none'
                        }`}
                >
                    <div className="p-5 border-b border-gray-100">
                        <h3 className="text-gray-800 text-base mb-1">¿En qué podemos ayudarte?</h3>
                        <p className="text-gray-400 text-[13px] m-0">Selecciona un departamento</p>
                    </div>
                    <div className="p-2.5">

                        <a href="https://wa.me/1234567890?text=Hola,%20necesito%20ayuda%20con%20servicio%20al%20cliente"
                            className="flex items-center p-4 rounded-lg no-underline text-gray-800 transition-all duration-200 mb-1 hover:bg-gray-50 hover:translate-x-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleOptionClick}>
                            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm mb-0.5">Servicio al cliente</div>
                                <div className="text-xs text-gray-400">Atención y soporte</div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Botón principal */}
                <button
                    ref={buttonRef}
                    className={`relative w-[60px] h-[60px] md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 border-0 hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] before:content-[''] before:absolute before:w-full before:h-full before:rounded-full before:bg-[#25D366] before:-z-10 ${isMenuOpen
                        ? 'bg-[#128C7E] before:animate-none'
                        : 'bg-[#25D366] before:animate-[pulse_2s_infinite]'
                        }`}
                    onClick={toggleMenu}
                    aria-label="Contactar por WhatsApp"
                >
                    <svg
                        className={`w-[35px] h-[35px] md:w-7 md:h-7 fill-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                            }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                        />
                    </svg>
                    <X
                        className={`absolute w-[35px] h-[35px] md:w-7 md:h-7 text-white transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                            }`}
                    />
                    <span className="absolute right-[-140px] top-1/2 -translate-y-1/2 bg-white py-2.5 px-4 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300 text-sm text-gray-800 before:content-[''] before:absolute before:left-[-6px] before:top-1/2 before:-translate-y-1/2 before:border-t-[6px] before:border-t-transparent before:border-b-[6px] before:border-b-transparent before:border-r-[6px] before:border-r-white group-hover:opacity-100">
                        ¡Chatea con nosotros!
                    </span>
                </button>
            </div>
        </>
    );
};

export default WhatsAppWidget;