import signupImg from "../assets/Images/signup.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Find Your Perfect Mess with MesserBit "
      title2="Absolutely Free!"
      description1="Find your ideal living space effortlessly."
      description2="Your comfort and satisfaction are our priorities."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
