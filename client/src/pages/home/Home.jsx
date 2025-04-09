import React, { useEffect } from 'react';
import UserSidebar from './UserSidebar';
import MessageContainer from './MessageContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeSocket,
  setOnlineUsers,
} from '../../store/slice/socket/socket.slice';
import { setNewMessage } from '../../store/slice/message/message.slice';
const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile } = useSelector(
    (state) => state.userReducer
  );
  const { socket, onlineUsers } = useSelector((state) => state.socketReducer);
  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    socket.on('onlineUsers', (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on('newMessage', (newMessage) => {
      dispatch(setNewMessage(newMessage));
    });
    return () => {
      socket.close();
    };
  }, [socket]);
  return (
    <div>
      <div className="flex items-center mb-1">
        <img
          className="h-12 pl-2"
          src="./public/img/Chaticon.png"
          alt="ChitChat Icon"
        />
        <h1 className=" bg-green-600 text-white mx-3 rounded-lg  px-2 py-2 text-xl font-semibold ">
          CHIT~CHAT
        </h1>
      </div>

      <div className="flex border border-t-white/10">
        <UserSidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
