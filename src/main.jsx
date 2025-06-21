import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ThemeContextPorvider } from './contexts/ThemeContext'


createRoot(document.getElementById('root')).render(
    <ThemeContextPorvider>
        <RouterProvider router={router} />
    </ThemeContextPorvider>
)
