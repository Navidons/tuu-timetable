'use client'

import React, { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { Dashboard } from './components/Dashboard'
import { Timetable } from './components/Timetable'
import { Lecturer } from './components/Lecturer'
import { Courses } from './components/Courses'
import { Settings } from './components/Settings'
import { Lectures } from './components/Lectures'

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeComponent, setActiveComponent] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />
      case 'timetable':
        return <Timetable />
      case 'lecturer':
        return <Lecturer />
      case 'courses':
        return <Courses />
      case 'settings':
        return <Settings />
      case 'lectures':
        return <Lectures />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          setActiveComponent={setActiveComponent} 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={isDarkMode}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-auto p-6">
            {renderActiveComponent()}
          </main>
        </div>
      </div>
    </div>
  )
}