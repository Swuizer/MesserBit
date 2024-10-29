import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { approveDeleteRequest } from "../services/operations/SettingsAPI"; 

const DeleteProfile = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({
        action: "",
    });
    
    const { action } = formData;
    
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
    };

    const { token, loading } = useSelector((state) => state.auth)

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const requestId = location.pathname.split("/").at(-1); // Extract requestId from URL

        // Basic validation for action input
        if (action !== "Approved" && action !== "Rejected") {
          return alert("Action must be 'Approved' or 'Rejected'.");
        }

        dispatch(approveDeleteRequest(action, requestId, token)); // Dispatch the action requestId)
    };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-600">
            Approve or Reject Delete Request
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-400">
            Please select whether to approve or reject the request.
          </p>
          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[1.175rem] leading-[1.375rem] text-richblack-600">
                Action <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text" // You can toggle input visibility if required
                name="action"
                value={action}
                onChange={handleOnChange}
                placeholder="Enter 'Approved' or 'Rejected'"
                className="form-style w-full text-sm !pr-10 py-3 px-1 bg-richblack-400 rounded-[4px] outline-none text-white placeholder:text-richblack-50"
              />
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-800"
            >
              Submit Action
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-600">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteProfile