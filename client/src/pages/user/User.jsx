import React from "react";
import { Outlet, NavLink } from "react-router-dom";

// icons
// chat
import { IoChatbubblesSharp } from "react-icons/io5";
// call
import { PiPhoneCallFill } from "react-icons/pi";
// email
import { MdEmail } from "react-icons/md";

const User = () => {
  return (
    <div className="w-full h-full pt-10">
      <div className="max-w-[950px] mx-auto px-[3%]">
        <div className="flex">
          {/* image */}
          <div className="w-[0] h-0 md:h-auto overflow-hidden md:w-[50%] transition-all ease-in-out duration-150 bg-green-600 md:p-7">
            {/* header */}
            <header className="flex items-center justify-between">
              {/* site-logo */}
              <div>
                <NavLink to={'/'} className={'flex items-center gap-x-0.5 text-gray-100'}>
                  <IoChatbubblesSharp className="text-2xl text-gray-200"/>
                  <div className="flex items-center font-black">
                    <span className="text-xl text-gray-200">addis</span>
                    <span>Chat</span>
                  </div>
                </NavLink>
              </div>
              {/* right */}
              <div></div>
            </header>
            {/* content */}
            <div className="flex items-center justify-center relative">
                {/* image */}
                <div>
                    <img className="h-[450px]" src="/user-page-image.png" alt="" />
                </div>
                {/* card */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white py-5 px-[13%] rounded-md shadow-2xl">
                    <div className="whitespace-nowrap">
                        {/* phone */}
                        <div className="flex items-center gap-x-1.5 mb-3">
                            <div>
                                <div className="w-[26px] aspect-square rounded-full flex items-center justify-center border border-green-600 text-green-600">
                                    <PiPhoneCallFill />
                                </div>
                            </div>
                            <span className="text-sm italic text-green-600">: +251923996736</span>
                             </div>
                        {/* email */}
                        <div className="flex items-center gap-x-1.5">
                            <div>
                                <div className="w-[26px] aspect-square rounded-full flex items-center justify-center border border-green-600 text-green-600">
                                    <MdEmail />
                                </div>
                            </div>
                            <span className="text-sm italic text-green-600">: addispic@gmail.com</span>
                             </div>
                    </div>
                </div>
            </div>
          </div>
          {/* form */}
          <div className="w-[100%] transition-all ease-in-out duration-150 md:w-[50%] bg-white shadow-2xl p-10">
            {/* outlet */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
