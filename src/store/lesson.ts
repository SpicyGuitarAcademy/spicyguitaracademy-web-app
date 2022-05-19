import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { authToken, decodeEntities, request, uniqueAppID } from "../utils";
import { useCourseStore, useStudentStatsStore } from ".";

export type Lesson = {
  active: boolean
  audio: string | null
  course: number
  date_added: string
  description: string
  free: boolean
  free_order: number
  high_video: string
  id: number
  lesson: string
  low_video: string | null
  note: string
  ord: number
  practice_audio: string
  tablature: string
  thumbnail: string
  tutor: string
}

interface LessonState extends State {
  allLessons: Lesson[]
  freeLessons: Lesson[]
  courseLessons: Lesson[]
  featuredLessons: Lesson[]
}

interface LessonMethods extends State {
  restoreDefaults: () => void
  getAllLessons: () => Promise<void>
  getFreeLessons: () => Promise<void>
  getCourseLessons: (course: number) => Promise<any>
  getFeaturedLessons: (course: number) => Promise<any>
  activateLesson: (credentials: FormData) => Promise<any>
  activateFeaturedLesson: (credentials: FormData) => Promise<any>
}

export const useLessonStore = create<LessonState & LessonMethods>(
  persist((set, get) => ({
    allLessons: [],
    freeLessons: [],
    courseLessons: [],
    featuredLessons: [],
    restoreDefaults: () => {
      console.log('resetting auth...')
      set({
        allLessons: [],
        freeLessons: [],
        courseLessons: [],
        featuredLessons: [],
      })
    },
    getAllLessons: async () => {
      request('/api/student/alllessons', 'GET', undefined, {
        jwtoken: authToken()
      })
        .then(resp => {
          // console.log('all lessons', resp)
          if (resp.status) {
            set({
              allLessons: resp?.data?.map((item: any) => (
                {
                  ...item,
                  lesson: decodeEntities(item?.lesson),
                  description: decodeEntities(item?.description),
                  note: decodeEntities(item?.note),
                  active: item?.active === '1',
                  free: item?.free === '1',
                  free_order: parseInt(item?.free_order),
                  id: parseInt(item?.id),
                  ord: parseInt(item?.ord),
                  course: parseInt(item?.course)
                }
              ))
            })
          }
        })
    },
    getFreeLessons: async () => {
      request('/api/student/freelessons', 'GET', undefined, {
        jwtoken: authToken()
      })
        .then(resp => {
          // console.log('free lessons', resp)
          if (resp.status) {
            set({
              freeLessons: resp?.data?.map((item: any) => (
                {
                  ...item,
                  lesson: decodeEntities(item?.lesson),
                  description: decodeEntities(item?.description),
                  note: decodeEntities(item?.note),
                  active: item?.active === '1',
                  free: item?.free === '1',
                  free_order: parseInt(item?.free_order),
                  id: parseInt(item?.id),
                  ord: parseInt(item?.ord),
                  course: parseInt(item?.course)
                }
              ))
            })
          }
        })
    },
    getCourseLessons: async (course) => {
      return request(`/api/course/${course}/lessons`, 'GET', undefined, {
        jwtoken: authToken()
      }).then(resp => {
        if (resp.status === true) {
          set({
            courseLessons: resp?.data?.map((item: any) => (
              {
                ...item,
                lesson: decodeEntities(item?.lesson),
                description: decodeEntities(item?.description),
                note: decodeEntities(item?.note),
                active: item?.active === '1',
                free: item?.free === '1',
                free_order: parseInt(item?.free_order),
                id: parseInt(item?.id),
                ord: parseInt(item?.ord),
                course: parseInt(item?.course)
              }
            ))
          })
        }

        return
      })
    },
    getFeaturedLessons: async (course) => {
      request(`/api/course/featured/${course}/lessons`, 'GET', undefined, {
        jwtoken: authToken()
      }).then(resp => {
        if (resp.status === true) {
          set({
            featuredLessons: resp?.data?.map((item: any) => (
              {
                ...item,
                lesson: decodeEntities(item?.lesson),
                description: decodeEntities(item?.description),
                note: decodeEntities(item?.note),
                active: item?.active === '1',
                free: item?.free === '1',
                free_order: parseInt(item?.free_order),
                id: parseInt(item?.id),
                ord: parseInt(item?.ord),
                course: parseInt(item?.course)
              }
            ))
          })
        }

        return
      })
    },
    activateLesson: async (credentials) => {
      return request('/api/student/lesson/activate', 'POST', credentials, {
        jwtoken: authToken()
      })
        .then(resp => {
          if (resp?.status === true) {

            const stats = useStudentStatsStore.getState()?.studentStats
            const studyingCourses = useCourseStore.getState()?.studyingCourses!
            const selectedCourse = useCourseStore.getState()?.selectedCourse!
            const newTakenLessons = stats?.takenLessons + 1

            // update the number of lessons taken in the stats
            useStudentStatsStore.setState({
              studentStats: {
                ...stats,
                takenLessons: newTakenLessons
              }
            })

            const course = useCourseStore.getState()?.selectedCourse!
            course.done = course?.done + 1

            useCourseStore.setState({
              selectedCourse: {
                ...course
              },
            })

            const index = studyingCourses.findIndex(course =>
              useCourseStore.getState()?.selectedCourse?.id === course?.id
            )
            studyingCourses.splice(index, 1, selectedCourse)

            useCourseStore.setState({
              studyingCourses: [
                ...studyingCourses
              ]
            })

            // takenCourses: (useCourseStore.getState()?.selectedCourse?.done === useCourseStore.getState()?.selectedCourse?.lessons)
            //   ? useStudentStatsStore.getState()?.studentStats?.takenCourses + 1
            //   : useStudentStatsStore.getState()?.studentStats?.allLessons

          }
        })
    },
    activateFeaturedLesson: async (credentials) => {
      return request('/api/student/lesson/activate-featured', 'POST', credentials, {
        jwtoken: authToken()
      })
        .then(resp => {
          if (resp?.status === true) {

            const boughtCourses = useCourseStore.getState()?.boughtCourses!
            const selectedCourse = useCourseStore.getState()?.selectedCourse!
            selectedCourse.done = selectedCourse.done + 1

            useCourseStore.setState({
              selectedCourse: selectedCourse,
            })

            const index = boughtCourses.findIndex(course =>
              useCourseStore.getState()?.selectedCourse?.id === course?.id
            )
            boughtCourses.splice(index, 1, selectedCourse)

            useCourseStore.setState({
              boughtCourses: [
                ...boughtCourses
              ]
            })

          }
        })
    },
  }), {
    name: uniqueAppID + '.lesson'
  })
)