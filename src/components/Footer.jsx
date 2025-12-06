import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Smartphone,
  Instagram,
  Facebook,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer 
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-8 pb-8" 
      id="contacto"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12 mb-12">
        <div>
          <h3 className="mb-6 text-[1.3rem]">SwiftService</h3>
          <p className="text-white/70 leading-relaxed">
            Servicio especializado en la <strong>manipulacion</strong> de vehiculos, con mas de <strong>20 años</strong> de experiencia en
            la industria automotriz. Al igual que tu vehiculo, eres nuestra prioridad.
          </p>
          <div className="flex gap-4 mt-4">
            <Link 
              to="/" 
              className="w-10 h-10 bg-white/10 text-white flex items-center justify-center rounded-full transition-all duration-300 hover:bg-blue-900 hover:-translate-y-1"
            >
              <Facebook className="group-hover:opacity-80 opacity-40 w-5" />
            </Link>
            <Link 
              to="/" 
              className="w-10 h-10 bg-white/10 text-white flex items-center justify-center rounded-full transition-all duration-300 hover:bg-blue-900 hover:-translate-y-1"
            >
              <Instagram className="group-hover:opacity-80 opacity-40 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-[1.3rem]">Servicios</h3>
          <ul className="list-none">
            <li className="mb-3">
              <Link 
                to="/" 
                className="text-white/70 no-underline transition-colors duration-300 hover:text-blue-900"
              >
                Inicio
              </Link>
            </li>
            <li className="mb-3">
              <Link 
                to="/servicios" 
                className="text-white/70 no-underline transition-colors duration-300 hover:text-blue-900"
              >
                Servicios
              </Link>
            </li>
            <li className="mb-3">
              <Link 
                to="/pinturas" 
                className="text-white/70 no-underline transition-colors duration-300 hover:text-blue-900"
              >
                Pintura
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-[1.3rem]">Empresa</h3>
          <ul className="list-none">
            <li className="mb-3">
              <a 
                to="#nosotros" 
                className="text-white/70 no-underline transition-colors duration-300 hover:text-blue-900"
              >
                Sobre Nosotros
              </a>
            </li>
            <li className="mb-3">
              <a 
                to="#comoFunciona" 
                className="text-white/70 no-underline transition-colors duration-300 hover:text-blue-900"
              >
                Como funciona
              </a>
            </li>
            <li className="mb-3">
              <a 
                href="#preguntasFrecuentes" 
                className="text-white/70 no-underline transition-colors duration-300 hover:text-blue-900"
              >
                Preguntas Frecuentes
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-[1.3rem]">Contacto</h3>
          <p className="flex items-center gap-2 text-white/70 leading-relaxed mb-3">
            <MapPin className="w-5 h-5" />
            Barranquilla - Atlántico, Colombia
          </p>

          <p className="flex items-center gap-2 text-white/70 leading-relaxed mb-3">
            <Phone className="w-5 h-5" />
            +57 (1) 234 5678
          </p>

          <p className="flex items-center gap-2 text-white/70 leading-relaxed mb-3">
            <Smartphone className="w-5 h-5" />
            +57 300 123 4567
          </p>

          <p className="flex items-center gap-2 text-white/70 leading-relaxed mb-3">
            <Mail className="w-5 h-5" />
            contacto@af.com
          </p>

          <p className="flex items-center gap-2 text-white/70 leading-relaxed mb-3">
            <Clock className="w-5 h-5" />
            Lun - Vie: 7:00 AM – 6:00 PM
          </p>

          <p className="flex items-center gap-2 text-white/70 leading-relaxed">
            <Clock className="w-5 h-5" />
            Sáb: 8:00 AM – 1:00 PM
          </p>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-white/10 text-white/60">
        <p>
          &copy; AutoFix. Todos los derechos reservados | Calidad y experiencia garantizada en la manipulacion de automotores.
        </p>
      </div>
    </footer>
  );
};

export default Footer;