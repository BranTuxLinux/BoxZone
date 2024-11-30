"use client"
import { redirect } from 'next/navigation'
import React from 'react'

export function ButtonGetStarted() {
    const hc = () => { 
        redirect('/login')
     }
  return (
    <button
    type="button"
    onClick={hc}
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Empieza Ahora!
  </button>
  )
}

export function ButtonRedirectDashboard() {
    const hc = () => { 
        redirect('/dashboard')
     }
  return (
    <button
    type="button"
    onClick={hc}
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Tablero
  </button>
  )
}
