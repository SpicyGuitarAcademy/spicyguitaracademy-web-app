import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

export type StudentStats = {}

interface StudyStatsState extends State {
  studentCategory: 0
  studentStats: StudentStats | {}
  previousCategories: []
}

interface StudyStatsMethods extends State {
  getStudentCategoryAndStats: () => Promise<any>
  getStudentCategoryAndStatsForPreviousCourses: () => Promise<any>
  chooseCategory: () => Promise<any>
  rechooseCategory: () => Promise<any>
  getPreviousCategories: () => Promise<any>
}

export const useStudyStatsStore = create<StudyStatsState & StudyStatsMethods>(
  devtools((set, get) => ({
    studentCategory: 0,
    studentStats: {},
    previousCategories: [],
    getStudentCategoryAndStats: async () => { },
    getStudentCategoryAndStatsForPreviousCourses: async () => { },
    chooseCategory: async () => { },
    rechooseCategory: async () => { },
    getPreviousCategories: async () => { }
  }))
)