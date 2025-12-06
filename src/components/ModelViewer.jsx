// components/ModelViewer.jsx
import { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';

const ModelViewer = ({ src, alt = "3D Model", ...props }) => {
    const modelViewerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const modelViewer = modelViewerRef.current;

        if (modelViewer) {
            // Forzar ocultar elementos no deseados
            const hideUnwantedElements = () => {
                if (modelViewer.shadowRoot) {
                    // Ocultar barra de progreso
                    const progressBar = modelViewer.shadowRoot.querySelector('.slot.progress-bar');
                    if (progressBar) {
                        progressBar.style.display = 'none';
                    }
                    
                    const defaultProgressBar = modelViewer.shadowRoot.querySelector('#default-progress-bar');
                    if (defaultProgressBar) {
                        defaultProgressBar.style.display = 'none';
                    }

                    // Ocultar fondo negro (poster/background)
                    const defaultPoster = modelViewer.shadowRoot.querySelector('.slot.poster');
                    if (defaultPoster) {
                        defaultPoster.style.display = 'none';
                    }

                    const canvas = modelViewer.shadowRoot.querySelector('canvas');
                    if (canvas) {
                        canvas.style.background = 'transparent';
                    }
                }
            };

            // Ejecutar continuamente hasta que cargue
            const interval = setInterval(hideUnwantedElements, 50);

            const handleLoad = () => {
                console.log('✅ Modelo 3D cargado');
                setIsLoading(false);
                hideUnwantedElements(); // Ejecutar una vez más al cargar
                setTimeout(() => {
                    clearInterval(interval);
                    hideUnwantedElements(); // Y otra vez por si acaso
                }, 500);
            };

            const handleError = (event) => {
                console.error('❌ Error cargando modelo 3D:', event);
                setIsLoading(false);
                clearInterval(interval);
            };

            // Ejecutar inmediatamente
            hideUnwantedElements();

            modelViewer.addEventListener('load', handleLoad);
            modelViewer.addEventListener('error', handleError);

            return () => {
                clearInterval(interval);
                modelViewer.removeEventListener('load', handleLoad);
                modelViewer.removeEventListener('error', handleError);
            };
        }
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            <model-viewer
                ref={modelViewerRef}
                src={src}
                alt={alt}
                {...props}
            />
        </div>
    );
};

export default ModelViewer;