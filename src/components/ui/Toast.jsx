import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Toast = ({ 
    message, 
    type = 'success', 
    isVisible, 
    onClose, 
    duration = 3000,
    position = 'top-right'
}) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            onClose();
        }, 400);
    };

    if (!isVisible && !isExiting) return null;

    const toastConfig = {
        success: {
            icon: CheckCircle2,
            gradient: 'from-green-500 to-emerald-600'
        },
        error: {
            icon: XCircle,
            gradient: 'from-red-500 to-rose-600'
        },
        warning: {
            icon: AlertCircle,
            gradient: 'from-yellow-500 to-orange-600'
        },
        info: {
            icon: Info,
            gradient: 'from-blue-500 to-indigo-600'
        }
    };

    const config = toastConfig[type];
    const IconComponent = config.icon;

    const positionClasses = {
        'top-right': 'top-3 right-3 left-3 sm:left-auto sm:top-6 md:top-8 sm:right-6 md:right-8',
        'top-left': 'top-3 left-3 right-3 sm:right-auto sm:top-6 md:top-8 sm:left-6 md:left-8',
        'top-center': 'top-3 left-1/2 -translate-x-1/2 sm:top-6 md:top-8 w-[calc(100%-1.5rem)] sm:w-auto',
        'bottom-right': 'bottom-3 right-3 left-3 sm:left-auto sm:bottom-6 md:bottom-8 sm:right-6 md:right-8',
        'bottom-left': 'bottom-3 left-3 right-3 sm:right-auto sm:bottom-6 md:bottom-8 sm:left-6 md:left-8',
        'bottom-center': 'bottom-3 left-1/2 -translate-x-1/2 sm:bottom-6 md:bottom-8 w-[calc(100%-1.5rem)] sm:w-auto'
    };

    const getAnimationClass = () => {
        if (isExiting) {
            if (position.includes('left')) return 'toast-exit-left';
            if (position.includes('center')) return 'toast-exit-center';
            if (position.includes('bottom')) return 'toast-exit-bottom';
            return 'toast-exit-right';
        }
        return 'toast-enter';
    };

    const getPositionClass = () => {
        if (position.includes('left')) return 'position-left';
        if (position.includes('center')) return 'position-center';
        if (position.includes('bottom')) return 'position-bottom';
        return 'position-right';
    };

    return (
        <div 
            className={`
                ${getAnimationClass()} 
                ${getPositionClass()}
                fixed 
                ${positionClasses[position]} 
                flex 
                items-center 
                gap-2 
                sm:gap-2.5 
                md:gap-3 
                bg-gradient-to-r 
                ${config.gradient} 
                text-white 
                px-3 
                py-2.5 
                sm:px-5 
                sm:py-3.5 
                md:px-6 
                md:py-4 
                rounded-lg 
                sm:rounded-xl 
                shadow-xl 
                sm:shadow-2xl 
                font-semibold 
                text-xs 
                sm:text-sm 
                md:text-base 
                z-50 
                min-w-[260px] 
                sm:min-w-[300px] 
                md:min-w-[320px] 
                max-w-[calc(100%-1.5rem)] 
                sm:max-w-[420px] 
                md:max-w-md
            `}
            role="alert"
            aria-live="assertive"
        >
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span className="flex-1 break-words">{message}</span>
            {onClose && (
                <button
                    onClick={handleClose}
                    className="ml-1 sm:ml-2 p-0.5 sm:p-1 hover:bg-white/20 rounded-md sm:rounded-lg transition-colors duration-200 flex-shrink-0"
                    aria-label="Cerrar notificación"
                >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </button>
            )}
        </div>
    );
};

export default Toast;