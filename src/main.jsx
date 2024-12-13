import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './auth/Signin.jsx'
import Home from './home/Home.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/edit/index.jsx'
import ViewResume from './view-resume/view/ViewResume.jsx'
import Signup from './auth/Signup.jsx'
import { ThemeProvider } from './context/theme-provider.jsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
    {
      path:'/dashboard',
      element: <Dashboard/>
    },
    {
      path: '/dashboard/resume/:resumeId/edit',
      element: <EditResume/>
    }
  ]
  },
  {
    path: '/',
    element: <Home/>
  },
  {
    path:'/auth/sign-in',
    element: <Signin/>
  },
  {
    path:'/auth/sign-up',
    element: <Signup/>
  },
  {
    path:'/my-resume/:resumeId/view',
    element: <ViewResume/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="resume-app-theme">
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <RouterProvider router={router} />
      </ClerkProvider>
    </ThemeProvider>
  </StrictMode>,
)
