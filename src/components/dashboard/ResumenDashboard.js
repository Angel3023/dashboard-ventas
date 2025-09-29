import React from "react";
import { useVentas } from "../../context/VentasContext";

export default function ResumenDashboard() {
  const { resumen } = useVentas();

  return (
    <div className="row g-4 mb-4">
      {/* 🔹 Ventas Totales */}
      <div className="col-md-4">
        <div className="metric-card bg-primary-light shadow-sm p-4 rounded-3 d-flex align-items-center">
          <i className="bi bi-graph-up-arrow icon-large text-primary me-3"></i>
          <div>
            <h4 className="mb-0">{resumen.total}</h4>
            <small className="text-muted">Ventas Totales</small>
          </div>
        </div>
      </div>

      {/* 🔹 Ventas Incompletas */}
      <div className="col-md-4">
        <div className="metric-card bg-danger-light shadow-sm p-4 rounded-3 d-flex align-items-center">
          <i className="bi bi-x-octagon icon-large text-danger me-3"></i>
          <div>
            <h4 className="mb-0">{resumen.incompletas}</h4>
            <small className="text-muted">Incompletas</small>
          </div>
        </div>
      </div>

      {/* 🔹 Pendientes de Envío */}
      <div className="col-md-4">
        <div className="metric-card bg-warning-light shadow-sm p-4 rounded-3 d-flex align-items-center">
          <i className="bi bi-box-seam icon-large text-warning me-3"></i>
          <div>
            <h4 className="mb-0">{resumen.pendientes}</h4>
            <small className="text-muted">Pendientes de Envío</small>
          </div>
        </div>
      </div>
    </div>
  );
}
