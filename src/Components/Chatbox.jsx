import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db,auth } from "../../firebase";
import Messagebox from './Messagebox'
import Message from "./Message";

const Chatbox = () => {

  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);
  

  return (
    <div className='bg-[#0b0f0d] h-[100vh] flex flex-col ' >

    <div className=' font-monospace font-bold text-white bg-[#292b2a] flex items-center justify-center '>
      <p>{`Welcome to Talkies ${auth.currentUser.displayName}`}</p>
    </div>
    <div>
    {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
    </div>
    <span ref={scroll}></span>
    <footer scroll={scroll} className=' mt-auto mb-3 font-monospace w-full flex justify-center '>
    <Messagebox/>
    </footer>
  </div>
  )
}

export default Chatbox
