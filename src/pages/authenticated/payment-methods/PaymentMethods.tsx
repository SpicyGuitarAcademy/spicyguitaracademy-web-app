import { DashboardWrapper } from "../../../components"
import { useAuthStore, useSubscriptionStore, useModalStore } from "../../../store"
import { Link, useHistory, useLocation } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import './style.scss'
import PaypalLogo from '../../../assets/pay-with-paypal.png'
import PaystackLogo from '../../../assets/pay-with-paystack.png'
import SpicyUnits from '../../../assets/spicy-unit.svg'
import { stateToFormData } from "../../../utils";
import { useState } from "react";
import { PaystackProps } from "react-paystack/dist/types";

export const PaymentMethods: React.FC<{}> = () => {

  const { student } = useAuthStore()
  const { initiateSubscriptionPayment, initiateFeaturedPayment, completeSubscriptionPaymentWithSpicyUnits, completeFeaturedPaymentWithSpicyUnits } = useSubscriptionStore()
  const { goBack, push } = useHistory()
  const { loading, toast } = useModalStore()
  const [disableBtns, setDisableBtns] = useState(false)

  const { state } = useLocation<{
    paymentFor: 'subscription' | 'featured-course'
    plan?: number,
    course?: number
  }>()
  const { paymentFor, plan, course } = state

  const subscriptionPayment = async (medium: string) => {

    loading(true, 'Initiating payment...')

    // navigate to payment page based on medium
    if (medium === 'paystack') {
      initiateSubscriptionPayment(medium, stateToFormData({
        email: student.email,
        plan: plan
      })).then(resp => {
        loading(false)
        setDisableBtns(false)

        if (resp?.status === true) {
          toast(resp.message)
          push('/dashboard/payment/paystack/complete', {
            paymentFor: paymentFor,
            method: medium,
            paystackConfig: {
              email: student?.email!,
              reference: useSubscriptionStore.getState().payment?.paystack?.reference!,
              amount: useSubscriptionStore.getState().payment?.paystack?.price!,
              publicKey: process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_PAYSTACK_PUBLIC_KEY!
                : process.env.REACT_APP_PAYSTACK_PUBLIC_KEY_TEST!
            } as PaystackProps
          })

        } else {
          toast(resp?.message, undefined, 'danger')
        }
      })
    } else if (medium === 'paypal') {
      initiateSubscriptionPayment(medium, stateToFormData({
        email: student.email,
        plan: plan
      })).then(resp => {
        loading(false)
        if (resp?.status === true) {
          push('/dashboard/payment/paypal/complete', {
            paymentFor: paymentFor,
            plan: plan,
            method: medium,
            paypalConfig: useSubscriptionStore.getState().payment?.paypal
          })
        } else {
          toast(resp?.message, undefined, 'danger')
        }
      })
    } else if (medium === 'spicyunits') {
      completeSubscriptionPaymentWithSpicyUnits(stateToFormData({
        email: student.email,
        plan: plan
      })).then(resp => {
        loading(false)
        if (resp?.status === true) {
          toast(resp?.message)
          push('/dashboard')
        } else {
          toast(resp?.message, undefined, 'danger')
          push('/dashboard')
        }
      })
    }

  }

  const featuredPayment = async (medium: string) => {

    setDisableBtns(true)
    loading(true, 'Initiating payment...')

    // navigate to payment page based on medium
    if (medium === 'paystack') {
      initiateFeaturedPayment(medium, stateToFormData({
        email: student.email,
        course: course
      })).then(resp => {
        loading(false)
        setDisableBtns(false)

        if (resp?.status === true) {

          toast(resp.message)
          push('/dashboard/payment/paystack/complete', {
            paymentFor: paymentFor,
            method: medium,
            paystackConfig: {
              email: student?.email!,
              reference: useSubscriptionStore.getState().payment?.paystack?.reference!,
              amount: useSubscriptionStore.getState().payment?.paystack?.price!,
              publicKey: process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_PAYSTACK_PUBLIC_KEY!
                : process.env.REACT_APP_PAYSTACK_PUBLIC_KEY_TEST!
            } as PaystackProps
          })

        } else {
          toast(resp?.message, undefined, 'danger')
        }
      })
    } else if (medium === 'paypal') {
      initiateFeaturedPayment(medium, stateToFormData({
        email: student.email,
        course: course
      })).then(resp => {
        setDisableBtns(false)
        loading(false)

        if (resp?.status === true) {
          push('/dashboard/payment/paypal/complete', {
            paymentFor: paymentFor,
            course: course,
            method: medium,
            paypalConfig: useSubscriptionStore.getState().payment?.paypal
          })
        } else {
          toast(resp?.message, undefined, 'danger')
        }
      })
    } else if (medium === 'spicyunits') {
      completeFeaturedPaymentWithSpicyUnits(stateToFormData({
        email: student.email,
        course: course
      })).then(resp => {
        loading(false)
        if (resp?.status === true) {
          toast(resp?.message)
          push('/dashboard')
        } else {
          toast(resp?.message, undefined, 'danger')
          push('/dashboard')
        }
      })
    }

  }

  const methods = [
    {
      component:
        <div className="__paypal_paystack d-flex justify-content-center align-items-center">
          <div className="__icon_wrapper">
            <img className="__icon" src={PaystackLogo} alt="Pay with Paystack" />
          </div>
        </div>,
      handler: async () => {
        if (paymentFor === 'subscription') {
          await subscriptionPayment('paystack')
        } else if (paymentFor === 'featured-course') {
          await featuredPayment('paystack')
        }
      }
    },
    {
      component:
        <div className="__paypal_paystack d-flex justify-content-center align-items-center">
          <div className="__icon_wrapper">
            <img className="__icon" src={PaypalLogo} alt="Pay with PayPal" />
          </div>
        </div>,
      handler: async () => {
        if (paymentFor === 'subscription') {
          subscriptionPayment('paypal');
        } else if (paymentFor === 'featured-course') {
          featuredPayment('paypal');
        }
      }
    },
    {
      component:
        <div className="__spicy_units d-flex gap-2 justify-content-center align-items-center">
          <div className="__spicy_unit_icon_wrapper mb-1">
            <img className="__spicy_unit_icon" src={SpicyUnits} alt="Pay with Spicy Units" />
          </div>
          <b>{student?.referral_units ?? 0} Spicy Units</b>
        </div>,
      handler: async () => {
        if (paymentFor === 'subscription') {
          subscriptionPayment('spicyunits');
        } else if (paymentFor === 'featured-course') {
          featuredPayment('spicyunits');
        }
      }
    }
  ]

  return (
    <DashboardWrapper>
      <div className="__profile_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Payment Methods
          </h2>
        </div>

        <div className="__methods mb-5 d-flex flex-column gap-3">

          {
            methods.map((method, index) => (
              <button key={index} disabled={disableBtns} onClick={method.handler} className='__method btn cursor-pointer bg-white text-primary shadow-sm border border-light rounded p-3'>
                {method.component}
              </button>
            ))
          }

        </div>

        <div className="mb-3">
          <Link to='/dashboard/payment/spicyunits' className={`btn btn-lg shadow-sm bg-white text-primary w-100 mb-3`}>
            Buy more Spicy Units
          </Link>
        </div>

      </div>
    </DashboardWrapper>
  )
}
