import React, { createContext, useContext, useState } from "react";

// 1️⃣ Crear contexto
const VentasContext = createContext();

// 2️⃣ Hook personalizado para usar el contexto
export const useVentas = () => useContext(VentasContext);

// 3️⃣ Provider que envolverá la app
export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);

  // 📊 Resumen dinámico
  const resumen = {
    total: ventas.length,
    incompletas: ventas.filter(
      (v) =>
        !v.documentos.certificado1 &&
        !v.documentos.certificado2 &&
        !v.documentos.certificado3 &&
        !v.documentos.certificado4 &&
        !v.documentos.diploma &&
        !v.documentos.materiales
    ).length,
    pendientes: ventas.filter((v) => !v.enviado).length,
  };

  // ➕ Agregar nueva venta
  const agregarVenta = (nuevaVenta) => {
    setVentas((prev) => [
      ...prev,
      {
        ...nuevaVenta,
        id: Date.now(), // ID único
        fecha: new Date().toLocaleString(),
        enviado: false,
      },
    ]);
  };

  // ❌ Eliminar venta
  const eliminarVenta = (id) => {
    setVentas((prev) => prev.filter((venta) => venta.id !== id));
  };

  // ✅ Marcar como enviado
  const marcarEnviado = (id) => {
    setVentas((prev) =>
      prev.map((venta) =>
        venta.id === id ? { ...venta, enviado: true } : venta
      )
    );
  };

  return (
    <VentasContext.Provider
      value={{ ventas, resumen, agregarVenta, eliminarVenta, marcarEnviado }}
    >
      {children}
    </VentasContext.Provider>
  );
};
