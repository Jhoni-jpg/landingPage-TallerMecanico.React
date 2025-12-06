import { createContext, useState, useRef } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => [{
    text: "¡Hola! 👋 Bienvenido a SwiftService Taller Mecánico. Soy TorqueBot, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
    sender: "bot",
    time: new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    options: [
      "Agendar cita",
      "Estado de mi vehículo",
      "Servicios disponibles",
      "Cotización",
    ],
  }]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);
  const [conversacionId] = useState(() => `conv_${Date.now()}`);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [lastBotMessage, setLastBotMessage] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Configuración de límites
  const MAX_LINES = 4;
  const MAX_CHARACTERS = 300;

  const addMessage = (message) => {
    const time = new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMessage = { ...message, time };
    setMessages((prev) => [...prev, newMessage]);

    // Si es mensaje del bot y el chat está cerrado
    if (message.sender === "bot" && !internalOpen) {
      setUnreadCount((prev) => prev + 1);
      setLastBotMessage(message.text);
      setShowNotification(true);

      // Ocultar notificación después de 5 segundos
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      // Notificación del navegador (si está permitido)
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("TorqueBot", {
          body: message.text.substring(0, 100) + (message.text.length > 100 ? "..." : ""),
        });
      }
    }
  };

  const value = {
    messages,
    setMessages,
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
    setLastBotMessage,
    isWaitingResponse,
    setIsWaitingResponse,
    messagesEndRef,
    textareaRef,
    MAX_LINES,
    MAX_CHARACTERS,
    addMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;