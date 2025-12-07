
import React, { useState, useEffect } from 'react';
import { X, Check, Car, Radio } from 'lucide-react';
import useShowTooltip from '../tooltip/useShowToolTip';

// Mock context y hooks para el ejemplo
const useServices = () => {
    const [openServiceId, setOpenServiceId] = useState(null);
    return { openServiceId, setOpenServiceId };
};

const ServiceCard = ({ service, showPrice = true }) => {
    const showToolTip = useShowTooltip();

    const { openServiceId, setOpenServiceId } = useServices();
    const IconComponent = service.icon;
    const [isAnimating, setIsAnimating] = useState(false);

    const showModal = openServiceId === service.id;

    useEffect(() => {
        if (showModal) {
            setIsAnimating(true);
        }
    }, [showModal]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setOpenServiceId(null);
        }, 400); // Espera a que termine la animación
    };

    return (
        <div className="relative">
            <div className='bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 hover:scale-105 h-full'>
                {/* Contenido principal */}
                <div className="flex flex-col items-center text-center mb-4">
                    <div className="bg-blue-50 p-6 rounded-2xl mb-4">
                        <IconComponent className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.description}</p>
                </div>

                {/* Precio y botones */}
                {showPrice && service.price && (
                    <div className="mt-auto">
                        <p className="text-sm text-gray-500 mb-2">Desde</p>
                        <div className="flex flex-col gap-2">
                            {service.highlight ? (
                                
                                <button
                                onClick={() => setOpenServiceId(showModal ? null : service.id)}
                                className="relative group overflow-hidden bg-white text-green-300 hover:text-white font-semibold py-2 px-4 rounded-full transition-all duration-700 shadow-lg text-sm group outline-dotted outline-green-400 hover:outline-none"
                            >
                                {/* Animación de fondo circular - barrido de abajo hacia arriba */}
                                <span className="absolute inset-0 w-full h-full">
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-[400%] h-[400%] rounded-full bg-gradient-to-r from-green-400 to-emerald-500 group-hover:translate-y-0 transition-all duration-700 ease-out"></span>
                                </span>

                                {/* Texto del botón */}
                                <span className="relative z-10 group-hover:text-white">{service.price}</span>
                            </button>
                            ) : (
                                <p className="text-2xl font-bold text-gray-900 text-center">${service.price}</p>
                            )}
                            <button
                                onClick={() => setOpenServiceId(showModal ? null : service.id)}
                                className="relative group overflow-hidden bg-white text-blue-400 hover:text-white font-semibold py-2 px-4 rounded-full transition-all duration-700 shadow-lg text-sm group outline-dotted outline-blue-400 hover:outline-none"
                            >
                                {/* Animación de fondo circular - barrido de abajo hacia arriba */}
                                <span className="absolute inset-0 w-full h-full">
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-[400%] h-[400%] rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:translate-y-0 transition-all duration-700 ease-out"></span>
                                </span>

                                {/* Texto del botón */}
                                <span className="relative z-10 group-hover:text-white">Ver Detalles</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal con animación de libro */}
            {showModal && (
                <>
                    <div
                        className={`fixed inset-0 bg-black transition-opacity duration-400 ${isAnimating ? 'opacity-30' : 'opacity-0'
                            }`}
                        onClick={handleClose}
                    />
                    <div className="absolute top-0 right-0 w-80 z-40 mt-2 mr-2">
                        <div
                            className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-blue-200 overflow-hidden origin-left transition-all duration-500 ease-out ${isAnimating
                                ? 'opacity-100 scale-x-100 scale-y-100 rotate-y-0'
                                : 'opacity-0 scale-x-0 scale-y-95 -rotate-y-90'
                                }`}
                            style={{
                                transformStyle: 'preserve-3d',
                                perspective: '1000px'
                            }}
                        >
                            <div className="bg-blue-500 text-white p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="bg-white/20 p-2 rounded-xl">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <h3 className="text-lg font-bold">{service.name}</h3>
                                <p className="text-blue-100 text-xs">{service.description}</p>
                            </div>

                            {/* Contenido con animación de cascada */}
                            <div className="p-4 max-h-[400px] overflow-y-auto">
                                <div className={`transition-all duration-500 delay-100 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                        {service.details || 'Servicio profesional realizado por técnicos especializados con equipos de última tecnología.'}
                                    </p>
                                </div>

                                {service.price && (
                                    <div className={`bg-blue-50 rounded-xl p-3 mb-4 transition-all duration-500 delay-200 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                        }`}>
                                        <p className="text-xs text-gray-600 mb-1">Precio desde</p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {service.price.includes('$') || service.price === 'Por Cotizar'
                                                ? service.price
                                                : `$${service.price}`}
                                        </p>
                                    </div>
                                )}

                                <ul className={`space-y-2 mb-4 text-xs text-gray-700 transition-all duration-500 delay-300 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}>
                                    <li className="flex items-start gap-2">
                                        <div className="bg-emerald-100 rounded-full p-0.5 mt-0.5">
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        Diagnóstico detallado
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="bg-emerald-100 rounded-full p-0.5 mt-0.5">
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        Garantía incluida
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="bg-emerald-100 rounded-full p-0.5 mt-0.5">
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        Técnicos certificados
                                    </li>
                                </ul>

                                <div className={`flex flex-col gap-2 transition-all duration-500 delay-400 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}>
                                    <button
                                        onClick={showToolTip}
                                        className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 duration-300"
                                    >
                                        <Car className="w-4 h-4" /> Agendar
                                    </button>
                                    <button className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-2 px-4 rounded-xl transition-all border-2 border-blue-500 text-sm flex items-center justify-center gap-2">
                                        <a href='/contacto' className='flex justify-center items-center gap-3 w-full h-full'>
                                            <Radio className="w-4 h-4" />
                                            Contactar
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ServiceCard;