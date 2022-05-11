import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { auth, provider, signInWithPopup } from "./firebase";
import logo from './logo.png';
export default function SignUp() {
    const navigate = useNavigate(); 
    const [error,setError] = useState('');
    function signUp(authD){
      signInWithPopup(auth, provider)
  .then((result) => {
    navigate('/dashboard')
  }).catch((error) => {
    setError(error.code)
  });
    }
    return (
      <>
        <div>
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">Sign in to Envisage</h2>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-gradient-to-r p-1 from-blue-400 to-green-500 rounded-lg">
            <div className="bg-black text-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="space-y-6">
                <img 
                src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-page-1886582-1598253.png"
                />
                <div>
                  <button
                    type="submit"
                    className="flex items-center w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={()=>{signUp()}}
                  >
                    <svg height={15} viewBox="0 0 488 512" fill="white" className="mr-3">
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                    Sign in with Google
                  </button>
                </div>
                <div className="mt-1 text-red-800 text-center">
                  {error}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
  