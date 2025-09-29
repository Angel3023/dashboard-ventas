import React from "react";
import { VentasProvider } from "./context/VentasContext";

// Layout y vistas
import MainContent from "./components/layouts/MainContent";
import NuevaVentaForm from "./components/forms/NuevaVentaForm";
import ModalVentas from "./components/modals/ModalVentas"; // ← modal fullscreen con VentasCompletas


function App() {
  return (
    <VentasProvider>
      <div className="main-layout">
        {/* Sidebar (formulario de registro) */}
        <aside className="sidebar">
          <NuevaVentaForm />
        </aside>

        {/* Zona principal: dashboard + tabla rápida */}
        <MainContent />

        {/* Modal fullscreen: Ventas Completas */}
        <ModalVentas />
      </div>
    </VentasProvider>
  );
}

export default App;
