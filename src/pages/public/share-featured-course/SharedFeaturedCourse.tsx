import { PublicPageWrapper } from "../../../components"
import { useCourseStore, useModalStore } from "../../../store"
import { Link, useHistory, useLocation, useParams } from "react-router-dom"
import { baseUrl } from "../../../utils"
import { ArrowRight } from "react-feather"
import './style.scss'
import { useEffect } from "react"

export const SharedFeaturedCourse: React.FC<{}> = () => {

  const { selectedCourse, getAFeaturedCourse } = useCourseStore()
  const { search } = useLocation()
  const { push } = useHistory()
  const { loading, toast } = useModalStore()
  const params = useParams<{
    id: string
  }>()

  useEffect(() => {
    loading(true, 'Featching course...')
    getAFeaturedCourse(Number(params?.id))
      .then(resp => {
        loading(false)
        if (resp?.status === true) {
          toast(resp?.message, undefined, 'success')
        } else {
          toast(resp?.message, undefined, 'danger')
          push('/register' + search)
        }
      })
      .catch(error => {
        loading(false)
        toast(error.message, undefined, 'danger')
        push('/register' + search)
      })
  }, [getAFeaturedCourse, loading, params?.id, push, search, toast])

  return (
    <PublicPageWrapper>
      <div className="h-100 w-100 bg-light">
        <div className="container d-flex justify-content-center">
          <div className="w-100 w-md-70 w-lg-50 p-3 p-md-4">
            <div className="__tutorial_page">

              <div className="__tutorial_content_wrapper mb-2">
                <video controls controlsList="nodownload" className="__lesson_video border border-grey shadow rounded" src={`${baseUrl}/${selectedCourse?.featured_preview_video!}`} />
              </div>

              <div className="__title mb-4">
                <h2 className="fw-bold">
                  {selectedCourse?.course}
                </h2>
                <h5 className="text-secondary">{selectedCourse?.tutor}</h5>
              </div>

              <div className="__description mb-5 text-dark">
                {selectedCourse?.description}
              </div>

              <div className="__description mb-5 text-dark">
                {selectedCourse?.total} lessons
              </div>

              <div className="__description mb-5 text-dark">
                <Link to={'/register' + search} className="btn btn-primary rounded-0 w-100">
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </PublicPageWrapper>
  )
}