import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Upload from './Upload';
import { useLocation } from "react-router-dom"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { createRoom } from '../../../../../services/operations/RoomAPI';


const AddRoom = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const { room, editRoom } = useSelector((state) => state.room);

    
    const onSubmit = async (data) => {
        const ownerId = location.pathname.split("/").at(-1);
        dispatch(createRoom(token, data, ownerId));
    }

  return (
    <div>
        <h1 className='text-richblack-5 text-2xl text-center mt-10'>Add Room</h1>
        <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data" 
            className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
            >
            {/* Room Name */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="roomName">
                Room Name <sup className="text-pink-200">*</sup>
                </label>
                <input
                id="roomName"
                placeholder="Enter Room Name"
                {...register("roomName", { required: true })}
                className="form-style w-full"
                />
                {errors.roomName && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Room Name is required
                </span>
                )}
            </div>
            {/* Room About */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="about">
                About <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                id="about"
                placeholder="Enter About"
                {...register("about", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.about && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    About is required
                </span>
                )}
            </div>
            {/* Room Price */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="price">
                    Price <sup className="text-pink-200">*</sup>
                </label>
                <div className="relative">
                <input
                    id="price"
                    placeholder="Enter Room Price"
                    {...register("price", {
                    required: true,
                    valueAsNumber: true,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                    })}
                    className="form-style w-full !pl-12"
                />
                <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                </div>
                {errors.price && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Price is required
                </span>
                )}
            </div>
             {/* Room Type */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="roomType">
                Room Type <sup className="text-pink-200">*</sup>
                </label>
                <select
                    id="roomType"
                    className="form-style w-full"
                    defaultValue="Male"
                    {...register("roomType", { required: true })}
                >
                    <option value="" disabled>
                        Choose a Room Type
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Family">Family</option>
                    <option value="Male & Female">Male & Female</option>
                </select>
                {errors.roomType && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Room Type is required
                </span>
                )}
            </div>
            {/* Location */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="location">
                Location <sup className="text-pink-200">*</sup>
                </label>
                <input
                id="location"
                placeholder="Enter Location"
                {...register("location", { required: true })}
                className="form-style w-full"
                />
                {errors.location && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Location is required
                </span>
                )}
            </div>
            {/* Availability */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="availability">
                    Availability <sup className="text-pink-200">*</sup>
                </label>
                <input
                    id="availability"
                    type="tel"
                    placeholder="Enter availability count"
                    {...register("availability", { required: true, valueAsNumber: true })}
                    className="form-style w-full"
                />
                {errors.availability && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Availability count is required
                    </span>
                )}
            </div>
            {/* Wifi */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="wifi">
                    Wifi <sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="checkbox"
                    id="wifi"
                    {...register("wifi")}
                />
            </div>

            {/* Water */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="water">
                    Water <sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="checkbox"
                    id="water"
                    {...register("water")}
                />
            </div>

            {/* Electric Bill */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="electricBill">
                    Electric Bill <sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="checkbox"
                    id="electricBill"
                    {...register("electricBill")}
                />
            </div>

            {/* Room Cleaning */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="roomCleaning">
                    Room Cleaning <sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="checkbox"
                    id="roomCleaning"
                    {...register("roomCleaning")}
                />
            </div>
            {/* Course Thumbnail Image */}
            <Upload
                name="images"
                label="Room Thumbnails"
                register={register}
                setValue={setValue}
                errors={errors}
                multiple={true} // Explicitly setting multiple to true
                editData={editRoom ? room?.thumbnails : null}
            />

            {/* Submit Button */}
            <div className="flex justify-end gap-x-2">
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddRoom