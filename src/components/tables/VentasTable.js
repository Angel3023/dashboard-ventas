import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { useVentas } from "../../context/VentasContext";

// 🔎 Filtro de búsqueda global
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <input
      className="form-control mb-3"
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="🔎 Buscar venta..."
    />
  );
}

export default function VentasTable() {
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
    ],
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
    { columns, data: ventas, initialState: { pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div>
      {/* 🔎 Buscador */}
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      {/* 📋 Tabla */}
      <div className="table-responsive">
        <table className="table table-hover table-dark align-middle" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="text-uppercase"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
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
