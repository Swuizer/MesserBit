import React from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast"
import { useForm } from 'react-hook-form';
import { createOwner } from '../../../../services/operations/RoomAPI'


export default function AddOwner() {

    const { token } = useSelector((state) => state.auth)
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const submitOwnerForm = async (data) => {
        try{
            dispatch(createOwner(token, data));
        } catch(error) {
            console.log("Owner Creation Error Message- ", error.message);
        }
    }

    return  (
        <>
            <div className='w-6/12 mx-auto overflow-x-hidden mt-10'>
                <h1 className='text-richblack-5 text-center text-2xl'>Add Owner</h1>
                <form onSubmit={handleSubmit(submitOwnerForm)} className="flex w-full flex-col gap-y-4 text-sm">
                    {/* Name */}
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-600">
                        Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        type="text"
                        // name="name"
                        // value={name}
                        placeholder="Enter your name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-400 p-[12px] text-richblack-5 outline-none"
                        {...register("name", { required: true })}
                        />
                        {errors.name && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your name.
                            </span>
                        )}
                    </label>

                    {/* Phone */}
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-600">
                        Phone Number <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        type="tel"
                        // name="phone"
                        // value={phone}
                        placeholder="Enter your phone number"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-400 p-[12px] text-richblack-5 outline-none"
                        {...register("phone", { required: true })}
                        />
                        {errors.phone && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your phone number.
                            </span>
                        )}
                    </label>

                    {/* Government ID */}
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-600">
                        Government ID <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        type="text"
                        // name="govtId"
                        // value={govtId}
                        placeholder="Enter your government ID"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-400 p-[12px] text-richblack-5 outline-none"
                        {...register("govtId", { required: true })}
                        />
                        {errors.govtId && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your GovtId.
                            </span>
                        )}
                    </label>

                    {/* Location */}
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
                            Please enter your Location.
                            </span>
                        )}
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                        Submit
                    </button>
                </form>

            </div>
        </>
    )
}



// const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     govtId: "",
//     location: "",
// });

// const { name, phone, govtId, location } = formData;

// const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//         ...prevData,
//         [e.target.name]: e.target.value,
//     }));
// };

// const handleOnSubmit = async (e) => {
//     e.preventDefault();

//     toast.success("Dispatching..");
//     // Dispatch or perform further actions here
//     dispatch(createOwner(token, formData));
//     navigate("/dashboard/my-profile");

//     // Reset form data after submission
//     setFormData({
//         name: "",
//         phone: "",
//         govtId: "",
//         location: "",
//     });
// };