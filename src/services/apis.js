const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledRooms",
}

// USERS ENDPOINTS
// export const studentEndpoints = {
//     COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
//     COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
//     SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
//   }

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_ROOM_API: BASE_URL + "/room/getAllRooms",
    ROOM_DETAILS_API: BASE_URL + "/course/getRoomDetails",
    EDIT_ROOM_API: BASE_URL + "/course/updateRoom",
    // ROOM_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_ROOM_API: BASE_URL + "/course/createRoom",
    // CREATE_SECTION_API: BASE_URL + "/course/addSection",
    // CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    // UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    // UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    // GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses", ******** GET OWNER ROOMS DETAILS ********
    // DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    // DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_ROOM_API: BASE_URL + "/course/deleteRoom",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    // LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}


// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_REQUEST_PROFILE_API: BASE_URL + "/profile/deleteProfileRequest",
    DELETE_REQUEST_APPROVE_API: BASE_URL + "/profile/deleteProfile",
}

// OWNER PAGE API
export const ownerEndpoints = {
    CREATE_OWNER_API: BASE_URL + "/room/createOwner",
    GET_ALL_OWNERS_API: BASE_URL + "/room/getAllOwner",
    GET_ALL_OWNER_BY_PHONE_API: BASE_URL + "/room/getOwnerByPhone",
    CREATE_ROOM_API: BASE_URL + "/room/createRoom",
    GET_ALL_ROOM_API: BASE_URL + "/room/getAllRooms",
    GET_ROOM_DETAILS_API: BASE_URL + "/room/getRoomDetails",
    ENROLL_USER_API: BASE_URL + "/room/userEnrolled",
}