import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOtherUsersThunk,
  logoutUserThunk,
} from '../../store/slice/user/user.thunk';
import { useEffect } from 'react';
const UserSidebar = () => {
  const dispatch = useDispatch();
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return (
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
      );
    }
  }, [searchValue]);

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, []);
  return (
    <div className="max-w-[20rem] w-full h-screen  flex flex-col border-r border-r-white/10">
      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <IoIosSearch />
        </label>
      </div>
      <div className="h-full overflow-y-auto px-3 flex flex-col gap-2">
        {users?.map((userDetails) => {
          return <User key={userDetails?._id} userDetails={userDetails} />;
        })}
      </div>
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="ring-Accent ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <h2>{userProfile?.username}</h2>
        </div>
        <button onClick={handleLogout} className="btn btn-sm btn-outline px-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
