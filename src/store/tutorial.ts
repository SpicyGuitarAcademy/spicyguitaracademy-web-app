import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { authToken, decodeEntities, request, uniqueAppID } from "../utils";
import { Lesson } from ".";

export type Tutorial = Lesson & {}

export type Comment = {
  comment: string
  date_added: string
  receiver: string
  tutor: {
    name: string,
    avatar: string
  }
  sender: string
}

interface TutorialState extends State {
  tutorialLessons: Tutorial[],
  tutorialComments: Comment[],
  currentTutorial?: Tutorial
}

interface TutorialMethods extends State {
  restoreDefaults: () => void
  setCurrentTutorial: (
    course: Lesson
  ) => void
  setTutorialLessons: (
    lessons: Lesson[]
  ) => void,
  getTutorialComments: (
    lessonId: number
  ) => Promise<any>
  submitComment: (
    credentials: FormData
  ) => Promise<any>
}

export const useTutorialStore = create<TutorialState & TutorialMethods>(
  persist((set, get) => ({
    tutorialLessons: [],
    tutorialComments: [],
    currentTutorial: undefined,
    restoreDefaults: () => {
      console.log('resetting tutorial...')
      set({
        tutorialLessons: [],
        tutorialComments: [],
        currentTutorial: undefined,
      })
    },
    setCurrentTutorial: (lesson) => {
      set({
        currentTutorial: lesson
      })
    },
    setTutorialLessons: (lessons) => {
      set({
        tutorialLessons: lessons
      })
    },
    getTutorialComments: async (lessonId) => {
      return request(`/api/lesson/${lessonId}/comments`, 'GET', undefined, {
        jwtoken: authToken()
      })
        .then(resp => {
          if (resp?.status === true) {
            set({
              tutorialComments: resp?.data.map((comment: any) => ({
                ...comment,
                comment: decodeEntities(comment.comment)
              }))
            })
          } else {
            set({
              tutorialComments: []
            })
          }
        })
    },
    submitComment: async (credentials) => {
      return request('/api/commentlesson', 'POST', credentials, {
        jwtoken: authToken()
      })
        .then(async resp => {
          if (resp.status === true) {
            get().getTutorialComments(get().currentTutorial?.id!)
          }
          return resp;
        })
    }
  }), {
    name: uniqueAppID + '.tutorial'
  })
)
