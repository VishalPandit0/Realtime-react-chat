import React from "react"
import Navbar from "./Components/Navbar"
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Chatbox from "./Components/Chatbox";
import Welcome from "./Components/welcome";


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      {!user ? <Welcome /> : <Chatbox />}
    </div>
  )
}

export default App
