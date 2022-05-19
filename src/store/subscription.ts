import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { authToken, request, uniqueAppID } from "../utils";
import { useAuthStore } from ".";
import { useCourseStore } from ".";

export type StudentSubscription = {
  days: number
  plan: number
  planLabel: string
  status: boolean
}

export type SubscriptionPlan = {
  description: string
  plan: string
  plan_id: number
  price: number
}

interface SubscriptionState extends State {
  subscriptionPlans: SubscriptionPlan[],
  studentSubscription: StudentSubscription,
  payment: {
    paystack?: {
      reference: string,
      authorizationUrl: string,
      price: number,
      accessCode: string
    },
    paypal?: any,
    status: boolean
  },
}

interface SubscriptionMethods extends State {
  restoreDefaults: () => void
  getSubscriptionStatus: () => Promise<any>
  getSubscriptionPlans: () => Promise<any>
  initiateSubscriptionPayment: (
    medium: string,
    credentials: FormData
  ) => Promise<any>
  initiateFeaturedPayment: (
    medium: string,
    credentials: FormData
  ) => Promise<any>
  verifiedSubscriptionPayment: (
    medium: 'paystack' | 'paypal',
    reference: string,
    paypalPaymentID?: string
  ) => Promise<any>
  verifiedFeaturedPayment: (
    medium: 'paystack' | 'paypal',
    reference: string,
    paypalPaymentID?: string
  ) => Promise<any>
  completeSubscriptionPaymentWithSpicyUnits: (
    credentials: FormData
  ) => Promise<any>
  completeFeaturedPaymentWithSpicyUnits: (
    credentials: FormData
  ) => Promise<any>
}

export const useSubscriptionStore = create<SubscriptionState & SubscriptionMethods>(
  persist(
    (set, get) => ({
      subscriptionPlans: [],
      studentSubscription: {
        days: 0,
        plan: 0,
        planLabel: 'No Subscription Plan',
        status: false
      },
      payment: {
        paystack: undefined,
        paypal: undefined,
        status: false
      },
      restoreDefaults: () => {
        console.log('resetting subscription...')
        set({
          subscriptionPlans: [],
          studentSubscription: {
            days: 0,
            plan: 0,
            planLabel: 'No Subscription Plan',
            status: false
          },
          payment: {
            paystack: undefined,
            paypal: undefined,
            status: false
          }
        })
      },
      getSubscriptionStatus: async () => {
        return request('/api/subscription/status', 'GET', undefined, {
          jwtoken: authToken()
        })
          .then(resp => {
            if (resp.status) {
              set({
                studentSubscription: {
                  ...resp?.data,
                  status: resp?.data?.status === "ACTIVE",
                  plan: parseInt(resp?.data?.plan),
                  planLabel: [
                    "No Subscription Plan",
                    "1 Month",
                    "3 Months",
                    "6 Months",
                    "12 Months"
                  ][parseInt(resp?.data?.plan)]
                }
              })
            }

            return
          })
      },
      getSubscriptionPlans: async () => {
        request('/api/subscription/plans', 'GET', undefined, {
          jwtoken: authToken()
        })
          .then(resp => {
            // console.log('subscription plans', resp)
            if (resp.status) {
              set({
                subscriptionPlans: resp?.data?.map((plan: any) => ({
                  ...plan,
                  plan_id: parseInt(plan?.plan_id),
                  price: parseFloat(plan?.price)
                }))
              })
            }
          })
      },
      initiateSubscriptionPayment: async (medium, credentials) => {
        return request(`/api/subscription/${medium}/initiate`, 'POST', credentials, {
          jwtoken: authToken()
        }).then(resp => {
          // console.log(resp)
          if (resp.status === true) {
            set({
              payment: {
                paystack: medium === 'paystack' ? {
                  accessCode: resp?.data?.access_code,
                  price: resp?.data?.price,
                  reference: resp?.data?.reference,
                  authorizationUrl: resp?.data?.authorization_url
                } : undefined,
                paypal: medium === 'paypal' ? {
                  ...resp?.data
                } : undefined,
                status: false
              }
            })
          }

          return resp;
        })
      },
      initiateFeaturedPayment: async (medium, credentials) => {
        return request(`/api/subscription/${medium}/initiate-featured`, 'POST', credentials, {
          jwtoken: authToken()
        }).then(resp => {
          // console.log(resp)
          if (resp.status === true) {
            set({
              payment: {
                paystack: medium === 'paystack' ? {
                  accessCode: resp?.data?.access_code,
                  price: resp?.data?.price,
                  reference: resp?.data?.reference,
                  authorizationUrl: resp?.data?.authorization_url
                } : undefined,
                paypal: medium === 'paypal' ? {
                  ...resp?.data
                } : undefined,
                status: false
              }
            })
          }

          return resp;
        })
      },
      verifiedSubscriptionPayment: async (medium, reference, paypalPaymentID) => {
        return request(
          medium === 'paystack'
            ? `/api/subscription/${medium}/verify/${reference}`
            : `/api/subscription/${medium}/verify/${reference}?paymentID=${paypalPaymentID!}`,
          'POST', undefined, {
          jwtoken: authToken()
        })
          .then(async resp => {
            const pay = get().payment
            if (resp.status === true) {
              set({
                payment: {
                  ...pay,
                  status: true
                }
              })
              await get().getSubscriptionStatus()
            } else {
              set({
                payment: {
                  ...pay,
                  status: false
                }
              })
            }
            return resp
          })
      },
      verifiedFeaturedPayment: async (medium, reference, paypalPaymentID) => {
        return request(
          medium === 'paystack'
            ? `/api/subscription/${medium}/verify-featured/${reference}`
            : `/api/subscription/${medium}/verify-featured/${reference}?paymentID=${paypalPaymentID!}`,
          'POST', undefined, {
          jwtoken: authToken()
        })
          .then(async resp => {
            const pay = get().payment
            if (resp.status === true) {
              set({
                payment: {
                  ...pay,
                  status: true
                }
              })

              await useCourseStore.getState().getBoughtCourses()
              await useCourseStore.getState().getFeaturedCourses()
              return resp
            } else {
              set({
                payment: {
                  ...pay,
                  status: false
                }
              })
              return resp
            }
          })
      },
      completeSubscriptionPaymentWithSpicyUnits: async (credentials) => {
        return request('/api/subscription/spicyunits/complete-subscription', 'POST', credentials, {
          jwtoken: authToken()
        }).then(async resp => {
          // console.log(resp)

          if (resp?.status === true) {
            set({
              payment: {
                status: true
              }
            })

            // update spicy units
            await useAuthStore.getState().getProfile()

            // get subscription status again
            await get().getSubscriptionStatus()

          } else {
            set({
              payment: {
                status: false
              }
            })
          }

          return resp
        })

      },
      completeFeaturedPaymentWithSpicyUnits: async (credentials) => {
        return request('/api/subscription/spicyunits/complete-featured', 'POST', credentials, {
          jwtoken: authToken()
        }).then(async resp => {
          // console.log(resp)

          if (resp?.status === true) {
            set({
              payment: {
                status: true
              }
            })

            // update spicy units
            await useAuthStore.getState().getProfile()

            // get bought courses again
            await useCourseStore.getState()?.getBoughtCourses()

          } else {
            set({
              payment: {
                status: false
              }
            })
          }

          return resp
        })
      },
    }), {
    name: uniqueAppID + '.subscription'
  })
)

/*

Future verifySubscriptionPayment(
      StudentSubscription studentSubscription, String medium) async {
    try {
      var endpoint = medium == 'paypal'
          ? '/api/subscription/$medium/verify/$reference?paymentID=$paypalPaymentID'
          : '/api/subscription/$medium/verify/$reference';
      var resp = await request(
        endpoint,
        method: 'POST',
        headers: {
          'JWToken': Auth.token!,
          'cache-control': 'max-age=0, must-revalidate'
        },
      );

      if (resp['status'] == true) {
        subscriptionPaymentStatus = true;

        // get subscription status again
        await studentSubscription.getStudentSubscriptionStatus();
      } else {
        subscriptionPaymentStatus = false;
      }

      notifyListeners();
    } catch (e) {
      throw (e);
    }
  }

  Future verifyFeaturedPayment(Courses courses, String medium) async {
    try {
      var endpoint = medium == 'paypal'
          ? '/api/subscription/$medium/verify-featured/$reference?paymentID=$paypalPaymentID'
          : '/api/subscription/$medium/verify-featured/$reference';
      var resp = await request(
        endpoint,
        method: 'POST',
        headers: {
          'JWToken': Auth.token!,
          'cache-control': 'max-age=0, must-revalidate'
        },
      );

      if (resp['status'] == true) {
        featuredPaymentStatus = true;

        // get bought courses again
        courses.getBoughtCourses();
      } else {
        featuredPaymentStatus = false;
      }

      notifyListeners();
    } catch (e) {
      throw (e);
    }
  }


*/