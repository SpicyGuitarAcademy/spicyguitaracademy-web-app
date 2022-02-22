import { useToastStore } from "../../store/toast"

export const ToastWrapper: React.FC = () => {

  const { toasts } = useToastStore()

  return (
    <>

      <div className="sticky-top">

        <div style={{ zIndex: '9999' }} className={`toast-container position-absolute top-0 end-0 ${toasts.length > 0 && 'p-3 vh-100 overflow-hidden'}`}>

          {
            toasts.length > 0 &&
            toasts.map(toast => (

              <div key={toast.id} className="toast show align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`bg-${toast.color} pt-1`}></div>
                <div className="d-flex align-items-start">
                  <div className="toast-body w-100">
                    <div className={`${toast.message && 'text-muted fw-bold'}`}>{toast.title}</div>
                    <span>{toast.message}</span>
                  </div>
                  <button type="button" className="btn-close m-2" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
              </div>

            ))
          }

        </div>

      </div>

    </>
  )

}