import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Book, Bookmark, TrendingUp, TrendingDown, Users, Clock, Calendar, AlertTriangle, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

export function Dashboard() {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const chartData = [
    { name: 'Mon', students: 320 },
    { name: 'Tue', students: 350 },
    { name: 'Wed', students: 400 },
    { name: 'Thu', students: 380 },
    { name: 'Fri', students: 420 },
  ];

  const upcomingLectures = [
    { id: 1, title: "Advanced Mathematics", time: "10:00 AM", room: "Room 101", professor: "Dr. Smith" },
    { id: 2, title: "Physics Lab", time: "11:30 AM", room: "Lab 203", professor: "Dr. Johnson" },
    { id: 3, title: "Computer Science", time: "2:00 PM", room: "Room 405", professor: "Prof. Williams" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Notifications Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary/10 p-4 rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <span>Next lecture: Advanced Mathematics in 15 minutes (Room 101)</span>
        </div>
        <span className="text-lg font-semibold">
          {currentTime.toLocaleTimeString()}
        </span>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card 
          className="transition-all duration-300 hover:shadow-lg hover:scale-105"
          onMouseEnter={() => setIsHovered(0)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <GraduationCap className={`w-4 h-4 transition-colors duration-300 ${isHovered === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">128</div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">+6 from last semester</p>
            <div className="h-[100px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2} />
                  <XAxis dataKey="name" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {isHovered === 0 && (
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Courses
              </Button>
            )}
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300 hover:shadow-lg hover:scale-105"
          onMouseEnter={() => setIsHovered(1)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Lectures</CardTitle>
            <Book className={`w-4 h-4 transition-colors duration-300 ${isHovered === 1 ? 'text-primary' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">87</div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
            <div className="mt-4 space-y-2">
              {upcomingLectures.map((lecture) => (
                <motion.div 
                  key={lecture.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs p-2 bg-secondary/20 rounded"
                >
                  <div className="font-semibold">{lecture.title}</div>
                  <div className="text-muted-foreground">
                    {lecture.time} - {lecture.room} ({lecture.professor})
                  </div>
                </motion.div>
              ))}
            </div>
            {isHovered === 1 && (
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Schedule
              </Button>
            )}
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300 hover:shadow-lg hover:scale-105"
          onMouseEnter={() => setIsHovered(2)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Rooms Utilized</CardTitle>
            <Bookmark className={`w-4 h-4 transition-colors duration-300 ${isHovered === 2 ? 'text-primary' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">85%</div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
            <div className="w-full bg-secondary/20 rounded-full h-2.5 mt-4">
              <motion.div 
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1 }}
              />
            </div>
            {isHovered === 2 && (
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Room Status
              </Button>
            )}
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300 hover:shadow-lg hover:scale-105"
          onMouseEnter={() => setIsHovered(3)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
            <Users className={`w-4 h-4 transition-colors duration-300 ${isHovered === 3 ? 'text-primary' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">45</div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">+2 new faculty members</p>
            <div className="mt-4 grid grid-cols-5 gap-1">
              {[...Array(45)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              ))}
            </div>
            {isHovered === 3 && (
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Faculty List
              </Button>
            )}
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300 hover:shadow-lg hover:scale-105"
          onMouseEnter={() => setIsHovered(4)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Time Conflicts</CardTitle>
            <AlertTriangle className={`w-4 h-4 transition-colors duration-300 ${isHovered === 4 ? 'text-primary' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">3</div>
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground">-2 from last week</p>
            <div className="mt-4 space-y-2">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs p-2 bg-red-100 dark:bg-red-900/20 rounded text-red-600 dark:text-red-400"
              >
                Room 101: Physics & Chemistry (9:00 AM)
              </motion.div>
            </div>
            {isHovered === 4 && (
              <Button variant="outline" size="sm" className="w-full mt-4">
                Resolve Conflicts
              </Button>
            )}
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300 hover:shadow-lg hover:scale-105"
          onMouseEnter={() => setIsHovered(5)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Next Schedule Update</CardTitle>
            <Calendar className={`w-4 h-4 transition-colors duration-300 ${isHovered === 5 ? 'text-primary' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">2d</div>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground">Automatic update scheduled</p>
            <motion.div 
              className="mt-4 h-1 bg-secondary/20 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
            >
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 2 }}
              />
            </motion.div>
            {isHovered === 5 && (
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Schedule Settings
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}