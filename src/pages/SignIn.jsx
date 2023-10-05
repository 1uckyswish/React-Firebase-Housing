import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import Arrow from "../assets/svg/keyboardArrowRightIcon.svg";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
const {email, password} = formData;
const navigate = useNavigate();

const onChange = ()=>{

};

  return (
    <>
     <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Welcome Back!
        </p>
        <form>
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>
          <div className="passwordInputDiv">
            <input type={showPassword? "text" : "password"} className="passwordInput" placeholder="Password" value={password} onChange={onChange}/>
            <img src={visibilityIcon} className="showPassword" alt="show Password" onClick={()=> setShowPassword(!showPassword)}/>
          </div>
          <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password?</Link>
          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <img src={Arrow} alt="sign in button" fill="#fff"/>
            </button>
          </div>
        </form>
      </header>
     </div>
    </>
  )
}

export default SignIn
