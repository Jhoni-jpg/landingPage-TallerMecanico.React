// src/components/Nav.jsx
import { Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import pageLogo from '../assets/logo.png'
import { Link } from 'react-router-dom'

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`
      bg-white/95 backdrop-blur-md w-full sticky top-0 z-50 transition-all duration-300
      ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.15)]' : 'shadow-[0_2px_20px_rgba(0,0,0,0.1)]'}
    `}>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-8 py-5">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={pageLogo}
            className="w-14 rounded-full shadow mr-6"
            alt="logoEmpresa"
          />
          <h1 className="text-xl font-extrabold text-blue-400">SwiftService</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className={`
          md:flex list-none gap-8 items-center
          max-md:fixed max-md:top-20 max-md:bg-white max-md:w-full 
          max-md:flex-col max-md:p-8 max-md:shadow-[0_5px_20px_rgba(0,0,0,0.1)]
          max-md:transition-all max-md:duration-300
          ${isMenuOpen ? 'max-md:left-0' : 'max-md:-left-full'}
        `}>
          <li>
            <Link to="/" className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                hover:text-[rgb(44,78,151)]
                after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 
                after:bg-[rgb(44,78,151)] after:transition-all after:duration-300
                hover:after:w-full">
              Inicio
            </Link>
          </li>

          <li>
            {/* internal anchor: usar <a href="#nosotros"> */}
            <a href="#nosotros" className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                hover:text-[rgb(44,78,151)]
                after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 
                after:bg-[rgb(44,78,151)] after:transition-all after:duration-300
                hover:after:w-full">
              Nosotros
            </a>
          </li>

          <li>
            <Link to="/servicios" className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                hover:text-[rgb(44,78,151)] ...">
              Servicios
            </Link>
          </li>

          <li>
            <Link to="/pinturas" className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                hover:text-[rgb(44,78,151)] ...">
              Pintura
            </Link>
          </li>

          <li>
            <Link to="/contacto" className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                hover:text-[rgb(44,78,151)] ...">
              Contacto
            </Link>
          </li>

          <button
            className="bg-transparent text-gray-800 cursor-pointer px-8 py-3 rounded-full 
              w-[200px] font-semibold border border-[#63acff] transition-all duration-300
              hover:-translate-y-0.5 hover:bg-[#63a4ff] hover:text-white 
              hover:shadow-[0_4px_15px_rgba(53,141,255,0.3)]"
            onClick={() => { window.location.href = '#cotizar'; }}
          >
            Cotizar ahora
          </button>
        </ul>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-2xl cursor-pointer text-blue-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </div>
      </div>
    </nav>
  )
}

export default NavBar