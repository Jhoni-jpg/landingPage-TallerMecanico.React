// hooks/useShowTooltip.jsx
import { useTip } from "../../context/toolTip.context.jsx";
import { useCallback } from "react";

export default function useShowTooltip() {
    const { setTooltipState } = useTip();

    return useCallback(() => {
        // Mostrar tooltip
        setTooltipState({ isVisible: true, isFadingOut: false });

        const fadeOutTimer = setTimeout(() => {
            setTooltipState(prev => ({ ...prev, isFadingOut: true }));
        }, 4500);

        const hideTimer = setTimeout(() => {
            setTooltipState({ isVisible: false, isFadingOut: false });
        }, 5000);

        // Limpiar timers si el componente se desmonta antes
        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(hideTimer);
        };
    }, [setTooltipState]);
}