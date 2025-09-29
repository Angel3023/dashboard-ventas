import React from "react";
import VentasCompletas from "../tables/VentasCompletas";

export default function ModalVentas() {
  return (
    <div
      className="modal fade"
      id="modalVentas"
      tabIndex="-1"
      aria-labelledby="modalVentasLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content bg-dark text-light">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="modalVentasLabel">
              📋 Ventas Completas
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Body con la tabla */}
          <div className="modal-body">
            <VentasCompletas />
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
