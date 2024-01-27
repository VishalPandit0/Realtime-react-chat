import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Message = ({ message }) => {

  const [user] = useAuthState(auth);

  return (
    <div className="font-monospace mb-4 ml-3" >

      <p className="text-[15px] text-gray-400">{message.name}</p>

      <div className="flex space-x-3">   
      <img className="h-10 w-10 border-0 rounded-full" src={message.avatar} alt="user avatar" />
      <p  className="bg-[#292b2a] text-white  border-0 rounded-full p-3">{message.text}</p>
      </div>
     
    </div>
  );
};
export default Message;
