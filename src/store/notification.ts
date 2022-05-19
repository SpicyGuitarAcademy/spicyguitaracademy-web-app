import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { authToken, decodeEntities, request, uniqueAppID } from "../utils";

export type Notification = {
  created_at: string
  email: string
  id: number
  message: string
  route: string
  status: 'unread' | 'read'
  updated_at: string
}

interface NotificationState extends State {
  notifications: Notification[]
}

interface NotificationMethods extends State {
  restoreDefaults: () => void
  getNotifications: () => Promise<any>
  markNotificationAsRead: (
    credentials: FormData
  ) => Promise<any>
}

export const useNotificationStore = create<NotificationState & NotificationMethods>(
  persist((set, get) => ({
    notifications: [],
    restoreDefaults: () => {
      console.log('resetting notification...')
      set({
        notifications: [],
      })
    },
    getNotifications: async () => {
      request('/api/notifications', 'GET', undefined, {
        jwtoken: authToken()
      })
        .then(resp => {
          // console.log('notifications', resp)
          if (resp?.status) {
            set({
              notifications: resp?.data?.notifications.map((notice: any) => ({
                ...notice,
                id: parseInt(notice?.id),
                message: decodeEntities(notice?.message)
              }))
            })
          }
        })
    },
    markNotificationAsRead: async (credentials) => {
      return request('/api/notification/markasread', 'POST', credentials, {
        jwtoken: authToken()
      }).then(resp => {
        if (resp?.status === true) {
          const id = parseInt(credentials.get('notificationId')?.toString()!);
          const notices = get()?.notifications
          const selectedNotice = notices?.find(notice => notice?.id === id)!
          const selectedNoticeIndex = notices?.findIndex(notice => notice?.id === id)!
          selectedNotice.status = 'read'
          notices.splice(selectedNoticeIndex, 1, selectedNotice)

          set({
            notifications: notices
          })
        }
      })
    }
  }), {
    name: uniqueAppID + '.notification'
  })
)