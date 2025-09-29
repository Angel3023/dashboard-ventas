import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useFilters,
} from "react-table";
import { useVentas } from "../../context/VentasContext";

// 🔎 Filtro global
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <input
      className="form-control mb-3"
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="🔎 Buscar en todas las ventas..."
    />
  );
}

// 🎯 Filtro por columna (ejemplo: país, curso, asesor)
function DefaultColumnFilter({ column: { filterValue, setFilter, Header } }) {
  return (
    <input
      className="form-control form-control-sm"
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Filtrar ${Header}`}
    />
  );
}

export default function VentasCompletas() {
  const { ventas } = useVentas();

  // Definir columnas
  const columns = useMemo(
    () => [
      { Header: "Cliente", accessor: "nombres" },
      { Header: "Documento", accessor: "dni" },
      { Header: "Curso", accessor: "curso" },
      { Header: "País", accessor: "pais" },
      { Header: "Precio", accessor: (row) => row.precio || "—" },
      { Header: "Método de Pago", accessor: "metodoPago" },
      { Header: "Asesor", accessor: "asesor" },
      { Header: "Filial", accessor: "filial" },
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Configurar tabla
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // datos paginados
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    nextPage,
    previousPage,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: ventas,
      defaultColumn,
      initialState: { pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div className="card p-4">
      <h4 className="mb-3">📊 Todas las Ventas</h4>

      {/* 🔎 Buscador global */}
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      {/* 📋 Tabla */}
      <div className="table-responsive">
        <table
          className="table table-dark table-striped align-middle"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                    {/* 🎯 Input filtro por columna */}
                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  ⚠️ No hay ventas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Paginación */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          ⬅ Anterior
        </button>
        <span>
          Página <strong>{pageIndex + 1}</strong> de {pageOptions.length}
        </span>
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}
