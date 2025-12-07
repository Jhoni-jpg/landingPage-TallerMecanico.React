import { useEffect } from "react";
import { MessageCircle, X, Send, User } from 'lucide-react';
import botLogo from '../assets/TorqueBot.jpg';
import { useChatContext } from '../hooks/useChatContext';

const API_URL = "http://localhost:8000";

const Chatbot = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
    const {
        messages,
        isTyping,
        setIsTyping,
        input,
        setInput,
        internalOpen,
        setInternalOpen,
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
    } = useChatContext();

    // Combina el control interno y externo
    const open = externalIsOpen !== undefined ? externalIsOpen : internalOpen;

    const handleClose = () => {
        if (externalOnClose) {
            externalOnClose();
        } else {
            setInternalOpen(false);
        }
    };

    const handleToggle = () => {
        const willOpen = !internalOpen;
        setInternalOpen(willOpen);

        if (willOpen) {
            setUnreadCount(0);
            setShowNotification(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, messagesEndRef]);

    // Conectar con tu API
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

    // Maneja el cambio en el textarea y ajusta la altura
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

    // Maneja el evento de tecla presionada
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
        <div className="fixed bottom-6 right-6 z-50">
            {/* Notificación flotante cuando el chat está cerrado */}
            {!open && showNotification && (
                <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-2xl p-4 mb-2 animate-slide-up border-l-4 border-blue-600">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full flex-shrink-0">
                            <img src={botLogo} className="w-full h-full rounded-full" alt="bot" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-gray-800 text-sm">TorqueBot</h4>
                                <button
                                    onClick={() => setShowNotification(false)}
                                    className="text-gray-400 hover:text-gray-600"
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

            {/* Botón flotante - solo visible cuando NO está abierto */}
            {!open && (
                <div className="relative">
                    {/* Badge de notificaciones */}
                    {unreadCount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10 animate-pulse">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </div>
                    )}
                    <button
                        onClick={handleToggle}
                        className="w-16 h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 animate-bounce hover:animate-none"
                    >
                        <MessageCircle className="w-8 h-8" />
                    </button>
                </div>
            )}

            {/* Ventana de chat */}
            {open && (
                <div className="w-[380px] sm:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] transition-all duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between">
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
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none overflow-y-auto disabled:bg-gray-100 disabled:cursor-not-allowed"
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
    );
};

export default Chatbot;