import { useContext } from 'react';
import ChatContext from '../../context/ChatBot/ChatContext';

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext debe ser usado dentro de ChatProvider');
  }
  return context;
};