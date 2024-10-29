import React from 'react'
import bg from "../assets/Images/Background.png";
import { FiHome, FiDollarSign, FiSearch } from 'react-icons/fi'; // Feather icons
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getAllRooms } from '../services/operations/RoomAPI';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { rooms } = useSelector((state) => state.room)

  const {
      register,
      handleSubmit,
      formState: {errors},
  } = useForm();

  const submitOwnerForm = async (data) => {
    try{
      dispatch(getAllRooms(data));
      navigate("/allRooms");
    } catch(error) {
      console.log("Owner Creation Error Message- ", error.message);
    }
  }

  return (
    <div>
        {/* Section 1 */}
        <div className="relative bg-cover bg-center h-[80vh] text-white flex justify-center items-center" style={{ backgroundImage: `url(${bg})` }} >
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-90"></div>
          <div className="text-center absolute"> {/* Wrap your content in a div for centering */}
            <h1 className="text-4xl font-bold mb-4 text-brown-600">Find Your Ideal Mess Room</h1>
            <p className="text-xl text-brown-600">Search for Mess rooms in your preferred location within your budget.</p>

            <form onSubmit={handleSubmit(submitOwnerForm)} className="flex justify-center items-center mt-3 w-full max-w-xl mx-auto">
              <label className="w-full">
                <input
                  required
                  type="text"
                  // name="location"
                  // value={location}
                  // onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search by City"
                  className="form-style w-full px-4 py-3 rounded-md outline-none text-richblack-600"
                  {...register("location", { required: true })}
                />
                {errors.location && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please Enter a Location.
                    </span>
                )}
              </label>
              <button
                type="submit"
                className="ml-2 rounded-[8px] bg-brown-600 py-[12px] px-[16px] font-medium text-richblack-5 hover:bg-brown-700 transition-all duration-300"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Section 2    ]*/}
        <div className='py-12 bg-[#f7f5f2] text-center text-4xl'> 
          <div className='max-w-[1200px] w-[90%] mx-auto'>
            <h2 className='text-[#5C4033] font-bold'>
              Find the Perfect Mess Room, <span className='text-[#B87D4B] font-bold'>Hassle-Free</span>.
            </h2>
          </div>
        </div>

        {/* <div className='py-12 bg-[#ecf0f1] text-center text-4xl'> 
          <div className='max-w-[1200px] w-[90%] mx-auto'>
            <h2 className='text-[#2c3e50] font-bold'>
              Find the Perfect Room, <span className='text-[#e74c3c] font-bold'>Hassle-Free</span>.
            </h2>
          </div>
        </div> */}

        {/* Section 3 */}
        <section className="py-16 bg-gradient-to-r from-[#f7f7f7] to-[#fff] text-center">
          <div className="max-w-[1200px] w-[90%] mx-auto">
            <h3 className="text-4xl font-bold text-[#5c4033] mb-12">
              Why Choose <span className="text-[#d68c5d]">MesserBit</span>?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="benefit-item bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <FiHome size={48} className="text-[#d68c5d]" /> {/* Home icon */}
                </div>
                <h4 className="text-2xl font-bold text-[#5c4033] mb-4">Wide Range of Rooms</h4>
                <p className="text-[#7f8c8d]">Explore a vast selection of mess rooms in different locations.</p>
              </div>

              {/* Card 2 */}
              <div className="benefit-item bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <FiDollarSign size={48} className="text-[#d68c5d]" /> {/* Dollar icon */}
                </div>
                <h4 className="text-2xl font-bold text-[#5c4033] mb-4">Affordable Prices</h4>
                <p className="text-[#7f8c8d]">Find rooms that suit your budget without compromising quality.</p>
              </div>

              {/* Card 3 */}
              <div className="benefit-item bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <FiSearch size={48} className="text-[#d68c5d]" /> {/* Search icon */}
                </div>
                <h4 className="text-2xl font-bold text-[#5c4033] mb-4">Simple Process</h4>
                <p className="text-[#7f8c8d]">Easily search, filter, and book the best room for you.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Section 4 */}

    </div>
  )

  // return (
  //   <>
  //         <div>
  //           {/* Section 1 */}
  //           <div className="relative bg-cover bg-center h-[80vh] text-white flex justify-center items-center" style={{ backgroundImage: `url(${bg})` }} >
  //            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-90"></div>
  //            <div className="text-center absolute"> {/* Wrap your content in a div for centering */}
  //              <h1 className="text-4xl font-bold mb-4 text-brown-600">Find Your Ideal Mess Room</h1>
  //              <p className="text-xl text-brown-600">Search for Mess rooms in your preferred location within your budget.</p>

  //              <form onSubmit={handleSubmit(submitOwnerForm)} className="flex justify-center items-center mt-3 w-full max-w-xl mx-auto">
  //                <label className="w-full">
  //                  <input
  //                 required
  //                 type="text"
  //                 // name="location"
  //                 // value={location}
  //                 // onChange={(e) => setLocation(e.target.value)}
  //                 placeholder="Search by City"
  //                 className="form-style w-full px-4 py-3 rounded-md outline-none text-richblack-600"
  //                 {...register("location", { required: true })}
  //               />
  //               {errors.location && (
  //                   <span className="-mt-1 text-[12px] text-yellow-100">
  //                       Please Enter a Location.
  //                   </span>
  //               )}
  //                 </label>
  //                 <button
  //                   type="submit"
  //                   className="ml-2 rounded-[8px] bg-brown-600 py-[12px] px-[16px] font-medium text-richblack-5 hover:bg-brown-700 transition-all duration-300"
  //                 >
  //                   Search
  //                 </button>
  //               </form>
  //             </div>
  //           </div>

  //           {/* Section 2    ]*/}
  //           <div className='py-12 bg-[#f7f5f2] text-center text-4xl'> 
  //             <div className='max-w-[1200px] w-[90%] mx-auto'>
  //               <h2 className='text-[#5C4033] font-bold'>
  //                 Find the Perfect Mess Room, <span className='text-[#B87D4B] font-bold'>Hassle-Free</span>.
  //               </h2>
  //             </div>
  //           </div>

  //           {/* <div className='py-12 bg-[#ecf0f1] text-center text-4xl'> 
  //             <div className='max-w-[1200px] w-[90%] mx-auto'>
  //               <h2 className='text-[#2c3e50] font-bold'>
  //                 Find the Perfect Room, <span className='text-[#e74c3c] font-bold'>Hassle-Free</span>.
  //               </h2>
  //             </div>
  //           </div> */}

  //           {/* Section 3 */}
  //           <section className="py-16 bg-gradient-to-r from-[#f7f7f7] to-[#fff] text-center">
  //             <div className="max-w-[1200px] w-[90%] mx-auto">
  //               <h3 className="text-4xl font-bold text-[#5c4033] mb-12">
  //                 Why Choose <span className="text-[#d68c5d]">MesserBit</span>?
  //               </h3>

  //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  //                 {/* Card 1 */}
  //                 <div className="benefit-item bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
  //                   <div className="flex justify-center mb-4">
  //                     <FiHome size={48} className="text-[#d68c5d]" /> {/* Home icon */}
  //                   </div>
  //                   <h4 className="text-2xl font-bold text-[#5c4033] mb-4">Wide Range of Rooms</h4>
  //                   <p className="text-[#7f8c8d]">Explore a vast selection of mess rooms in different locations.</p>
  //                 </div>

  //                 {/* Card 2 */}
  //                 <div className="benefit-item bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
  //                   <div className="flex justify-center mb-4">
  //                     <FiDollarSign size={48} className="text-[#d68c5d]" /> {/* Dollar icon */}
  //                   </div>
  //                   <h4 className="text-2xl font-bold text-[#5c4033] mb-4">Affordable Prices</h4>
  //                   <p className="text-[#7f8c8d]">Find rooms that suit your budget without compromising quality.</p>
  //                 </div>

  //                 {/* Card 3 */}
  //                 <div className="benefit-item bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
  //                   <div className="flex justify-center mb-4">
  //                     <FiSearch size={48} className="text-[#d68c5d]" /> {/* Search icon */}
  //                   </div>
  //                   <h4 className="text-2xl font-bold text-[#5c4033] mb-4">Simple Process</h4>
  //                   <p className="text-[#7f8c8d]">Easily search, filter, and book the best room for you.</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </section>


  //           {/* Section 4 */}

  //         </div>
  //   </>
  // )
}

export default Home