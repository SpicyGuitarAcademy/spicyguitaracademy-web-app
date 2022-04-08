import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

export type Assignment = {}

interface AssignmentState extends State {
  assignment: Assignment | {}
}

interface AssignmentMethods extends State {
  getAssignment: () => Promise<any>
  getAssignmentAnswers: () => Promise<any>
  submitAnswer: () => Promise<any>
  uploadAnswer: () => Promise<any>
}

export const useAssignmentStore = create<AssignmentState & AssignmentMethods>(
  devtools((set, get) => ({
    assignment: {},
    getAssignment: async () => { },
    getAssignmentAnswers: async () => { },
    submitAnswer: async () => { },
    uploadAnswer: async () => { }
  }))
)