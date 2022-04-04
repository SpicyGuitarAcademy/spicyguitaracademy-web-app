import create, { State } from "zustand";
import { devtools } from "zustand/middleware";
import { request, stateToFormData } from "../utils";
import FingerprintJS from '@fingerprintjs/fingerprintjs'

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
  student?: StudentType | Partial<StudentType>
  deviceInfo: string
}

interface AuthMethods extends State {
  boot: () => Promise<void>
  signUp: (
    credentials: FormData
  ) => Promise<any>
  signIn: (
    credentials: FormData
  ) => Promise<any>
  persistSignInData: (
    resp: any
  ) => void
  signOut: () => void
  clearPersistedSignInData: () => void
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
}

export const useAuthStore = create<AuthState & AuthMethods>(
  devtools((set, get) => ({
    auth: {
      authenticated: false
    },
    student: undefined,
    deviceInfo: '',
    boot: async () => {
      console.log('booting...')

      const savedAuth = JSON.parse(localStorage.getItem('auth') ?? '{}')
      const savedStudent = JSON.parse(localStorage.getItem('student') ?? '{}')

      // get device info
      const fpPromise = FingerprintJS.load();
      const deviceInfo = await (async () => {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise
        const result = await fp.get()
        return result.components?.platform?.value
      })()

      set({
        auth: { ...get().auth, ...savedAuth! },
        student: { ...get().student, ...savedStudent! },
        deviceInfo: deviceInfo!
      })

      console.log('auth', get().auth)
      console.log('student', get().student)
      console.log('device', get().deviceInfo)
    },
    signUp: async (credentials) => {
      return await request('/api/register_student', 'POST', credentials)
    },
    signIn: async (credentials) => {
      const resp = await request('/api/login', 'POST', credentials)
      get().persistSignInData(resp)

      return resp
    },
    persistSignInData: (resp: any) => {

      if (resp?.status) {
        // set to store
        set({
          auth: { ...get().auth, token: resp?.data?.token, status: resp?.data?.status, authenticated: true },
          student: resp?.data?.student
        })

        // save to localstorage
        localStorage.setItem('auth', JSON.stringify(get().auth))
        localStorage.setItem('student', JSON.stringify(get().student))
      }

    },
    signOut: () => {
      console.log('Signing out...')
      get().clearPersistedSignInData()
    },
    clearPersistedSignInData: () => {
      set({
        auth: { authenticated: false },
        student: undefined
      })

      // remove from localstorage
      localStorage.removeItem('auth')
      localStorage.removeItem('student')

      console.log('auth', get().auth)
      console.log('student', get().student)
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
  }))
)