import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useLocation } from "../context/LocationContext";
import { useMap } from "../context/MapContext";
import MapContainer from "./map/MapContainer";
import MapControls from "./map/MapControls";
import RouteInfoPanel from "./map/RouteInfoPanel";
import DestinationSelector from "./map/DestinationSelector";
import LocationsPanel from "./map/LocationsPanel";
import SelectedLocationInfo from "./map/SelectedLocationInfo";

export default function MapUbication() {
    const [showLocations, setShowLocations] = useState(false);
    const [showDestinationSelector, setShowDestinationSelector] = useState(false);
    const [showRoutePanel, setShowRoutePanel] = useState(true);

    const {
        locations,
        selected,
        setSelected,
        findNearestLocation,
        getMapCenter,
        calculateRealDistance
    } = useLocation();

    const {
        map,
        setMap,
        L,
        setL,
        userLocation,
        setUserLocation,
        setRoutingControl,
        routeInfo,
        setRouteInfo,
        createRouteToLocation,
        clearRoute,
        clearAll, // Nueva función
        focusLocation
    } = useMap();

    // Manejar selección de destino
    const handleDestinationSelect = async (location) => {
        if (!userLocation || !map || !L) return;

        clearRoute();

        const control = await createRouteToLocation(
            L,
            map,
            userLocation.marker,
            userLocation.lat,
            userLocation.lng,
            location,
            setSelected,
            calculateRealDistance
        );

        if (control) {
            setRoutingControl(control);
            setShowRoutePanel(true);
        }

        setShowDestinationSelector(false);
    };

    // Manejar focus en ubicación
    const handleFocusLocation = (location) => {
        focusLocation(location);
        setSelected(location);
    };

    // Cerrar solo el panel, NO la ruta
    const handleCloseRoutePanel = () => {
        setShowRoutePanel(false);
    };

    useEffect(() => {
        // Cargar CSS de leaflet-routing-machine
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css';
        document.head.appendChild(link);

        import("leaflet").then((LeafletModule) => {
            const LeafletLib = LeafletModule.default;
            setL(LeafletLib);

            const center = getMapCenter();
            const mapInstance = LeafletLib.map("map").setView(center, 13);

            LeafletLib.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
                attribution: "Ubicación directa",
            }).addTo(mapInstance);

            setMap(mapInstance);

            // Agregar marcadores
            locations.forEach(location => {
                const customIcon = LeafletLib.icon({
                    iconUrl: location.logo,
                    iconSize: [38, 38],
                    iconAnchor: [19, 38],
                    popupAnchor: [0, -38],
                });

                const marker = LeafletLib.marker([location.lat, location.lng], {
                    icon: customIcon
                }).addTo(mapInstance);

                marker.bindPopup(`<b>${location.name}</b><br>${location.address}`);
                marker.on("click", () => setSelected(location));
            });

            // Ajustar vista
            if (locations.length > 1) {
                const bounds = LeafletLib.latLngBounds(locations.map(loc => [loc.lat, loc.lng]));
                mapInstance.fitBounds(bounds, { padding: [50, 50] });
            }

            const btn = document.getElementById("btn-location");

            if (btn) {
                const handleClick = () => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            async (pos) => {
                                const lat = pos.coords.latitude;
                                const lng = pos.coords.longitude;

                                // CRÍTICO: Limpiar TODO antes de crear nueva ubicación
                                clearAll();

                                // Pequeña pausa para asegurar la limpieza
                                await new Promise(resolve => setTimeout(resolve, 100));

                                // Agregar nuevo marcador de usuario
                                const userMarker = LeafletLib.marker([lat, lng], {
                                    icon: LeafletLib.icon({
                                        iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
                                        iconSize: [35, 35],
                                        iconAnchor: [17, 35],
                                    }),
                                })
                                    .addTo(mapInstance)
                                    .bindPopup("Tu ubicación actual")
                                    .openPopup();

                                // Guardar nueva ubicación de usuario
                                setUserLocation({ lat, lng, marker: userMarker });

                                // Encontrar ubicación más cercana
                                const nearestLocation = findNearestLocation(lat, lng);

                                // Crear nueva ruta
                                const control = await createRouteToLocation(
                                    LeafletLib,
                                    mapInstance,
                                    userMarker,
                                    lat,
                                    lng,
                                    nearestLocation,
                                    setSelected,
                                    calculateRealDistance
                                );

                                if (control) {
                                    setRoutingControl(control);
                                    setShowRoutePanel(true);
                                }

                                setShowDestinationSelector(true);
                            },
                            () => alert("No se pudo obtener tu ubicación")
                        );
                    } else {
                        alert("Tu navegador no soporta geolocalización.");
                    }
                };

                btn.addEventListener("click", handleClick);
            }

            return () => {
                if (mapInstance) {
                    mapInstance.remove();
                }
            };
        });
    }, [locations]);

    return (
        <section className="bg-gray-100 mt-20 mb-40 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Encuéntranos
                    </h2>
                    <p className="text-gray-600">
                        Visítanos en nuestras {locations.length} {locations.length === 1 ? 'ubicación' : 'ubicaciones'} o traza tu ruta desde donde estés
                    </p>
                </div>

                <MapControls
                    userLocation={userLocation}
                    onToggleDestinations={() => setShowDestinationSelector(!showDestinationSelector)}
                    onToggleLocations={() => setShowLocations(!showLocations)}
                    locationsCount={locations.length}
                />

                <div className="relative">
                    <MapContainer />

                    {showRoutePanel && (
                        <RouteInfoPanel 
                            routeInfo={routeInfo} 
                            onClose={handleCloseRoutePanel}
                        />
                    )}

                    <DestinationSelector
                        show={showDestinationSelector}
                        onClose={() => setShowDestinationSelector(false)}
                        userLocation={userLocation}
                        onSelectDestination={handleDestinationSelect}
                    />

                    <LocationsPanel
                        show={showLocations}
                        onClose={() => setShowLocations(false)}
                        onSelectLocation={handleFocusLocation}
                    />

                    <SelectedLocationInfo
                        location={selected}
                        onClose={() => setSelected(null)}
                    />
                </div>
            </div>
        </section>
    );
}