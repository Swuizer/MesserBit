import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfileRequest } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfileRequest(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-2 md:px-5 lg:px-12 overflow-x-hidden">
        <div className="flex aspect-square h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-xl md:text-2xl lg:text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-base md:text-lg font-semibold text-richblack-5">
            Delete Account Request
          </h2>
          <div className="text-sm md:text-base w-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Rooms. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300 text-sm md:text-base"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  )
}