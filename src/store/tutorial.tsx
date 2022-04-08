import create, { State } from "zustand";
import { devtools } from "zustand/middleware";
import { Course } from "./";

export type Tutorial = Course & {}

interface TutorialState extends State {
  currentTutorial: Course | {}
}

interface TutorialMethods extends State {
  setCurrentTutorial: (
    course: Course
  ) => void
  getTutorialComments: () => Promise<any>
  submitCommit: () => Promise<any>
}

export const useTutorialStore = create<TutorialState & TutorialMethods>(
  devtools((set, get) => ({
    currentTutorial: {},
    setCurrentTutorial: (course) => { },
    getTutorialComments: async () => { },
    submitCommit: async () => { }
  }))
)