import { ChatTile, DashboardWrapper } from "../../../components"
import { ForumMessage, useAuthStore, useForumStore, useStudentStatsStore, useModalStore } from "../../../store"
import './style.scss'
import { ArrowLeft, Send, Shield, X } from "react-feather";
import { useHistory } from "react-router-dom";
import { stateToFormData } from "../../../utils";
import { useEffect, useState } from "react";

type ForumProps = {
}

export const Forum: React.FC<ForumProps> = () => {

  const { studentStats } = useStudentStatsStore()
  const { student } = useAuthStore()
  const { forumMessages, getForumMessages, submitMessage } = useForumStore()
  const { goBack } = useHistory()
  const { toast } = useModalStore()
  const [hasFetched, setHasFetched] = useState(false)
  const [replyId, setReplyId] = useState(0)
  const [repliedMsg, setRepliedMsg] = useState<ForumMessage>()

  useEffect(() => {

    if (studentStats?.category === 0) {
      toast("Please choose a category before accessing Forum", undefined, 'danger')
      goBack()
    }

    if (forumMessages.length === 0) {
      if (hasFetched === false) {
        getForumMessages()
          .then(_ => {
            setHasFetched(true)
          })
      }
    }

    document.getElementById('__chat_base')?.scrollIntoView({
      behavior: "smooth"
    })

  }, [forumMessages.length, getForumMessages, goBack, hasFetched, studentStats?.category, toast])

  const handleCommentSubmit = async (event: any) => {
    event.preventDefault()

    submitMessage(stateToFormData({
      comment: event.target[0].value,
      replyId: replyId
    }))
      .then(resp => {
        if (resp.status === true) {
          toast(resp?.message)
          event.target[0].value = ''
          setReplyId(0)
          setRepliedMsg(undefined)

          document.getElementById('__chat_base')?.scrollIntoView({
            behavior: "smooth"
          })
        }
      })
  }

  const handleChatHighlighted = (e: any, message: ForumMessage) => {
    e.preventDefault()

    setReplyId(message?.id)
    setRepliedMsg(message)

    document.getElementById('__chat_base')?.scrollIntoView({
      behavior: "smooth"
    })
  }

  const handleCloseHighlightedChat = (e: any) => {
    e.preventDefault()

    setReplyId(0)
    setRepliedMsg(undefined)
  }

  return (
    <DashboardWrapper>
      <div className="__forum_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            {studentStats?.categoryLabel} Forum
          </h2>
        </div>

        <div className="__comments mb-5 text-dark w-100 d-flex flex-column gap-3">
          {
            forumMessages?.length > 0 ?
              forumMessages?.map((message, index) => (
                <ChatTile handleReply={(e) => handleChatHighlighted(e, message)} key={index} message={message} />
              ))
              : <div>No messages</div>
          }
        </div>

        <div id="__chat_base" className={`mb-3 ${replyId !== 0 && 'pt-5 pb-4'}`}>
          <br />
        </div>

        <div className="__comment_input_wrapper container-lg position-fixed bottom-0 p-0">
          <div className="__comment_input border-top border-3 border-primary mt-5 px-0 px-lg-2 py-3 bg-light">

            {
              replyId !== 0 ?
                <div className="w-100 rounded bg-cream p-2 mb-3 cursor-pointer">
                  <div className="d-flex flex-column gap-2">

                    <div className="__commenter_name d-flex justify-content-between fw-bold text-primary">
                      {
                        repliedMsg?.sender === student?.email
                          ? student?.firstname! + ' ' + student?.lastname!
                          :
                          <div>
                            <Shield size={20} className="me-1" />
                            <span>{repliedMsg?.is_admin === true ? repliedMsg?.tutor?.name : repliedMsg?.student?.name}</span>
                          </div>
                      }

                      <X size={32} onClick={handleCloseHighlightedChat} className="text-primary cursor-pointer" />
                    </div>

                    <div className="__comment">
                      {repliedMsg?.comment}
                    </div>

                  </div>
                </div> :
                <small className="text-grey mb-1 mx-2">double click message to reply.</small>
            }

            <form className="d-flex align-item-center" onSubmit={handleCommentSubmit}>

              <input type="text" placeholder="Write message" className="form-control text-dark w-100 rounded-pill me-2" />
              <button type="submit" className="rounded-pill btn btn-primary">
                <Send size={18} />
              </button>

            </form>

          </div>
        </div>


      </div>
    </DashboardWrapper>
  )
}