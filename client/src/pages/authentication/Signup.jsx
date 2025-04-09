import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoKeySharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserThunk } from '../../store/slice/user/user.thunk';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [signupData, setsignupData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setsignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error('Password and confirm password do not match');
    }
    const response = await dispatch(registerUserThunk(signupData));
    if (response?.payload?.success) {
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center p-6  min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg ">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <p className="text-center text-base-content">Sign Up to your account</p>
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            name="fullName"
            className="grow"
            placeholder="Full Name"
            onChange={handleInputChange}
          />
        </label>
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
        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input
            type="password"
            name="confirmPassword"
            className="grow"
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
        </label>

        <div className="input input-bordered flex items-center gap-5">
          <label htmlFor="male" className="flex gap-3 items-center">
            <input
              id="male"
              type="radio"
              name="gender"
              value="male"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            male
          </label>

          <label htmlFor="female" className="flex gap-3 items-center">
            <input
              id="female"
              type="radio"
              name="gender"
              value="female"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            female
          </label>
        </div>
        <button onClick={handleSignup} className="btn btn-primary">
          Sign Up
        </button>
        <p className="text-center text-base-content">
          Already have an account ?
          <Link className="text-primary pl-2 underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
