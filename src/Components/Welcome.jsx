import React from 'react'
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./Navbar"

const Welcome = () => {
  const [user] = useAuthState(auth);
  const year = new Date().getFullYear();

  return (
    <div className='bg-yellow-200 min-h-screen flex flex-col '>
      <Navbar/>
      <div className='flex-grow flex flex-col justify-center items-center'>
        <div className=' xs:text-3xl sm:text-4xl md:text-6xl font-monospace font-bold mt-10'>
          Welcome to Talkies
        </div>
        <div className='sm:text-2xl xs:text-sm  font-monospace mt-3'>
          Sign In with Google to continue chatting
        </div>
      </div>
      <footer className='text-1xl font-monospace  text-center md:flex md:justify-center'>
        <p>
          Copyright &#169; {year} - <a href="/">Vishal Pandit</a>.
        </p>
        <p>
          Any suggestions to the site, feel free to make a pull request on <a href="/">GitHub</a>.
        </p>
      </footer>
    </div>
  )
}

export default Welcome;
