import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { authToken, decodeEntities, request, uniqueAppID } from "../utils";
import { useStudentStatsStore } from "./student-stats";

export type ForumMessage = {
  comment: string
  date_added: string
  id: number
  is_admin: boolean
  reply_id: number
  sender: string
  student?: {
    name: string,
    avatar: string
  }
  tutor?: {
    name: string,
    avatar: string
  }
}

interface ForumState extends State {
  forumMessages: ForumMessage[]
}

interface ForumMethods extends State {
  restoreDefaults: () => void
  getForumMessages: () => Promise<any>
  submitMessage: (
    credentials: FormData
  ) => Promise<any>
}

export const useForumStore = create<ForumState & ForumMethods>(
  persist((set, get) => ({
    forumMessages: [],
    restoreDefaults: () => {
      console.log('resetting forum...')
      set({
        forumMessages: [],
      })
    },
    getForumMessages: async () => {

      const category = useStudentStatsStore.getState()?.studentStats?.category;
      request(`/api/forums/${category}/messages`, 'GET', undefined, {
        jwtoken: authToken()
      }).then(resp => {
        // console.log('forum messages', resp)
        if (resp.status === true) {
          set({
            forumMessages: resp?.data.map((message: any) => ({
              ...message,
              id: parseInt(message?.id),
              comment: decodeEntities(message?.comment),
              is_admin: message?.is_admin === "1",
              reply_id: parseInt(message?.reply_id)
            }))
          })
        }
      })

    },
    submitMessage: async (credentials) => {
      const category = useStudentStatsStore.getState()?.studentStats?.category;
      credentials.append('categoryId', category.toString())
      return request('/api/forum/message', 'POST', credentials, {
        jwtoken: authToken()
      }).then(async resp => {
        await get().getForumMessages()
        return resp
      })
    }
  }), {
    name: uniqueAppID + '.forum'
  })
)