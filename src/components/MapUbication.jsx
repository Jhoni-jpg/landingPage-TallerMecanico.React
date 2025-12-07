import { useEffect, useState } from "react";
import logoPage from "../assets/logo.png";
import "leaflet/dist/leaflet.css";

export default function MapUbication() {
    const [selected, setSelected] = useState(null);

    // Función para verificar si está abierto
    const isOpen = () => {
        const now = new Date();
        const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
        const hours = now.getHours();

        // Lunes (1) a Viernes (5), de 7am a 9pm
        if (day >= 1 && day <= 5) {
            return hours >= 7 && hours < 21;
        }

        return false; // Cerrado sábados y domingos
    };

    const getStatusText = () => {
        return isOpen() ? "Abierto ahora" : "Cerrado";
    };

    useEffect(() => {
        import("leaflet").then((L) => {
            const lt = 10.99252;
            const lg = -74.78332;

            const map = L.map("map").setView([lt, lg], 13);

            L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
                attribution: "Ubicación directa",
            }).addTo(map);

            const customIcon = L.icon({
                iconUrl: logoPage,
                iconSize: [38, 38],
                iconAnchor: [19, 38],
                popupAnchor: [0, -38],
            });

            const marker = L.marker([lt, lg], { icon: customIcon }).addTo(map);

            marker.bindPopup(
                "<b>AF | Tu taller automotriz de confianza</b><br>Barranquilla - Atlántico, Colombia"
            );

            marker.on("click", () => {
                setSelected({
                    title: "AF | Taller Automotriz",
                    desc: "Barranquilla - Atlántico, Colombia. Mantenimiento, mecánica y más.",
                });
            });

            let userMarker = null;
            let routeLine = null;

            const btn = document.getElementById("btn-location");

            if (btn) {
                btn.addEventListener("click", () => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (pos) => {
                                const lat = pos.coords.latitude;
                                const lng = pos.coords.longitude;

                                if (userMarker) map.removeLayer(userMarker);
                                if (routeLine) map.removeLayer(routeLine);

                                userMarker = L.marker([lat, lng], {
                                    icon: L.icon({
                                        iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
                                        iconSize: [35, 35],
                                        iconAnchor: [17, 35],
                                    }),
                                })
                                    .addTo(map)
                                    .bindPopup("Tu ubicación actual")
                                    .openPopup();

                                routeLine = L.polyline(
                                    [
                                        [lat, lng],
                                        [lt, lg],
                                    ],
                                    { color: "#3b82f6", weight: 4, dashArray: "10,8" }
                                ).addTo(map);

                                const bounds = L.latLngBounds([lat, lng], [lt, lg]);
                                map.flyToBounds(bounds, { padding: [50, 50], duration: 1.8 });
                            },
                            () => alert("No se pudo obtener tu ubicación")
                        );
                    } else {
                        alert("Tu navegador no soporta geolocalización.");
                    }
                });
            }
        });
    }, []);

    return (
        <section className="bg-gray-100 mt-20 mb-40 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Encuéntranos
                    </h2>
                    <p className="text-gray-600">
                        Visítanos en Barranquilla o traza tu ruta desde donde estés
                    </p>
                </div>

                <div className="flex justify-center mb-6">
                    <button
                        id="btn-location"
                        className="relative overflow-hidden px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-600 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                    >
                        <span className="absolute inset-0 bg-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>

                        <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Obtener mi ubicación
                        </span>
                    </button>
                </div>

                <div className="relative">
                    <div
                        className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 hover:shadow-3xl transition-shadow duration-300 relative z-0"
                        id="map"
                        style={{
                            height: "500px",
                            width: "100%",
                        }}
                    ></div>

                    {selected && (
                        <div className="absolute bottom-8 left-8 bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-2xl w-80 text-white hover:scale-105 transition-transform duration-300 z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-3 h-3 rounded-full ${isOpen() ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                        <h3 className="text-xl font-bold">{selected.title}</h3>
                                    </div>
                                    <p className={`text-xs font-medium mb-2 ${isOpen() ? 'text-green-300' : 'text-red-300'}`}>
                                        {getStatusText()} • Lun-Vie: 7am - 9pm
                                    </p>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {selected.desc}
                                    </p>
                                </div>

                                <button
                                    className="ml-3 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                                    onClick={() => setSelected(null)}
                                >
                                    <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <a
                                href="https://maps.app.goo.gl/wB2Pfg5MiPGkRnet9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Abrir en Google Maps
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}