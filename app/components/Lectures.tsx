'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Lecture = {
  id: string
  courseId: string
  courseName: string
  lecturerId: string
  lecturerName: string
  day: string
  startTime: string
  endTime: string
  room: string
  isRecurring: boolean
  status: 'scheduled' | 'cancelled' | 'completed'
}

type Course = {
  id: string
  name: string
}

type Lecturer = {
  id: string
  name: string
}

const initialLectures: Lecture[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    lecturerId: '1',
    lecturerName: 'Dr. Jane Smith',
    day: 'Monday',
    startTime: '09:00',
    endTime: '11:00',
    room: 'Room A101',
    isRecurring: true,
    status: 'scheduled'
  },
  {
    id: '2',
    courseId: '2',
    courseName: 'Advanced Mathematics',
    lecturerId: '2',
    lecturerName: 'Prof. John Doe',
    day: 'Tuesday',
    startTime: '14:00',
    endTime: '16:00',
    room: 'Room B205',
    isRecurring: true,
    status: 'scheduled'
  },
]

const courses: Course[] = [
  { id: '1', name: 'Introduction to Computer Science' },
  { id: '2', name: 'Advanced Mathematics' },
]

const lecturers: Lecturer[] = [
  { id: '1', name: 'Dr. Jane Smith' },
  { id: '2', name: 'Prof. John Doe' },
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export function Lectures() {
  const [lectures, setLectures] = useState<Lecture[]>(initialLectures)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDay, setFilterDay] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null)

  const filteredLectures = lectures.filter(lecture => 
    (lecture.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     lecture.lecturerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterDay === '' || lecture.day === filterDay) &&
    (filterStatus === '' || lecture.status === filterStatus)
  )

  const handleAddLecture = (newLecture: Omit<Lecture, 'id'>) => {
    const lecture: Lecture = {
      ...newLecture,
      id: (lectures.length + 1).toString(),
    }
    setLectures([...lectures, lecture])
  }

  const handleEditLecture = (updatedLecture: Lecture) => {
    setLectures(lectures.map(lecture => lecture.id === updatedLecture.id ? updatedLecture : lecture))
    setEditingLecture(null)
  }

  const handleDeleteLecture = (lectureId: string) => {
    setLectures(lectures.filter(lecture => lecture.id !== lectureId))
  }

  const handleCancelLecture = (lectureId: string) => {
    setLectures(lectures.map(lecture => 
      lecture.id === lectureId ? { ...lecture, status: 'cancelled' } : lecture
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lectures</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Lecture
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Lecture</DialogTitle>
              <DialogDescription>Enter the details for the new lecture.</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const courseId = formData.get('course') as string
              const lecturerId = formData.get('lecturer') as string
              handleAddLecture({
                courseId,
                courseName: courses.find(c => c.id === courseId)?.name || '',
                lecturerId,
                lecturerName: lecturers.find(l => l.id === lecturerId)?.name || '',
                day: formData.get('day') as string,
                startTime: formData.get('startTime') as string,
                endTime: formData.get('endTime') as string,
                room: formData.get('room') as string,
                isRecurring: formData.get('isRecurring') === 'on',
                status: 'scheduled'
              })
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="course" className="text-right">Course</Label>
                  <Select name="course" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lecturer" className="text-right">Lecturer</Label>
                  <Select name="lecturer" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select lecturer" />
                    </SelectTrigger>
                    <SelectContent>
                      {lecturers.map(lecturer => (
                        <SelectItem key={lecturer.id} value={lecturer.id}>{lecturer.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">Day</Label>
                  <Select name="day" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startTime" className="text-right">Start Time</Label>
                  <Input id="startTime" name="startTime" type="time" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endTime" className="text-right">End Time</Label>
                  <Input id="endTime" name="endTime" type="time" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">Room</Label>
                  <Input id="room" name="room" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isRecurring" className="text-right">Recurring</Label>
                  <Checkbox id="isRecurring" name="isRecurring" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Lecture</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Search lectures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterDay} onValueChange={setFilterDay}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Days</SelectItem>
            {days.map(day => (
              <SelectItem key={day} value={day}>{day}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Lecturer</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLectures.map(lecture => (
                <TableRow key={lecture.id}>
                  <TableCell>{lecture.courseName}</TableCell>
                  <TableCell>{lecture.lecturerName}</TableCell>
                  <TableCell>{lecture.day}</TableCell>
                  <TableCell>{`${lecture.startTime} - ${lecture.endTime}`}</TableCell>
                  <TableCell>{lecture.room}</TableCell>
                  <TableCell>
                    <Badge variant={lecture.status === 'scheduled' ? 'default' : lecture.status === 'cancelled' ? 'destructive' : 'secondary'}>
                      {lecture.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingLecture(lecture)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCancelLecture(lecture.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteLecture(lecture.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="grid">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLectures.map(lecture => (
              <Card key={lecture.id}>
                <CardHeader>
                  <CardTitle>{lecture.courseName}</CardTitle>
                  <CardDescription>{lecture.lecturerName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 opacity-70" /> <span>{lecture.day}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 opacity-70" /> <span>{`${lecture.startTime} - ${lecture.endTime}`}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 opacity-70" /> <span>{lecture.room}</span>
                    </div>
                    <Badge variant={lecture.status === 'scheduled' ? 'default' : lecture.status === 'cancelled' ? 'destructive' : 'secondary'}>
                      {lecture.status}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setEditingLecture(lecture)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="outline" onClick={() => handleCancelLecture(lecture.id)}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteLecture(lecture.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Lecture Dialog */}
      <Dialog open={!!editingLecture} onOpenChange={() => 

 setEditingLecture(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Lecture</DialogTitle>
            <DialogDescription>Make changes to the lecture details.</DialogDescription>
          </DialogHeader>
          {editingLecture && (
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const courseId = formData.get('course') as string
              const lecturerId = formData.get('lecturer') as string
              handleEditLecture({
                ...editingLecture,
                courseId,
                courseName: courses.find(c => c.id === courseId)?.name || '',
                lecturerId,
                lecturerName: lecturers.find(l => l.id === lecturerId)?.name || '',
                day: formData.get('day') as string,
                startTime: formData.get('startTime') as string,
                endTime: formData.get('endTime') as string,
                room: formData.get('room') as string,
                isRecurring: formData.get('isRecurring') === 'on',
                status: formData.get('status') as 'scheduled' | 'cancelled' | 'completed',
              })
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="course" className="text-right">Course</Label>
                  <Select name="course" defaultValue={editingLecture.courseId}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lecturer" className="text-right">Lecturer</Label>
                  <Select name="lecturer" defaultValue={editingLecture.lecturerId}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select lecturer" />
                    </SelectTrigger>
                    <SelectContent>
                      {lecturers.map(lecturer => (
                        <SelectItem key={lecturer.id} value={lecturer.id}>{lecturer.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">Day</Label>
                  <Select name="day" defaultValue={editingLecture.day}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startTime" className="text-right">Start Time</Label>
                  <Input id="startTime" name="startTime" type="time" defaultValue={editingLecture.startTime} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endTime" className="text-right">End Time</Label>
                  <Input id="endTime" name="endTime" type="time" defaultValue={editingLecture.endTime} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">Room</Label>
                  <Input id="room" name="room" defaultValue={editingLecture.room} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isRecurring" className="text-right">Recurring</Label>
                  <Checkbox id="isRecurring" name="isRecurring" defaultChecked={editingLecture.isRecurring} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select name="status" defaultValue={editingLecture.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}