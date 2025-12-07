import {
    Wrench, AlertCircle, Car, Settings, Gauge, Wind, Droplets,
    Zap, Disc, Activity, ThermometerSun, Fuel, Radio, Cog,
    Sparkles, Clipboard, Fan
} from 'lucide-react';


export const ITEMS_PER_PAGE_POPULAR = 5;
export const ITEMS_PER_PAGE_DIAGNOSTIC = 4;
export const ITEMS_PER_PAGE_REVISION = 4;
export const ITEMS_PER_PAGE_MAINTENANCE = 4;

export const quickServices = [
    { id: 'todos', name: 'Ver todos', icon: Wrench },
    { id: 'identificar', name: 'Identificar la falla', icon: AlertCircle },
    { id: 'revision', name: 'Realizar revisión', icon: Car },
    { id: 'mantenimiento', name: 'Mantenimientos', icon: Settings },
];

export const allServices = [
    {
        id: 1,
        name: 'Revisión General',
        description: 'Inspección completa de 50 puntos',
        price: '119,000',
        icon: Wrench,
        category: 'revision',
        popular: true,
        details: 'Incluye revisión de motor, frenos, suspensión, sistema eléctrico, niveles de fluidos, luces, neumáticos y 43 puntos adicionales para garantizar el óptimo funcionamiento de tu vehículo.'
    },
    {
        id: 2,
        name: 'Falla En El Motor',
        description: 'Diagnóstico y reparación del motor',
        price: '121,000',
        icon: Settings,
        category: 'identificar',
        popular: true,
        details: 'Diagnóstico completo con escáner automotriz, revisión de compresión, sistema de inyección, bujías, bobinas y todos los componentes del motor. Incluye informe detallado.'
    },
    {
        id: 3,
        name: 'Cambio de Aceite',
        description: 'Cambio de aceite y filtro',
        price: 'Por Cotizar',
        icon: Droplets,
        category: 'mantenimiento',
        highlight: true,
        popular: true,
        details: 'Cambio de aceite sintético o mineral según especificaciones del fabricante, reemplazo de filtro de aceite, revisión de niveles e inspección general del motor.'
    },
    {
        id: 4,
        name: 'Mantenimiento por Kilometraje',
        description: 'Mantenimiento preventivo programado',
        price: '675,000',
        icon: Gauge,
        category: 'mantenimiento',
        popular: true,
        details: 'Mantenimiento completo según el manual del fabricante. Incluye cambio de aceite, filtros, revisión de frenos, suspensión, alineación, balanceo y más de 30 puntos de inspección.'
    },
    {
        id: 5,
        name: 'Servicio de Escáner',
        description: 'Diagnóstico electrónico completo',
        price: '84,000',
        icon: Radio,
        category: 'identificar',
        popular: true,
        details: 'Escaneo completo de todos los sistemas electrónicos del vehículo, lectura y borrado de códigos de error, monitoreo en tiempo real de sensores y actuadores.'
    },
    {
        id: 6,
        name: 'Falla En El Motor',
        description: 'Diagnóstico completo del motor',
        icon: Settings,
        category: 'identificar'
    },
    {
        id: 7,
        name: 'Falla En El Sistema Eléctrico',
        description: 'Revisión del sistema eléctrico',
        icon: Zap,
        category: 'identificar'
    },
    {
        id: 8,
        name: 'Falla En Las Llantas',
        description: 'Inspección de neumáticos y alineación',
        icon: Disc,
        category: 'identificar'
    },
    {
        id: 9,
        name: 'Falla En Los Frenos',
        description: 'Sistema de frenado completo',
        icon: Activity,
        category: 'identificar'
    },
    {
        id: 10,
        name: 'Falla En Los Amortiguadores',
        description: 'Revisión de suspensión',
        icon: Activity,
        category: 'identificar'
    },
    {
        id: 11,
        name: 'Falla En El Sistema De Refrigeración',
        description: 'Diagnóstico de enfriamiento',
        icon: ThermometerSun,
        category: 'identificar'
    },
    {
        id: 12,
        name: 'Falla En El Sistema De Combustible',
        description: 'Revisión de inyección',
        icon: Fuel,
        category: 'identificar'
    },
    {
        id: 13,
        name: 'Falla En La Transmisión',
        description: 'Diagnóstico de transmisión',
        icon: Cog,
        category: 'identificar'
    },
    {
        id: 14,
        name: 'Ruidos Extraños',
        description: 'Identificación de ruidos anormales',
        icon: Radio,
        category: 'identificar'
    },
    {
        id: 15,
        name: 'Humo Del Motor',
        description: 'Diagnóstico de emisión de humo',
        icon: Wind,
        category: 'identificar'
    },
    {
        id: 16,
        name: 'Vibración Excesiva',
        description: 'Análisis de vibraciones anormales',
        icon: Activity,
        category: 'identificar'
    },
    {
        id: 17,
        name: 'Fuga De Líquidos',
        description: 'Identificación y reparación de fugas',
        icon: Droplets,
        category: 'identificar'
    },
    {
        id: 18,
        name: 'Revisión Pre-Viaje',
        description: 'Inspección antes de un viaje largo',
        price: '95,000',
        icon: Car,
        category: 'revision'
    },
    {
        id: 19,
        name: 'Revisión Técnico-Mecánica',
        description: 'Preparación para la revisión oficial',
        price: '150,000',
        icon: Clipboard,
        category: 'revision'
    },
    {
        id: 20,
        name: 'Revisión De Frenos',
        description: 'Inspección completa del sistema de frenos',
        price: '65,000',
        icon: Disc,
        category: 'revision'
    },
    {
        id: 21,
        name: 'Revisión De Suspensión',
        description: 'Diagnóstico del sistema de suspensión',
        price: '75,000',
        icon: Activity,
        category: 'revision'
    },
    {
        id: 22,
        name: 'Revisión Eléctrica',
        description: 'Inspección del sistema eléctrico',
        price: '80,000',
        icon: Zap,
        category: 'revision'
    },
    {
        id: 23,
        name: 'Revisión De Motor',
        description: 'Diagnóstico completo del motor',
        price: '120,000',
        icon: Settings,
        category: 'revision'
    },
    {
        id: 24,
        name: 'Revisión De Dirección',
        description: 'Inspección del sistema de dirección',
        price: '70,000',
        icon: Wrench,
        category: 'revision'
    },
    {
        id: 25,
        name: 'Mantenimiento 10,000 Km',
        description: 'Servicio preventivo básico',
        price: '250,000',
        icon: Gauge,
        category: 'mantenimiento'
    },
    {
        id: 26,
        name: 'Mantenimiento 20,000 Km',
        description: 'Servicio preventivo intermedio',
        price: '450,000',
        icon: Gauge,
        category: 'mantenimiento'
    },
    {
        id: 27,
        name: 'Mantenimiento 30,000 Km',
        description: 'Servicio preventivo mayor',
        price: '675,000',
        icon: Gauge,
        category: 'mantenimiento'
    },
    {
        id: 28,
        name: 'Cambio De Filtros',
        description: 'Reemplazo de filtros de aire, aceite y combustible',
        price: '85,000',
        icon: Wind,
        category: 'mantenimiento'
    },
    {
        id: 29,
        name: 'Cambio De Bujías',
        description: 'Reemplazo de bujías de encendido',
        price: '120,000',
        icon: Sparkles,
        category: 'mantenimiento'
    },
    {
        id: 30,
        name: 'Cambio De Batería',
        description: 'Reemplazo e instalación de batería',
        price: '480,000',
        icon: Zap,
        category: 'mantenimiento'
    },
    {
        id: 31,
        name: 'Cambio De Pastillas De Freno',
        description: 'Reemplazo de pastillas delanteras o traseras',
        price: '220,000',
        icon: Disc,
        category: 'mantenimiento'
    },
    {
        id: 32,
        name: 'Cambio De Amortiguadores',
        description: 'Reemplazo de amortiguadores',
        price: '450,000',
        icon: Activity,
        category: 'mantenimiento'
    },
    {
        id: 33,
        name: 'Alineación Y Balanceo',
        description: 'Alineación y balanceo de 4 ruedas',
        price: '95,000',
        icon: Disc,
        category: 'mantenimiento'
    },
    {
        id: 34,
        name: 'Cambio De Correa De Distribución',
        description: 'Reemplazo de kit de distribución',
        price: '550,000',
        icon: Settings,
        category: 'mantenimiento'
    },
    {
        id: 35,
        name: 'Limpieza De Inyectores',
        description: 'Limpieza profunda del sistema de inyección',
        price: '180,000',
        icon: Fuel,
        category: 'mantenimiento'
    },
    {
        id: 36,
        name: 'Mantenimiento De Aire Acondicionado',
        description: 'Recarga y mantenimiento del A/C',
        price: '150,000',
        icon: Fan,
        category: 'mantenimiento'
    },
];