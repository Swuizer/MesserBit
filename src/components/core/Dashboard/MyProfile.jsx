import React from "react"
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div>
      <h1 className="w-11/12 mx-auto text-xl md:text-2xl lg:text-3xl font-medium text-richblack-5 flex flex-col gap-3 pt-3 font-inter tracking-wide mb-14">
        My Profile
      </h1>
      <div className="w-11/12 md:w-9/12 mx-auto flex flex-col-reverse sm:flex-row items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-700 px-4 p-8 md:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[50px] md:w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-base md:text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs md:text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <div className="flex justify-end w-full -mb-7">
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>
      <div className="w-11/12 md:w-9/12 mx-auto flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-700 p-8 px-12 my-10">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="w-11/12 md:w-9/12 mx-auto flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-700 p-8 px-12 my-10">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex flex-col max-w-[500px] gap-5">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-row md:flex-col justify-between">
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
             </p>
            </div>
            <div className="flex flex-row md:flex-col justify-between">
              <p className="mb-2 text-sm text-richblack-600 text-start">Last Name</p>
              <p className="text-sm font-medium text-richblack-5 text-start">
                {user?.lastName}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-row md:flex-col justify-between">
              <p className="mb-2 text-sm text-richblack-600 text-start">Email</p>
              <p className="text-xs md:text-sm font-medium text-richblack-5 text-start">
                {user?.email}
              </p>
            </div>
            <div className="flex flex-row md:flex-col justify-between">
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-row md:flex-col justify-between">
              <p className="mb-2 text-sm text-richblack-600 text-start">Gender</p>
              <p className="text-sm font-medium text-richblack-5 text-start">
                {user?.gender ?? "Add Gender"}
              </p>
            </div>
            <div className="flex flex-row md:flex-col justify-between">
              <p className="mb-2 text-sm text-richblack-600 text-start">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5 text-start">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
