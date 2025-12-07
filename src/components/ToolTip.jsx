import { useTip } from "../context/toolTip.context";
import ChatTooltip from "./tooltip/ChatTooltip";

// Componente principal
export default function TooltipChatDemo() {
    const { tooltipState, } = useTip();

    return (
        <>
            {/* Overlay con blur */}
            {
                tooltipState.isVisible && (
                    <div
                        className={`fixed inset-0 bg-black z-30 transition-all duration-500 pointer-events-none ${tooltipState.isFadingOut
                            ? 'bg-opacity-0 backdrop-blur-none'
                            : 'bg-opacity-20 backdrop-blur-sm'
                            }`}
                        style={{
                            animation: tooltipState.isFadingOut
                                ? 'fadeOutBlur 0.5s ease-out'
                                : 'fadeInBlur 0.5s ease-in'
                        }}
                    />
                )
            }

            {/* Tooltip */}
            {
                tooltipState.isVisible && (
                    <ChatTooltip
                        isVisible={tooltipState.isVisible}
                        isFadingOut={tooltipState.isFadingOut}
                    />
                )
            }
        </>
    );
}