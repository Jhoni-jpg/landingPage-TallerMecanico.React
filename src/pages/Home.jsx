import FAQ from "../components/Acordion";
import CarTips from "../components/home/Advice";
import AutoBrandsCarousel from "../components/home/BrandCarousel";
import HowItWorks from "../components/home/How";
import Services from "../components/home/Services";
import MapUbication from "../components/MapUbication";
import { LocationProvider } from "../context/LocationContext";
import { MapProvider } from "../context/MapContext";

export default function Home() {
    return (
        <>
            <Services />
            <CarTips />
            <AutoBrandsCarousel />
            <HowItWorks />
            <FAQ />
            <LocationProvider>
                <MapProvider>
                    <MapUbication />
                </MapProvider>
            </LocationProvider>
        </>
    );
}