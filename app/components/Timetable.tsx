import React, { useState, useEffect } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Simulated WebSocket connection
const socket = {
  on: (event: string, callback: (data: any) => void) => {
    // Simulate receiving updates
    setInterval(() => {
      callback({ type: 'update', message: 'Schedule updated' })
    }, 5000)
  },
  emit: (event: string, data: any) => {
    console.log('Emitted:', event, data)
  }
}

type ClassSession = {
  id: string
  title: string
  room: string
  day: number
  hour: number
}

function SortableClassSession({ session, onClick }: { session: ClassSession; onClick: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: session.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-card rounded p-2 mb-2 text-xs cursor-move"
      onClick={onClick}
    >
      <div className="font-medium">{session.title}</div>
      <div>{session.room}</div>
    </div>
  )
}

export function Timetable() {
  const [classSessions, setClassSessions] = useState<ClassSession[]>([
    { id: '1', title: 'CS101', room: 'Room 301', day: 1, hour: 9 },
    { id: '2', title: 'MATH201', room: 'Room 201', day: 2, hour: 11 },
    { id: '3', title: 'PHYS301', room: 'Room 101', day: 3, hour: 14 },
  ])
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    socket.on('scheduleUpdate', (data) => {
      toast({
        title: "Schedule Update",
        description: data.message,
      })
      // In a real application, you would update the classSessions state here
    })
  }, [toast])

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setClassSessions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })

      socket.emit('updateSchedule', { classSessions })
    }
  }

  const handleEditSession = (session: ClassSession) => {
    setEditingSession(session)
  }

  const handleSaveSession = (updatedSession: ClassSession) => {
    const updatedSessions = classSessions.map(session =>
      session.id === updatedSession.id ? updatedSession : session
    )
    setClassSessions(updatedSessions)
    setEditingSession(null)
    socket.emit('updateSchedule', { classSessions: updatedSessions })
    toast({
      title: "Session Updated",
      description: `${updatedSession.title} has been updated.`,
    })
  }

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Weekly Timetable</CardTitle>
          <CardDescription>Manage and view the university&apos;s weekly schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Week
            </Button>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs101">CS101: Intro to Programming</SelectItem>
                <SelectItem value="math201">MATH201: Calculus II</SelectItem>
                <SelectItem value="phys301">PHYS301: Quantum Mechanics</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Next Week
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-6 gap-4 text-sm">
              <div className="font-medium">Time</div>
              <div className="font-medium">Monday</div>
              <div className="font-medium">Tuesday</div>
              <div className="font-medium">Wednesday</div>
              <div className="font-medium">Thursday</div>
              <div className="font-medium">Friday</div>
              {[9, 10, 11, 12, 13, 14, 15, 16].map((hour) => (
                <React.Fragment key={hour}>
                  <div className="py-2">{`${hour}:00`}</div>
                  {[1, 2, 3, 4, 5].map((day) => (
                    <div key={`${day}-${hour}`} className="bg-muted rounded-md p-2 min-h-[60px]">
                      <SortableContext items={classSessions.filter(session => session.day === day && session.hour === hour).map(session => session.id)} 
                                       strategy={verticalListSortingStrategy}>
                        {classSessions
                          .filter((session) => session.day === day && session.hour === hour)
                          .map((session) => (
                            <SortableClassSession key={session.id} session={session} onClick={() => handleEditSession(session)} />
                          ))}
                      </SortableContext>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </DndContext>
        </CardContent>
      </Card>

      {/* Edit Class Session Modal */}
      <Dialog open={!!editingSession} onOpenChange={() => setEditingSession(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Class Session</DialogTitle>
            <DialogDescription>Make changes to the class session here.</DialogDescription>
          </DialogHeader>
          {editingSession && (
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const updatedSession = {
                ...editingSession,
                title: formData.get('title') as string,
                room: formData.get('room') as string,
                day: parseInt(formData.get('day') as string),
                hour: parseInt(formData.get('hour') as string),
              }
              handleSaveSession(updatedSession)
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" name="title" defaultValue={editingSession.title} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">Room</Label>
                  <Input id="room" name="room" defaultValue={editingSession.room} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">Day</Label>
                  <Select name="day" defaultValue={editingSession.day.toString()}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Monday</SelectItem>
                      <SelectItem value="2">Tuesday</SelectItem>
                      <SelectItem value="3">Wednesday</SelectItem>
                      <SelectItem value="4">Thursday</SelectItem>
                      <SelectItem value="5">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hour" className="text-right">Hour</Label>
                  <Select name="hour" defaultValue={editingSession.hour.toString()}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select an hour" />
                    </SelectTrigger>
                    <SelectContent>
                      {[9, 10, 11, 12, 13, 14, 15, 16].map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>{`${hour}:00`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}