import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// icons
// chat
import { IoChatbubblesSharp } from "react-icons/io5";


const ForgetPassword = () => {
  // states
  // border decorator
  const [borderDecorator, setBorderDecorator] = useState("");
  // email
  const [email, setEmail] = useState("");
  // email error
  const [emailError, setEmailError] = useState("");


  //   email validator
  const emailValidator = (email) => {
    let emailPattern =
      /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    return emailPattern.test(email);
  };

  // submit handler
  const formSubmitHandler = () => {
    // validator
    
    if (!email?.trim()) {
      setEmailError("Email address required.");
    } else if (!emailValidator(email)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }

    // submitting
    if(email?.trim() && emailValidator(email) && !emailError){
        console.log({email})
    }
  };

  return (
    <div>
      {/* header */}
      <header className="flex items-center justify-between mb-6">
        {/* title */}
        <div>
          <h1 className="text-xl text-green-600">Forget Password</h1>
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
      <div>
        
        {/* email */}
        <div className="mb-3">
          {/* input */}
          <div
            className={`p-2 border rounded-sm  ${
              email && !emailError ? "border-green-600" : ""
            } ${emailError ? "border-red-400" : ""} ${
              borderDecorator === "email"
                ? "border-green-600 "
                : "border-gray-200 "
            }`}
          >
            <input
              className="w-full border-none focus:ring-0 focus:outline-none text-sm bg-transparent"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onFocus={() => {
                setBorderDecorator("email");
              }}
              onBlur={() => {
                setBorderDecorator("");
              }}
            />
          </div>
          {/* email error */}
          <div className="text-xs text-red-600 overflow-hidden h-[16px]">
            <span>{emailError}</span>
          </div>
        </div>

        {/* register button */}
        <div>
          <button
            className="w-full flex items-center justify-center bg-green-600 text-white rounded-sm p-2 transition-colors ease-in-out duration-150 hover:bg-green-600"
            onClick={() => {
              formSubmitHandler();
            }}
          >
            <span>Next</span>
          </button>
        </div>

        {/* login link */}
        <div className="mt-5">
          <NavLink
            to={"/user/login"}
            className={"text-xs text-green-600 hover:underline italic"}
          >
            <span>login</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword