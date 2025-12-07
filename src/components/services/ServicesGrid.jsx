import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import {
    allServices,
    ITEMS_PER_PAGE_POPULAR,
    ITEMS_PER_PAGE_DIAGNOSTIC,
    ITEMS_PER_PAGE_REVISION,
    ITEMS_PER_PAGE_MAINTENANCE
} from '../../data/service.js';

import { useServices } from '../../context/services.context.jsx';

// Componente Pagination fuera del componente principal
const Pagination = ({ page, totalPages, onChange }) => (
    <div className="flex items-center gap-2">
        <button
            onClick={() => onChange(Math.max(0, page - 1))}
            disabled={page === 0}
            className={`p-2 rounded-full transition-all ${
                page === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white shadow hover:shadow-md hover:bg-blue-50'
            }`}
        >
            <ArrowLeft className={`${page === 0 ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>

        <div className="text-sm text-gray-600 px-2 font-medium">
            {page + 1} / {totalPages}
        </div>

        <button
            onClick={() => onChange(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className={`p-2 rounded-full transition-all ${
                page === totalPages - 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white shadow hover:shadow-md hover:bg-blue-50'
            }`}
        >
            <ArrowRight className={`${page === totalPages - 1 ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
    </div>
);

export default function ServicesGrid() {
    const {
        searchTerm,
        selectedCategory,

        popularPage,
        setPopularPage,

        diagnosticPage,
        setDiagnosticPage,

        revisionPage,
        setRevisionPage,

        maintenancePage,
        setMaintenancePage,

        setSelectedServiceDetail,
    } = useServices();

    const filtered = useMemo(() => {
        return allServices.filter((service) => {
            const matchesCategory = selectedCategory === 'todos' || service.category === selectedCategory;
            const q = (searchTerm || '').trim().toLowerCase();
            const matchesSearch =
                q === '' ||
                (service.name && service.name.toLowerCase().includes(q)) ||
                (service.description && service.description.toLowerCase().includes(q));

            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchTerm]);

    const popularServices = filtered.filter(s => s.popular);
    const diagnosticServices = filtered.filter(s => s.category === 'identificar' && !s.popular);
    const revisionServices = filtered.filter(s => s.category === 'revision' && !s.popular);
    const maintenanceServices = filtered.filter(s => s.category === 'mantenimiento' && !s.popular);

    const totalPopularPages = Math.max(1, Math.ceil(popularServices.length / ITEMS_PER_PAGE_POPULAR));
    const totalDiagnosticPages = Math.max(1, Math.ceil(diagnosticServices.length / ITEMS_PER_PAGE_DIAGNOSTIC));
    const totalRevisionPages = Math.max(1, Math.ceil(revisionServices.length / ITEMS_PER_PAGE_REVISION));
    const totalMaintenancePages = Math.max(1, Math.ceil(maintenanceServices.length / ITEMS_PER_PAGE_MAINTENANCE));

    const paginatedPopular = popularServices.slice(
        popularPage * ITEMS_PER_PAGE_POPULAR,
        (popularPage + 1) * ITEMS_PER_PAGE_POPULAR
    );

    const paginatedDiagnostic = diagnosticServices.slice(
        diagnosticPage * ITEMS_PER_PAGE_DIAGNOSTIC,
        (diagnosticPage + 1) * ITEMS_PER_PAGE_DIAGNOSTIC
    );

    const paginatedRevision = revisionServices.slice(
        revisionPage * ITEMS_PER_PAGE_REVISION,
        (revisionPage + 1) * ITEMS_PER_PAGE_REVISION
    );

    const paginatedMaintenance = maintenanceServices.slice(
        maintenancePage * ITEMS_PER_PAGE_MAINTENANCE,
        (maintenancePage + 1) * ITEMS_PER_PAGE_MAINTENANCE
    );

    // Variantes de animación para el slide (sin desplazamiento horizontal)
    const slideVariants = {
        enter: {
            opacity: 0,
            scale: 0.95
        },
        center: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: 0.95
        }
    };

    // Variante para cada card individual (efecto escalonado)
    const cardVariants = {
        enter: { 
            opacity: 0, 
            y: 20,
            scale: 0.9
        },
        center: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        }),
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <div>
            {/* POPULAR */}
            {popularServices.length > 0 && (
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Los servicios más agendados</h2>
                        <Pagination
                            page={popularPage}
                            totalPages={totalPopularPages}
                            onChange={setPopularPage}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`popular-${popularPage}`}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                        >
                            {paginatedPopular.map((s, i) => (
                                <motion.div
                                    key={s.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <ServiceCard
                                        index={i}
                                        service={s}
                                        number={popularPage * ITEMS_PER_PAGE_POPULAR + i + 1}
                                        showPrice
                                        onOpen={() => setSelectedServiceDetail(s)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </section>
            )}

            {/* DIAGNOSTIC */}
            {diagnosticServices.length > 0 && (
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Identificar fallas</h2>
                            <p className="text-gray-600 text-sm">Quiero identificar ruidos, humo, vibraciones, etc.</p>
                        </div>

                        <Pagination
                            page={diagnosticPage}
                            totalPages={totalDiagnosticPages}
                            onChange={setDiagnosticPage}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`diagnostic-${diagnosticPage}`}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {paginatedDiagnostic.map((s, i) => (
                                <motion.div
                                    key={s.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <ServiceCard
                                        index={i}
                                        service={s}
                                        number={diagnosticPage * ITEMS_PER_PAGE_DIAGNOSTIC + i + 1}
                                        onOpen={() => setSelectedServiceDetail(s)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </section>
            )}

            {/* REVISION */}
            {revisionServices.length > 0 && (
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Servicios de Revisión</h2>
                            <p className="text-gray-600 text-sm">Inspecciones y diagnósticos completos.</p>
                        </div>

                        <Pagination
                            page={revisionPage}
                            totalPages={totalRevisionPages}
                            onChange={setRevisionPage}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`revision-${revisionPage}`}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {paginatedRevision.map((s, i) => (
                                <motion.div
                                    key={s.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <ServiceCard
                                        index={i}
                                        service={s}
                                        number={revisionPage * ITEMS_PER_PAGE_REVISION + i + 1}
                                        showPrice
                                        onOpen={() => setSelectedServiceDetail(s)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </section>
            )}

            {/* MAINTENANCE */}
            {maintenanceServices.length > 0 && (
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Servicios de Mantenimiento</h2>
                            <p className="text-gray-600 text-sm">Mantenimientos preventivos y correctivos.</p>
                        </div>

                        <Pagination
                            page={maintenancePage}
                            totalPages={totalMaintenancePages}
                            onChange={setMaintenancePage}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`maintenance-${maintenancePage}`}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {paginatedMaintenance.map((s, i) => (
                                <motion.div
                                    key={s.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <ServiceCard
                                        index={i}
                                        service={s}
                                        number={maintenancePage * ITEMS_PER_PAGE_MAINTENANCE + i + 1}
                                        showPrice
                                        onOpen={() => setSelectedServiceDetail(s)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </section>
            )}

            {/* EMPTY */}
            {filtered.length === 0 && (
                <motion.div 
                    className="text-center py-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-gray-500">No se encontraron servicios.</p>
                </motion.div>
            )}
        </div>
    );
}