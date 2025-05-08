import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './routes/Login.tsx';
import Signup from './routes/signup.tsx';
import Dashboard from './routes/Dashboard.tsx';
import Eventos from './routes/Eventos.tsx';
import Calendario from './routes/Calendario.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import EventoDetalle from './routes/EventoDetalle.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';
import Inicio from './routes/Inicio.tsx'

import {CssBaseline} from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/inicio',
    element: <Inicio />,
  },
  {
    path: '/eventos',
    element: <Eventos />,
  },
  {
    path: '/eventos/:id',
    element: <EventoDetalle />
  },
  {
    path: '/calendario',
    element: <Calendario />,
  },
  {
    path: '/',
    element: <ProtectedRoute allowedRoleIds={[2]} />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>,
)
