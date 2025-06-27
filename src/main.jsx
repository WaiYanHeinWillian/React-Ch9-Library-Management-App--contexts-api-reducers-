import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ThemeContextPorvider } from './contexts/ThemeContext'
import AuthContextProvider from './contexts/AuthContext'
import Router from './router'


createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <ThemeContextPorvider>
            <Router/>
        </ThemeContextPorvider>
    </AuthContextProvider>
)
