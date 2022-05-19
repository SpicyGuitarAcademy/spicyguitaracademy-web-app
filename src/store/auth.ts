import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { authToken, request, stateToFormData, uniqueAppID } from "../utils";
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import {
  useStudentStatsStore,
  useCourseStore,
  useLessonStore,
  useTutorialStore,
  useNotificationStore,
  useAssignmentStore,
  useSubscriptionStore
} from "./";

type AuthType = {
  authenticated: boolean
  token: string
  status: "inactive" | "active"
}

type StudentType = {
  avatar: string
  date_added: string
  email: string
  firstname: string
  id: number
  lastname: string
  referral_code: string
  referral_units: number
  referred_by: string
  telephone: string
}

interface AuthState extends State {
  auth: AuthType | Partial<AuthType>
  student: StudentType | Partial<StudentType>
  deviceInfo: string
}

interface AuthMethods extends State {
  restoreDefaults: () => void
  signUp: (
    credentials: FormData
  ) => Promise<any>
  signIn: (
    credentials: FormData
  ) => Promise<any>
  getProfile: () => Promise<void>
  requestReferralCode: () => Promise<void>
  signOut: () => void
  forgotPassword: (
    credentials: FormData
  ) => Promise<any>
  verifyAccount: (
    credentials: FormData
  ) => Promise<any>
  resetPassword: (
    credentials: FormData
  ) => Promise<any>
  verifyDevice: () => Promise<any>
  resetDevice: (
    credentials: FormData
  ) => Promise<any>
  updateProfile: (
    credentials: FormData
  ) => Promise<any>
  updateProfileAvatar: (
    credential: FormData
  ) => Promise<any>
  updatePassword: (
    credentials: FormData
  ) => Promise<any>
  inviteFriend: (
    credentials: FormData
  ) => Promise<any>
}

export const useAuthStore = create<AuthState & AuthMethods>(
  persist(
    (set, get) => ({
      auth: {
        authenticated: false,
        token: '',
        status: 'inactive'
      },
      student: {},
      deviceInfo: '',
      restoreDefaults: () => {
        console.log('resetting auth...')
        set({
          auth: {
            authenticated: false,
            token: '',
            status: 'inactive'
          },
          student: {},
          deviceInfo: '',
        })
      },
      signUp: async (credentials) => {
        return await request('/api/register_student', 'POST', credentials)
      },
      signIn: async (credentials) => {

        // get device info
        const fpPromise = FingerprintJS.load();
        const deviceInfo = await (async () => {
          // Get the visitor identifier when you need it.
          const fp = await fpPromise
          const result = await fp.get()
          return result.components?.platform?.value
        })()

        const resp = await request('/api/login', 'POST', credentials)

        set({
          auth: { ...get().auth, token: resp?.data?.token, status: resp?.data?.status, authenticated: true },
          student: resp?.data?.student,
          deviceInfo: deviceInfo!
        })

        return resp
      },
      getProfile: async () => {
        return request('/api/student/profile', 'GET', undefined, {
          jwtoken: authToken()
        }).then(resp => {
          if (resp?.status === true) {
            set({
              student: resp?.data
            })
          }
        })
      },
      requestReferralCode: async () => {
        return request('/api/student/request-referral-code', 'GET', undefined, {
          jwtoken: get().auth?.token
        }).then(resp => {
          if (resp?.status === true) {
            set({
              student: {
                ...get().student,
                referral_code: resp?.data?.referral_code
              }
            })
          }
        })
      },
      signOut: () => {
        console.log('Signing out...')

        get()?.restoreDefaults()
        useCourseStore?.getState()?.restoreDefaults()
        useLessonStore?.getState()?.restoreDefaults()
        useSubscriptionStore?.getState()?.restoreDefaults()
        useStudentStatsStore?.getState()?.restoreDefaults()
        useTutorialStore?.getState()?.restoreDefaults()
        useNotificationStore?.getState()?.restoreDefaults()
        useAssignmentStore
          .getState()?.restoreDefaults()
      },
      forgotPassword: async (credentials) => {
        return await request('/api/forgotpassword', 'POST', credentials)
      },
      verifyAccount: async (credentials) => {
        return await request('/api/verify', 'POST', credentials)
      },
      resetPassword: async (credentials) => {
        return await request('/api/resetpassword', 'POST', credentials)
      },
      verifyDevice: async () => {
        return await request('/api/device/verify', 'POST',
          stateToFormData({ device: get().deviceInfo }),
          {
            jwtoken: get().auth?.token
          }
        )
      },
      resetDevice: async (credentials) => {
        return await request('/api/device/reset', 'POST', credentials, {
          jwtoken: get().auth?.token
        })
      },
      updateProfile: async (credentials) => {
        return request('/api/account/updateprofile', 'POST', credentials, {
          jwtoken: get().auth?.token
        }).then(resp => {
          if (resp?.status === true) {
            set({
              student: {
                ...get().student,
                firstname: credentials.get('firstname')?.toString()!,
                lastname: credentials.get('lastname')?.toString()!,
                telephone: credentials.get('telephone')?.toString()!
              }
            })
          }

          return resp
        })
      },
      updateProfileAvatar: async (credentials) => {
        return await request('/api/student/avatar/update', 'POST', credentials, {
          jwtoken: authToken()
        }).then(resp => {
          if (resp?.status === true) {
            const student = get().student
            student.avatar = resp?.data?.path!
            set({
              student: {
                ...student
              }
            })
          }

          return resp
        })
      },
      updatePassword: async (credentials) => {
        return request('/api/account/updatepassword', 'POST', credentials, {
          jwtoken: authToken()
        })
      },
      inviteFriend: async (credentials) => {
        return request('/api/student/invite-a-friend', 'POST', credentials, {
          jwtoken: get().auth?.token
        })
      },
    }), {
    name: uniqueAppID + '.auth'
  })
)
