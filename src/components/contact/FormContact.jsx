import { useState } from 'react';
import { User, Mail, Phone, Car, MessageSquare, Send } from 'lucide-react';
import Toast from '../ui/Toast';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        vehiculo: '',
        mensaje: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({
        isVisible: false,
        message: '',
        type: 'success'
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const showToast = (message, type = 'success') => {
        setToast({
            isVisible: true,
            message,
            type
        });
    };

    const hideToast = () => {
        setToast(prev => ({
            ...prev,
            isVisible: false
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simular envío de datos
        setTimeout(() => {
            console.log('Datos del formulario:', formData);
            setIsSubmitting(false);

            showToast('¡Mensaje enviado exitosamente!', 'success');

            // Resetear el formulario después de enviar
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                vehiculo: '',
                mensaje: ''
            });
        }, 1500);
    };

    const formFields = [
        {
            name: 'nombre',
            label: 'Nombre Completo',
            type: 'text',
            placeholder: 'Tu nombre',
            icon: User,
            required: true,
            delay: '0.5s'
        },
        {
            name: 'email',
            label: 'Correo Electrónico',
            type: 'email',
            placeholder: 'tu@email.com',
            icon: Mail,
            required: true,
            delay: '0.65s'
        },
        {
            name: 'telefono',
            label: 'Teléfono',
            type: 'tel',
            placeholder: '(300) 123-4567',
            icon: Phone,
            required: true,
            delay: '0.8s'
        },
        {
            name: 'vehiculo',
            label: 'Marca y Modelo del Vehículo',
            type: 'text',
            placeholder: 'Ej: Toyota Corolla 2020',
            icon: Car,
            required: false,
            delay: '0.95s'
        }
    ];

    return (
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200 overflow-hidden form-container">
            {/* Toast Notification */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
                duration={3000}
                position="top-right"
            />

            {/* Header del formulario */}
            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                <h3 className="form-title text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3">
                    Envíanos un Mensaje
                </h3>
                <p className="form-subtitle text-gray-600 text-xs sm:text-sm lg:text-base mt-2 sm:mt-3 px-2 sm:px-0">
                    Completa el formulario y te responderemos pronto
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Campos dinámicos */}
                {formFields.map((field) => {
                    const IconComponent = field.icon;
                    return (
                        <div
                            key={field.name}
                            className="input-sweep"
                            style={{ animationDelay: field.delay }}
                        >
                            <label
                                htmlFor={field.name}
                                className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 transition-colors duration-300 form-label"
                            >
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 pointer-events-none input-icon z-10">
                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 lg:py-3.5 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 bg-white transition-all duration-300 outline-none hover:border-gray-300 focus:border-blue-500 focus:shadow-input focus:-translate-y-0.5 placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base"
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            </div>
                        </div>
                    );
                })}

                {/* Campo de mensaje */}
                <div className="input-sweep" style={{ animationDelay: '1.1s' }}>
                    <label
                        htmlFor="mensaje"
                        className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 transition-colors duration-300 form-label"
                    >
                        Describe el Servicio que Necesitas
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute left-3 sm:left-4 top-3 sm:top-3.5 lg:top-4 text-gray-400 transition-all duration-300 pointer-events-none textarea-icon z-10">
                            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            rows="4"
                            value={formData.mensaje}
                            onChange={handleChange}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 lg:py-3.5 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 bg-white transition-all duration-300 outline-none resize-none hover:border-gray-300 focus:border-blue-500 focus:shadow-input focus:-translate-y-0.5 placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base leading-relaxed"
                            placeholder="Cuéntanos qué necesita tu vehículo..."
                            required
                        />
                    </div>
                </div>

                {/* Botón de envío */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button input-sweep w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden relative"
                    style={{ animationDelay: '1.25s' }}
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    {isSubmitting ? (
                        <>
                            <div className="loading-spinner w-4 h-4 sm:w-5 sm:h-5 border-2 sm:border-3 border-white/30 border-t-white rounded-full"></div>
                            <span className="relative z-10">Enviando...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                            <span className="relative z-10">Enviar Mensaje</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;