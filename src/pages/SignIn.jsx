import { useState } from "react";
import {toast} from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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

const onChange = (e)=>{
  setFormData((prevState)=> ({
    ...prevState,
    [e.target.id]: e.target.value,
  }))
};

const onSubmit = async (e) => {
  e.preventDefault();
  try {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
   toast.success("Welcome Back",{
      autoClose: 1000,
      theme: "colored"
    })
  if(userCredential.user){
    navigate('/');
  };
  } catch (error) {
    toast.error('Bad User Credentials',{
      autoClose: 1000,
      theme: "colored"
    });
  }
}

  return (
    <>
     <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Welcome Back!
        </p>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>
          <div className="passwordInputDiv">
            <input type={showPassword? "text" : "password"} className="passwordInput" placeholder="Password" id="password" value={password} onChange={onChange}/>
            <img src={visibilityIcon} className="showPassword" alt="show Password" onClick={()=> setShowPassword(!showPassword)}/>
          </div>
          <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password?</Link>
          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <img src={Arrow} alt="sign in button"/>
            </button>
          </div>
        </form>
        <Link to="/sign-up" className="registerLink">Sign Up Instead</Link>
      </header>
     </div>
    </>
  )
}

export default SignIn
