'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Course = {
  id: string
  name: string
}

type Module = {
  id: string
  name: string
  courseId: string
}

type Lecturer = {
  id: string
  name: string
  email: string
  phone: string
  office: string
  faculty: string
  courses: string[]
  modules: string[]
  imageUrl?: string
}

const initialLecturers: Lecturer[] = [
  {
    id: '1',
    name: 'Dr. Jane Smith',
    email: 'jane.smith@university.edu',
    phone: '+1 (555) 123-4567',
    office: 'Building A, Room 101',
    faculty: 'Computer Science',
    courses: ['1', '2'],
    modules: ['1-1', '1-2', '2-1'],
    imageUrl: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Prof. John Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 987-6543',
    office: 'Building B, Room 205',
    faculty: 'Mathematics',
    courses: ['2'],
    modules: ['2-1', '2-2'],
    imageUrl: 'https://i.pravatar.cc/150?img=2'
  },
]

const courses: Course[] = [
  { id: '1', name: 'Introduction to Computer Science' },
  { id: '2', name: 'Advanced Mathematics' },
]

const modules: Module[] = [
  { id: '1-1', name: 'Programming Basics', courseId: '1' },
  { id: '1-2', name: 'Data Structures', courseId: '1' },
  { id: '2-1', name: 'Linear Algebra', courseId: '2' },
  { id: '2-2', name: 'Calculus III', courseId: '2' },
]

export function Lecturer() {
  const [lecturers, setLecturers] = useState<Lecturer[]>(initialLecturers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFaculty, setFilterFaculty] = useState('')
  const [editingLecturer, setEditingLecturer] = useState<Lecturer | null>(null)

  const filteredLecturers = lecturers.filter(lecturer => 
    lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterFaculty === '' || lecturer.faculty === filterFaculty)
  )

  const handleAddLecturer = (newLecturer: Omit<Lecturer, 'id'>) => {
    const lecturer: Lecturer = {
      ...newLecturer,
      id: (lecturers.length + 1).toString(),
    }
    setLecturers([...lecturers, lecturer])
  }

  const handleEditLecturer = (updatedLecturer: Lecturer) => {
    setLecturers(lecturers.map(lecturer => lecturer.id === updatedLecturer.id ? updatedLecturer : lecturer))
    setEditingLecturer(null)
  }

  const handleDeleteLecturer = (lecturerId: string) => {
    setLecturers(lecturers.filter(lecturer => lecturer.id !== lecturerId))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lecturers</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Lecturer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Lecturer</DialogTitle>
              <DialogDescription>Enter the details for the new lecturer.</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleAddLecturer({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                office: formData.get('office') as string,
                faculty: formData.get('faculty') as string,
                courses: [],
                modules: [],
              })
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" name="email" type="email" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone</Label>
                  <Input id="phone" name="phone" type="tel" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="office" className="text-right">Office</Label>
                  <Input id="office" name="office" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="faculty" className="text-right">Faculty</Label>
                  <Select name="faculty" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Lecturer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Search lecturers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterFaculty} onValueChange={setFilterFaculty}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Faculty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Faculties</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLecturers.map(lecturer => (
          <Card key={lecturer.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={lecturer.imageUrl} alt={lecturer.name} />
                  <AvatarFallback>{lecturer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{lecturer.name}</CardTitle>
                  <CardDescription>{lecturer.faculty}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 opacity-70" /> <span>{lecturer.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 opacity-70" /> <span>{lecturer.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 opacity-70" /> <span>{lecturer.office}</span>
                </div>
              </div>
              <Tabs defaultValue="courses" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="modules">Modules</TabsTrigger>
                </TabsList>
                <TabsContent value="courses">
                  <div className="space-y-2">
                    {courses.filter(course => lecturer.courses.includes(course.id)).map(course => (
                      <Badge key={course.id} variant="secondary">{course.name}</Badge>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="modules">
                  <div className="space-y-2">
                    {modules.filter(module => lecturer.modules.includes(module.id)).map(module => (
                      <Badge key={module.id} variant="outline">{module.name}</Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setEditingLecturer(lecturer)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteLecturer(lecturer.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Lecturer Dialog */}
      <Dialog open={!!editingLecturer} onOpenChange={() => setEditingLecturer(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Lecturer</DialogTitle>
            <DialogDescription>Make changes to the lecturer's details.</DialogDescription>
          </DialogHeader>
          {editingLecturer && (
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleEditLecturer({
                ...editingLecturer,
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                office: formData.get('office') as string,
                faculty: formData.get('faculty') as string,
                courses: Array.from(formData.getAll('courses') as string[]),
                modules: Array.from(formData.getAll('modules') as string[]),
              })
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" defaultValue={editingLecturer.name} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={editingLecturer.email} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone</Label>
                  <Input id="phone" name="phone" type="tel" defaultValue={editingLecturer.phone} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="office" className="text-right">Office</Label>
                  <Input id="office" name="office" defaultValue={editingLecturer.office} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="faculty" className="text-right">Faculty</Label>
                  <Select name="faculty" defaultValue={editingLecturer.faculty} required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right">Courses</Label>
                  <div className="col-span-3 space-y-2">
                    {courses.map(course => (
                      <div key={course.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`course-${course.id}`} 
                          name="courses" 
                          value={course.id} 
                          defaultChecked={editingLecturer.courses.includes(course.id)}
                        />
                        <Label htmlFor={`course-${course.id}`}>{course.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right">Modules</Label>
                  <div className="col-span-3 space-y-2">
                    {modules.map(module => (
                      <div key={module.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`module-${module.id}`} 
                          name="modules" 
                          value={module.id} 
                          defaultChecked={editingLecturer.modules.includes(module.id)}
                        />
                        <Label htmlFor={`module-${module.id}`}>{module.name}</Label>
                      </div>
                    ))}
                  </div>
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