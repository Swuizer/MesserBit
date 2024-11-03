// import ChangeProfilePicture from "./ChangeProfilePicture"
import React from 'react'
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <>
      <h1 className="mb-14 mt-3 text-2xl lg:text-3xl font-medium text-richblack-5 pl-12 w-11/12">
        Edit Profile
      </h1>
      <div className="w-full lg:w-[calc(100vh+28rem)]">
        {/* Change Profile Picture */}
        {/* <ChangeProfilePicture /> */}
        {/* Profile */}
        <EditProfile />
        {/* Password */}
        <UpdatePassword />
        {/* Delete Account */}
        <DeleteAccount />
      </div>
    </>
  )
}