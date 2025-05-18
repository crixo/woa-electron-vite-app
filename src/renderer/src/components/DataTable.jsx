import { Link } from 'react-router-dom'



export const DataTable = ({ idConfig, data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>
  }

  const dataNoFK = data.map(obj => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !key.startsWith("ID_"))
    );
  });

  const headers = Object.keys(dataNoFK[0])
  console.log(idConfig)

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header) => (
              <th scope="col" className="px-6 py-3" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataNoFK.map((item, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              key={index}
            >
              {headers.map((header) => (
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  key={header}
                >
                  { header=="ID"? (<Link
                  to={`${idConfig.entityUrlSegment.replace(':id', item[header])}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className={idConfig.iconCss}></i>
                </Link>) : (item[header]) }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

//export default DataTable
