import {useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom';
import {updateDoc, doc} from 'firebase/firestore';
import {db} from "../firebase.config";
function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email} = formData

const navigate = useNavigate();
  function onLogout() {
    auth.signOut();
    navigate('/')
  }

  const onSubmit = async ()=>{
   try {
    if(auth.currentUser.displayName !== name){
      //update display name
      await updateProfile(auth.currentUser, {
        displayName: name
      })
      // update in firestore
      const useRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(useRef, {
        name
      })
       toast.success("Changes Saved",{
      autoClose: 1000,
      theme: "colored"
    })
    }
   } catch (error) {
     toast.error("Error Updating Details",{
      autoClose: 1000,
      theme: "colored"
    })
   }
  }

  const onChange = (e)=>{
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
  <div className='profile'>
    <header className="profileHeader">
      <p className="pageHeader">My Profile Dashboard</p>
      <button type='button' className="logOut" onClick={onLogout}>
        Logout
      </button>
    </header>
    <main>
      <div className="profileDetailHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={()=>{
          changeDetails && onSubmit()
          setChangeDetails((prevState)=> !prevState)
        }}>
          {changeDetails ? 'Done' : 'Change'}
        </p>
      </div>
      <div className="profileCard">
        <input type="text" id="name" className={!changeDetails? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange}/>
         <input type="text" id="email" className={!changeDetails? 'profileEmail' : 'profileEmailActive'} disabled={!changeDetails} value={email} onChange={onChange}/>
      </div>
    </main>
  </div>
  )
}

export default Profile
