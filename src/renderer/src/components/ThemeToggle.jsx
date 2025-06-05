import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();
    //   <button
    //   onClick={() => setDarkMode(!darkMode)}
    //   className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded">
    //   {darkMode ? "Light Mode" : "Dark Mode"}
    // </button>

{/* <div class="flex flex-col justify-center ml-3">
    <input type="checkbox" name="light-switch" class="light-switch sr-only" />
    <label class="relative cursor-pointer p-2" for="light-switch" onClick={() => setDarkMode(!darkMode)}>
        <svg class="dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
            <path class="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
        </svg>
        <svg class="hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
            <path class="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
        </svg>
        <span class="sr-only">Switch to light / dark version</span>
    </label>
</div>      */}

  return (
<button onClick={() => setDarkMode(!darkMode)} class="p-2 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
  <svg class="w-6 h-6 text-gray-800 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
  </svg>
  <svg class="w-6 h-6 text-yellow-500 hidden dark:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
  </svg>
</button>
  );
}
