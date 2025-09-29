import React from "react";
import { useVentas } from "../../context/VentasContext";
import ThemeToggle from "../ThemeToggle";

export default function MainContent() {
  const { resumen } = useVentas();

  return (
    <main className="main-content p-4">
      {/* 🔹 Header */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">
          <i className="bi bi-speedometer2 me-2"></i>Dashboard de Ventas
        </h1>
        <div className="d-flex gap-2 align-items-center">
          <button
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#modalVentas"
          >
            <i className="bi bi-table me-2"></i> Ver Todas las Ventas
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* 🔹 Tarjetas resumen */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="metric-card bg-primary-light">
            <i className="bi bi-graph-up-arrow icon-large text-primary"></i>
            <div className="metric-info">
              <span className="metric-value">{resumen.total}</span>
              <span className="metric-label">Ventas Totales</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="metric-card bg-danger-light">
            <i className="bi bi-x-octagon icon-large text-danger"></i>
            <div className="metric-info">
              <span className="metric-value">{resumen.incompletas}</span>
              <span className="metric-label">Ventas Incompletas</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="metric-card bg-warning-light">
            <i className="bi bi-box-seam icon-large text-warning"></i>
            <div className="metric-info">
              <span className="metric-value">{resumen.pendientes}</span>
              <span className="metric-label">Pendientes de Envío</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Placeholder de tabla */}
      <div className="card p-4">
        <h4 className="mb-3">Últimas Ventas Registradas</h4>
        <p className="text-muted">📊 Aquí irá la tabla de ventas...</p>
      </div>
    </main>
  );
}
