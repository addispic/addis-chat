import React from "react";
import { PiUser } from "react-icons/pi";

const UserProfile = () => {
  return (
    <>
      {!true ? (
        <img
          className="w-full h-full object-center object-cover"
          src="http://www.lekve.net/et/09addis-national_museum-tewodros02.jpg"
          alt=""
        />
      ) : (
        <PiUser />
      )}
    </>
  );
};

export default UserProfile;
