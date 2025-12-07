// components/NotificationPermissionBanner.jsx
import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { useNotificationContext } from '../hooks/useNotificationContext';

const NotificationPermissionBanner = () => {
    const { requestNotificationPermission, permission } = useNotificationContext();
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Mostrar el banner automáticamente si el permiso está en default
        if (permission === 'default') {
            // Delay para que aparezca después de que cargue la página
            const timer = setTimeout(() => {
                setShow(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [permission]);

    const handleRequest = async () => {
        const granted = await requestNotificationPermission();
        if (granted) {
            setShow(false);
            // Notificación de confirmación
            new Notification('¡Listo!', {
                body: 'Ahora recibirás notificaciones de TorqueBot',
            });
        }
    };

    const handleDismiss = () => {
        setShow(false);
        // Volver a mostrar después de 30 segundos si no aceptó
        setTimeout(() => {
            if (permission === 'default') {
                setShow(true);
            }
        }, 30000);
    };

    // No mostrar si ya se otorgó o denegó permiso, o si está oculto
    if (permission !== 'default' || !show) {
        return null;
    }

    return (
        <>
            {/* Overlay oscuro */}
            <div className="fixed inset-0 bg-black/50 z-[60] animate-fade-in" />
            
            {/* Banner centrado */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[70] max-w-md w-full mx-4 animate-slide-up">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header con gradiente */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-white/80 hover:text-white transition"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-full">
                                <Bell className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">
                                    Activa las notificaciones
                                </h3>
                                <p className="text-sm text-blue-100">
                                    No te pierdas mensajes importantes
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Estado de tu vehículo</h4>
                                    <p className="text-sm text-gray-600">Recibe actualizaciones sobre reparaciones</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Recordatorios de citas</h4>
                                    <p className="text-sm text-gray-600">No olvides tus mantenimientos programados</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-purple-100 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Ofertas especiales</h4>
                                    <p className="text-sm text-gray-600">Aprovecha descuentos exclusivos</p>
                                </div>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleRequest}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
                            >
                                Activar ahora
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Más tarde
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            Puedes cambiar esto en cualquier momento desde la configuración
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationPermissionBanner;