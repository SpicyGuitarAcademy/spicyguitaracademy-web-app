import { Link } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"

export const ContactUs = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <PublicPageWrapper>
      <div className="h-100 w-100 bg-light">
        <div className="container d-flex justify-content-center">
          <div className="w-lg-50 bg-white p-lg-4 mb-lg-5 rounded-3 shadow-sm">
            <form method="post" onSubmit={handleSubmit}>
              <div className="text-primary">

                <div className="text-center mb-lg-4">
                  <h1 className='h1 fw-bold'>Contact us</h1>
                  <p>You can reach out to us with the form below if you have any inquiry or encounter any issue. You can also send a mail to <a href="mailto:info@spicyguitaracademy.com">info@spicyguitaracademy.com</a> or call <a href="tel:+2348169000486">+234 816 9000 486</a>, <a href="tel:+2347080861654">+234 708 0861 654</a>, <a href="tel:+2348076159020">+234 807 6159 020</a></p>
                </div>

                <div className="mb-lg-4">

                  <div className="form-floating mb-lg-3">
                    <input type="text" id="subject" className="form-control" placeholder="I have an inquiry" />
                    <label htmlFor="subject">Subject</label>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <textarea id="message" style={{ height: '100px' }} className="form-control" placeholder="I have an inquiry about..."></textarea>
                    <label htmlFor="message">Message</label>
                  </div>

                </div>

                <div className="mb-lg-3">
                  <button type="submit" className="btn btn-lg btn-primary form-control mb-3">Login</button>
                  <div className="text-center">
                    You can also check our <Link to='/faqs'>FAQs</Link>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicPageWrapper>
  )
}