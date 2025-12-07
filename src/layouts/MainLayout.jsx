import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/navigation/Nav"
import Footer from "../components/Footer";
import WhatsAppWidget from "../components/WhatsAppContainer";
import Chatbot from "../components/chatbot/ChatBot";
import { NotificationProvider } from "../context/notification.context";
import { ChatProvider } from "../context/chat.context";
import NotificationPermissionBanner from "../components/NotificationPermissionBanner";
import Hero from "../components/home/Hero";

export default function MainLayout() {
  const location = useLocation();
  const isHomeLocation = location.pathname === '/';
  console.log(isHomeLocation)

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <NotificationProvider>
        <ChatProvider>
          <Hero isHomePage={isHomeLocation} />
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
