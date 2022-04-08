import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

export type Course = {}

interface CourseState extends State {
  allCourses: Course[]
  studyingCourses: Course[]
  studyingCoursesFromPreviousCategory: Course[]
  featuredCoures: Course[]
  boughtCourses: Course[]
}

interface CourseMethods extends State {
  getAllCourses: () => Promise<void>
  getStudyingCourses: () => Promise<void>
  getStudyingCoursesFromPreviousCategory: () => Promise<void>
  getFeaturedCourses: () => Promise<void>
  getBoughtCourses: () => Promise<void>
  activateCourse: () => Promise<void>
  sortCoursesByTutor: () => void
  sortCoursesByTitle: () => void
  sortCoursesByOrder: () => void
}

export const useCourseStore = create<CourseState & CourseMethods>(
  devtools((set, get) => ({
    allCourses: [],
    studyingCourses: [],
    studyingCoursesFromPreviousCategory: [],
    featuredCoures: [],
    boughtCourses: [],
    getAllCourses: async () => { },
    getStudyingCourses: async () => { },
    getStudyingCoursesFromPreviousCategory: async () => { },
    getFeaturedCourses: async () => { },
    getBoughtCourses: async () => { },
    activateCourse: async () => { },
    sortCoursesByTutor: () => { },
    sortCoursesByTitle: () => { },
    sortCoursesByOrder: () => { },
  }))
)