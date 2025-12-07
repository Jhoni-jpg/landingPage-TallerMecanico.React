// src/components/MobileMenu.jsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useChatContext } from '../../hooks/useChatContext';

export default function MobileMenu({ isMenuOpen, setIsMenuOpen, navHeight }) {
    const { openChat } = useChatContext();

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    const handleLinkClick = () => {
        setIsMenuOpen(false)
    }

    // ⭐ No renderizar nada si el menú está cerrado
    if (!isMenuOpen) {
        return null
    }

    return (
        <>
            {/* Overlay con blur */}
            <div
                className="md:hidden fixed left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm 
                    transition-all duration-300 opacity-100 visible"
                style={{ 
                    top: `${navHeight}px`,
                    zIndex: 90
                }}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu - Sticky debajo del navbar */}
            <div
                className="md:hidden sticky left-0 w-full bg-gradient-to-b from-white to-blue-50/30
                    backdrop-blur-xl shadow-2xl animate-slideDown-Mobile"
                style={{ 
                    top: `${navHeight}px`,
                    zIndex: 95
                }}
            >
                {/* Contenedor centrado */}
                <div className="max-w-md mx-auto">
                    <ul className="flex flex-col p-8 gap-2">
                        {/* Inicio */}
                        <li
                            className="animate-slideInLeft-Mobile"
                            style={{ animationDelay: '100ms' }}
                        >
                            <Link
                                to="/"
                                onClick={handleLinkClick}
                                className="block py-3 px-4 rounded-lg text-gray-800 no-underline font-semibold 
                                    transition-all duration-300 hover:bg-blue-50 hover:text-[rgb(44,78,151)] 
                                    hover:translate-x-2 text-center"
                            >
                                Inicio
                            </Link>
                        </li>

                        {/* Nosotros */}
                        <li
                            className="animate-slideInLeft-Mobile"
                            style={{ animationDelay: '150ms' }}
                        >
                            <a
                                href="#nosotros"
                                onClick={handleLinkClick}
                                className="block py-3 px-4 rounded-lg text-gray-800 no-underline font-semibold 
                                    transition-all duration-300 hover:bg-blue-50 hover:text-[rgb(44,78,151)]
                                    hover:translate-x-2 text-center"
                            >
                                Nosotros
                            </a>
                        </li>

                        {/* Servicios */}
                        <li
                            className="animate-slideInLeft-Mobile"
                            style={{ animationDelay: '200ms' }}
                        >
                            <Link
                                to="/servicios"
                                onClick={handleLinkClick}
                                className="block py-3 px-4 rounded-lg text-gray-800 no-underline font-semibold 
                                    transition-all duration-300 hover:bg-blue-50 hover:text-[rgb(44,78,151)]
                                    hover:translate-x-2 text-center"
                            >
                                Servicios
                            </Link>
                        </li>

                        {/* Pintura */}
                        <li
                            className="animate-slideInLeft-Mobile"
                            style={{ animationDelay: '250ms' }}
                        >
                            <Link
                                to="/pinturas"
                                onClick={handleLinkClick}
                                className="block py-3 px-4 rounded-lg text-gray-800 no-underline font-semibold 
                                    transition-all duration-300 hover:bg-blue-50 hover:text-[rgb(44,78,151)]
                                    hover:translate-x-2 text-center"
                            >
                                Pintura
                            </Link>
                        </li>

                        {/* Contacto */}
                        <li
                            className="animate-slideInLeft-Mobile"
                            style={{ animationDelay: '300ms' }}
                        >
                            <Link
                                to="/contacto"
                                onClick={handleLinkClick}
                                className="block py-3 px-4 rounded-lg text-gray-800 no-underline font-semibold 
                                    transition-all duration-300 hover:bg-blue-50 hover:text-[rgb(44,78,151)]
                                    hover:translate-x-2 text-center"
                            >
                                Contacto
                            </Link>
                        </li>

                        {/* Botón Cotizar con animación de cortina */}
                        <li
                            className="mt-4 animate-slideInLeft-Mobile"
                            style={{ animationDelay: '350ms' }}
                        >
                            <button
                                className="relative w-full text-blue-600 cursor-pointer px-8 py-4 rounded-full 
                                    font-bold transition-all duration-300 shadow-lg overflow-hidden group
                                    border-2 border-blue-500 bg-transparent hover:text-white"
                                onClick={() => openChat(true)}
                            >
                                {/* Cortina que baja desde arriba */}
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 
                                    transition-transform duration-700 ease-out origin-top scale-y-0
                                    group-hover:scale-y-100"></span>

                                {/* Texto */}
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Cotizar ahora
                                    <svg
                                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}