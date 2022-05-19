import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { authToken, decodeEntities, request, uniqueAppID } from "../utils";
import { useStudentStatsStore } from "./student-stats";

export type Course = {
  active: boolean
  category: number
  course: string
  date_added: string
  description: string
  done: number
  featured: boolean
  featured_lessons: null
  featured_order: number
  featured_preview_video: string | null
  featuredprice: number
  id: number
  lessons: number
  ord: number
  status: boolean
  thumbnail: string
  total: number
  tutor: string
}

interface CourseState extends State {
  allCourses: { beginner?: Course[], amateur?: Course[], intermediate?: Course[], advanced?: Course[] }
  studyingCourses: Course[]
  studyingCoursesFromPreviousCategory: Course[]
  featuredCourses: Course[]
  boughtCourses: Course[]
  boughtCoursesId: number[]
  sortedBy: 'order' | 'tutor' | 'title'
  selectedCourse?: Course
}

interface CourseMethods extends State {
  restoreDefaults: () => void
  setSelectedCourse: (course: Course) => void
  getAllCourses: () => Promise<void>
  getStudyingCourses: () => Promise<void>
  getStudyingCoursesFromPreviousCategory: (category: number) => Promise<void>
  getFeaturedCourses: () => Promise<void>
  getBoughtCourses: () => Promise<void>
  activateCourse: (
    credentials: FormData
  ) => Promise<void>
  completeCateory: (
    credentials: FormData
  ) => Promise<any>
  sortCoursesByTutor: () => void
  sortCoursesByTitle: () => void
  sortCoursesByOrder: () => void
}

export const useCourseStore = create<CourseState & CourseMethods>(
  persist(
    (set, get) => ({
      allCourses: {
        beginner: [],
        amateur: [],
        intermediate: [],
        advanced: []
      },
      studyingCourses: [],
      studyingCoursesFromPreviousCategory: [],
      featuredCourses: [],
      boughtCourses: [],
      boughtCoursesId: [],
      selectedCourse: undefined,
      sortedBy: 'order',
      restoreDefaults: () => {
        console.log('resetting course...')
        set({
          allCourses: {
            beginner: [],
            amateur: [],
            intermediate: [],
            advanced: []
          },
          studyingCourses: [],
          studyingCoursesFromPreviousCategory: [],
          featuredCourses: [],
          boughtCourses: [],
          boughtCoursesId: [],
          sortedBy: 'order',
          selectedCourse: undefined,
        })
      },
      setSelectedCourse: (course) => {
        set({
          selectedCourse: course
        })
      },
      getAllCourses: async () => {
        request('/api/student/courses/all', 'GET', undefined, {
          jwtoken: authToken()
        })
          .then(resp => {
            // console.log('all courses', resp)
            if (resp.status) {
              set({
                allCourses: {
                  beginner: resp?.data?.beginners?.map((item: any) => (
                    {
                      ...item,
                      course: decodeEntities(item?.course),
                      description: decodeEntities(item?.description),
                      active: item?.active === '1',
                      category: parseInt(item?.category),
                      done: parseInt(item?.done),
                      featured: item?.featured === '1',
                      featured_order: parseInt(item?.featured_order),
                      featuredprice: parseInt(item?.featuredprice),
                      id: parseInt(item?.id),
                      lessons: parseInt(item?.lessons),
                      ord: parseInt(item?.ord),
                      total: parseInt(item?.total)
                    }
                  )),
                  amateur: resp?.data?.amateurs?.map((item: any) => (
                    {
                      ...item,
                      course: decodeEntities(item?.course),
                      description: decodeEntities(item?.description),
                      active: item?.active === '1',
                      category: parseInt(item?.category),
                      done: parseInt(item?.done),
                      featured: item?.featured === '1',
                      featured_order: parseInt(item?.featured_order),
                      featuredprice: parseInt(item?.featuredprice),
                      id: parseInt(item?.id),
                      lessons: parseInt(item?.lessons),
                      ord: parseInt(item?.ord),
                      total: parseInt(item?.total),
                    }
                  )),
                  intermediate: resp?.data?.intermediates?.map((item: any) => (
                    {
                      ...item,
                      course: decodeEntities(item?.course),
                      description: decodeEntities(item?.description),
                      active: item?.active === '1',
                      category: parseInt(item?.category),
                      done: parseInt(item?.done),
                      featured: item?.featured === '1',
                      featured_order: parseInt(item?.featured_order),
                      featuredprice: parseInt(item?.featuredprice),
                      id: parseInt(item?.id),
                      lessons: parseInt(item?.lessons),
                      ord: parseInt(item?.ord),
                      total: parseInt(item?.total),
                    }
                  )),
                  advanced: resp?.data?.advanceds?.map((item: any) => (
                    {
                      ...item,
                      course: decodeEntities(item?.course),
                      description: decodeEntities(item?.description),
                      active: item?.active === '1',
                      category: parseInt(item?.category),
                      done: parseInt(item?.done),
                      featured: item?.featured === '1',
                      featured_order: parseInt(item?.featured_order),
                      featuredprice: parseInt(item?.featuredprice),
                      id: parseInt(item?.id),
                      lessons: parseInt(item?.lessons),
                      ord: parseInt(item?.ord),
                      total: parseInt(item?.total),
                    }
                  ))
                }
              })
            }
          })
      },
      getStudyingCourses: async () => {
        request('/api/student/courses/studying', 'GET', undefined, {
          jwtoken: authToken()
        })
          .then(resp => {
            // console.log('studying courses', resp)
            if (resp.status) {
              set({
                studyingCourses: resp?.data?.map((item: any) => (
                  {
                    ...item,
                    course: decodeEntities(item?.course),
                    description: decodeEntities(item?.description),
                    active: item?.active === '1',
                    category: parseInt(item?.category),
                    done: parseInt(item?.done),
                    featured: item?.featured === '1',
                    featured_order: parseInt(item?.featured_order),
                    featuredprice: parseInt(item?.featuredprice),
                    id: parseInt(item?.id),
                    lessons: parseInt(item?.lessons),
                    ord: parseInt(item?.ord),
                    total: parseInt(item?.total),
                  }
                ))
              })
            }
          })
      },
      getStudyingCoursesFromPreviousCategory: async (category) => {
        return request(`/api/student/courses/studying/previous/${category}`, 'GET', undefined, {
          jwtoken: authToken()
        }).then(resp => {
          // console.log('studying courses', resp)
          if (resp.status) {
            set({
              studyingCourses: resp?.data?.map((item: any) => (
                {
                  ...item,
                  course: decodeEntities(item?.course),
                  description: decodeEntities(item?.description),
                  active: item?.active === '1',
                  category: parseInt(item?.category),
                  done: parseInt(item?.done),
                  featured: item?.featured === '1',
                  featured_order: parseInt(item?.featured_order),
                  featuredprice: parseInt(item?.featuredprice),
                  id: parseInt(item?.id),
                  lessons: parseInt(item?.lessons),
                  ord: parseInt(item?.ord),
                  total: parseInt(item?.total),
                }
              ))
            })
          }
        })
      },
      getFeaturedCourses: async () => {
        request('/api/student/featuredcourses/all', 'GET', undefined, {
          jwtoken: authToken()
        })
          .then(resp => {
            // console.log('featured courses', resp)
            if (resp.status) {
              set({
                featuredCourses: resp?.data?.map((item: any) => (
                  {
                    ...item,
                    course: decodeEntities(item?.course),
                    description: decodeEntities(item?.description),
                    active: item?.active === '1',
                    category: parseInt(item?.category),
                    done: parseInt(item?.done),
                    featured: item?.featured === '1',
                    featured_order: parseInt(item?.featured_order),
                    featuredprice: parseInt(item?.featuredprice),
                    id: parseInt(item?.id),
                    lessons: parseInt(item?.lessons),
                    ord: parseInt(item?.ord),
                    total: parseInt(item?.total),
                  }
                ))
              })
            }
          })
      },
      getBoughtCourses: async () => {
        request('/api/student/featuredcourses/bought', 'GET', undefined, {
          jwtoken: authToken()
        })
          .then(resp => {
            // console.log('bought courses', resp)
            if (resp.status) {
              set({
                boughtCoursesId: resp?.data?.map((item: any) => parseInt(item.id)),
                boughtCourses: resp?.data?.map((item: any) => (
                  {
                    ...item,
                    course: decodeEntities(item?.course),
                    description: decodeEntities(item?.description),
                    active: item?.active === '1',
                    category: parseInt(item?.category),
                    done: parseInt(item?.done),
                    featured: item?.featured === '1',
                    featured_order: parseInt(item?.featured_order),
                    featuredprice: parseInt(item?.featuredprice),
                    id: parseInt(item?.id),
                    lessons: parseInt(item?.lessons),
                    ord: parseInt(item?.ord),
                    total: parseInt(item?.total),
                  }
                ))
              })
            }
          })
      },
      activateCourse: async (credentials) => {
        return request('/api/student/course/activate', 'POST', credentials, {
          jwtoken: authToken()
        })
          .then(resp => {
            if (resp?.status === true) {
              set({
                selectedCourse: {
                  ...get().selectedCourse!,
                  status: true
                }
              })

              const courses = get()?.studyingCourses
              const index = courses.findIndex(course => {
                return course?.id === get()?.selectedCourse!.id
              })
              courses.splice(index, 1, get()?.selectedCourse!)

              set({
                studyingCourses: [
                  ...courses
                ]
              })

              const stats = useStudentStatsStore.getState()?.studentStats
              useStudentStatsStore.setState({
                studentStats: {
                  ...stats,
                  takenCourses: stats?.takenCourses + 1
                }
              })
            }

            return resp
          })
      },
      completeCateory: async (credentials) => {
        return await request('/api/student/category/complete', 'POST', credentials, {
          jwtoken: authToken()
        })
      },
      sortCoursesByTutor: () => {
        set({
          sortedBy: 'tutor',
          studyingCourses:
            get().studyingCourses?.sort((a, b) => a.tutor < b.tutor ? -1 : 1),
          featuredCourses:
            get().featuredCourses?.sort((a, b) => a.tutor < b.tutor ? -1 : 1),
          boughtCourses:
            get().boughtCourses?.sort((a, b) => a.tutor < b.tutor ? -1 : 1),
          allCourses: {
            beginner: get().allCourses?.beginner?.sort((a, b) => a.tutor < b.tutor ? -1 : 1),
            amateur: get().allCourses?.amateur?.sort((a, b) => a.tutor < b.tutor ? -1 : 1),
            intermediate: get().allCourses?.intermediate?.sort((a, b) => a.tutor < b.tutor ? -1 : 1),
            advanced: get().allCourses?.advanced?.sort((a, b) => a.tutor < b.tutor ? -1 : 1),
          }
        })
      },
      sortCoursesByTitle: () => {
        set({
          sortedBy: 'title',
          studyingCourses:
            get().studyingCourses?.sort((a, b) => a.course < b.course ? -1 : 1),
          featuredCourses:
            get().featuredCourses?.sort((a, b) => a.course < b.course ? -1 : 1),
          boughtCourses:
            get().boughtCourses?.sort((a, b) => a.course < b.course ? -1 : 1),
          allCourses: {
            beginner: get().allCourses?.beginner?.sort((a, b) => a.course < b.course ? -1 : 1),
            amateur: get().allCourses?.amateur?.sort((a, b) => a.course < b.course ? -1 : 1),
            intermediate: get().allCourses?.intermediate?.sort((a, b) => a.course < b.course ? -1 : 1),
            advanced: get().allCourses?.advanced?.sort((a, b) => a.course < b.course ? -1 : 1),
          }
        })
      },
      sortCoursesByOrder: () => {
        set({
          sortedBy: 'order',
          studyingCourses:
            get().studyingCourses?.sort((a, b) => a.ord - b.ord),
          featuredCourses:
            get().featuredCourses?.sort((a, b) => a.ord - b.ord),
          boughtCourses:
            get().boughtCourses?.sort((a, b) => a.ord - b.ord),
          allCourses: {
            beginner: get().allCourses?.beginner?.sort((a, b) => a.ord - b.ord),
            amateur: get().allCourses?.amateur?.sort((a, b) => a.ord - b.ord),
            intermediate: get().allCourses?.intermediate?.sort((a, b) => a.ord - b.ord),
            advanced: get().allCourses?.advanced?.sort((a, b) => a.ord - b.ord),
          }
        })
      },
    }), {
    name: uniqueAppID + '.course'
  })
)