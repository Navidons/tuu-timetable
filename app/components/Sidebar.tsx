import React from 'react'
import { Button } from "@/components/ui/button"
import { GraduationCap, LayoutDashboard, Calendar, Book, Bookmark, Settings, Sun, Moon, X, Presentation } from 'lucide-react'

type SidebarProps = {
  setActiveComponent: (component: string) => void
  toggleDarkMode: () => void
  isDarkMode: boolean
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

export function Sidebar({ setActiveComponent, toggleDarkMode, isDarkMode, isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  return (
    <aside className={`bg-card fixed inset-y-0 left-0 z-50 w-72 flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
  isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
} flex lg:static`}>
      <div className="flex h-14 items-center border-b px-4">
        <GraduationCap className="mr-2 h-6 w-6" />
        <h1 className="text-lg font-semibold">UniSchedule</h1>
        <button
          className="ml-auto lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close sidebar</span>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('timetable')}>
              <Calendar className="mr-2 h-4 w-4" />
              Timetable
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('lectures')}>
              <Presentation className="mr-2 h-4 w-4" />
              Lectures
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('lecturer')}>
              <Book className="mr-2 h-4 w-4" />
              Lecturer
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('courses')}>
              <Bookmark className="mr-2 h-4 w-4" />
              Courses
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </li>
        </ul>
      </nav>
      <div className="border-t p-4">
        <Button variant="outline" className="w-full" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </aside>
  )
}