import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

// icons
// photo
import { MdAddAPhoto } from "react-icons/md";
// delete
import { RiDeleteBin5Fill } from "react-icons/ri";
// settings
import { IoSettingsOutline } from "react-icons/io5";
// left 
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
// down
import { MdKeyboardArrowDown } from "react-icons/md";

// slices
// user
import {
  userSelector,
  logout,
  loggingOutSelector,
} from "../features/users/users.slice";

// components
// username
import Username from "../pages/user/user-sub-pages/Username";
// user profile
import UserProfile from "../pages/user/user-sub-pages/UserProfile";

const Header = () => {
  // local states
  const [isProfilePopup,setIsProfilePopup] = useState(false)

  // dispatch
  const dispatch = useDispatch();
  // states from slices
  // user
  const user = useSelector(userSelector);
  // logging out
  const loggingOut = useSelector(loggingOutSelector);
  return (
    <header className="h-[7vh] bg-green-600 text-white w-full">
      {/* container */}
      <div className="container-max-width flex items-center justify-between h-full">
        {/* logo */}
        <div>logo</div>
        {/* search */}
        <div>search</div>
        {/* actions */}
        <div>
          {user ? (
            <div className="flex items-center justify-end gap-x-3">
              {/* profile && username */}
              <div className="flex items-center gap-x-1.5 relative cursor-pointer" onClick={()=>{
                setIsProfilePopup(!isProfilePopup)
              }}>
                {/* profile */}
                <div className="w-[26px] aspect-square rounded-full bg-white text-green-600 flex items-center justify-center overflow-hidden">
                  <UserProfile />
                </div>
                {/* username */}
                <div className="text-sm">
                  <Username _id={user?._id} />
                </div>
                <MdKeyboardArrowDown className={`text-lg transition-transform ease-in-out duration-150 ${isProfilePopup ? '-rotate-180' : 'rotate-0'}`}/>
                {/* pop up */}
                <div className={`bg-white shadow-xl absolute z-50 right-0 top-[6vh] p-3 rounded-md transition-all ease-in-out duration-150 ${isProfilePopup ? 'scale-100' : 'scale-0'}`} onClick={(e)=>{
                  e.stopPropagation()
                }}>
                  {/* triangle */}
                  <div className="w-[16px] aspect-square bg-inherit z-50 absolute top-[-8px] right-7 rotate-45"></div>
                  <div className="relative">
                    {/* profile */}
                    <div className="flex items-center justify-center relative">
                      <div className="w-[120px] aspect-square rounded-md overflow-hidden">
                        <img className="w-full h-full object-center object-cover" src="https://c.pxhere.com/photos/c7/42/young_man_portrait_beard_young_man_male_handsome_young_man_handsome-1046502.jpg!d" alt="" />
                      </div>
                    </div>
                    {/* add new profile */}
                    <div>
                      <input type="file" name="profile" accept="image/*" hidden id="profile-picker" />
                      <label htmlFor="profile-picker" className="relative w-full flex items-center justify-center">
                        <div className="bg-green-600 text-white w-[26px] bottom-[-13px] cursor-pointer absolute left-1/2 -translate-x-1/2 z-50 aspect-square rounded-full overflow-hidden flex items-center justify-center">
                          <MdAddAPhoto />
                        </div>
                      </label>
                    </div>
                    {/* navigator */}
                    <div className="text-green-600 relative flex text-lg items-center px-1.5 justify-between">
                        <MdOutlineKeyboardDoubleArrowLeft className="cursor-pointer"/>
                        <MdOutlineKeyboardDoubleArrowLeft className="cursor-pointer rotate-180"/>
                    </div>
                    {/* delete profile */}
                    <div>
                      <div className="w-[20px] aspect-square text-xs flex items-center justify-center rounded-full overflow-hidden bg-red-500 cursor-pointer text-white absolute top-0 right-0">
                        <RiDeleteBin5Fill />
                      </div>
                    </div>
                    {/* username */}
                    <div className="flex items-center justify-center text-xs font-medium text-green-600 mt-4">
                      <span>username</span>
                    </div>
                    {/* email */}
                    <div className="flex items-center justify-center text-xs font-medium text-green-600 mt-1">
                      <span>email@gmail.com</span>
                    </div>

                    {/* setting */}
                    <button className="mt-5 bg-green-600 rounded-md flex items-center gap-x-1.5 transition-colors ease-in-out duration-150 hover:bg-green-500 px-1.5 py-1 w-full text-sm">
                      <IoSettingsOutline />
                      <span>Settings</span>
                    </button>
                    
                  </div>
                </div>
              </div>
              {/* notification */}
              <div>
                <span>notification</span>
              </div>
              {/* logout button */}
              <div>
                {loggingOut ? (
                  <div className="w-[67.921px] flex items-center justify-center">
                    <div className="w-[24px] aspect-square rounded-full border-4 border-white border-r-transparent animate-spin"></div>
                  </div>
                ) : (
                  <button
                    id="bbb"
                    className="px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50"
                    onClick={() => {
                      dispatch(logout());
                      console.log(
                        window.getComputedStyle(document.getElementById("bbb"))
                          .width
                      );
                    }}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-3 justify-end">
              <NavLink
                className={
                  "px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50"
                }
                to={"/user/login"}
              >
                Login
              </NavLink>
              <NavLink
                className={
                  "px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50"
                }
                to={"/user/register"}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
