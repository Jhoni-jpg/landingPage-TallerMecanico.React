import { useState } from "react";
import { useChatContext } from "../../hooks/ChatBot/useChatContext";

export default function HowItWorks() {
    const {
        setInternalOpen
    } = useChatContext();
    const [activeStep, setActiveStep] = useState(null);


    const steps = [
        {
            number: "01",
            title: "Inicia la Conversación",
            description: "Abre nuestro chatbot disponible 24/7 y cuéntanos qué necesita tu vehículo.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            details: "Nuestro asistente virtual te guiará paso a paso"
        },
        {
            number: "02",
            title: "Describe el Problema",
            description: "Explica los síntomas o el servicio que necesitas: mantenimiento, reparación o diagnóstico.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            details: "Proporciona detalles sobre marca, modelo y año"
        },
        {
            number: "03",
            title: "Agenda tu Cita",
            description: "Elige la fecha y hora que mejor te convenga. El bot te mostrará la disponibilidad en tiempo real.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            details: "Confirmación instantánea por WhatsApp o email"
        },
        {
            number: "04",
            title: "Confirmación y Recordatorio",
            description: "Recibirás una confirmación inmediata y recordatorios antes de tu cita.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            details: "Notificaciones automáticas para que no olvides tu cita"
        }
    ];

    return (
        <>

            <section id="comoFunciona" className="bg-gradient-to-b from-gray-100 via-blue-50 to-gray-100 py-20 mb-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Encabezado */}
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                            Simple y Rápido
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            ¿Cómo puedo agendar mi cita?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Agenda tu cita en menos de 3 minutos con nuestro asistente virtual inteligente
                        </p>
                    </div>

                    {/* Pasos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => setActiveStep(index)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                {/* Línea conectora (solo en desktop) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-blue-100 -translate-x-8 z-0">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
                                    </div>
                                )}

                                {/* Card */}
                                <div
                                    className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${activeStep === index ? 'border-blue-500 scale-105' : 'border-transparent'
                                        } z-10`}
                                >
                                    {/* Número */}
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-lg">{step.number}</span>
                                    </div>

                                    {/* Icono */}
                                    <div className={`mb-4 transition-colors duration-300 ${activeStep === index ? 'text-blue-500' : 'text-gray-400'
                                        }`}>
                                        {step.icon}
                                    </div>

                                    {/* Contenido */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                        {step.description}
                                    </p>

                                    {/* Detalles adicionales */}
                                    <div className={`overflow-hidden transition-all duration-300 ${activeStep === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <p className="text-blue-600 text-xs font-medium pt-2 border-t border-gray-200">
                                            {step.details}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section con imagen de fondo estilo FAQ */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        {/* Fondo con imagen */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1920')",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-blue-900/90"></div>

                            {/* Patrón */}
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                }}
                            ></div>
                        </div>

                        {/* Contenido */}
                        <div className="relative z-10 p-8 md:p-12 text-center">
                            <h3 className="text-3xl font-bold text-white mb-4">
                                ¿Listo para agendar tu cita?
                            </h3>
                            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                                Nuestro chatbot está disponible las 24 horas del día, los 7 días de la semana.
                                Agenda ahora y olvídate de las llamadas telefónicas.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button onClick={() => setInternalOpen(true)} className="relative overflow-hidden px-8 py-4 bg-transparent border-2 border-white group-hover:border-transparent text-white font-bold hover:border-none rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                                    {/* Cortina azul de abajo hacia arriba */}
                                    <span className="absolute inset-0 bg-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>

                                    <span className="relative flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Abrir Chatbot
                                    </span>
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex justify-center gap-12 mt-12 pt-8 border-t border-white/30">
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                                    <div className="text-blue-100 text-sm">Disponibilidad</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">3 min</div>
                                    <div className="text-blue-100 text-sm">Tiempo promedio</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}