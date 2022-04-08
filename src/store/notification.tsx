import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

export type Notification = {}

interface NotificationState extends State {
  notifications: Notification[]
}

interface NotificationMethods extends State {
  getNotifications: () => Promise<any>
  markNotificationAsRead: () => Promise<any>
}

export const useNotificationStore = create<NotificationState & NotificationMethods>(
  devtools((set, get) => ({
    notifications: [],
    getNotifications: async () => { },
    markNotificationAsRead: async () => { }
  }))
)