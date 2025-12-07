import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Servicios from "./pages/servicios";
import Contacto from "./pages/contacto";
import ServicesLayout from "./layouts/LayoutServices";
import LayoutContact from "./layouts/LayoutContact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<ServicesLayout />}>
            <Route path="/servicios" element={<Servicios />} />
          </Route>
          <Route element={<LayoutContact />}>
            <Route path="/contacto" element={<Contacto />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
