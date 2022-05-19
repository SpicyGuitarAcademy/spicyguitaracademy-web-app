import { useState } from "react"
import { Helmet } from "react-helmet"
import { Link, useHistory } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"
import { useModalStore } from "../../../store"
import { domain, request, stateToFormData } from "../../../utils"

type contactUsData = {
  email: string
  subject: string
  message: string
}

export const ContactUs: React.FC<{}> = () => {

  const { toast, loading } = useModalStore()
  const { goBack } = useHistory()
  const [form, setForm] = useState<contactUsData>({
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    loading(true)
    request('/api/contactus', 'POST', stateToFormData(form))
      .then(resp => {
        loading(false)
        toast(resp?.message, undefined, resp?.status ? 'success' : 'danger')
        goBack()
      })
  }

  return (
    <PublicPageWrapper>
      <>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Spicy Guitar Academy | Contact Us</title>
          <link rel="canonical" href={`${domain}/contact-us`} />
          <meta name="description" content="You can reach out to us with the form below if you have any inquiry or encounter any issue." />
        </Helmet>

        <div className="h-100 w-100 bg-light">
          <div className="container d-flex justify-content-center">
            <div className="w-100 w-md-70 w-lg-50 bg-white p-3 p-md-4 mb-3 mb-md-5 rounded-3 shadow-sm">
              <form method="post" onSubmit={handleSubmit}>
                <div className="text-primary">

                  <div className="text-center mb-3 mb-md-4">
                    <h1 className='h1 fw-bold'>Contact us</h1>
                    <p>You can reach out to us with the form below if you have any inquiry or encounter any issue. You can also send a mail to <a href="mailto:info@spicyguitaracademy.com">info@spicyguitaracademy.com</a> or call <a href="tel:+2348169000486">+234 816 9000 486</a>, <a href="tel:+2347080861654">+234 708 0861 654</a>, <a href="tel:+2348076159020">+234 807 6159 020</a></p>
                  </div>

                  <div className="mb-3 mb-md-4">

                    <div className="form-floating mb-2 mb-md-3">
                      <input onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" id="email" className="form-control" placeholder="johnadeniyi@mail.com" />
                      <label htmlFor="email">Email address</label>
                    </div>

                    <div className="form-floating mb-2 mb-md-3">
                      <input onChange={(e) => setForm({ ...form, subject: e.target.value })} type="text" id="subject" className="form-control" placeholder="I have an inquiry" />
                      <label htmlFor="subject">Subject</label>
                    </div>

                    <div className="form-floating mb-2 mb-md-3">
                      <textarea onChange={(e) => setForm({ ...form, message: e.target.value })} id="message" style={{ height: '100px' }} className="form-control" placeholder="I have an inquiry about..."></textarea>
                      <label htmlFor="message">Message</label>
                    </div>

                  </div>

                  <div className="mb-2 mb-md-3">
                    <button type="submit" className="btn btn-lg btn-primary form-control mb-3">Send Message</button>
                    <div className="text-center">
                      You can also check our <Link to='/faqs'>FAQs</Link>
                    </div>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>

      </>
    </PublicPageWrapper>
  )
}