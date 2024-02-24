import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../../utils/extractTime';

const Message = ({message}) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt)
  const fromMe = message.senderId === authUser.id;
  const chatClassMe = fromMe ? 'chat-end' : 'chat-start';
  const bubbleBgColor = fromMe ? 'bg-blue-500' :"";
  return (
    <div className={`chat ${chatClassMe}`}>
        <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`} style={{ wordWrap: 'break-word' }}>{message.message}</div>
        <div className='chat-footer opacity-90 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message;