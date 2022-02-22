import { useLoadingModalStore } from "../../store/loading-modal"

export const LoadingModal: React.FC = () => {

  const { loading, message } = useLoadingModalStore()

  return (
    <>
      {
        loading &&
        <div className="position-fixed top-0 start-0 vh-100 vw-100" style={{ zIndex: '5000' }} tabIndex={-1}>

          <div className="h-100 w-100 position-absolute top-0 start-0" style={{ backgroundColor: '#2B11088A' }}></div>

          <div className="h-100 d-flex align-items-center justify-content-center">

            <div className="spinner-border text-light me-2" role="status" style={{ zIndex: '5001' }} />
            <div className="text-light h5 m-0" style={{ zIndex: '5001' }}>
              {message}
            </div>

          </div>

        </div>
      }
    </>
  )



}
