import { motion, AnimatePresence } from 'framer-motion';
import { quickServices } from '../../data/service.js';
import { useServices } from '../../context/services.context.jsx';

export default function QuickServices() {
    const { selectedCategory, setSelectedCategory } = useServices();

    // Variantes para el contenedor principal
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    // Variantes para cada botón con animación de entrada
    const buttonVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.8
        },
        visible: (custom) => ({
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: custom * 0.05
            }
        }),
        hover: {
            scale: 1.05,
            y: -3,
            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
        }
    };

    // Variantes para el icono
    const iconVariants = {
        initial: { rotate: 0, scale: 1 },
        hover: {
            rotate: [0, -12, 12, -12, 0],
            scale: 1.1,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        },
        active: {
            rotate: [0, 360],
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Ordenar servicios: activo primero
    const sortedServices = [...quickServices].sort((a, b) => {
        if (a.id === selectedCategory) return -1;
        if (b.id === selectedCategory) return 1;
        return 0;
    });

    return (
        <motion.div 
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div 
                className="flex gap-4 overflow-x-auto p-10 scrollbar-hide"
                layout
            >
                <AnimatePresence mode="popLayout">
                    {sortedServices.map((s, index) => {
                        const Icon = s.icon;
                        const active = selectedCategory === s.id;
                        
                        return (
                            <motion.button
                                key={s.id}
                                onClick={() => setSelectedCategory(s.id)}
                                variants={buttonVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                whileTap="tap"
                                custom={index}
                                layout
                                transition={{
                                    layout: {
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30
                                    }
                                }}
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold whitespace-nowrap shadow-lg flex-shrink-0 relative overflow-hidden
                                    ${active 
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-2 border-blue-400' 
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                                    }`}
                            >
                                {/* Efecto de partículas al seleccionar */}
                                <AnimatePresence>
                                    {active && (
                                        <>
                                            {/* Brillo deslizante */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                                initial={{ x: '-100%' }}
                                                animate={{ x: '200%' }}
                                                exit={{ x: '200%' }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 2,
                                                    ease: "linear",
                                                    repeatDelay: 1
                                                }}
                                            />
                                            
                                            {/* Pulso de fondo */}
                                            <motion.div
                                                className="absolute inset-0 bg-blue-400 rounded-2xl"
                                                initial={{ scale: 1, opacity: 0.5 }}
                                                animate={{ 
                                                    scale: [1, 1.05, 1],
                                                    opacity: [0.5, 0.2, 0.5]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        </>
                                    )}
                                </AnimatePresence>

                                {/* Icono con animación */}
                                <motion.div
                                    variants={iconVariants}
                                    initial="initial"
                                    animate={active ? "active" : "initial"}
                                    className="relative z-10"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.div>

                                {/* Texto con animación */}
                                <motion.span
                                    className="relative z-10"
                                    animate={active ? { 
                                        scale: [1, 1.05, 1],
                                    } : {}}
                                    transition={{ 
                                        duration: 0.3,
                                        repeat: active ? Infinity : 0,
                                        repeatDelay: 2
                                    }}
                                >
                                    {s.name}
                                </motion.span>

                                {/* Badge de "Nuevo" o contador */}
                                {active && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                        className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full z-10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 15
                                        }}
                                    >
                                        <motion.div
                                            className="w-full h-full bg-yellow-400 rounded-full"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [1, 0, 1]
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {/* Indicador de scroll */}
            <motion.div 
                className="flex justify-center gap-1 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {quickServices.map((s) => (
                    <motion.div
                        key={s.id}
                        className={`h-1 rounded-full transition-all duration-300 ${
                            s.id === selectedCategory 
                                ? 'w-8 bg-blue-500' 
                                : 'w-1 bg-gray-300'
                        }`}
                        layoutId={`indicator-${s.id}`}
                        onClick={() => setSelectedCategory(s.id)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}