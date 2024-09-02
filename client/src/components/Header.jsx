import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

// icons
// photo
import { MdAddAPhoto } from "react-icons/md";
// user
import { PiUser } from "react-icons/pi";
// delete
import { RiDeleteBin5Fill } from "react-icons/ri";
// settings
import { IoSettingsOutline } from "react-icons/io5";
// left
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
// down
import { MdKeyboardArrowDown } from "react-icons/md";

// config
// base uri
import { BASE_URI } from "../config";

// slices
// user
import {
  userSelector,
  logout,
  loggingOutSelector,
} from "../features/users/users.slice";
// profile
import {
  profilesSelectors,
  addNewProfile,
  isProfileUploadingSelector,
  deleteProfile,
  isProfileDeletingSelector,
  profileIndexIndicatorSetter,
  profileIndexIndicatorSelector,
} from "../features/profile/profile.slice";

// components
// username
import Username from "../pages/user/user-sub-pages/Username";
// user profile
import UserProfile from "../pages/user/user-sub-pages/UserProfile";

const Header = () => {
  // dispatch
  const dispatch = useDispatch();
  // states from slices
  // user
  const user = useSelector(userSelector);
  // logging out
  const loggingOut = useSelector(loggingOutSelector);
  // profiles
  const profiles = useSelector(profilesSelectors);
  let userProfiles = profiles?.filter(
    (profile) => profile?.userId === user?._id
  );
  // is profile uploading
  const isProfileUploading = useSelector(isProfileUploadingSelector);
  // is profile deleting
  const isProfileDeleting = useSelector(isProfileDeletingSelector);
  // profile delete indicator
  const profileIndexIndicator = useSelector(profileIndexIndicatorSelector);

  // local states
  const [isProfilePopup, setIsProfilePopup] = useState(false);
  // current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // navigator handler
  const navigatorHandler = (index) => {
    if (index > 0) {
      if (currentIndex === userProfiles?.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      if (currentIndex === 0) {
        setCurrentIndex(userProfiles?.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  // delete profile handler
  const deleteProfileHandler = (_id) => {
    dispatch(deleteProfile(_id));
  };

  // profile selector handler
  const profileSelectorHandler = (e) => {
    let formData = new FormData();
    formData.append("profile", e.target.files[0]);
    dispatch(addNewProfile(formData));
  };

  // updating current index
  useEffect(() => {
    if (profileIndexIndicator === 1) {
      setCurrentIndex(0);
    }else if(profileIndexIndicator === -1){
      if(userProfiles?.length > 1){
        if(currentIndex === 0){
          setCurrentIndex(0)
        }else{

          setCurrentIndex(currentIndex-1)
        }
      }else{
        setCurrentIndex(0)

      }
    }
    dispatch(profileIndexIndicatorSetter())
  }, [isProfileUploading, profiles, profileIndexIndicator]);

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
              <div
                className="flex items-center gap-x-1.5 relative cursor-pointer"
                onClick={() => {
                  setIsProfilePopup(!isProfilePopup);
                }}
              >
                {/* profile */}
                <div className="w-[26px] aspect-square rounded-full bg-white text-green-600 flex items-center justify-center overflow-hidden">
                  <UserProfile userId={user?._id} />
                </div>
                {/* username */}
                <div className="text-sm">
                  <Username _id={user?._id} />
                </div>
                <MdKeyboardArrowDown
                  className={`text-lg transition-transform ease-in-out duration-150 ${
                    isProfilePopup ? "-rotate-180" : "rotate-0"
                  }`}
                />
                {/* pop up */}
                <div
                  className={`bg-white shadow-xl absolute z-50 right-0 top-[6vh] p-3 rounded-md transition-all ease-in-out duration-150 ${
                    isProfilePopup ? "scale-100" : "scale-0"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {/* triangle */}
                  <div className="w-[16px] aspect-square bg-inherit z-50 absolute top-[-8px] right-7 rotate-45"></div>
                  <div className="relative">
                    {/* profile */}
                    <div className="flex items-center justify-center relative">
                      <div className="w-[120px] bg-green-600 text-white flex items-center justify-center text-7xl aspect-square rounded-md overflow-hidden">
                        {userProfiles?.length > 0 ? (
                          <img
                            className="w-full h-full object-center object-cover"
                            src={`${BASE_URI}/${userProfiles[currentIndex]?.path}`}
                            alt=""
                          />
                        ) : (
                          <PiUser />
                        )}
                      </div>
                    </div>
                    {/* add new profile */}
                    <div>
                      <input
                        type="file"
                        name="profile"
                        accept="image/*"
                        hidden
                        id="profile-picker"
                        onChange={profileSelectorHandler}
                      />
                      {isProfileUploading ? (
                        <div className="relative w-full flex items-center justify-center">
                          <div className="bg-green-600 text-white w-[26px] bottom-[-13px] absolute left-1/2 -translate-x-1/2 z-50 aspect-square rounded-full overflow-hidden flex items-center justify-center">
                            <div className="w-[16px] border-r-transparent animate-spin aspect-square rounded-full border-2 border-white"></div>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="profile-picker"
                          className="relative w-full flex items-center justify-center"
                        >
                          <div className="bg-green-600 text-white w-[26px] bottom-[-13px] cursor-pointer absolute left-1/2 -translate-x-1/2 z-50 aspect-square rounded-full overflow-hidden flex items-center justify-center">
                            <MdAddAPhoto />
                          </div>
                        </label>
                      )}
                    </div>
                    {/* navigator */}
                    {userProfiles?.length > 1 && (
                      <div className="text-green-600 relative flex text-lg items-center px-1.5 justify-between">
                        <MdOutlineKeyboardDoubleArrowLeft
                          className="cursor-pointer"
                          onClick={() => {
                            navigatorHandler(-1);
                          }}
                        />
                        <MdOutlineKeyboardDoubleArrowLeft
                          className="cursor-pointer rotate-180"
                          onClick={() => {
                            navigatorHandler(1);
                          }}
                        />
                      </div>
                    )}
                    {/* delete profile */}
                    {userProfiles?.length > 0 && (
                      <div>
                        {isProfileDeleting ? (
                          <div className="w-[20px] aspect-square text-xs flex items-center justify-center rounded-full overflow-hidden bg-red-500 text-white absolute top-0 right-0">
                            <div className="w-[12px] aspect-square rounded-full border-2 border-white border-r-transparent animate-spin"></div>
                          </div>
                        ) : (
                          <div
                            className="w-[20px] aspect-square text-xs flex items-center justify-center rounded-full overflow-hidden bg-red-500 cursor-pointer text-white absolute top-0 right-0"
                            onClick={() => {
                              deleteProfileHandler(
                                userProfiles[currentIndex]._id
                              );
                            }}
                          >
                            <RiDeleteBin5Fill />
                          </div>
                        )}
                      </div>
                    )}
                    {/* username */}
                    <div className="flex items-center justify-center text-xs font-medium text-green-600 mt-4">
                      <span>{user?.username}</span>
                    </div>
                    {/* email */}
                    <div className="flex items-center justify-center text-xs font-medium text-green-600 mt-1">
                      <span>{user?.email}</span>
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
                    className="px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50"
                    onClick={() => {
                      dispatch(logout());
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
