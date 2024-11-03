// import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

// import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, title2, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center mt-12">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.400rem] md:text-[1.575rem] font-semibold leading-[2.375rem] text-richblack-500">
              {title} <span className="bg-gradient-to-br from-[#D97706] to-[#7C2D12] inline-block text-transparent bg-clip-text">{title2}</span>
            </h1>
            <p className="md:mt-4 text-[1rem] md:text-[1.125rem] leading-[1.625rem] mb-3">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>

            {formType === "signup" ? <SignupForm /> : <LoginForm />}
              
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={image}
              alt="User"
              width={558}
              height={504}
              loading="lazy"
              className="md:absolute md:-top-4 md:mt-10 md:right-4 md:z-10"
              onContextMenu={(e) => e.preventDefault()} // Disable right-click
              style={{
                pointerEvents: "none", // Prevent drag-and-drop
                userSelect: "none", // Prevent text/image selection
                touchAction: "none", // Disable gestures on touch devices
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template






