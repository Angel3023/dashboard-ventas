import React, { useState } from "react";
import Select from "react-select";
import { useVentas } from "../../context/VentasContext";
import { preciosPorPais } from "../../data/optionsPrecios";
import {
  optionsTipoDocumento,
  optionsCurso,
  optionsMetodoPago,
  optionsAsesor,
  optionsFilial,
  optionsPais,
} from "../../data/options";

export default function NuevaVentaForm() {
  const { agregarVenta } = useVentas();

  const [formData, setFormData] = useState({
    numeroVenta: "",
    dni: "",
    nombres: "",
    correo: "",
    tipoDocumento: null,
    curso: null,
    metodoPago: null,
    asesor: null,
    filial: null,
    pais: null,
    precio: null,
    documentos: {
      certificado1: false,
      certificado2: false,
      certificado3: false,
      certificado4: false,
      diploma: false,
      materiales: false,
    },
  });

  // ✅ Manejo de inputs
  const handleSelectChange = (selected, field) => {
    setFormData((prev) => ({ ...prev, [field]: selected }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Recursos
  const toggleDocumento = (docKey) => {
    setFormData((prev) => ({
      ...prev,
      documentos: {
        ...prev.documentos,
        [docKey]: !prev.documentos[docKey],
      },
    }));
  };

  const handleToggle = (e, docKey) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDocumento(docKey);
  };

  const activarPackCompleto = () => {
    setFormData((prev) => ({
      ...prev,
      documentos: {
        certificado1: true,
        certificado2: true,
        certificado3: true,
        certificado4: true,
        diploma: true,
        materiales: true,
      },
    }));
  };

  // ✅ Envío
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.numeroVenta ||
      !formData.dni ||
      !formData.nombres ||
      !formData.tipoDocumento ||
      !formData.curso ||
      !formData.metodoPago ||
      !formData.asesor ||
      !formData.filial ||
      !formData.pais
    ) {
      alert("Por favor, completa todos los campos obligatorios");
      return;
    }

    agregarVenta({
      ...formData,
      tipoDocumento: formData.tipoDocumento.value,
      curso: formData.curso.value,
      metodoPago: formData.metodoPago.value,
      asesor: formData.asesor.value,
      filial: formData.filial.value,
      pais: formData.pais.value,
      precio: formData.precio ? formData.precio.value : null,
    });

    // Reset
    setFormData({
      numeroVenta: "",
      dni: "",
      nombres: "",
      correo: "",
      tipoDocumento: null,
      curso: null,
      metodoPago: null,
      asesor: null,
      filial: null,
      pais: null,
      precio: null,
      documentos: {
        certificado1: false,
        certificado2: false,
        certificado3: false,
        certificado4: false,
        diploma: false,
        materiales: false,
      },
    });
  };

  return (
    <div className="nueva-venta-form">
      <h4 className="mb-3 text-center">📝 Registrar Nueva Venta</h4>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

        {/* Datos principales */}
        <input
          type="text"
          name="numeroVenta"
          placeholder="Teléfono/Celular"
          className="form-control"
          value={formData.numeroVenta}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="nombres"
          placeholder="Nombres completos"
          className="form-control"
          value={formData.nombres}
          onChange={handleChange}
          required
        />

        <div className="row g-2">
          <div className="col-md-6">
            <Select
              options={optionsTipoDocumento}
              value={formData.tipoDocumento}
              onChange={(opt) => handleSelectChange(opt, "tipoDocumento")}
              placeholder="Tipo de Documento"
              isClearable
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="dni"
              placeholder="Número de Documento"
              className="form-control"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          className="form-control"
          value={formData.correo}
          onChange={handleChange}
        />

        <Select
          options={optionsCurso}
          value={formData.curso}
          onChange={(opt) => handleSelectChange(opt, "curso")}
          placeholder="Seleccionar curso"
          isClearable
        />

        <div className="row g-2">
          <div className="col-md-6">
            <Select
              options={optionsAsesor}
              value={formData.asesor}
              onChange={(opt) => handleSelectChange(opt, "asesor")}
              placeholder="Asesor"
              isClearable
            />
          </div>
          <div className="col-md-6">
            <Select
              options={optionsMetodoPago}
              value={formData.metodoPago}
              onChange={(opt) => handleSelectChange(opt, "metodoPago")}
              placeholder="Método de Pago"
              isClearable
            />
          </div>
        </div>

        <div className="row g-2">
          <div className="col-md-6">
            <Select
              options={optionsFilial}
              value={formData.filial}
              onChange={(opt) => handleSelectChange(opt, "filial")}
              placeholder="Filial"
              isClearable
            />
          </div>
          <div className="col-md-6">
            <Select
              options={optionsPais}
              value={formData.pais}
              onChange={(opt) => handleSelectChange(opt, "pais")}
              placeholder="País"
              isClearable
            />
          </div>
        </div>

        {/* Select de precios dependiente del país */}
        <Select
          options={formData.pais ? preciosPorPais[formData.pais.label] || [] : []}
          value={formData.precio}
          onChange={(opt) => setFormData((prev) => ({ ...prev, precio: opt }))}
          placeholder="Seleccionar precio (opcional)"
          isDisabled={!formData.pais}
          isClearable
        />

        {/* Recursos */}
        <h6 className="mt-3">📦 Recursos a Entregar</h6>
        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={activarPackCompleto}
          >
            🎁 Pack Completo
          </button>

          <div className="dropdown" data-bs-auto-close="outside">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              📂 Recursos
            </button>
            <ul className="dropdown-menu p-3">
              {[
                { key: "certificado1", label: "📄 Certificado 1" },
                { key: "certificado2", label: "📄 Certificado 2" },
                { key: "certificado3", label: "📄 Certificado 3" },
                { key: "certificado4", label: "📄 Certificado 4" },
                { key: "diploma", label: "🏅 Diploma" },
                { key: "materiales", label: "📚 Materiales" },
              ].map((item) => (
                <li key={item.key} className="mb-2">
                  <button
                    type="button"
                    className={`btn w-100 ${
                      formData.documentos[item.key]
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={(e) => handleToggle(e, item.key)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary-custom w-100 mt-3">
          <i className="bi bi-plus-circle me-2"></i> Agregar Venta
        </button>
      </form>
    </div>
  );
}
