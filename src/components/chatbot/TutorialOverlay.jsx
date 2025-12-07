// src/components/TutorialOverlay.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function TutorialOverlay({
    isVisible,
    currentStep,
    steps,
    onNext,
    onPrevious,
    onSkip,
    onComplete
}) {
    const [displayStep, setDisplayStep] = useState(currentStep);
    const [isExiting, setIsExiting] = useState(false);
    const [direction, setDirection] = useState('next');
    const prevStepRef = useRef(currentStep);

    useEffect(() => {
        if (currentStep !== prevStepRef.current) {
            const newDirection = currentStep > prevStepRef.current ? 'next' : 'prev';
            setDirection(newDirection);
            setIsExiting(true);

            const timer1 = setTimeout(() => {
                setDisplayStep(currentStep);
                setIsExiting(false);
            }, 300);

            prevStepRef.current = currentStep;

            return () => clearTimeout(timer1);
        }
    }, [currentStep]);

    if (!isVisible) return null;

    const currentStepData = steps[displayStep];
    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    return (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animateOverlay-scale-in">
                {/* Header del tutorial con transición suave */}
                <div
                    className={`text-center mb-6 transition-all duration-300 transform ${isExiting
                            ? direction === 'next'
                                ? '-translate-x-8 opacity-0'
                                : 'translate-x-8 opacity-0'
                            : 'translate-x-0 opacity-100'
                        }`}
                >
                    <div className="text-6xl mb-4">{currentStepData.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {currentStepData.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {currentStepData.description}
                    </p>
                </div>

                {/* Indicadores de progreso con animación */}
                <div className="flex justify-center gap-2 mb-6">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-500 ${index === currentStep
                                    ? 'w-8 bg-blue-600 shadow-lg shadow-blue-500/50'
                                    : index < currentStep
                                        ? 'w-2 bg-blue-400'
                                        : 'w-2 bg-gray-300'
                                }`}
                        />
                    ))}
                </div>

                {/* Botones de navegación */}
                <div className="flex gap-3">
                    {!isFirstStep && (
                        <button
                            onClick={onPrevious}
                            disabled={isExiting}
                            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Anterior
                        </button>
                    )}

                    {!isLastStep ? (
                        <button
                            onClick={onNext}
                            disabled={isExiting}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            Siguiente
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={onComplete}
                            disabled={isExiting}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            ¡Empecemos! 🚀
                        </button>
                    )}
                </div>

                {/* Botón saltar */}
                {!isLastStep && (
                    <button
                        onClick={onSkip}
                        className="w-full mt-3 text-gray-500 text-sm hover:text-gray-700 transition-colors"
                    >
                        Saltar tutorial
                    </button>
                )}
            </div>
        </div>
    );
}