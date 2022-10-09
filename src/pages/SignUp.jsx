import { useState } from "react";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {toast} from "react-toastify"
import {db} from '../firebase.config'
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import Arrow from "../assets/svg/keyboardArrowRightIcon.svg";
import OAuth from "../Components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
const {name, email, password} = formData;
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
    //* get auth
    const userCredential = await createUserWithEmailAndPassword(auth,email,password);
    toast.success("Welcome", {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    });
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
      displayName: name
    })

    const formDataCopy = {...formData};
    //!get the copy of the form FORMDATA state.
    // delete formDataCopy.password
    //!DELETE the password because we dont want the password saved
    formDataCopy.timestamp = serverTimestamp();
    await setDoc(doc(db, 'users', user.uid), formDataCopy)


    navigate('/');
  } catch (error) {
    toast.error("Error With Registration", {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    });
    console.error(error);
  }
}

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password?
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
             <img src={Arrow} alt="sign in button"/>
            </button>
          </div>
        </form>

        <OAuth />

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp
