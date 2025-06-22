import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import "./style.css"
import useTheme from '../../hooks/useTheme';

export default function Layout() {

  const location=useLocation();

  let {isDark}=useTheme();

  useEffect(()=>{
    let body=document.body;

    if(isDark){
      //body class='bg-gray-950'
      body.classList.add("bg-gray-950")
    }else{
      //body class = ""
      body.classList.remove("bg-gray-950")
    }
  })

  return (
    <div className={isDark ? 'bg-gray-950' : 'bg-white'}>
        <Navbar/>

        {/* dynamic router changes content */}
        <SwitchTransition>
          <CSSTransition timeout={300} classNames="fade" key={location.pathname}>
            <div className='max-w-6xl mx-auto p-3'>
              <Outlet/>
            </div>
          </CSSTransition>
        </SwitchTransition>
    </div>
  )
}
