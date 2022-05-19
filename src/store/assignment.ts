import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { authToken, request, uniqueAppID } from "../utils";

export type Question = {
  assignment_number: number
  assignment_order: number
  content: string
  course_id: number
  id: number
  type: 'text' | 'audio' | 'image' | 'video'
}

export type Answer = {
  assignment_number: number
  content: string
  course_id: number
  date_added: string
  id: number
  student: string
  tutor: string
  type: 'text' | 'audio' | 'image' | 'video'
}

export type Assignment = {
  assignment_number: number
  id: number
  questions: Question[]
  rating: number
}

interface AssignmentState extends State {
  assignments?: Assignment[]
  totalRating: number,
  answers?: Answer[]
}

interface AssignmentMethods extends State {
  restoreDefaults: () => void
  getAssignment: (
    course: number
  ) => Promise<any>
  getAssignmentAnswers: (
    course: number,
    assignmentNumber: number
  ) => Promise<any>
  submitAnswer: (
    credentials: FormData
  ) => Promise<any>
}

export const useAssignmentStore = create<AssignmentState & AssignmentMethods>(
  persist((set, get) => ({
    assignments: [],
    totalRating: 0,
    answers: [],
    restoreDefaults: () => {
      console.log('resetting assignment...')
      set({
        assignments: [],
        totalRating: 0,
        answers: [],
      })
    },
    getAssignment: async (course) => {
      return await request(`/api/course/${course}/assignment`, 'GET', undefined, {
        jwtoken: authToken()
      }).then(resp => {
        if (resp?.status === true) {
          set({
            totalRating: parseInt(resp?.data?.rating),
            assignments: resp?.data?.assignments?.map((assignment: any) => ({
              id: parseInt(assignment?.id!),
              assignment_number: parseInt(assignment?.assignment_number),
              rating: parseInt(assignment?.rating!),
              questions: assignment?.questions?.map((q: any) => ({
                ...q,
                id: parseInt(q.id),
                course_id: parseInt(q.course_id),
                assignment_order: parseInt(q.assignment_order),
                assignment_number: parseInt(q.assignment_number)
              }))
            }))
          })
        } else get()?.restoreDefaults()
      })
    },
    getAssignmentAnswers: async (course, assignmentNumber) => {
      return await request(`/api/student/course/${course}/assignment/${assignmentNumber}/answers`, 'GET', undefined, {
        jwtoken: authToken()
      }).then(resp => {
        if (resp?.status === true) {
          set({
            answers: resp?.data?.map((a: any) => ({
              ...a,
              id: parseInt(a?.id),
              assignment_number: parseInt(a?.assignment_number),
              course_id: parseInt(a?.course_id)
            }))
          })
        }
      })
    },
    submitAnswer: async (credentials) => {
      return await request('/api/student/assignment/answer', 'POST', credentials, {
        jwtoken: authToken()
      }).then(async resp => {
        if (resp?.status === true) {
          await get()?.getAssignmentAnswers(parseInt(credentials.get('courseId')?.toString()!), parseInt(credentials.get('assignmentNumber')?.toString()!))
        }

        return resp
      })
    }
  }), {
    name: uniqueAppID + '.assignment'
  })
)