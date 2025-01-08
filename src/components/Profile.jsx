import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';

const Profile = () => {
  const user = useSelector((state)=>state.user);

  return (
    user &&
    <div>
  
      <EditProfile user={user}/>
    </div>
  );
};

export default Profile;
