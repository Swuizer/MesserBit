import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaBed } from "react-icons/fa";
import { GiDoorWatcher } from "react-icons/gi";
import { TbWorld } from "react-icons/tb";
import { IoIosWater } from "react-icons/io";
import { MdCleaningServices } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { userEnrolled } from '../../../../../services/operations/RoomAPI';

const RoomDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {room} = useSelector((state) => state.room);
    const {user} = useSelector((state) => state.profile);

    const handleBooking = () => {
        if (user) {
            // Booking logic goes here
            dispatch(userEnrolled(room._id, user._id));
            console.log("Booking confirmed");
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
                <section className="relative w-full h-96 overflow-hidden">
                    <div className="flex w-full h-full transition-transform duration-700 ease-in-out">
                    <img
                        src={room.images[1]}
                        alt={room.roomName}
                        className="w-full object-cover h-full"
                    />
                    </div>
                </section>

                {/* Room Details Section */}
                <div className="container mx-auto px-4 py-10">
                    {/* Room Title and Price */}
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h1 className="text-3xl font-bold text-pure-greys-400">Deluxe Room for Boys</h1>
                    <p className="text-xl  text-yellow-100 mt-2">Price: {room.price}/month</p> 
                    {/* text-[#fdc33b] */}
                    </div>

                    {/* Features Section */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex justify-center items-center gap-1">
                        <FaBed className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full'/> 
                        {/* <FaBed className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] inline-block text-transparent bg-clip-text'/>  */}
                        {room.availability} Bed
                    </div>
                    <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex justify-center items-center gap-1">
                        {/* 🚪  Bathroom */}
                        <GiDoorWatcher className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full'/> Bathroom
                    </div>
                    {
                        room.wifi ? (
                            <>
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex justify-center items-center gap-1">
                                {/* 🌐 Free Wi-Fi */}
                                <TbWorld className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full'/>
                                Free Wi-Fi
                            </div>
                            </>
                        ):("")
                    }
                    {
                        room.water ? (
                            <>
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex justify-center items-center gap-1">
                                {/* 🌐 Free Wi-Fi */}
                                <IoIosWater className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full'/>
                                Free Water
                            </div>
                            </>
                        ):("")
                    }
                    {
                        room.electricBill ? (
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex justify-center items-center gap-1">
                                <MdElectricBolt className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-blue-600 text-2xl px-1 py-1 rounded-full'/>
                                Free Electric Bill
                            </div>
                        ):("")
                    }
                    {
                        room.roomCleaning ? (
                            <div className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white font-semibold p-4 rounded-lg flex justify-center items-center gap-1">
                                <MdCleaningServices className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full'/>
                                Free Room Cleaning/Week
                            </div>
                        ):("")
                    }
                    </div>

                    {/* About the Room */}
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">About the Room</h2>
                    <p className="mt-4 text-gray-600">
                        {/* This deluxe room offers a spacious environment with all modern
                        amenities. Ideal for students, it includes free water and Wi-Fi,
                        daily cleaning, and a private bathroom. */}
                        {
                            room.about
                        }
                    </p>
                    </div>

                    {/* Location */}
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Location</h2>
                    <p className="mt-4 text-gray-600">
                        {/* City: Kolkata, District: North 24 Parganas, State: West Bengal */}
                        City: {room.location.city}, District: {room.location.dist}, State: {room.location.state}
                    </p>
                    {/* <div className="w-full h-64 bg-gray-300 mt-4" id="map"></div> */}
                    </div>

                    {/* Availability and Book Now */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
                    <p className="text-lg text-gray-700">
                        Availability: <strong>{room.availability} bed left</strong>
                    </p>
                    <button 
                        className="bg-gradient-to-br from-[#f39c12] to-[#faa718] text-white py-3 px-6 rounded-lg text-lg"
                        onClick={handleBooking}
                    >
                        Book Now
                    </button>
                    </div>
                </div>

                

                </div>
            ) : (<p className='text-richblack-400 flex justify-center items-center mt-20 text-2xl font-bold'>Don't access the data in wrong way</p>)
        }
    </>
  )
}

export default RoomDetails