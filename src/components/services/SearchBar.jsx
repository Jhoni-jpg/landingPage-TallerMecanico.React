import { Search } from 'lucide-react';
import { useServices } from '../../context/services.context.jsx';


export default function SearchBar() {
    const { searchTerm, setSearchTerm } = useServices();

    return (
        <div className="mb-8">
            <div className="relative max-w-4xl mx-auto">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    aria-label="Buscar servicios"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 rounded-full border-2 border-blue-200 focus:border-blue-500 focus:outline-none text-lg shadow-lg bg-white"
                    placeholder="Buscar servicios..."
                />
            </div>
        </div>
    );
}