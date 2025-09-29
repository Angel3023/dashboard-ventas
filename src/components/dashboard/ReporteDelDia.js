import React from "react";
import { useVentas } from "../../context/VentasContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function ReporteDelDia() {
  const { ventas } = useVentas();

  // 📊 Agrupamos ventas por país
  const ventasPorPais = ventas.reduce((acc, v) => {
    const pais = v.pais || "Sin país";
    acc[pais] = (acc[pais] || 0) + 1;
    return acc;
  }, {});

  const dataPais = Object.entries(ventasPorPais).map(([pais, cantidad]) => ({
    name: pais,
    value: cantidad,
  }));

  // 📊 Agrupamos ventas por curso
  const ventasPorCurso = ventas.reduce((acc, v) => {
    const curso = v.curso || "Sin curso";
    acc[curso] = (acc[curso] || 0) + 1;
    return acc;
  }, {});

  const dataCurso = Object.entries(ventasPorCurso).map(([curso, cantidad]) => ({
    name: curso,
    value: cantidad,
  }));

  const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#3B82F6", "#8B5CF6"];

  return (
    <div className="row g-4 mb-4">
      {/* 🔹 Ventas por País */}
      <div className="col-lg-6">
        <div className="card shadow-sm p-3 rounded-3">
          <h5 className="mb-3">Ventas por País</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataPais}>
              <XAxis dataKey="name" stroke="var(--text-color)" />
              <YAxis stroke="var(--text-color)" />
              <Tooltip />
              <Bar dataKey="value" fill="var(--primary-color)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Ventas por Curso */}
      <div className="col-lg-6">
        <div className="card shadow-sm p-3 rounded-3">
          <h5 className="mb-3">Ventas por Curso</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataCurso}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {dataCurso.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
