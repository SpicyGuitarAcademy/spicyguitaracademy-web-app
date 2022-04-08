import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

export type ForumMessage = {}

interface ForumState extends State {
  forumMessages: ForumMessage[]
}

interface ForumMethods extends State {
  getForumMessages: () => Promise<any>
  submitMessage: () => Promise<any>
}

export const useForumStore = create<ForumState & ForumMethods>(
  devtools((set, get) => ({
    forumMessages: [],
    getForumMessages: async () => { },
    submitMessage: async () => { }
  }))
)