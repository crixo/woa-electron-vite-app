import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'

import React from 'react'


// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = await import('@welldone-software/why-did-you-render');
//   whyDidYouRender.default(React, {
//     trackAllPureComponents: true,
//   });
//   console.log('✅ why-did-you-render initialized');
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
