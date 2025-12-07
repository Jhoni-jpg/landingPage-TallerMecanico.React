// src/components/NavBar.jsx
import { useState, useEffect, useRef } from 'react'
import pageLogo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { useChatContext } from '../../hooks/useChatContext'

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const { openChat } = useChatContext();
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Actualizar altura del navbar dinámicamente
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight)
      }
    }

    updateNavHeight()
    window.addEventListener('resize', updateNavHeight)

    // Observer para detectar cambios en el navbar
    const observer = new ResizeObserver(updateNavHeight)
    if (navRef.current) {
      observer.observe(navRef.current)
    }

    return () => {
      window.removeEventListener('resize', updateNavHeight)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`
          bg-white/95 backdrop-blur-md w-full sticky top-0 z-50 transition-all duration-300
          ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.15)]' : 'shadow-[0_2px_20px_rgba(0,0,0,0.1)]'}
        `}
      >
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
          <ul className="md:flex list-none gap-8 items-center max-md:hidden">
            <li>
              <Link
                to="/"
                className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                  hover:text-[rgb(44,78,151)]
                  after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 
                  after:bg-[rgb(44,78,151)] after:transition-all after:duration-300
                  hover:after:w-full">
                Inicio
              </Link>
            </li>

            <li>
              <a
                href="/#nosotros"
                className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                  hover:text-[rgb(44,78,151)]
                  after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 
                  after:bg-[rgb(44,78,151)] after:transition-all after:duration-300
                  hover:after:w-full">
                Nosotros
              </a>
            </li>

            <li>
              <Link
                to="/servicios"
                className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                  hover:text-[rgb(44,78,151)]
                  after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 
                  after:bg-[rgb(44,78,151)] after:transition-all after:duration-300
                  hover:after:w-full">
                Servicios
              </Link>
            </li>

            <li>
              <Link
                to="/pinturas"
                className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                  hover:text-[rgb(44,78,151)]
                  after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 
                  after:bg-[rgb(44,78,151)] after:transition-all after:duration-300
                  hover:after:w-full">
                Pintura
              </Link>
            </li>

            <li>
              <Link
                to="/contacto"
                className="relative text-gray-800 no-underline font-semibold transition-colors duration-300
                  hover:text-[rgb(44,78,151)]
                  after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 
                  after:bg-[rgb(44,78,151)] after:transition-all after:duration-300
                  hover:after:w-full">
                Contacto
              </Link>
            </li>

            <button
              className="bg-transparent text-gray-800 cursor-pointer px-8 py-3 rounded-full 
                w-[200px] font-semibold border border-[#63acff] transition-all duration-300
                hover:-translate-y-0.5 hover:bg-[#63a4ff] hover:text-white 
                hover:shadow-[0_4px_15px_rgba(53,141,255,0.3)]"
              onClick={() => openChat(true)}
            >
              Cotizar ahora
            </button>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className={`
              md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer relative z-[60]
              transition-transform duration-300
              ${isMenuOpen ? 'rotate-180' : 'rotate-0'}
            `}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`
              block w-6 h-0.5 bg-blue-600 rounded-full transition-all duration-300 origin-center
              ${isMenuOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'}
            `} />
            <span className={`
              block h-0.5 bg-blue-600 rounded-full transition-all duration-300
              ${isMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'}
            `} />
            <span className={`
              block w-6 h-0.5 bg-blue-600 rounded-full transition-all duration-300 origin-center
              ${isMenuOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'}
            `} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navHeight={navHeight}
      />
    </>
  )
}

export default NavBar;