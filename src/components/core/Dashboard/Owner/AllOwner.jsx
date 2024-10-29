import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOwnerByPhone, getAllOwners } from '../../../../services/operations/RoomAPI';
import { useNavigate } from 'react-router-dom';
import { SEARCH_TYPE } from "../../../../utils/constants"
import Tab from "../../../common/Tab"


const AllOwner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { owners } = useSelector((state) => state.room);
    // const [search, setSearch] = useState(false);
    const [searchType, setSearchType] = useState(SEARCH_TYPE.LOCATION);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const submitOwnerForm = async (data) => {
        try{
            if(searchType === "Location"){
                dispatch(getAllOwners(token, data));
            } else {
                dispatch(getAllOwnerByPhone(token, data));
            }
        } catch(error) {
            console.log("Owner Creation Error Message- ", error.message);
        }
    }

    const tabData = [
        {
          id: 1,
          tabName: "Location",
          type: SEARCH_TYPE.LOCATION,
        },
        {
          id: 2,
          tabName: "Phone",
          type: SEARCH_TYPE.PHONE,
        },
    ]
    
    
  return (
    <div className="w-11/12 mx-auto p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 text-richblack-5">All Owners</h1>
        
        <Tab tabData={tabData} field={searchType} setField={setSearchType} />
        {/* Location Filter Input */}
        <form onSubmit={handleSubmit(submitOwnerForm)} className="flex w-full flex-col gap-y-4 text-sm">
            {
                searchType === "Location" ? (
                    // Location Input
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-600">
                            Location <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            type="text"
                            placeholder="Enter your location"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-400 p-[12px] text-richblack-5 outline-none"
                            {...register("location", { required: true })}
                        />
                        {errors.location && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter a Location.
                            </span>
                        )}
                    </label>
                ) : (
                    // Phone Number Input
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-600">
                            Phone Number <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-400 p-[12px] text-richblack-5 outline-none"
                            {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
                        />
                        {errors.phone && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter a valid phone number.
                            </span>
                        )}
                    </label>
                )
            }

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Submit
            </button>
        </form>


        { console.log("Owner: ", owners)}
        {
            owners.length > 0 ? 
            (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {owners.map((owner) => (
                        <div key={owner._id} className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{owner.name}</h2>
                        <p className="text-gray-600"><strong>Phone:</strong> {owner.phone}</p>
                        <p className="text-gray-600"><strong>Government ID:</strong> {owner.govtId}</p>
                        <p className="text-gray-600"><strong>Location:</strong> {owner.location.city}</p>

                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-700">Rooms:</h3>
                            <ul className="list-disc list-inside text-gray-600">
                            {owner.rooms.map((room) => (
                                <li key={room._id}>{room.roomName}</li>
                            ))}
                            </ul>
                        </div>

                        {/* Add Rooms Button */}
                        <button
                            onClick={() => navigate(`addRoom/${owner._id}`)} // Redirect to Add Room page
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Add Rooms
                        </button>
                        </div>
                    ))}
                </div>
            )
            :
            (<h1 className='text-richblack-100 font-semibold text-2xl text-center mt-10'>No Owners Found</h1>)
        }
    </div>
  )
}

export default AllOwner