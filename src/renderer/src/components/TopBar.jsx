import { ThemeProvider } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'

export default function (){
    return (
        <ThemeProvider>
        {/* <nav className="bg-gray-800">
          <div className="container mx-auto p-2 flex justify-between items-center">
            <Link to="/">
              <h2 className="text-white text-2xl font-bold">WOA</h2>
            </Link>
            <span className="text-gray-400 text-sm"><ThemeToggle /></span>
          </div>
        </nav> */}
        <nav class="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between">
          <h1 class="text-lg font-bold text-black dark:text-white">
            <Link to="/">WOA</Link>
          </h1>
          <span className="text-gray-400 text-sm"><ThemeToggle /></span>
        </nav>        
        </ThemeProvider>        
    )
}