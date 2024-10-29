import loginImg from "../assets/Images/login.png"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back to "
      title2="MesserBit"
      description1="Discover the perfect place to stay "
      description2="with ease and convenience."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login