import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { authToken, request, uniqueAppID } from "../utils";

export type StudentStatsType = {
  allCourses: number
  allLessons: number
  takenCourses: number
  takenLessons: number
  category: number
  categoryLabel: string
  viewingPrevious: boolean
  originalCategory?: number
  originalCategoryLabel?: string
}

export type Category = {
  label: string
  id: number
}

interface StudentStatsState extends State {
  studentStats: StudentStatsType
  previousCategories: Category[]
}

interface StudentStatsMethods extends State {
  restoreDefaults: () => void
  getStudentCategoryAndStats: () => Promise<void>
  getStudentStatsForPreviousCategory: (
    category: number,
    isReturn: boolean
  ) => Promise<any>
  chooseCategory: (
    crendetials: FormData
  ) => Promise<any>
  rechooseCategory: (
    crendetials: FormData
  ) => Promise<any>
  getPreviousCategories: () => Promise<any>
}

export const useStudentStatsStore = create<StudentStatsState & StudentStatsMethods>(
  persist(
    (set, get) => ({
      studentStats: {
        allCourses: 0,
        allLessons: 0,
        takenCourses: 0,
        takenLessons: 0,
        category: 0,
        categoryLabel: 'No Category',
        viewingPrevious: false,
        originalCategory: 0,
        originalCategoryLabel: 'No Category'
      },
      previousCategories: [],
      restoreDefaults: () => {
        console.log('resetting student stats...')
        set({
          studentStats: {
            allCourses: 0,
            allLessons: 0,
            takenCourses: 0,
            takenLessons: 0,
            category: 0,
            categoryLabel: 'No Category',
            viewingPrevious: false,
            originalCategory: 0,
            originalCategoryLabel: 'No Category'
          },
          previousCategories: []
        })
      },
      getStudentCategoryAndStats: async () => {
        request('/api/student/statistics', 'GET', undefined, {
          jwtoken: authToken()
        })
          .then(resp => {
            // console.log('student stats', resp)
            if (resp.status && resp?.data !== null) {
              set({
                studentStats: {
                  ...resp?.data,
                  categoryLabel: [
                    "No Category",
                    "Beginner",
                    "Amateur",
                    "Intermediate",
                    "Advanced"
                  ][resp?.data?.category!],
                  viewingPrevious: false
                }
              })
            }
          })
      },
      getStudentStatsForPreviousCategory: async (category, isReturn) => {
        return request(`/api/student/statistics/previous/${category}`, 'GET', undefined, {
          jwtoken: authToken()
        })
          .then(resp => {
            // console.log('Student stats', resp, resp?.data?.category)
            if (resp.status) {
              set({
                studentStats: {
                  ...resp?.data,
                  categoryLabel: [
                    "No Category",
                    "Beginner",
                    "Amateur",
                    "Intermediate",
                    "Advanced"
                  ][resp?.data?.category!],
                  viewingPrevious: isReturn === false,
                  originalCategory: get()?.studentStats?.category,
                  originalCategoryLabel: get()?.studentStats?.categoryLabel
                }
              })
            }

            return resp
          })
      },
      chooseCategory: async (credentials) => {
        return request('/api/student/category/select', 'POST', credentials, {
          jwtoken: authToken()
        })
      },
      rechooseCategory: async (credentials) => {
        return request('/api/student/category/re-select', 'POST', credentials, {
          jwtoken: authToken()
        })
      },
      getPreviousCategories: async () => {
        return request('/api/student/category/previous', 'GET', undefined, {
          jwtoken: authToken()
        }).then(resp => {
          if (resp?.status) {
            const categories = resp?.data
              ?.filter((category: any, index: number) => (index !== (resp?.data?.length - 1)))
              .map((category: any) => ({
                id: parseInt(category?.category_id),
                label: category?.categoryLabel
              }))

            set({
              previousCategories: categories
            })
          }

          return resp
        })
      }
    }), {
    name: uniqueAppID + '.student-stat'
  })
)
