import React, { createContext, useContext, useState } from 'react';

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [popularPage, setPopularPage] = useState(0);
    const [diagnosticPage, setDiagnosticPage] = useState(0);
    const [revisionPage, setRevisionPage] = useState(0);
    const [maintenancePage, setMaintenancePage] = useState(0);    
  const [openServiceId, setOpenServiceId] = useState(null);

    return (
        <ServicesContext.Provider value={{
            searchTerm,
            setSearchTerm,
            selectedCategory,
            setSelectedCategory,
            popularPage,
            setPopularPage,
            diagnosticPage,
            setDiagnosticPage,
            revisionPage,
            setRevisionPage,
            maintenancePage,
            setMaintenancePage,
            openServiceId,
            setOpenServiceId
        }}>
            {children}
        </ServicesContext.Provider>
    );
};


export const useServices = () => useContext(ServicesContext);