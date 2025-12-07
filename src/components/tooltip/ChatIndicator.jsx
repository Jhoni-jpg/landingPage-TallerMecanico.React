const ChatIndicator = ({ isVisible }) => {
    return (
        <div className="absolute -bottom-10 right-0 flex flex-col items-center gap-2">
            {/* Línea punteada animada */}
            <div className="flex flex-col gap-1 items-center">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-1 h-1 bg-blue-500 rounded-full"
                        style={{
                            animation: isVisible
                                ? `pulseDown 1.5s ease-in-out ${i * 0.2}s infinite`
                                : 'none',
                            opacity: isVisible ? 1 : 0
                        }}
                    />
                ))}
            </div>
            {/* Texto indicador */}
            <span
                className="text-xs font-semibold text-blue-600 px-2 py-1 rounded shadow-sm"
                style={{
                    animation: isVisible ? 'fadeInScale 0.5s ease-out 0.3s forwards' : 'none',
                    opacity: 0
                }}
            >
            </span>
        </div>
    );
};

export default ChatIndicator;