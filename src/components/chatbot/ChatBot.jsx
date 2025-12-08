// src/components/Chatbot.jsx
import { useEffect, useState } from "react";
import { MessageCircle, X, Send, User } from 'lucide-react';
import botLogo from '../../assets/TorqueBot.jpg';
import { useChatContext } from '../../hooks/useChatContext';
import TutorialOverlay from './TutorialOverlay';

const API_URL = "http://localhost:8000";

const Chatbot = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
    const {
        messages,
        isTyping,
        setIsTyping,
        input,
        setInput,
        internalOpen,
        conversacionId,
        unreadCount,
        setUnreadCount,
        showNotification,
        setShowNotification,
        lastBotMessage,
        isWaitingResponse,
        setIsWaitingResponse,
        messagesEndRef,
        textareaRef,
        MAX_LINES,
        MAX_CHARACTERS,
        addMessage,
        // Tutorial
        hasSeenTutorial,
        showTutorial,
        setShowTutorial,
        currentTutorialStep,
        tutorialSteps,
        nextTutorialStep,
        previousTutorialStep,
        skipTutorial,
        completeTutorial,
        // Funciones de control del chat
        toggleChat,
    } = useChatContext();

    // ⭐ Estados para animación de escala
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const open = externalIsOpen !== undefined ? externalIsOpen : internalOpen;

    // ⭐ Manejar animaciones de entrada/salida con escala
    useEffect(() => {
        if (open) {
            setShouldRender(true);
            // Pequeño delay para que la animación se active después del render
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            // Esperar a que termine la animación antes de desmontar
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleClose = () => {
        if (externalOnClose) {
            externalOnClose();
        } else {
            toggleChat(false);
        }
    };

    const handleToggle = () => {
        toggleChat();
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, messagesEndRef]);

    const sendToAPI = async (userMessage) => {
        try {
            const response = await fetch(`${API_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    conversacion_id: conversacionId,
                    mensaje: userMessage,
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error:", error);
            return {
                respuesta: "Lo siento, hubo un error. Intenta de nuevo.",
                opciones: [],
            };
        }
    };

    const handleInputChange = (e) => {
        const textarea = e.target;
        const newValue = textarea.value;
        const lines = newValue.split('\n').length;

        if (newValue.length <= MAX_CHARACTERS && lines <= MAX_LINES) {
            setInput(newValue);
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
        } else if (newValue.length > MAX_CHARACTERS) {
            setInput(newValue.slice(0, MAX_CHARACTERS));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }

        if (e.key === 'Enter' && e.shiftKey) {
            const lines = input.split('\n').length;
            if (lines >= MAX_LINES) {
                e.preventDefault();
            }
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isWaitingResponse) return;

        addMessage({ text: input, sender: "user" });
        const userMessage = input;
        setInput("");

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        setIsTyping(true);
        setIsWaitingResponse(true);

        const botResponse = await sendToAPI(userMessage);
        setIsTyping(false);

        addMessage({
            text: botResponse.respuesta,
            sender: "bot",
            options: botResponse.opciones || [],
        });

        setIsWaitingResponse(false);
    };

    const handleOptionClick = async (option) => {
        if (isWaitingResponse) return;

        addMessage({ text: option, sender: "user" });
        setIsTyping(true);
        setIsWaitingResponse(true);

        const botResponse = await sendToAPI(option);
        setIsTyping(false);

        addMessage({
            text: botResponse.respuesta,
            sender: "bot",
            options: botResponse.opciones || [],
        });

        setIsWaitingResponse(false);
    };

    const remainingChars = MAX_CHARACTERS - input.length;

    return (
        <>
            {/* Contenedor principal - Desktop */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
                {/* Notificación flotante */}
                {!open && showNotification && (
                    <div className="absolute bottom-16 sm:bottom-20 right-0 w-72 sm:w-80 bg-white rounded-lg shadow-2xl p-3 sm:p-4 mb-2 animate-slide-up border-l-4 border-blue-600">
                        <div className="flex items-start gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0">
                                <img src={botLogo} className="w-full h-full rounded-full" alt="bot" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-gray-800 text-sm">TorqueBot</h4>
                                    <button
                                        onClick={() => setShowNotification(false)}
                                        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">{lastBotMessage}</p>
                                <button
                                    onClick={handleToggle}
                                    className="text-blue-600 text-xs font-medium mt-2 hover:underline"
                                >
                                    Ver mensaje
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Botón flotante con animación de pulso */}
                {!open && (
                    <div className="relative">
                        {unreadCount > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold z-10 animate-pulse">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </div>
                        )}
                        <button
                            onClick={handleToggle}
                            className="relative w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 group"
                        >
                            {/* Anillo de pulso externo */}
                            <span className="absolute inset-0 rounded-full bg-blue-600 opacity-75 animate-ping"></span>
                            {/* Anillo de pulso medio */}
                            <span className="absolute inset-0 rounded-full bg-blue-600 opacity-50 animate-pulse"></span>
                            {/* Icono */}
                            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" />
                        </button>
                    </div>
                )}

                {/* ⭐ Ventana de chat - Desktop (posición absoluta relativa al botón) */}
                {shouldRender && (
                    <div 
                        className={`
                            hidden sm:flex
                            absolute bottom-0 right-0
                            w-[400px] h-[600px]
                            bg-white rounded-2xl shadow-2xl 
                            overflow-hidden flex-col
                            transition-all duration-300 ease-in-out
                            ${isVisible 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-50'
                            }
                            origin-bottom-right
                        `}
                    >
                        {/* Tutorial Overlay Component */}
                        <TutorialOverlay
                            isVisible={showTutorial}
                            currentStep={currentTutorialStep}
                            steps={tutorialSteps}
                            onNext={nextTutorialStep}
                            onPrevious={previousTutorialStep}
                            onSkip={skipTutorial}
                            onComplete={completeTutorial}
                        />

                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <img src={botLogo} className="w-full h-full rounded-full" alt="logotipo de bot" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">TorqueBot</h3>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-blue-100 text-xs">
                                            {isWaitingResponse ? "Escribiendo..." : "En línea"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {/* Botón para volver a ver tutorial */}
                                {hasSeenTutorial && (
                                    <button
                                        onClick={() => setShowTutorial(true)}
                                        className="text-white hover:bg-white/20 p-2 rounded-lg transition"
                                        title="Ver tutorial"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    onClick={handleClose}
                                    className="text-white hover:bg-white/20 p-2 rounded-lg transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div id="messages-container" className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg, idx) => {
                                const isUser = msg.sender === "user";
                                return (
                                    <div
                                        key={idx}
                                        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
                                    >
                                        <div
                                            className={`flex gap-2 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser && "bg-blue-500"}`}
                                            >
                                                {isUser ? (
                                                    <User className="w-5 h-5 text-white" />
                                                ) : (
                                                    <img src={botLogo} className="w-full h-full rounded-full" alt="logotipo de bot" />
                                                )}
                                            </div>
                                            <div>
                                                <div
                                                    className={`rounded-2xl px-4 py-3 ${isUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 shadow-md rounded-tl-none border border-gray-100"}`}
                                                >
                                                    <p className="text-sm whitespace-pre-line leading-relaxed">
                                                        {msg.text}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`text-xs text-gray-500 mt-1 block ${isUser ? "text-right" : "text-left"}`}
                                                >
                                                    {msg.time}
                                                </span>
                                                {msg.options && !isWaitingResponse && (
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {msg.options.map((option, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleOptionClick(option)}
                                                                disabled={isWaitingResponse}
                                                                className="option-btn bg-white border-2 border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {isTyping && (
                                <div className="flex justify-start mb-2">
                                    <div className="flex gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                                            <img src={botLogo} className="w-full h-full rounded-full" alt="logotipo de bot" />
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-md border border-gray-100">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: "0.1s" }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: "0.2s" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-gray-200 p-4 bg-white">
                            <div className="flex gap-2 items-end">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder={isWaitingResponse ? "Espera la respuesta del bot..." : "Escribe tu mensaje..."}
                                    rows={1}
                                    disabled={isWaitingResponse}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none overflow-y-auto disabled:bg-gray-100 disabled:cursor-not-allowed text-base"
                                    style={{
                                        maxHeight: '120px',
                                        minHeight: '48px'
                                    }}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isWaitingResponse}
                                    className="flex justify-center items-center bg-blue-600 text-white p-3 rounded-full w-12 h-12 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-gray-500">
                                    {isWaitingResponse
                                        ? "Esperando respuesta..."
                                        : "Enter para enviar • Shift + Enter para nueva línea"
                                    }
                                </p>
                                <p className={`text-xs font-medium ${remainingChars < 50 ? 'text-orange-500' : remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {remainingChars}/{MAX_CHARACTERS}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ⭐ Ventana de chat - Mobile (pantalla completa) */}
            {shouldRender && (
                <div 
                    className={`
                        flex sm:hidden
                        fixed inset-0
                        w-full h-[100dvh]
                        bg-white
                        overflow-hidden flex-col
                        transition-all duration-300 ease-in-out
                        ${isVisible 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-50'
                        }
                        origin-bottom-right
                        z-50
                    `}
                >
                    {/* Tutorial Overlay Component */}
                    <TutorialOverlay
                        isVisible={showTutorial}
                        currentStep={currentTutorialStep}
                        steps={tutorialSteps}
                        onNext={nextTutorialStep}
                        onPrevious={previousTutorialStep}
                        onSkip={skipTutorial}
                        onComplete={completeTutorial}
                    />

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                                <img src={botLogo} className="w-full h-full rounded-full" alt="logotipo de bot" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base">TorqueBot</h3>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-blue-100 text-xs">
                                        {isWaitingResponse ? "Escribiendo..." : "En línea"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {/* Botón para volver a ver tutorial */}
                            {hasSeenTutorial && (
                                <button
                                    onClick={() => setShowTutorial(true)}
                                    className="text-white hover:bg-white/20 p-1.5 rounded-lg transition"
                                    title="Ver tutorial"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            )}
                            <button
                                onClick={handleClose}
                                className="text-white hover:bg-white/20 p-1.5 rounded-lg transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div id="messages-container" className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                        {messages.map((msg, idx) => {
                            const isUser = msg.sender === "user";
                            return (
                                <div
                                    key={idx}
                                    className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
                                >
                                    <div
                                        className={`flex gap-2 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isUser && "bg-blue-500"}`}
                                        >
                                            {isUser ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <img src={botLogo} className="w-full h-full rounded-full" alt="logotipo de bot" />
                                            )}
                                        </div>
                                        <div>
                                            <div
                                                className={`rounded-2xl px-3 py-2 ${isUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 shadow-md rounded-tl-none border border-gray-100"}`}
                                            >
                                                <p className="text-xs whitespace-pre-line leading-relaxed">
                                                    {msg.text}
                                                </p>
                                            </div>
                                            <span
                                                className={`text-xs text-gray-500 mt-1 block ${isUser ? "text-right" : "text-left"}`}
                                            >
                                                {msg.time}
                                            </span>
                                            {msg.options && !isWaitingResponse && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {msg.options.map((option, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => handleOptionClick(option)}
                                                            disabled={isWaitingResponse}
                                                            className="option-btn bg-white border-2 border-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {isTyping && (
                            <div className="flex justify-start mb-2">
                                <div className="flex gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                                        <img src={botLogo} className="w-full h-full rounded-full" alt="logotipo de bot" />
                                    </div>
                                    <div className="bg-white rounded-2xl rounded-tl-none px-3 py-2 shadow-md border border-gray-100">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{ animationDelay: "0.1s" }}
                                            ></div>
                                            <div
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{ animationDelay: "0.2s" }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 p-3 bg-white">
                        <div className="flex gap-2 items-end">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder={isWaitingResponse ? "Espera la respuesta del bot..." : "Escribe tu mensaje..."}
                                rows={1}
                                disabled={isWaitingResponse}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none overflow-y-auto disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                                style={{
                                    maxHeight: '120px',
                                    minHeight: '44px'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isWaitingResponse}
                                className="flex justify-center items-center bg-blue-600 text-white p-2.5 rounded-full w-11 h-11 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-[10px] text-gray-500">
                                {isWaitingResponse ? "Esperando..." : "Enter: enviar"}
                            </p>
                            <p className={`text-[10px] font-medium ${remainingChars < 50 ? 'text-orange-500' : remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                                {remainingChars}/{MAX_CHARACTERS}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;