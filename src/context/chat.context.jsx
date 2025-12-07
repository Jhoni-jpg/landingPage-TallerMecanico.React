// src/context/ChatContext.jsx
import { createContext, useState, useRef } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Estado para el tutorial
  const [hasSeenTutorial, setHasSeenTutorial] = useState(() => {
    return localStorage.getItem('chatbot_tutorial_seen') === 'true';
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);

  const tutorialSteps = [
    {
      title: "¡Bienvenido a TorqueBot! 🤖",
      description: "Tu asistente para agendar citas en SwiftService",
      icon: "👋"
    },
    {
      title: "Paso 1: Tipo de servicio",
      description: "Primero, indícame qué tipo de servicio necesitas: mantenimiento, revisión o diagnóstico",
      icon: "🔧"
    },
    {
      title: "Paso 2: Detalles del servicio",
      description: "Te preguntaré detalles específicos sobre el servicio que necesitas",
      icon: "📋"
    },
    {
      title: "Paso 3: Tu información",
      description: "Necesitaré tu nombre, teléfono y correo electrónico para contactarte",
      icon: "📞"
    },
    {
      title: "Paso 4: Fecha y hora",
      description: "Seleccionarás el día y hora que mejor te convenga",
      icon: "📅"
    },
    {
      title: "¡Listo! ✅",
      description: "Recibirás una confirmación con todos los detalles de tu cita",
      icon: "✨"
    }
  ];

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

  const MAX_LINES = 4;
  const MAX_CHARACTERS = 300;

  const addMessage = (message) => {
    const time = new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMessage = { ...message, time };
    setMessages((prev) => [...prev, newMessage]);

    if (message.sender === "bot" && !internalOpen) {
      setUnreadCount((prev) => prev + 1);
      setLastBotMessage(message.text);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("TorqueBot", {
          body: message.text.substring(0, 100) + (message.text.length > 100 ? "..." : ""),
          icon: '/TorqueBot.jpg'
        });
      }
    }
  };

  const completeTutorial = () => {
    localStorage.setItem('chatbot_tutorial_seen', 'true');
    setHasSeenTutorial(true);
    setShowTutorial(false);
    setCurrentTutorialStep(0);
  };

  const skipTutorial = () => {
    completeTutorial();
  };

  const nextTutorialStep = () => {
    if (currentTutorialStep < tutorialSteps.length - 1) {
      setCurrentTutorialStep(prev => prev + 1);
    } else {
      completeTutorial();
    }
  };

  const previousTutorialStep = () => {
    if (currentTutorialStep > 0) {
      setCurrentTutorialStep(prev => prev - 1);
    }
  };

  // ⭐ Función toggleChat para abrir/cerrar desde cualquier componente
  const toggleChat = (forceOpen) => {
    const willOpen = forceOpen !== undefined ? forceOpen : !internalOpen;
    setInternalOpen(willOpen);

    if (willOpen) {
      setUnreadCount(0);
      setShowNotification(false);
      
      // Mostrar tutorial si es la primera vez
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  };

  // ⭐ Función para abrir el chat
  const openChat = () => toggleChat(true);

  // ⭐ Función para cerrar el chat
  const closeChat = () => toggleChat(false);

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

    // ⭐ Funciones para controlar el chat desde fuera
    toggleChat,
    openChat,
    closeChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;