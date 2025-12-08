import { Paintbrush } from "lucide-react";
import { Palette } from "lucide-react";
import { Layers } from "lucide-react";
import { Sparkles } from "lucide-react";
import Hero from "../components/Hero";
import PaintingCarousel from "../components/painting/PaintingCarousel";
import BenefitsSection from "../components/painting/BenefitsSection";
import CTASection from "../components/painting/CTASection";

export default function Pintura() {
    const paintingHeroProps = {
        location: "Barranquilla, Colombia",
        badge: "Taller Certificado",
        title: "Customización",
        highlightedTitle: "Profesional",
        subtitle: "de Vehículos",
        description: "Transformamos tu vehículo en una obra única. Con más de 20 años de experiencia, ofrecemos servicios de personalización de alta calidad que combinan arte, tecnología y durabilidad.",

        features: [
            {
                icon: Sparkles,
                title: "Garantía Total",
                subtitle: "En todos los trabajos"
            },
            {
                icon: Layers,
                title: "20+ Años",
                subtitle: "De experiencia"
            }
        ],

        primaryButton: {
            text: "Solicitar Cotización"
        },

        secondaryButton: {
            text: "Ver Servicios",
            href: "#productos"
        },

        services: [
            {
                icon: Layers,
                title: "Vinilo & Wrap",
                description: "Protección y estilo premium",
                price: "Desde $1.200.000"
            },
            {
                icon: Paintbrush,
                title: "Pintura Custom",
                description: "500+ colores disponibles",
                price: "Desde $3.200.000"
            },
            {
                icon: Palette,
                title: "Aerografía",
                description: "Diseños únicos y exclusivos",
                price: "Desde $5.200.000"
            }
        ],

        backgroundImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000",

        trustBadge: "Taller Certificado y Confiable",

        stats: [
            { number: "500+", label: "Proyectos Completados" },
            { number: "98%", label: "Satisfacción del Cliente" },
            { number: "20+", label: "Años de Experiencia" }
        ]
    };

    return (
        <div>
            <Hero {...paintingHeroProps} />
            <PaintingCarousel />
            <BenefitsSection />
            <CTASection />
        </div>
    );
}