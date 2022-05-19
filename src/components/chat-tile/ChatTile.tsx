import { MouseEventHandler, useEffect, useState } from "react"
import { Shield } from "react-feather"
import { ForumMessage, useAuthStore, useForumStore } from "../../store"
import { baseUrl } from "../../utils"
import './style.scss'

export const ChatTile: React.FC<{ message: ForumMessage, handleReply: MouseEventHandler<HTMLDivElement> }> = ({ message, handleReply }) => {

  const { student } = useAuthStore()
  const { forumMessages } = useForumStore()
  const [repliedMsg, setRepliedMsg] = useState<ForumMessage>()

  useEffect(() => {
    if (message?.reply_id !== 0) {
      setRepliedMsg(forumMessages?.find(msg => msg?.id === message?.reply_id!)
      )
    }
  }, [forumMessages, message?.reply_id])

  const handleReplyClick = () => {
    document.getElementById('__chat_' + message?.reply_id)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    })
  }

  return (
    <div onDoubleClick={handleReply} id={'__chat_' + message?.id} className={`__chat w-100 w-md-80 border rounded border-cream p-2 p-lg-3 cursor-pointer ${message?.sender === student?.email ? 'align-self-end' : 'align-self-baseline'} `}>

      <div className={`w-100`}>
        {
          message?.reply_id !== 0 &&
          <div onClick={handleReplyClick} className="w-100 rounded bg-cream p-2 mb-3 cursor-pointer">
            <div className="d-flex flex-column gap-2">

              <div className="__commenter_name fw-bold text-primary">
                {
                  repliedMsg?.sender === student?.email
                    ? student?.firstname! + ' ' + student?.lastname!
                    :
                    <div>
                      <Shield size={20} className="me-1" />
                      <span>{repliedMsg?.is_admin === true ? repliedMsg?.tutor?.name : repliedMsg?.student?.name}</span>
                    </div>
                }
              </div>

              <div className="__comment">
                {repliedMsg?.comment}
              </div>

            </div>
          </div>
        }

        <div className="d-flex gap-1 gap-md-3 align-items-center bg-light w-100">

          <div className="__commenter_avatar">
            <img src={
              message?.is_admin === true ?
                `${baseUrl}/${message?.tutor?.avatar}` :
                message?.sender === student?.email ?
                  `${baseUrl}/${student?.avatar!}` :
                  `${baseUrl}/${message?.student?.avatar!}`
            } alt="Student Avatar" className='__avatar' />
          </div>

          <div className="d-flex flex-column w-100">
            <div className="d-flex justify-content-between align-items-center">

              <div className="__commenter_name fw-bold text-primary">
                {
                  message?.sender === student?.email
                    ? student?.firstname! + ' ' + student?.lastname!
                    :
                    <div>
                      <Shield size={20} className="me-1" />
                      <span>{message?.is_admin === true ? message?.tutor?.name : message?.student?.name}</span>
                    </div>
                }
              </div>

              <div className="__date_commented">{message?.date_added}</div>

            </div>

            <div className="__comment">
              {message?.comment}
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}