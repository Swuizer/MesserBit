import { toast } from "react-hot-toast"
import { setOwners, setRoom, setRooms } from "../../slices/roomSlice"
import { setLoading} from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { ownerEndpoints } from "../apis"

const {
    CREATE_OWNER_API,
    GET_ALL_OWNERS_API,
    GET_ALL_OWNER_BY_PHONE_API,
    CREATE_ROOM_API,
    GET_ALL_ROOM_API,
    GET_ROOM_DETAILS_API,
    ENROLL_USER_API,
    GET_USER_ENROLLED_ROOMS_API,
} = ownerEndpoints;

export function createOwner(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", CREATE_OWNER_API,{
                formData,
                token,
            });
        
            console.log("CREATE_OWNER_API RESPONSE.....", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            // dispatch(
            //     setOwner(response.data.ownerDetails)
            // );
            console.log("User Data: ",response.data.ownerDetails);
        
        
            //   localStorage.setItem("owner", JSON.stringify(response.data.ownerDetails));

            toast.success("Owner Created Successfully");
        } catch (error){
            console.log("Owner Creation API ERROR......", error);
            toast.error("Owner Creation Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getAllOwners(token, formData){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", GET_ALL_OWNERS_API,{
                formData,
                token,
            });

            console.log("GET_ALL_OWNER_DETAILS_API RESPONSE.....", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            
            // console.log("All Owners Data: ",response.data.allOwners);
            
            dispatch(
                setOwners(response.data.allOwners)
            );

            toast.success("All Owner Details Fetching Successfully");
        } catch (error){
            console.log("All Owner Details Fetching API ERROR......", error);
            toast.error("Failed to Fetch Owner Details");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getAllOwnerByPhone(token, formData){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", GET_ALL_OWNER_BY_PHONE_API, {
                formData,
                token,
            });

            console.log("GET_ALL_OWNER_BY_PHONE_API RESPONSE.....", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("All Owners Data By Phone: ",response.data.data);
            
            dispatch(
                setOwners(response.data.data)
            );

            toast.success("All Owner Details Fetching By Phone Number Successfully");
        } catch (error){
            console.log("All Owner Details Fetching By Phone Number API ERROR......", error);
            toast.error("Failed to Fetch Owner Details By Phone Number");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function createRoom(token, data, ownerId){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        console.log("Check Check");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", CREATE_ROOM_API, { 
                ...data,
                ownerId: ownerId
            }, 
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            });

            console.log("CREATE_ROOM_API RESPONSE....", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("Room Data: ",response.data.newRoom);
        
            toast.success("Room Created Successfully");
        } catch (error){
            console.log("Room Creation API ERROR......", error);
            toast.error("Room Creation Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getAllRooms(formData){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", GET_ALL_ROOM_API, {
                formData,
            });

            // console.log("GET_ALL_ROOMS_API RESPONSE.....", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(
                setRooms(response.data.data)
            );

            toast.success("All Rooms Fetched Successfully");
        } catch (error){
            console.log("All Rooms Fetched API ERROR......", error);
            toast.error("No Mess Room Found in that Location");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getRoomDetails(roomId){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", GET_ROOM_DETAILS_API, {
                roomId
            });

            console.log("GET_ROOM_DETAILS_API RESPONSE.....", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("Room Details: ",response.data.data);
            
            dispatch(
                setRoom(response.data.data)
            );

            toast.success("Room Details Access Successfully");
        } catch (error){
            console.log("Room Details API ERROR......", error);
            toast.error("Room Details Access Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function userEnrolled(roomId, userId){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", ENROLL_USER_API, {
                roomId, 
                userId
            });
            console.log("ENROLL_USER_API RESPONSE.....", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

           
            toast.success("Room Booking Request Send Successfully");
        } catch(error){
            console.log("Room Booking API ERROR......", error);
            toast.error("Room Booking Access Failed");
        }
        toast.dismiss(toastId);
    }
}

export async function getUserEnrolledRooms(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET", GET_USER_ENROLLED_ROOMS_API, null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data;
    } catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR.........", error);
        toast.error("Could Not Get Enrolled Courses");
    }
    toast.dismiss(toastId);
    return result;
}