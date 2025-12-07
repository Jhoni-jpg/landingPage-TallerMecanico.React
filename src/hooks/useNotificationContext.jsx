import { useContext } from 'react';
import NotificationContext from '../context/notification.context';

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotificationContext debe ser usado dentro de NotificationProvider');
    }
    return context;
};