import FAQ from "../components/Acordion";
import CarTips from "../components/home/Advice";
import AutoBrandsCarousel from "../components/home/BrandCarousel";
import HowItWorks from "../components/home/How";
import Services from "../components/home/Services";
import MapUbication from "../components/MapUbication";

export default function Home() {
    return (
        <>
            <Services />
            <CarTips />
            <AutoBrandsCarousel/>
            <HowItWorks />
            <FAQ />
            <MapUbication />
        </>
    );
}