import { DashboardWrapper, QuestionAnswerTile } from "../../../components"
import { Assignment, useAssignmentStore, useCourseStore, useModalStore } from "../../../store"
import './style.scss'
import { ArrowLeft, Paperclip, Send } from "react-feather";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { stateToFormData } from "../../../utils";

type AssignmentQuestionProps = {
}

export const AssignmentQuestion: React.FC<AssignmentQuestionProps> = () => {

  const { goBack } = useHistory()
  const { toast, loading, confirm } = useModalStore()
  const { state } = useLocation<{
    item: Assignment
  }>()
  const { selectedCourse } = useCourseStore()
  const { answers } = useAssignmentStore()
  const [showMediaBtn, setShowMediaBtn] = useState(true)
  const { submitAnswer } = useAssignmentStore()

  useEffect(() => {
    document.getElementById('__chat_base')?.scrollIntoView({
      behavior: "smooth"
    })
  }, [])

  const handleCommentSubmit = async (event: any) => {
    loading(true, 'Submitting answer...')
    event.preventDefault()

    submitAnswer(stateToFormData({
      type: 'text',
      content: event.target[0].value,
      assignmentNumber: state?.item?.assignment_number,
      courseId: selectedCourse?.id
    })).then(resp => {
      loading(false)
      if (resp?.status === true) {
        event.target[0].value = ''
        document.getElementById('__chat_base')?.scrollIntoView({
          behavior: "smooth"
        })
        toast(resp?.message, undefined, 'success')
      } else toast(resp?.message, undefined, 'danger')
    })
  }

  const handleUploadComment = async (event: any) => {
    event.preventDefault()

    confirm("Upload answer?", async () => {

      loading(true, 'Uploading answer...')

      let file: File = event.target.files[0];

      submitAnswer(stateToFormData({
        type: file.type.split('/')[0],
        content: file,
        assignmentNumber: state?.item?.assignment_number,
        courseId: selectedCourse?.id
      })).then(resp => {
        loading(false)
        if (resp?.status === true) {
          document.getElementById('__chat_base')?.scrollIntoView({
            behavior: "smooth"
          })
          toast(resp?.message, undefined, 'success')
        } else toast(resp?.message, undefined, 'danger')
      })
    }, undefined, 'Upload', 'Cancel')

  }

  return (
    <DashboardWrapper>
      <div className="__studying_course_page">

        <div className="__greetings mb-3 mb-md-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Question {state?.item?.assignment_number}
          </h2>
        </div>

        <div className="__comments mb-3 mb-md-4 text-dark w-100 d-flex flex-column gap-2">
          <h5 className="text-primary fw-bold">Questions</h5>
          {
            state?.item?.questions?.length > 0 ?
              state?.item?.questions?.map((q, index) => (
                <div key={index}>
                  <QuestionAnswerTile item={q} isQuestion={true} key={index} />
                </div>
              ))
              : <div className="mb-3">No Questions</div>
          }
        </div>

        <div className="__comments mb-5 text-dark w-100 d-flex flex-column gap-2">
          <h5 className="text-primary fw-bold">Answers</h5>
          {
            answers?.length! > 0 ?
              answers?.map((q, index) => (
                <div key={index}>
                  <QuestionAnswerTile item={q} isQuestion={false} key={index} />
                </div>
              ))
              : <div className="mb-5">No Answers</div>
          }
        </div>

        <div id="__chat_base" className='pb-4' />

        {
          state.item?.rating < 3 &&
          <div className="__comment_input_wrapper container-lg position-fixed bottom-0 p-0">
            <div className="__comment_input border-top border-3 border-primary mt-3 mt-md-5 px-0 px-md-2 py-3 bg-light">

              <form className="d-flex align-item-center" onSubmit={handleCommentSubmit}>

                <input onChange={e => {
                  setShowMediaBtn(e.target.value === '')
                }} id='input-box' type="text" placeholder="Write message" className="form-control text-dark w-100 rounded-pill me-2" />

                {
                  showMediaBtn === true ?
                    <>
                      <input onChange={handleUploadComment} className="d-none" accept="image/*,audio/*,video/*" type="file" id="media-btn" />
                      <label htmlFor="media-btn" title='Send image, audio or video files' className="rounded-pill btn btn-primary">
                        <Paperclip size={18} />
                      </label>
                    </>
                    :
                    <button type="submit" className="rounded-pill btn btn-primary">
                      <Send size={18} />
                    </button>
                }

              </form>

            </div>
          </div>
        }


      </div>
    </DashboardWrapper>
  )
}