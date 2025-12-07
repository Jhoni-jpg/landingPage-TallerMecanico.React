import { ServicesProvider } from '../context/services.context.jsx';
import Hero from '../components/services/Hero.jsx';
import { Outlet } from 'react-router-dom';

export default function ServicesLayout() {
    return (
        <ServicesProvider>
            <Hero />
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </ServicesProvider>
    );
}