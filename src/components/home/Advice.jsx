import React, { useState } from 'react';
import autoConsejos from '../../assets/autoConsejos.avif'
import { X, Gauge, Battery, AlertTriangle, Sparkles, Wrench, Droplets } from 'lucide-react';

const CarTips = () => {
  const [activeTip, setActiveTip] = useState(null);

  const tips = {
    1: {
      title: "Revisión general",
      icon: <Wrench />,
      color: "text-blue-600",
      background: "bg-blue-100",
      content: "Realiza una inspección completa cada 6 meses para prevenir fallos inesperados. Incluye revisión de motor, correas y niveles de fluidos."
    },
    2: {
      title: "Cambio de aceite",
      icon: <Droplets />,
      color: "text-green-600",
      background: "bg-green-100",
      content: "Cambia el aceite cada 5.000 km para mantener la lubricación óptima."
    },
    3: {
      title: "Presión de llantas",
      icon: <Gauge />,
      color: "text-yellow-600",
      background: "bg-yellow-100",
      content: "Verifica la presión cada semana. Una presión incorrecta puede afectar el consumo de combustible y la seguridad. Revisa también el desgaste de la banda de rodadura."
    },
    4: {
      title: "Estado de la batería",
      icon: <Battery />,
      color: "text-red-600",
      background: "bg-red-100",
      content: "Revisa los bornes y la carga de la batería cada 3 meses. Limpia los terminales si hay corrosión y verifica que esté bien sujeta."
    },
    5: {
      title: "Frenos y seguridad",
      icon: <AlertTriangle />,
      color: "text-orange-600",
      background: "bg-orange-100",
      content: "Si escuchas ruidos al frenar o sientes vibraciones, ven inmediatamente. Los frenos son fundamentales para tu seguridad. Revísalos cada 10.000 km."
    },
    6: {
      title: "Limpieza interior y exterior",
      icon: <Sparkles />,
      color: "text-purple-600",
      background: "bg-purple-100",
      content: "Mantén tu auto limpio por dentro y por fuera. La limpieza regular protege la pintura, evita corrosión y mantiene el valor del vehículo."
    }
  };

  const hotspots = [
    { id: 1, top: '15%', left: '25%' },
    { id: 2, top: '45%', left: '20%' },
    { id: 3, top: '75%', left: '30%' },
    { id: 4, top: '20%', left: '15%' },
    { id: 5, top: '65%', left: '70%' },
    { id: 6, top: '35%', left: '55%' }
  ];

  return (
    <section className="bg-transparent py-20 mb-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Consejos y Cuidados del Auto
          </h2>
          <p className="text-gray-600 mb-8">
            Haz clic en cada número para conocer los consejos de mantenimiento
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Imagen del auto */}
          <div className="relative">
            <img
              src={autoConsejos}
              alt="Auto con consejos de mantenimiento"
              className="w-full h-auto rounded-lg"
            />

            {/* Hotspots numerados */}
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveTip(activeTip === spot.id ? null : spot.id)}
                className={`absolute w-12 h-12 rounded-full bg-blue-700 text-white font-bold text-lg
                          shadow-lg hover:scale-110 hover:bg-blue-800 transition-all duration-200 flex items-center justify-center
                          ${activeTip === spot.id ? 'ring-4 ring-white scale-110' : ''}`}
                style={{ top: spot.top, left: spot.left, transform: 'translate(-50%, -50%)' }}
              >
                {spot.id}
              </button>
            ))}
          </div>

          {/* Tooltip flotante */}
          {activeTip && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center transition-all duration-300 justify-center z-50 p-4"
              onClick={() => setActiveTip(null)}>
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full ${tips[activeTip].color} ${tips[activeTip].background} font-bold text-xl
                                  flex items-center justify-center flex-shrink-0`}>
                    {tips[activeTip].icon}
                  </div>
                  <button
                    onClick={() => setActiveTip(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {tips[activeTip].title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {tips[activeTip].content}
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Toca cualquier número sobre el vehículo para ver los consejos
        </p>
      </div>
    </section>
  );
}

export default CarTips;