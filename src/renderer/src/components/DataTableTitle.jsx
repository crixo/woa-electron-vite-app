import { Link } from 'react-router-dom'

export const DataTableTile = ({ title, createPageUri, showAdd=true}) => {
    return(
        <div className="flex items-center justify-center">
          <h3 className="h3-primary">{title}</h3>
          {showAdd && (
          <Link
            to={createPageUri}
            className="text-blue-600 hover:underline ml-2"
          >
            <i className="fa fa-plus"></i>
          </Link>)}
        </div>
    )
}