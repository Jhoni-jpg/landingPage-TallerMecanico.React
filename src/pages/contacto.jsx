import ContactHeader from "../components/contact/ContactHeader";
import ContactForm from "../components/contact/FormContact";
import ContactInfo from "../components/contact/InformationContact";
import MapUbication from "../components/MapUbication";
import { LocationProvider } from "../context/LocationContext";
import { MapProvider } from "../context/MapContext";

export default function Contacto() {
    return (
        <>
            <ContactHeader />
            <div className="grid md:grid-cols-2 gap-8">
                <ContactForm />
                <ContactInfo />
            </div>
            <LocationProvider>
                <MapProvider>
                    <MapUbication />
                </MapProvider>
            </LocationProvider>
        </>
    );
}