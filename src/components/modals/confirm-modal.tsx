import { useModalStore } from "../../store"

export const ConfirmModal: React.FC = () => {

  const { confirmProps } = useModalStore()

  return (
    <>
      <button id="app-confirm-modal-toggle-btn" type="button" className="btn d-none" data-bs-toggle="modal" data-bs-target="#app-confirm-modal" />

      <div id="app-confirm-modal" style={{ zIndex: '5000' }} className="modal fade" data-bs-keyboard="false" tabIndex={-1} data-bs-backdrop="static" aria-hidden={true}>

        <div className="modal-dialog">
          <div className="modal-content bg-light">

            <div className='bg-warning pt-2' />

            <div className="modal-body">

              <div className="d-flex align-items-start mb-4">

                <div className="w-100 text-primary">{confirmProps?.message}</div>

                <button type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />

              </div>

              <div className="d-flex justify-content-end">

                <button type="button"
                  className="ms-2 btn btn-sm btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => confirmProps?.onCancel!()}
                >
                  {confirmProps?.cancelText ?? 'No'}
                </button>

                <button type="button"
                  id="__confirm_modal_confirm_btn"
                  className="ms-2 btn btn-sm btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => confirmProps?.onConfirm!()}
                >
                  {confirmProps?.confirmText ?? 'Confirm'}
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>

    </>
  )



}
