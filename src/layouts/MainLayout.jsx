import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Nav"
import Footer from "../components/Footer";
import WhatsAppWidget from "../components/WhatsAppContainer";
import Chatbot from "../components/ChatBot";
import { NotificationProvider } from "../context/ChatBot/NotificationContext";
import { ChatProvider } from "../context/ChatBot/ChatContext";
import NotificationPermissionBanner from "../components/NotificationPermissionBanner";
import Hero from "../components/home/Hero";

export default function MainLayout() {
  const location = useLocation();
  const isHomeLocation = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <NotificationProvider>
        <ChatProvider>
          <Hero isHomeLocation={isHomeLocation} />
          <NavBar />

          <main className="flex-1">
            <Outlet />
          </main>

          <Footer />
          <WhatsAppWidget />
          <NotificationPermissionBanner />
          <Chatbot />
        </ChatProvider>
      </NotificationProvider>
    </div>
  );
}
