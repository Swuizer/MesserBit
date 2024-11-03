import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaWifi } from "react-icons/fa6";
import { IoIosWater } from "react-icons/io";
import { MdCleaningServices, MdElectricBolt, MdFamilyRestroom } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { CgGirl } from "react-icons/cg";
import { getAllRooms } from '../../../../../services/operations/RoomAPI';
import { useNavigate, useParams } from 'react-router-dom';


const AllRooms = () => {

    const { location } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rooms } = useSelector((state) => state.room);

    useEffect(() => {
        // Fetch data if rooms are empty on initial page load or if the location changes
        dispatch(getAllRooms(location));
    }, [dispatch, location]);  // Updated dependencies to include `location`
    

  return (
    <>
        {!rooms ? (
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className="spinner"></div>
            </div>
        ) : (!rooms.length ? (
                <>
                    <h2 className='text-richblack-400 text-2xl mt-32 text-center font-semibold'>No Mess Room Found in that Location</h2>
                    <p className='text-richblack-400 text-sm mt-1 text-center font-semibold'>Our services available in <span>Barasat, Madhyamgram and Barrackpur</span></p>
                </>  
            ) : (
                <div className="max-w-7xl mt-11 mx-auto px-4 py-8">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {rooms.map((room) => (
                            <div
                                key={room._id}
                                className="bg-white relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 w-[280px] min-h-[400px] will-change-transform flex flex-col"
                            >
                                {/* Display only the first image */}
                                <div className="relative">
                                    <img
                                        src={room.images[0]}  // Displaying the first image from the array
                                        alt={room.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute bottom-2 right-2 z-50">
                                        {room.roomType === "Male" ? (
                                            <GrUserManager className="bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full"/>
                                        ) : room.roomType === "Female" ? (
                                            <CgGirl className="bg-gradient-to-br from-[#9dbffb] to-[#1d8ef7] text-white text-2xl px-1 py-1 rounded-full"/>
                                        ) : room.roomType === "Family" ? (
                                            <MdFamilyRestroom className="bg-gradient-to-br from-[#f7d377] to-[#f78e1d] text-white text-2xl px-1 py-1 rounded-full"/>
                                        ) : room.roomType === "Male & Female" ? (
                                            <>
                                                <GrUserManager className="bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full mb-1"/>  
                                                <CgGirl className="bg-gradient-to-br from-[#9dbffb] to-[#1d8ef7] text-white text-2xl px-1 py-1 rounded-full"/>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                
                                <div className="p-4 flex-grow">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        {room.roomName}
                                    </h2>
                                    <p className="text-pure-greys-600 mb-1">Location: {room.location.city}</p>
                                    <div>
                                        <p className="flex text-sm flex-wrap gap-2">
                                            {room.wifi && (
                                                <span className="text-richblack-400 flex gap-1">
                                                    Free Wifi <FaWifi className="text-caribbeangreen-300 font-bold translate-y-[2px]"/>
                                                </span>
                                            )}
                                            {room.water && (
                                                <span className="text-richblack-400 flex gap-1">
                                                    Free Water <IoIosWater className="text-blue-100 font-bold translate-y-1"/>
                                                </span>
                                            )}
                                            {room.electricBill && (
                                                <span className="text-richblack-400 flex gap-1">
                                                    Free Electric Bill <MdElectricBolt className="text-blue-200 font-bold translate-y-1"/>
                                                </span>
                                            )}
                                            {room.roomCleaning && (
                                                <span className="text-richblack-400 flex gap-1">
                                                    Free Room Cleaning <MdCleaningServices className="text-yellow-200 font-bold translate-y-1"/>
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <p className="text-richblack-800 mb-3">Price: {room.price}</p>
                                    <button 
                                        onClick={() => navigate(`/allRooms/${location}/getRoomDetails/${room._id}`)}
                                        className="px-4 py-2 bg-blue-500 text-richblack-5 rounded-lg hover:bg-blue-600 transition w-11/12"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        )  
        }
    </>
  );
};

export default AllRooms;

// rooms.length > 0 ? (
    // <div className="max-w-7xl mt-11 mx-auto px-4 py-8">
    // {/* <h1 className="text-3xl font-bold text-center mb-8">Available Rooms</h1> */}
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //     {rooms.map((room) => (
    //     <div
    //         key={room._id}
    //         className="bg-white relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 w-[280px] min-h-[400px] will-change-transform flex flex-col"
    //     >
            
    //         {/* Display only the first image */}
    //         <div className='relative'>
    //             <img
    //             src={room.images[0]}  // Displaying the first image from the array
    //             alt={room.name}
    //             className="w-full h-48 object-cover"
    //             />
    //             <div className='absolute bottom-2 right-2 z-50'>
    //                 {
    //                     room.roomType === "Male" ? (
    //                         <>
    //                             <GrUserManager className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full'/>
    //                         </>
    //                     ) : (
    //                         <>
    //                             {
    //                                 room.roomType === "Female" ? (
    //                                     <>
    //                                         <CgGirl className='bg-gradient-to-br from-[#9dbffb] to-[#1d8ef7] text-white text-2xl px-1 py-1 rounded-full'/>
    //                                     </>
    //                                 ) : (
    //                                     <>
    //                                       {
    //                                         room.roomType === "Family" ? (
    //                                             <>
    //                                                 <MdFamilyRestroom className='bg-gradient-to-br from-[#f7d377] to-[#f78e1d] text-white text-2xl px-1 py-1 rounded-full'/>
    //                                             </>
    //                                         ) : (
    //                                             <>
    //                                                 {
    //                                                    room.roomType === "Male & Female" ? (
    //                                                     <>
    //                                                       <GrUserManager className='bg-gradient-to-br from-[#f58d61] to-[#fd4632] text-white text-2xl px-1 py-1 rounded-full mb-1'/>  
    //                                                       <CgGirl className='bg-gradient-to-br from-[#9dbffb] to-[#1d8ef7] text-white text-2xl px-1 py-1 rounded-full'/>
    //                                                     </>
    //                                                    ) : ""
    //                                                 }
    //                                             </>
    //                                         )
    //                                       }  
    //                                     </>
    //                                 )
    //                             }
    //                         </>
    //                     )
    //                 }
    //             </div>
    //         </div>
            
    //         <div className="p-4 flex-grow">
    //             <h2 className="text-xl font-semibold text-gray-800 mb-2">
    //                 {room.roomName}
    //             </h2>
    //             <p className="text-pure-greys-600 mb-1">Location: {room.location.city}</p>
    //             <div>
    //                 <p className='flex text-sm flex-wrap gap-2'>
    //                     {room.wifi ? (
    //                         <p className='text-richblack-400 flex gap-1'>
    //                             Free Wifi <FaWifi className='text-caribbeangreen-300 font-bold translate-y-[2px]'/>
    //                         </p>
    //                     ) : ""}
    //                     {room.water ? (
    //                         <p  className='text-richblack-400 flex gap-1'>
    //                             Free Water <IoIosWater className='text-blue-100 font-bold translate-y-1'/>
    //                         </p>
    //                     ): ""}
    //                     {room.electricBill ? (
    //                         <p  className='text-richblack-400 flex gap-1'>
    //                             Free Electric Bill <MdElectricBolt className='text-blue-200 font-bold translate-y-1'/>
    //                         </p>
    //                     ): ""}
    //                     {room.roomCleaning ? (
    //                         <p  className='text-richblack-400 flex gap-1'>
    //                             Free Room Cleaning <MdCleaningServices className='text-yellow-200 font-bold translate-y-1'/>
    //                         </p>
    //                     ): ""}
    //                 </p>
    //             </div>
    //             <p className="text-richblack-800 mb-3">Price: {room.price}</p>
    //             <button 
    //                 onClick={() => {
    //                     // dispatch(getRoomDetails(room._id));
    //                     // navigate("/allRooms/getRoomDetails");
    //                     navigate(`/allRooms/${location}/getRoomDetails/${room._id}`);
    //                 }}
    //                 className="px-4 py-2 bg-blue-500 text-richblack-5 rounded-lg hover:bg-blue-600 transition w-11/12"
    //             >
    //                 View Details
    //             </button>
    //         </div>
    //     </div>
    //     ))}
    // </div>
    // </div>
// ) : (
//     <>
//         <h2 className='text-richblack-400 text-2xl mt-32 text-center font-semibold'>No Mess Room Found in that Location</h2>
//         <p className='text-richblack-400 text-sm mt-1 text-center font-semibold'>Our services available in <span>Barasat, Madhyamgram and Barrackpur</span></p>
//     </>
// )
