import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [hasAskedPermission, setHasAskedPermission] = useState(false);

  // Solicitar permiso automáticamente al cargar
  useEffect(() => {
    const requestPermissionOnLoad = async () => {
      if ("Notification" in window) {
        // Solo pedir si no se ha otorgado ni denegado
        if (Notification.permission === "default" && !hasAskedPermission) {
          // Pequeño delay para que la página cargue primero
          setTimeout(async () => {
            const newPermission = await Notification.requestPermission();
            setPermission(newPermission);
            setHasAskedPermission(true);

            // Si se otorgó, mostrar notificación de bienvenida
            if (newPermission === 'granted') {
              new Notification('¡Notificaciones activadas!', {
                body: 'Ahora recibirás alertas importantes de TorqueBot',
                icon: '/vite.svg', // Cambia por tu ícono
              });
            }
          }, 1500); // Espera 1.5 segundos después de cargar
        }
      }
    };

    requestPermissionOnLoad();
  }, [hasAskedPermission]);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const newPermission = await Notification.requestPermission();
      setPermission(newPermission);
      setHasAskedPermission(true);
      return newPermission === "granted";
    }
    return false;
  };

  const sendBrowserNotification = (title, body, icon) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon,
        badge: icon,
      });
    }
  };

  const value = {
    sendBrowserNotification,
    requestNotificationPermission,
    permission,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;