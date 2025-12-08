import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const useMap = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useMap debe ser usado dentro de MapProvider");
    }
    return context;
};

export const MapProvider = ({ children }) => {
    const [map, setMap] = useState(null);
    const [L, setL] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [routingControl, setRoutingControl] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);

    // Formatear distancia
    const formatDistance = (meters) => {
        if (meters < 1000) {
            return `${Math.round(meters)} m`;
        }
        return `${(meters / 1000).toFixed(1)} km`;
    };

    // Formatear tiempo
    const formatTime = (seconds) => {
        const minutes = Math.round(seconds / 60);
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}min`;
    };

    // Crear ruta a una ubicación específica
    const createRouteToLocation = async (LeafletLib, mapInstance, userMarker, lat, lng, targetLocation, setSelected, calculateRealDistance) => {
        try {
            // Cargar el script si no está cargado
            if (!window.L.Routing) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            // Crear ruta usando calles reales con OSRM
            const control = window.L.Routing.control({
                waypoints: [
                    window.L.latLng(lat, lng),
                    window.L.latLng(targetLocation.lat, targetLocation.lng)
                ],
                router: window.L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1',
                    language: 'es',
                    profile: 'driving'
                }),
                routeWhileDragging: false,
                showAlternatives: false,
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                lineOptions: {
                    styles: [
                        { color: '#3b82f6', opacity: 0.8, weight: 6 },
                        { color: '#60a5fa', opacity: 1, weight: 4 }
                    ]
                },
                createMarker: function () { return null; },
                show: false,
            }).addTo(mapInstance);

            // Obtener información de la ruta
            control.on('routesfound', function (e) {
                const routes = e.routes;
                const route = routes[0];

                setRouteInfo({
                    distance: formatDistance(route.summary.totalDistance),
                    time: formatTime(route.summary.totalTime),
                    destination: targetLocation.name,
                    straightLineDistance: formatDistance(calculateRealDistance(lat, lng, targetLocation.lat, targetLocation.lng))
                });
            });

            setSelected(targetLocation);

            return control;

        } catch (error) {
            console.error("Error al cargar leaflet-routing-machine:", error);

            // Fallback: dibujar línea simple si falla la ruta
            const routeLine = LeafletLib.polyline(
                [
                    [lat, lng],
                    [targetLocation.lat, targetLocation.lng],
                ],
                { color: "#3b82f6", weight: 4, dashArray: "10,8" }
            ).addTo(mapInstance);

            const bounds = LeafletLib.latLngBounds([lat, lng], [targetLocation.lat, targetLocation.lng]);
            mapInstance.flyToBounds(bounds, { padding: [50, 50], duration: 1.8 });

            setSelected(targetLocation);
            return null;
        }
    };

    // Limpiar ruta del mapa
    const clearRoute = () => {
        if (routingControl && map) {
            try {
                map.removeControl(routingControl);
            } catch (error) {
                console.error("Error al remover control de ruta:", error);
            }
            setRoutingControl(null);
            setRouteInfo(null);
        }
    };

    // Limpiar todo (usuario + ruta)
    const clearAll = () => {
        // Limpiar ruta
        if (routingControl && map) {
            try {
                map.removeControl(routingControl);
            } catch (error) {
                console.error("Error al remover control de ruta:", error);
            }
            setRoutingControl(null);
        }

        // Limpiar marcador de usuario
        if (userLocation && userLocation.marker && map) {
            try {
                map.removeLayer(userLocation.marker);
            } catch (error) {
                console.error("Error al remover marcador de usuario:", error);
            }
            setUserLocation(null);
        }

        setRouteInfo(null);
    };

    // Centrar mapa en ubicación
    const focusLocation = (location) => {
        if (map) {
            map.flyTo([location.lat, location.lng], 15, {
                duration: 1.5
            });
        }
    };

    const value = {
        map,
        setMap,
        L,
        setL,
        userLocation,
        setUserLocation,
        routingControl,
        setRoutingControl,
        routeInfo,
        setRouteInfo,
        formatDistance,
        formatTime,
        createRouteToLocation,
        clearRoute,
        clearAll,
        focusLocation
    };

    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    );
};