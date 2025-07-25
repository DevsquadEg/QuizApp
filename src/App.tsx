import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ForgetPassword from "./forget-password/ForgetPassword"
import { Toaster } from 'react-hot-toast'
import ResetPassword from './reset-password/ResetPassword'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './authLayOut/AuthLayout'
import Login from './login/Login'
function App() {
   const Routes = createHashRouter([
    {
    
  
      path:'',
      element:<AuthLayout/>,
      children:[
        {
          path:'', 
          element:<Login/>
          
        },
         {
          path:'forget-password', 
          element:  <ForgetPassword/>

          
        },
         {
          path:'reset-password', 
          element: <ResetPassword/>

          
        }
      ],
      
    }
    ])

  return (
    <>
  <RouterProvider router={Routes}></RouterProvider>
  <Toaster />
    </>
  )
}

export default App
