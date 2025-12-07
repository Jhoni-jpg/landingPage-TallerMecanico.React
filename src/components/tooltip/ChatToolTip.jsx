import ChatIndicator from './ChatIndicator';

// Componente de Tooltip
const ChatTooltip = ({ isVisible, isFadingOut }) => {
    return (
        <div
            className={`fixed bottom-32 right-12 z-40 transition-all duration-500 ${isFadingOut
                ? 'opacity-0 translate-x-8'
                : 'opacity-100 translate-x-0'
                }`}
            style={{
                animation: isFadingOut
                    ? 'slideOutRight 0.5s ease-out'
                    : 'slideInRight 0.5s ease-out'
            }}
        >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-4 rounded-lg shadow-2xl max-w-xs relative border-2 border-blue-400">
                <p className="text-sm font-bold">
                    ¡Chatea con nuestro asistente!
                </p>
                <p className="text-xs mt-2 opacity-95">
                    Diagnóstico inmediato • Cotizaciones al instante • Agenda tu cita
                </p>
            </div>
            <ChatIndicator isVisible={isVisible && !isFadingOut} />
        </div>
    );
};

export default ChatTooltip;