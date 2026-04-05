import React from 'react'
import EditProfile from '../pages/EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
   const user = useSelector((state) => state.auth.user)
  return (
    user && (
      <div><EditProfile user={user}/></div>
    )
  )
}

export default Profile