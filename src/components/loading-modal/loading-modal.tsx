import { useLoadingModalStore } from "../../store/loading-modal"

export const LoadingModal: React.FC = () => {

  const { modal } = useLoadingModalStore()

  return (
    <>
      <button id="loading-modal-toggle-btn" type="button" className="btn d-none" data-bs-toggle="modal" data-bs-target="#loading-modal" />

      <div id="loading-modal" style={{ zIndex: '5000' }} className="modal fade" data-bs-keyboard="false" tabIndex={-1} data-bs-backdrop="static" aria-hidden={true}>

        <div className="modal-dialog modal-dialog-centered d-flex align-items-center justify-content-center my-4">

          <div className="spinner-border text-cream me-2 fw-light" role="status" />
          <div className="text-cream h5 m-0 fw-light">
            {modal?.message}
          </div>

        </div>

      </div>

    </>
  )



}
