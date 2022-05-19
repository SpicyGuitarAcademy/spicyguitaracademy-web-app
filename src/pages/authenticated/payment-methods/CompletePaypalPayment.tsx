import { DashboardWrapper } from "../../../components"
import { useSubscriptionStore, useModalStore, useStudentStatsStore } from "../../../store"
import { useHistory, useLocation } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import './style.scss'
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";

export const CompletePaymentWithPaypal: React.FC<{}> = () => {

  const { verifiedFeaturedPayment, verifiedSubscriptionPayment } = useSubscriptionStore()
  const { goBack, push } = useHistory()
  const { loading, toast } = useModalStore()
  const { studentStats } = useStudentStatsStore()

  const { state } = useLocation<{
    paymentFor: 'subscription' | 'featured-course'
    method: 'paystack' | 'paypal',
    plan?: number,
    course?: number,
    paypalConfig?: any
  }>()
  const { paymentFor, method, paypalConfig } = state

  const verifyPaymentPaypal = () => {
    loading(true, 'Verifying payment...')
    if (paymentFor === 'featured-course') {
      verifiedFeaturedPayment(method, paypalConfig?.reference!, paypalConfig?.id!)
        .then(resp => {
          loading(false)
          if (resp.status === true) {
            toast(resp.message)
            push('/dashboard/courses/bought')
          } else {
            toast(resp.message, undefined, 'danger')
          }
        })
        .catch(error => {
          loading(false)
          toast(error.message, undefined, 'danger')
        })
    } else {
      verifiedSubscriptionPayment(method, paypalConfig?.reference!, paypalConfig?.id!)
        .then(resp => {
          loading(false)
          if (resp.status === true) {
            toast(resp.message)
            if (studentStats.category === 0)
              push('/dashboard/profile/category')
            else push('/dashboard/courses')
          } else {
            toast(resp.message, undefined, 'danger')
          }
        })
        .catch(error => {
          loading(false)
          toast(error.message, undefined, 'danger')
        })
    }
  }

  const cancelPaymentPaystack = () => {
    toast('Cancelled Payment', undefined, 'danger')
    goBack()
  }

  return (
    <DashboardWrapper>
      <div className="__profile_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Complete Payment
          </h2>
        </div>

        <div className="__methods mb-5 d-flex flex-column gap-3">

          Amount: {paypalConfig.purchase_units[0].amount?.currency_code}{paypalConfig.purchase_units[0].amount?.value} <br />
          Payment For: {paymentFor.replace('-', ' ').toUpperCase()} <br />
          Payment Method: {method.toUpperCase()}

          <div className="mb-3" />

          <PayPalScriptProvider
            options={{
              "client-id": process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_PAYPAL_CLIENT_ID!
                : process.env.REACT_APP_PAYPAL_CLIENT_ID_TEST!,
              // "data-client-token": paypalConfig.id
              // "intent": 
            }}>
            <PayPalButtons

              createOrder={
                async (data, actions) => {
                  // console.log('on create', JSON.stringify(data))
                  // Set up the transaction
                  return actions.order.create({
                    purchase_units: paypalConfig.purchase_units
                  }).then((resp) => {
                    // console.log('on create then', JSON.stringify(resp))
                    return resp
                  })
                }
              }

              onApprove={
                async (data, actions) => {
                  // console.log('on approve', JSON.stringify(data))
                  verifyPaymentPaypal()
                }
              }

              onCancel={
                async (data, actions) => {
                  // console.log('on cancel', JSON.stringify(data))
                  cancelPaymentPaystack()
                }
              }

              style={{ layout: "horizontal" }} />
          </PayPalScriptProvider>

          {/* <PayPalScriptProvider
            options={{
              "client-id": "test",
              // "AYWqA-lQSrHupcOK0LQ0v4THsoUrDz_lqja9yPhlkONH3-lSB9ocGBYixjC54tz1HQvjsAFCumFxzKBM",
              "data-client-token": paypalConfig.id,
            }}
          >
            <BraintreePayPalButtons
              // createOrder={(data, actions) => {
              //   return actions.braintree.createPayment({
              //     flow: "checkout",
              //     amount: "10.0",
              //     currency: "USD",
              //     intent: "capture",
              //   });
              // }}
              // onApprove={(data, actions) => {
              //   return actions.braintree
              //     .tokenizePayment(data)
              //     .then((payload) => {
              //       // call server-side endpoint to finish the sale
              //       console.log(payload)
              //     });
              // }}
            />
          </PayPalScriptProvider> */}

        </div>

      </div>
    </DashboardWrapper>
  )
}


/*

authorization_url: "https://www.sandbox.paypal.com/checkoutnow?token=49268110MV2886514"
create_time: "2022-05-14T23:36:26Z"
id: "49268110MV2886514"
intent: "CAPTURE"
links: [{href: "https://api.sandbox.paypal.com/v2/checkout/orders/49268110MV2886514", rel: "self",…},…]
0: {href: "https://api.sandbox.paypal.com/v2/checkout/orders/49268110MV2886514", rel: "self",…}
1: {href: "https://www.sandbox.paypal.com/checkoutnow?token=49268110MV2886514", rel: "approve",…}
2: {href: "https://api.sandbox.paypal.com/v2/checkout/orders/49268110MV2886514", rel: "update",…}
3: {href: "https://api.sandbox.paypal.com/v2/checkout/orders/49268110MV2886514/capture", rel: "capture",…}
purchase_units: [{reference_id: "SGA.Q143.81333410", amount: {currency_code: "USD", value: "25.00"},…}]
0: {reference_id: "SGA.Q143.81333410", amount: {currency_code: "USD", value: "25.00"},…}
amount: {currency_code: "USD", value: "25.00"}
custom_id: "143"
description: "JAZZ STANDARDS (Featured Course)"
payee: {email_address: "sb-m1lin6171044@business.example.com", merchant_id: "VZN8UJDMAE7AW"}
email_address: "sb-m1lin6171044@business.example.com"
merchant_id: "VZN8UJDMAE7AW"
reference_id: "SGA.Q143.81333410"
reference: "SGA.Q143.81333410"
status: "CREATED"

*/