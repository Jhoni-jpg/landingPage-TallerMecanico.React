import { TipProvider } from '../context/toolTip.context.jsx';
import SearchBar from '../components/services/SearchBar.jsx';
import ServicesGrid from '../components/services/ServicesGrid.jsx';
import QuickServices from '../components/services/QuickServices.jsx';
import TooltipChatDemo from '../components/ToolTip.jsx';

export default function Servicios() {
    return (
        <>
            <SearchBar />
            <QuickServices />
            <TipProvider>
                <ServicesGrid />
                <TooltipChatDemo />
            </TipProvider>
        </>
    );
}