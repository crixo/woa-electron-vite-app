import { Link } from 'react-router-dom'
import { formatDateAsSettings } from '../utils/dateUtils';

export const DataTable = ({ idConfig, entityType, data, onDeleting, deleteHandler, convertLookup }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>
  }
  const dataNoFK = data;
  const headers = Object.keys(dataNoFK[0])

  const renderRow = (header, item) => {
    switch (header) {
      case "ID":
        return <Link
                  to={`${idConfig.entityUrlSegment.replace(':id', item[header])}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className={idConfig.iconCss}></i>
                </Link>;
      case "data":
        return formatDateAsSettings(item[header]);
      case "tipo":
        return convertLookup(item[header])
      default:
        return item[header];
    }
  };


  return (
    
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            {headers.map((header) => (
              (!header.startsWith('ID_') && <th scope="col" className="p-2 border border-gray-300 dark:border-gray-600" key={header}>
                {header}
              </th>)
            ))}
            <th scope="col" className="p-2 border border-gray-300 dark:border-gray-600" ></th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {dataNoFK.map((item, index) => (
            <tr
              key={index}
            >
              {headers.map((header) => (
                (!header.startsWith('ID_') && <td
                  scope="row"
                  className="p-2 border border-gray-300 dark:border-gray-600"
                  key={header}
                >
                  { renderRow(header,item) }
                </td>)
              ))}
                <td className="p-2 border border-gray-300 dark:border-gray-600 text-right">
                  <a
                    onClick={() => onDeleting(entityType, item, deleteHandler)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 cursor-pointer"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </a>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
