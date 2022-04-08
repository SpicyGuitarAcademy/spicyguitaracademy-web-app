import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

export type Lesson = {}

interface LessonState extends State {
  allLessons: Lesson[]
  freeLessons: Lesson[]
  courseLessons: Lesson[]
  featuredLessons: Lesson[]
}

interface LessonMethods extends State {
  getAllLessons: () => Promise<any>
  getFreeLessons: () => Promise<any>
  getCourseLessons: () => Promise<any>
  getFeaturedLessons: () => Promise<any>
  activateLesson: () => Promise<any>
  activateFeaturedLesson: () => Promise<any>
}

export const useLessonStore = create<LessonState & LessonMethods>(
  devtools((set, get) => ({
    allLessons: [],
    freeLessons: [],
    courseLessons: [],
    featuredLessons: [],
    getAllLessons: async () => { },
    getFreeLessons: async () => { },
    getCourseLessons: async () => { },
    getFeaturedLessons: async () => { },
    activateLesson: async () => { },
    activateFeaturedLesson: async () => { },
  }))
)