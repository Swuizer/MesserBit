import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaWifi } from "react-icons/fa6";
import { IoIosWater } from "react-icons/io";
import { MdCleaningServices, MdElectricBolt, MdFamilyRestroom } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { CgGirl } from "react-icons/cg";
import { getAllRooms, getRoomDetails } from '../../../../../services/operations/RoomAPI';
import { useNavigate } from 'react-router-dom';


const AllRooms = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms } = useSelector((state) => state.room);
//   const [prevLocation, setPrevLocation] = useState(null);

//   if(rooms.length > 0){
//     setPrevLocation(rooms[0].location.city);
//   }


//   useEffect(() => {
//     if (!rooms.length && prevLocation) {
//       dispatch(getAllRooms(prevLocation)); 
//     }
//   }, [dispatch, rooms.length]);

  return (
    <>
        {
            rooms.length > 0 ? (
                <div className="max-w-7xl mt-11 mx-auto px-4 py-8">
                {/* <h1 className="text-3xl font-bold text-center mb-8">Available Rooms</h1> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {rooms.map((room) => (
                    <div
                        key={room._id}
                        className="bg-white relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 w-[280px] min-h-[400px] will-change-transform flex flex-col"
                    >
                        {/* Display multiple images */}
                        {/* <div className="flex overflow-x-scroll">
                        {room.images.map((image, index) => (
                            <img
                            key={index}
                            src={image}
                            alt={room.name}
                            className="w-full h-48 object-cover"
                            />
                        ))}
                        </div> */}
                        {/* Display only the first image */}
                        <div className='relative'>
                            <img
                            src={room.images[0]}  // Displaying the first image from the array
                            alt={room.name}
                            className="w-full h-48 object-cover"
                            />
                            <div className='absolute bottom-2 right-2 z-50'>
                                {
                                    room.roomType === "Male" ? (
                                        <>
                                            <GrUserManager className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full'/>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                room.roomType === "Female" ? (
                                                    <>
                                                        <CgGirl className='bg-gradient-to-br from-[#9dbffb] to-[#1d8ef7] text-white text-2xl px-1 py-1 rounded-full'/>
                                                    </>
                                                ) : (
                                                    <>
                                                      {
                                                        room.roomType === "Family" ? (
                                                            <>
                                                                <MdFamilyRestroom className='bg-gradient-to-br from-[#f7d377] to-[#f78e1d] text-white text-2xl px-1 py-1 rounded-full'/>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {
                                                                   room.roomType === "Male & Female" ? (
                                                                    <>
                                                                      <GrUserManager className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full mb-1'/>  
                                                                      <CgGirl className='bg-gradient-to-br from-[#9dbffb] to-[#1d8ef7] text-white text-2xl px-1 py-1 rounded-full'/>
                                                                    </>
                                                                   ) : ""
                                                                }
                                                            </>
                                                        )
                                                      }  
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        
                        <div className="p-4 flex-grow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {room.roomName}
                            </h2>
                            <p className="text-pure-greys-600 mb-1">Location: {room.location.city}</p>
                            <div>
                                <p className='flex text-sm flex-wrap gap-2'>
                                    {room.wifi ? (
                                        <p className='text-richblack-400 flex gap-1'>
                                            Free Wifi <FaWifi className='text-caribbeangreen-300 font-bold translate-y-[2px]'/>
                                        </p>
                                    ) : ""}
                                    {room.water ? (
                                        <p  className='text-richblack-400 flex gap-1'>
                                            Free Water <IoIosWater className='text-blue-100 font-bold translate-y-1'/>
                                        </p>
                                    ): ""}
                                    {room.electricBill ? (
                                        <p  className='text-richblack-400 flex gap-1'>
                                            Free Electric Bill <MdElectricBolt className='text-blue-200 font-bold translate-y-1'/>
                                        </p>
                                    ): ""}
                                    {room.roomCleaning ? (
                                        <p  className='text-richblack-400 flex gap-1'>
                                            Free Room Cleaning <MdCleaningServices className='text-yellow-200 font-bold translate-y-1'/>
                                        </p>
                                    ): ""}
                                </p>
                            </div>
                            <p className="text-richblack-800 mb-3">Price: {room.price}</p>
                            <button 
                                onClick={() => {
                                    dispatch(getRoomDetails(room._id));
                                    navigate("/allRooms/getRoomDetails");
                                }}
                                className="px-4 py-2 bg-blue-500 text-richblack-5 rounded-lg hover:bg-blue-600 transition w-11/12"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            ) : (
                <>
                    <h2 className='text-richblack-400 text-2xl mt-32 text-center font-semibold'>No Mess Room Found in that Location</h2>
                    <p className='text-richblack-400 text-sm mt-1 text-center font-semibold'>Our services available in <span>Barasat, Madhyamgram and Barrackpur</span></p>
                </>
            )
        }
    </>
  );
};

export default AllRooms;
