import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaBed } from "react-icons/fa";
import { GiDoorWatcher } from "react-icons/gi";
import { TbWorld } from "react-icons/tb";
import { IoIosWater } from "react-icons/io";
import { MdCleaningServices } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomDetails, userEnrolled } from '../../../../../services/operations/RoomAPI';
import RoomSlider from './RoomSlider';

const RoomDetails = () => {

    const { roomId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {room} = useSelector((state) => state.room);
    const {user} = useSelector((state) => state.profile);

    useEffect(() => {
        // Fetch data if room are empty on initial page load or if the roomId changes
        dispatch(getRoomDetails(roomId))
    }, [dispatch, roomId]);  // Updated dependencies to include `roomId`

    const handleBooking = () => {
        if (user) {
            // Booking logic goes here
            dispatch(userEnrolled(roomId, user._id));
            // console.log("Booking confirmed");
        } else {
            // Navigate to login if user is not authenticated
            navigate("/login");
        }
    };

  return (
    <>
        {
            room ? (
                <div className="bg-gray-100 min-h-screen">
                    {/* Hero Section (Image Carousel) */}
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden mt-10">
                        <div className="flex w-full h-full transition-transform duration-700 ease-in-out">
                            <RoomSlider images={room?.images} />
                        </div>
                    </div>



                    {/* Room Details Section */}
                    <div className="container w-11/12 max-w-maxContent mx-auto px-4 py-10 space-y-8">
                        {/* Room Title and Price */}
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                            <h1 className="text-3xl font-bold text-pure-greys-400">
                            Deluxe Room for {
                                room.roomType === "Male" ? "Boys" 
                                : (room.roomType === "Female" ? "Girls" 
                                : (room.roomType === "Male & Female" ? "Boys and Girls" : "Family"))
                            }
                            </h1>
                            <p className="text-xl text-yellow-200 font-semibold mt-2">Price: {room.price}/month</p>
                        </div>

                        {/* Features Section */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex items-center gap-1 w-full sm:w-1/2 md:w-1/4">
                            <FaBed className="bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full" />
                            {room.availability} Bed
                            </div>
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex items-center gap-1 w-full sm:w-1/2 md:w-1/4">
                            <GiDoorWatcher className="bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full" />
                            Bathroom
                            </div>
                            {room.wifi && (
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex items-center gap-1 w-full sm:w-1/2 md:w-1/4">
                                <TbWorld className="bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full" />
                                Free Wi-Fi
                            </div>
                            )}
                            {room.water && (
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex items-center gap-1 w-full sm:w-1/2 md:w-1/4">
                                <IoIosWater className="bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full" />
                                Free Water
                            </div>
                            )}
                            {room.electricBill && (
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex items-center gap-1 w-full sm:w-1/2 md:w-1/4">
                                <MdElectricBolt className="bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-blue-600 text-2xl px-1 py-1 rounded-full" />
                                Free Electric Bill
                            </div>
                            )}
                            {room.roomCleaning && (
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex items-center gap-1 w-full sm:w-1/2 md:w-1/4">
                                <MdCleaningServices className="bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full" />
                                Free Room Cleaning/Week
                            </div>
                            )}
                        </div>

                        {/* About the Room */}
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">About the Room</h2>
                            <p className="text-gray-600">{room.about}</p>
                        </div>

                        {/* Location */}
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Location</h2>
                            <p className="text-gray-600">
                            City: {room.location.city}, District: {room.location.dist}, State: {room.location.state}
                            </p>
                        </div>

                        {/* Availability and Book Now */}
                        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
                            <p className="text-lg text-gray-700">
                            Availability: <strong>{room.availability} bed left</strong>
                            </p>
                            <button 
                            className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white py-3 px-6 rounded-lg text-lg w-full sm:w-auto"
                            onClick={handleBooking}
                            >
                            Book Now
                            </button>
                        </div>
                    </div>
                </div>
            ) : (<p className='text-richblack-400 flex justify-center items-center mt-20 text-xl lg:text-2xl font-bold'>Don't access the data in wrong way</p>)
        }
    </>
  )
}

export default RoomDetails