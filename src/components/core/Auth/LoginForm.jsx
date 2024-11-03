import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-8 flex w-full flex-col gap-y-4 mx-auto"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] sm:text-[1rem] leading-[1.375rem] text-richblack-600 ">
          Email Address <sup className="text-pink-200 font-bold">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-400 p-[12px] text-richblack-5 outline-none focus:ring focus:ring-pink-200"
        />
      </label>
      <label className="relative w-full">
        <p className="mb-1 text-[0.875rem] sm:text-[1rem] leading-[1.375rem] text-richblack-600">
          Password <sup className="text-pink-200 font-bold">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            appearance: "none",
            '::-ms-reveal': { display: 'none' }
          }}
          className="w-full rounded-[0.5rem] bg-richblack-400 p-[12px] pr-12 text-richblack-5 outline-none focus:ring focus:ring-pink-200"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password" className="block sm:inline">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 hover:text-blue-200 transform transition-all duration-300">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] text-sm sm:text-base font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-300"
      >
        Sign In
      </button>
      
      <p
        className="text-blue-400 text-[13px] font-semibold mx-auto transform translate-y-5 hover:cursor-pointer hover:text-blue-500"
        onClick={() => navigate("/signup")}
      >
        New to MesserBit? Create an account
      </p>
    </form>
  )
}

export default LoginForm