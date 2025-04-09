import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/message.thunk';

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState('');
  const handleSendMessage = () => {
    const timestamp = new Date().toISOString(); // Get the current time in ISO format
    dispatch(
      sendMessageThunk({ recieverId: selectedUser?._id, message, timestamp })
    );
    setMessage('');
  };
  return (
    <div className="w-full p-3 flex gap-2">
      <input
        type="text"
        placeholder="Type here..."
        className="input input-bordered input-Accent w-full "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSendMessage}
        className="btn btn-square btn-outline btn-Accent"
      >
        <IoMdSend />
      </button>
    </div>
  );
};

export default SendMessage;
