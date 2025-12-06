import React, { useState, useEffect, useRef } from 'react';
import { Wrench, Cpu, AlertCircle, Zap, Repeat, Activity, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const servicesData = [
  {
    title: "Mantenimiento General",
    description:
      "Revisiones y mantenimiento preventivo para asegurar el correcto funcionamiento del vehículo.",
    icon: <Wrench size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Diagnóstico Computarizado",
    description:
      "Uso de escáneres avanzados para identificar fallos electrónicos en el vehículo.",
    icon: <Cpu size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Reparación de Frenos",
    description:
      "Servicio especializado en sistemas de freno para mayor seguridad en cada frenada.",
    icon: <AlertCircle size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Electricidad Automotriz",
    description:
      "Mantenimiento y reparación de sistemas eléctricos y electrónicos del vehículo.",
    icon: <Zap size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Alineación y Balanceo",
    description:
      "Alineamos y balanceamos las ruedas para un manejo más estable y seguro.",
    icon: <Repeat size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cambio de Llantas",
    description:
      "Servicio rápido y profesional para cambiar tus neumáticos cuando sea necesario.",
    icon: <Activity size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Reparación de Motor",
    description:
      "Diagnóstico profundo y reparación del motor para restaurar potencia y eficiencia.",
    icon: <Settings size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
  },
];

const Services = () => {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  const CARD_WIDTH = 350; // 320px card + 30px gap
  const TOTAL_WIDTH = servicesData.length * CARD_WIDTH;

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isDragging) {
        setOffset((prev) => {
          const newOffset = prev - 0.5;
          // Loop infinito
          if (Math.abs(newOffset) >= TOTAL_WIDTH) {
            return 0;
          }
          return newOffset;
        });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, TOTAL_WIDTH]);

  // Scroll manual con mouse/touch
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(offset);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(offset);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para hacer el drag más sensible
    setOffset(scrollLeft + walk);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    setOffset(scrollLeft + walk);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1000); // Reanudar auto-scroll después de 1 segundo
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Botones de navegación
  const scrollTo = (direction) => {
    setIsPaused(true);
    const scrollAmount = direction === 'left' ? CARD_WIDTH : -CARD_WIDTH;
    setOffset((prev) => {
      const newOffset = prev + scrollAmount;
      // Loop infinito
      if (newOffset > 0) {
        return -TOTAL_WIDTH + scrollAmount;
      }
      if (Math.abs(newOffset) >= TOTAL_WIDTH) {
        return scrollAmount;
      }
      return newOffset;
    });
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <>
      <section className="max-w-full py-12 px-12 mb-40 flex justify-center items-center" id="servicios">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-gray-600 text-lg mt-4">Soluciones integrales para mantener tu vehículo en perfecto estado</p>
            <p className="text-gray-500 text-sm mt-2">Arrastra para navegar o usa las flechas</p>
          </div>

          <div className="relative overflow-hidden pb-14 pt-4">
            {/* Degradados en los bordes */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none" style={{
              background: 'linear-gradient(to right, #f3f4f6, transparent)'
            }} />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none" style={{
              background: 'linear-gradient(to left, #f3f4f6, transparent)'
            }} />

            {/* Botones de navegación */}
            <button
              className="nav-button left"
              onClick={() => scrollTo('left')}
              aria-label="Anterior"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            <button
              className="nav-button right"
              onClick={() => scrollTo('right')}
              aria-label="Siguiente"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>

            {/* Carrusel */}
            <div
              ref={carouselRef}
              className="relative flex gap-8 transition-transform duration-100"
              style={{
                transform: `translateX(${offset}px)`,
                width: 'fit-content',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Triplicamos los servicios para el efecto infinito */}
              {[...servicesData, ...servicesData, ...servicesData].map((service, index) => (
                <div
                  key={index}
                  className="service-card flex-shrink-0 w-80"
                  onMouseEnter={() => !isDragging && setIsPaused(true)}
                  onMouseLeave={() => !isDragging && setIsPaused(false)}
                >
                  <div className="service-card-content">
                    <div className="service-icon">
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <style>{`
                    .service-card:nth-child(${index + 1})::before {
                      background-image: linear-gradient(
                          rgba(0, 0, 0, 0.5),
                          rgba(0, 0, 0, 0.5)
                        ),
                        url('${service.image}');
                    }
                  `}</style>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores de progreso (opcional) */}
          <div className="flex justify-center gap-2 mt-6">
            {servicesData.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.abs(offset) % TOTAL_WIDTH > index * CARD_WIDTH - 100 &&
                    Math.abs(offset) % TOTAL_WIDTH < (index + 1) * CARD_WIDTH + 100
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300'
                  }`}
                onClick={() => {
                  setOffset(-index * CARD_WIDTH);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2000);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;