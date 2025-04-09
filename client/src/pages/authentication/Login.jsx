import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoKeySharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../store/slice/user/user.thunk';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);
  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center p-6  min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg ">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <p className="text-center text-base-content">Login to your account</p>
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            name="username"
            className="grow"
            placeholder="Username"
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
        <p className="text-center text-base-content">
          Don't have an account ?
          <Link className="text-primary pl-2 underline" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
