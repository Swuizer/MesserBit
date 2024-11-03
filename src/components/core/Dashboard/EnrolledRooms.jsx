import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUserEnrolledRooms } from '../../../services/operations/RoomAPI';

const EnrolledRooms = () => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [enrolledRooms, setEnrolledRooms] = useState(null);

    useEffect(() => {
        const fetchEnrolledRooms = async () => {
            try {
                const response = await getUserEnrolledRooms(token);
                setEnrolledRooms(response);
            } catch (error) {
                console.log("Unable to Fetch Enrolled Rooms");
            }
        };
        fetchEnrolledRooms();
    }, [token]);
    

  return (
    <div className='w-11/12 mx-auto mt-5'>
        <div className='text-xl md:text-2xl lg:text-3xl text-richblack-50'>Enrolled Rooms</div>
        {!enrolledRooms ? (
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className="spinner"></div>
            </div>
        ) : (!enrolledRooms.length ? (
            <p className='grid h-[10vh] w-full place-content-center text-richblue-5'>
                You have not enrolled in any Rooms yet.
                {/* TODO: Modify this Empty State */}
            </p>
            ) : (
                <div className='w-full md:w-10/12 mx-auto my-8 translate-x-[-5%]  text-richblack-5'>
                    {/* Heading */}
                    <div className='flex text-sm md:text-base lg:text-lg rounded-t-lg bg-richblack-500'>
                        <p className='w-[45%] px-3 md:px-5 py-3'>Room Name</p>
                        <p className='w-1/4 px-1 md:px-2 py-3'>Room Type</p>
                        <p className='flex-1 px-1 md:px-2 py-3'>Location</p>
                    </div>
                    {/* Room Names */}
                    {enrolledRooms.map((room, index, arr) => (
                        <div
                            className={`flex items-center border border-richblack-700 ${
                                index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                            }`}
                            key={index}
                        >
                            <div
                                className='flex w-[45%] cursor-pointer items-center gap-2 md:gap-4 px-3 md:px-5 py-3'
                                onClick={() => {
                                    navigate(
                                        `/allRooms/${room.location.city}/getRoomDetails/${room._id}`
                                    )
                                }}
                            >
                                <img
                                    src={room.images[0]}
                                    alt='room_img'
                                    className='h-10 w-10 md:h-14 md:w-14 rounded-lg object-cover'
                                />
                                <div className='flex max-w-xs flex-col gap-1 md:gap-2'>
                                    <p className='text-sm md:text-base font-semibold'>{room.roomName}</p>
                                    <p className='text-xs text-richblack-300'>
                                        {room.about.length > 50
                                           ? `${room.about.slice(0, 50)}...`
                                           : room.about }
                                    </p>
                                </div>
                            </div>
                            <div className='w-1/4 text-sm md:text-base px-1 md:px-2 py-3'>
                                {room?.roomType}
                            </div>
                            <div className='flex w-1/5 text-xs md:text-base flex-col gap-2 px-1 md:px-2 py-3'>
                                <p>{room.location.city}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )
        )}
    </div>
  )
}

export default EnrolledRooms