// function DataTable({columns, data}){
//     return(
//         <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white">
//             <table className="w-full min-w-[900px]">
//                 <thead>
//                     <tr className="border-b border-slate-200 bg-slate-50">
//                         {columns.map((column)=>(
//                             <th key={column.key} className="px-6 py-4 text-left text-sm font-medium text-slate-500">{column.label}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((row)=>(
//                         <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50">
//                             {columns.map((column)=>(
//                                 <td key={column.key} className="px-6 py-5 text-sm text-slate-700">{column.render?column.render(row):row[column.key]}</td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }
// export default DataTable;

function DataTable({ columns, data }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-medium text-slate-500"
              >
                {column.renderHeader ? column.renderHeader() : column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-slate-200 hover:bg-slate-50"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-5 text-sm text-slate-700"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;