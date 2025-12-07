import React, { createContext, useContext, useState } from 'react';


const TipContext = createContext();


export const TipProvider = ({ children }) => {
    const [tooltipState, setTooltipState] = useState({
        isVisible: false,
        isFadingOut: false
    });


    return (
        <TipContext.Provider value={{
            tooltipState,
            setTooltipState,
        }}>
            {children}
        </TipContext.Provider>
    );
};


export const useTip = () => useContext(TipContext);