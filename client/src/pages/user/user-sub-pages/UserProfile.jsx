import React from "react";
import {useSelector} from 'react-redux'

// icons
// user
import { PiUser } from "react-icons/pi";

// config
// base uri
import { BASE_URI } from "../../../config";

// slices
// profile
import {profilesSelectors} from '../../../features/profile/profile.slice'

const UserProfile = ({userId}) => {
  // states from slices
  // profiles
  const profiles = useSelector(profilesSelectors)
  let userProfile = profiles?.filter(profile => profile?.userId === userId)[0]
  return (
    <>
      {userProfile ? (
        <img
          className="w-full h-full object-center object-cover"
          src={`${BASE_URI}/${userProfile?.path}`}
          alt=""
        />
      ) : (
        <PiUser />
      )}
    </>
  );
};

export default UserProfile;
