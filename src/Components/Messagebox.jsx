import {React,useState} from 'react'
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import send from './Images/sent.png'


const Messagebox = () => {
  
  const [message, setMessage] = useState("");

  const sendMessage= async(event)=>{
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");

  }


  return (
    <form className=" flex" onSubmit={sendMessage}>
    <input className='p-4 w-[100vh] outline-none border-0 rounded-l-full bg-[#292b2a] text-white ' id="messageInput" name="messageInput" type="text" placeholder=" Message...  "
    value={message} onChange={(e) => setMessage(e.target.value)} />

    <button type='submit' className=' border-0 rounded-r-full bg-[#292b2a]'>
    <img src={send} className='h-[2rem] w-[2rem] mr-4 invert' alt="" />
    </button>
    </form>
  )
}

export default Messagebox
