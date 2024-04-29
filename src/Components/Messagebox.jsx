import { useState } from 'react';
import { auth, db, storage } from "../../firebase"; 
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import send from './Images/sent.png';
import add from './Images/add-image.png';


const Messagebox = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]); 
      setImageUri(imageUrl);
    }
  };

  const handleImageUpload = async () => {
    if (!image) return; 
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    return getDownloadURL(storageRef);
  };

  const sendMessage = async (imageUrl) => {
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      imageUrl,
    });
    setMessage("");
    setImage(null)

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim() && !image) {
      alert("Enter valid message or select an image");
      return;
    }

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await handleImageUpload();
      }
      await sendMessage(imageUrl);
      setImageUri(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      {imageUri && <img src={imageUri} alt="Selected" className="w-[3rem] h-[3rem] rounded-md mr-2" />}
      <input id="imageSet" type="file" className="hidden" accept="image/*" onChange={handleImageSelect} />
      <label htmlFor="imageSet" className="border-0 rounded-l-full bg-[#292b2a]">
        <img src={add} className="h-[2rem] w-[2rem] ml-4 mt-3 mr-1 hover:transform hover:scale-110" alt="" />
      </label>

      <input
        className="p-4 w-[70vw] md:w-[60vw] sm:w-[50vw] outline-none border-0 bg-[#292b2a] text-white"
        id="messageInput"
        name="messageInput"
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" className="border-0 rounded-r-full bg-[#292b2a]">
        <img src={send} className="h-[2rem] w-[2rem] mr-4 invert hover:transform hover:scale-110" alt="" />
      </button>
    </form>
  );
};

export default Messagebox;
