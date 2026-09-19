import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './Context/AuthProvider.jsx'
import { RouterProvider } from 'react-router'
import DashboardRouter from './Components/DashboardRouter/DashboardRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={DashboardRouter}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
