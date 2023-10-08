import {useState} from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify';

function ForgotPassword() {
  return (
    <div>
      <h1>Forgot Password</h1>
      <Logo/>
    </div>
  )
}

export default ForgotPassword
