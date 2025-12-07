import { useState, useEffect } from 'react';

const ContactHeader = () => {
    const [text, setText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const fullText = 'Contáctanos';

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
                setIsTypingComplete(true);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-center mb-16 contact-header-container px-4 sm:px-6 py-4 sm:py-8">
            <div className="inline-block relative mb-5">
                <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 title-sweep">
                    {text}
                    {isTypingComplete && (
                        <span className="typing-cursor blinking text-3xl xs:text-4xl sm:text-5xl md:text-6xl">
                            |
                        </span>
                    )}
                    {!isTypingComplete && (
                        <span className="typing-cursor text-3xl xs:text-4xl sm:text-5xl md:text-6xl">
                            |
                        </span>
                    )}
                </h2>
                <div className="title-underline"></div>
            </div>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed description-fade px-4 sm:px-0">
                Estamos aquí para atender tu vehículo. Si tienes alguna duda sobre lo que ofrecemos, <span className="text-blue-500 font-semibold cursor-default"> ¡no dudes en contactarnos!</span>
            </p>
            <div className="background-decoration"></div>
        </div>
    );
};

export default ContactHeader;