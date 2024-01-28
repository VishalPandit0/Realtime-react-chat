import {React , useState} from 'react'
import logo from '../Components/Images/logo-icon.png'
import goole from '../Components/Images/google-icon.png'
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const Navbar = () => {

  const [user] = useAuthState(auth);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    auth.signOut();
  };
  
  return (
    <div >
      <nav className='bg-[#464446e7]  flex justify-between items-center m-0 w-full font-monospace'>
        <a className='flex justify-between my-6 mr-0 ml-[5%] text-white ' href="/">
            <h1 className='text-3xl font-bold  mt-1 '>Talkies</h1>
            <img src={logo} alt="" />
        </a>

        {
          user?
        
        <button onClick={signOut} className='flex justify-between my-6 ml-0 mr-[5%]  p-3 text-white border border-white hover:bg-gray-400'>
        <div className='mt-1 font-2xl font-serif '>Sign Out</div>
        </button>
        :  
        <button onClick={googleSignIn} className='flex justify-between my-6 ml-0 mr-[5%] p-3 text-white border border-white hover:bg-gray-400'>
            <img className='mr-2 h-[2.2rem] ' src={goole} alt="" />
            <div className='mt-1 font-2xl xs:hidden md:block '>Sign  In With Google</div>
        </button>
        }


      </nav>
    </div>
  )
}

export default Navbar
