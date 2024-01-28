import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar"
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (

    <div className='bg-[#0b0f0d] min-h-screen flex flex-col'>
      <Navbar message={messages}/>
      <div className='font-monospace font-bold text-white mb-2 bg-[#292b2a] flex flex-col items-center justify-center'>
        <p className="mt-3">{`Welcome 👋 to Talkies, ${auth.currentUser.displayName}`}</p>
        <p className="mb-3 mx-2 xs:text-[13px] md:text-[16px]">Share thoughts and connect with us in real-time 😊</p>
      </div>
      <div className="flex-grow ">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <span ref={scroll}></span>
      </div>
      <footer className='mt-auto mb-3 font-monospace w-full flex justify-center'>
        <Messagebox />
      </footer>
    </div>
  );
}

export default Chatbox;
