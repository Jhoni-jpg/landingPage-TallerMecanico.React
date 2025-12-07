import ContactHeader from "../components/contact/ContactHeader";
import ContactForm from "../components/contact/FormContact";
import ContactInfo from "../components/contact/InformationContact";
import MapUbication from "../components/MapUbication";

export default function Contacto() {
    return (
        <>
            <ContactHeader />
            <div className="grid md:grid-cols-2 gap-8">
                <ContactForm />
                <ContactInfo />
            </div>
            <MapUbication />
        </>
    );
}