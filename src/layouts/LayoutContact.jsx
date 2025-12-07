import { Outlet } from 'react-router-dom';

export default function LayoutContact() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <Outlet />
            </div>
        </div>
    );
}