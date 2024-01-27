import React from 'react'
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";



const welcome = () => {

  const [user] = useAuthState(auth);
  const year = new Date().getFullYear();

  return (
    <div className='bg-yellow-200 h-[100vh] flex flex-col justify-center items-center '>
      <div className='text-6xl font-monospace font-bold mt-[auto] '>
        Welcome to Talkies
      </div>
      <div className='text-1xl font-semibold font-monospace mt-3'>
        Sign In with google to continue chatting
      </div>
      <footer className='text-1xl font-monospace mt-auto flex '>
      <p>
          Copyright &#169; {year} - <a /* have to add href */>Vishal Pandit</a>.
        </p>
          <p>
          &nbsp; Any suggestions to site, feel free to make a pull request on <a /* have to add href */ >Github</a> .   
          </p>
      </footer>
    </div>
  )
}

export default welcome
