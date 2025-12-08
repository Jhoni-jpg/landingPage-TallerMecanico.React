import { createContext, useContext, useState } from "react";
import logoPage from "../assets/logo.png";

// ========================================
// CONFIGURACIÓN DE UBICACIONES
// Agrega o edita ubicaciones aquí
// ========================================
const UBICACIONES = [
    {
        id: 1,
        name: "AF | Taller Automotriz Principal",
        lat: 10.99252,
        lng: -74.78332,
        address: "Calle 123 #45-67, Barranquilla - Atlántico, Colombia",
        description: "Mantenimiento, mecánica y más.",
        schedule: "Lun-Vie: 7am - 9pm",
        logo: logoPage,
        workDays: [1, 2, 3, 4, 5],
        startHour: 7,
        endHour: 21,
        googleMapsUrl: "https://maps.app.goo.gl/wB2Pfg5MiPGkRnet9"
    },
    {
        id: 2,
        name: "AF | Sucursal Norte",
        lat: 11.00852,
        lng: -74.79332,
        address: "Avenida Norte #89-12, Barranquilla - Atlántico, Colombia",
        description: "Especialistas en transmisión y frenos.",
        schedule: "Lun-Sab: 8am - 6pm",
        logo: logoPage,
        workDays: [1, 2, 3, 4, 5, 6],
        startHour: 8,
        endHour: 18,
        googleMapsUrl: "https://maps.app.goo.gl/wB2Pfg5MiPGkRnet9"
    },
    {
        id: 3,
        name: "AF | Express Sur",
        lat: 10.97852,
        lng: -74.77332,
        address: "Carrera Sur #34-56, Barranquilla - Atlántico, Colombia",
        description: "Servicio rápido y cambio de aceite.",
        schedule: "Lun-Vie: 9am - 7pm",
        logo: logoPage,
        workDays: [1, 2, 3, 4, 5],
        startHour: 9,
        endHour: 19,
        googleMapsUrl: "https://maps.app.goo.gl/wB2Pfg5MiPGkRnet9"
    }
];

const LocationContext = createContext();

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation debe ser usado dentro de LocationProvider");
    }
    return context;
};

export const LocationProvider = ({ children }) => {
    const [locations] = useState(UBICACIONES);
    const [selected, setSelected] = useState(null);

    // Función para verificar si una ubicación está abierta
    const isLocationOpen = (location) => {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();

        if (location.workDays.includes(day)) {
            return hours >= location.startHour && hours < location.endHour;
        }
        return false;
    };

    const getStatusText = (location) => {
        return isLocationOpen(location) ? "Abierto ahora" : "Cerrado";
    };

    // Encontrar la ubicación más cercana
    const findNearestLocation = (lat, lng) => {
        let nearestLocation = locations[0];
        let minDistance = Infinity;

        locations.forEach(location => {
            const distance = Math.sqrt(
                Math.pow(lat - location.lat, 2) +
                Math.pow(lng - location.lng, 2)
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearestLocation = location;
            }
        });

        return nearestLocation;
    };

    // Calcular centro del mapa basado en todas las ubicaciones
    const getMapCenter = () => {
        if (locations.length === 0) return [10.99252, -74.78332];

        const avgLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
        const avgLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;

        return [avgLat, avgLng];
    };

    // Calcular distancia real entre dos puntos (Haversine formula)
    const calculateRealDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371e3; // Radio de la Tierra en metros
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lng2 - lng1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distancia en metros
    };

    const value = {
        locations,
        selected,
        setSelected,
        isLocationOpen,
        getStatusText,
        findNearestLocation,
        getMapCenter,
        calculateRealDistance
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
};