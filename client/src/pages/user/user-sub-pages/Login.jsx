import React, { useState,useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

// icons
// chat
import { IoChatbubblesSharp } from "react-icons/io5";
// hide
import { PiEyeSlashThin } from "react-icons/pi";
// show
import { PiEyeThin } from "react-icons/pi";

// components
// timer
// loading
import Loading from "../../../components/timer/Loading";

// slices
// user slice
import {login,userSelector,errorsSelector,isFormSubmittingSelector} from '../../../features/users/users.slice'

const Login = () => {
  // navigate
  const navigate = useNavigate();
  // states from slice
  // user slice
  // is form submitting
  const isFormSubmitting = useSelector(isFormSubmittingSelector)
  // user
  const user = useSelector(userSelector);
  // errors
  const errors = useSelector(errorsSelector)
  // dispatch
  const dispatch = useDispatch();
  // states
  // border decorator
  const [borderDecorator, setBorderDecorator] = useState("");
  // username
  const [username, setUsername] = useState("");
  // username error
  const [usernameError, setUsernameError] = useState("");
  //   password
  const [password, setPassword] = useState("");
  // is password
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  // password error
  const [passwordError, setPasswordError] = useState("");


  // submit handler
  const formSubmitHandler = () => {
    // validator
    if (!username?.trim()) {
      setUsernameError("Username required.");
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password required.");
    } else if (password?.length < 3) {
      setPasswordError("Too short password.");
    } else {
      setPasswordError("");
    }

    // submitting
    if (username?.trim() && password?.length >= 3) {
      dispatch(login({ username, password }))
    }
  };

  // use effect
  useEffect(()=>{
    if(user){
      navigate("/")
    }
    if(errors?.password){
      setPasswordError(errors?.password)
    }
    if(errors?.username){
      setUsernameError(errors?.username)
    }
  },[user,errors])

  return (
    <div>
      {/* header */}
      <header className="flex items-center justify-between mb-6">
        {/* title */}
        <div>
          <h1 className="text-xl text-green-600">Login</h1>
        </div>
        {/* site-logo */}
        <div className="md:hidden">
          <NavLink
            to={"/"}
            className={"flex items-center gap-x-0.5 text-green-600"}
          >
            <IoChatbubblesSharp className="text-lg text-green-600" />
            <div className="flex items-center font-black">
              <span className="text-green-600">addis</span>
              <span>Chat</span>
            </div>
          </NavLink>
        </div>
      </header>
      {/* form */}
      {
        isFormSubmitting
        ?
        <Loading  mainText={'Logging...'}/>
        :
      <div>
        {/* username */}
        <div className="mb-3">
          {/* input */}
          <div
            className={`p-2 border rounded-sm ${
              username ? "border-green-600" : ""
            } ${usernameError ? "border-red-400" : ""} ${
              borderDecorator === "username"
                ? "border-green-600 "
                : "border-gray-200"
            }`}
          >
            <input
              className="w-full border-none focus:ring-0 focus:outline-none text-sm bg-transparent"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              onFocus={() => {
                setBorderDecorator("username");
              }}
              onBlur={() => {
                setBorderDecorator("");
              }}
            />
          </div>
          {/* username error */}
          <div className="text-xs text-red-600 overflow-hidden h-[16px]">
            <span>{usernameError}</span>
          </div>
        </div>

        {/* password */}
        <div className="mb-3">
          {/* input */}
          <div
            className={`p-2 border rounded-sm flex items-center gap-x-1.5 ${
              password && !passwordError ? "border-green-600" : ""
            } ${passwordError ? "border-red-400" : ""} ${
              borderDecorator === "password"
                ? "border-green-600 "
                : "border-gray-200 "
            }`}
          >
            <input
              className="w-full border-none focus:ring-0 focus:outline-none text-sm bg-transparent"
              type={`${isPasswordHide ? "password" : "text"}`}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              onFocus={() => {
                setBorderDecorator("password");
              }}
              onBlur={() => {
                setBorderDecorator("");
              }}
            />
            <button
              onClick={() => {
                setIsPasswordHide(!isPasswordHide);
              }}
            >
              {isPasswordHide ? (
                <PiEyeSlashThin className="text-xl text-gray-500" />
              ) : (
                <PiEyeThin className="text-xl text-gray-500" />
              )}
            </button>
          </div>
          {/* password error */}
          <div className="text-xs text-red-600 overflow-hidden h-[16px]">
            <span>{passwordError}</span>
          </div>
        </div>

        {/* forget password link */}
        <div className="my-3 flex items-center justify-end">
          <NavLink to={'/user/forget-password'} className={'text-xs text-green-600 italic font-semibold hover:underline'}>Forget Password</NavLink>
        </div>

        {/* login button */}
        <div>
          <button
            className="w-full flex items-center justify-center bg-green-600 text-white rounded-sm p-2 transition-colors ease-in-out duration-150 hover:bg-green-600"
            onClick={() => {
              formSubmitHandler();
            }}
          >
            <span>Login</span>
          </button>
        </div>

        {/* register link */}
        <div className="mt-5">
          <NavLink
            to={"/user/register"}
            className={"text-xs text-green-600 hover:underline italic"}
          >
            <span>Don't have an account?</span>
          </NavLink>
        </div>
      </div>
      }
    </div>
  );
};

export default Login;
