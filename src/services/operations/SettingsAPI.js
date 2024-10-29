import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"

const {
  // UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_REQUEST_PROFILE_API,
  DELETE_REQUEST_APPROVE_API
} = settingsEndpoints

// export function updateDisplayPicture(token, formData) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     try {
//       const response = await apiConnector(
//         "PUT",
//         UPDATE_DISPLAY_PICTURE_API,
//         formData,
//         {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         }
//       )
//       console.log(
//         "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
//         response
//       )

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       toast.success("Display Picture Updated Successfully")
//       dispatch(setUser(response.data.data))
//     } catch (error) {
//       console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
//       toast.error("Could Not Update Display Picture")
//     }
//     toast.dismiss(toastId)
//   }
// }

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      const userDetails = response.data.userDetails;
      const userImage = userDetails.image
        ? userDetails.image  // Use provided image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userDetails.firstName} ${userDetails.lastName}`; // Fallback to generated initials

      // Dispatch user details to Redux store
      dispatch(
        setUser({ ...userDetails, image: userImage })
      );
      console.log("User Data: ",userDetails);


      localStorage.setItem("user", JSON.stringify(userDetails));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfileRequest(token, navigate) {
  return async () => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_REQUEST_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Request Send Successfully")
    } catch (error) {
      console.log("DELETE_REQUEST_PROFILE_API ERROR............", error)
      toast.error("Could Not Send Delete Profile")
    }
    toast.dismiss(toastId)
  }
}

export function approveDeleteRequest(action, requestId, token){
  return async () => {
    const toastId = toast.loading("Loading...");
    try {
      console.log("Action:", action, "RequestId:", requestId, "Token:", token);
      const response = await apiConnector("PUT", DELETE_REQUEST_APPROVE_API,{
        action,
        requestId,
        token,
      });

      console.log("DELETE_REQUEST_APPROVE_API_ERROR", response);

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("User Account Deletion Approved Successfully")
    } catch(error) {
      console.log("DELETE_REQUEST_APPROVE_PROFILE_API ERROR............", error)
      toast.error("Delete Request Profile Approve Error");
    }
    toast.dismiss(toastId);
  }
}