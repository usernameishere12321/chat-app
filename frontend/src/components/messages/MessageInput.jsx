import React, { useState } from 'react'
import {BsSend} from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }

  const handleTextareaChange = (e) => {
    const textarea = e.target;
    let areaHeight = textarea.scrollHeight;
    textarea.style.height = 'auto';
    let specialCaseHeight = textarea.value === '' ? '3em' : `${areaHeight}px`
    textarea.style.height = areaHeight > 100 ? `100px` : specialCaseHeight;
    setMessage(e.target.value);
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <textarea type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' placeholder='Type a message'
          style={{ overflowWrap: 'break-word', height: '3em', overflow: 'hidden', resize: 'none', paddingRight: '40px', boxSizing: 'border-box'}}
          value={message}
          onChange={handleTextareaChange} />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' disabled={message.trim() === ''}>
          {loading ? <span className='loading loading-spinner'></span> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput