import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const isCurrentUser = message.uid === user?.uid;

  return (
    <div className={`font-monospace mb-2 ${isCurrentUser ? 'mr-3 text-right' : 'ml-3'}`}>

      {!isCurrentUser && (
        <p className="text-[15px] text-gray-400">{message.name}</p>
      )}

      <div className="flex space-x-3">
        {!isCurrentUser && (
          <img className="h-10 w-10 border-0 rounded-full" src={message.avatar} alt="user avatar" />
        )}
        {
          message.imageUrl?(<img className={`max-h-60 bg-[#292b2a] text-white border-0 rounded-md p-3 ${isCurrentUser ? 'ml-auto ' : ''}`} src={message.imageUrl}/>)
          :
          (<p className={`bg-[#292b2a] text-white border-0 rounded-full p-3 ${isCurrentUser ? 'ml-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ' : ''}`}>{message.text}</p>)
        }
        
      </div>
      

    </div>
  );
};

export default Message;
