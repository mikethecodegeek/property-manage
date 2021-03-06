import React from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "./Table.css";

const TableComponent = ({columns,data, onClickCallback, findPropCallback, height}) => {
//   const [data, setData] = useState([]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <div>
      <input
        type="text"
        placeholder='Search....'
        className='search-box'
        onChange={(e) => setGlobalFilter(e.target.value)}
      ></input>
      <table
        className="table"
        {...getTableProps()}
        style={{
          border: "none",
          height: 'calc(100vh - 190px)',
          
          overflowY: "scroll",
          display: "inline-block",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? <i class="fas fa-sort-down"></i> : <i class="fas fa-sort-up"></i>) : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
  
                onClick={() => onClickCallback(row.original.id)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
