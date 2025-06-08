import { ThemeProvider } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'

export default function (){
    return (
  <ThemeProvider>
    <nav class="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">

                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <h1 class="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          <Link to="/">WOA</Link>
                        </h1>
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                  <ThemeToggle />
                </div>
            </div>
        </div>
    </nav>     
  </ThemeProvider>        
    )
}