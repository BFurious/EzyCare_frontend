import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from "./chatAssiatance.module.css";

const SERVER_ENDPOINT = "https://ezy-care-backend.vercel.app/";

// const SERVER_ENDPOINT = "http://localhost:5050";

const socket = io(SERVER_ENDPOINT,{
   transports: ['polling', 'websocket']
  }); // Replace with your server URL

const ChatAssistant = ({ data, content, avatar, toogleChatAssitantActive }) => {
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState(''); // For storing the user identity

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });

    return () => {
      socket.off('message'); // Clean up the listener on component unmount
      // socket.disconnect(); // Disconnect the socket
      setMessage([]); // Clear chat messages
    };
  }, []);

  const createRoom = () => {
    socket.emit('createRoom', {}, ({ roomId }) => {
      setRoomId(roomId);
      setUserId(socket.id);
      console.log(`Room created with ID: ${roomId}`);
    });
  };

  const joinRoom = () => {
    const roomId = prompt('Enter your guest ID to join the room:');
    socket.emit('joinRoom', { roomId }, (response) => {
      if (response.error) {
        alert(response.error);
      } else {
        setUserId(socket.id);
        setRoomId(roomId);
        console.log('Joined room successfully');
      }
    });
  };

  const sendMessage = () => {
    socket.emit('message', { roomId, message });
    setMessage('');
  };

  const disconnectSocket = () => {
    socket.disconnect();
    setRoomId('');
    toogleChatAssitantActive(false); // Close the chat assistant window
  }
  const handleEnterKey = (event) => {
    event.preventDefault(); // Prevent default behavior of the Enter key
    sendMessage(); // Call sendMessage function
  };

  return (
    <div className={styles['chat-container']}>
      {roomId && <h2>Room ID: {roomId}</h2>}
      <div className='flex flex-row w-full align-iten-center justify-content-center gap-2'>
        <div>
          <button className="mb-2 hover:bg-teal-600 p-2 bg-green-500 rounded-2xl flex-[1]" onClick={createRoom}>Create Room</button>
        </div>
        <div>
          <button className="mb-2 hover:bg-teal-600 p-2 bg-yellow-500 rounded-2xl flex-[1]" onClick={joinRoom}>Join Room</button>
        </div>
        <div>
          <button className="mb-2 hover:bg-teal-600 p-2 bg-red-500 rounded-2xl flex-[1]" onClick={disconnectSocket}>close</button>
        </div>
      </div>
      <div className={styles['chat-box']}>
        {chat.map((c, index) => (
            c.sender === userId ? (
              <li key={index} className='list-none'>
                <div className='flex flex-row justify-center items-center gap-1 flex-[1]'>
                  <div className='profileImage'>
                    <img src={data?.img ? data?.img : avatar} alt="" className="profileImage shadow img-fluid" />
                  </div>
                  <div className="bg-linear-gradient-45-teal-blue-transparent p-3 rounded-5 flex-[2]">
                    <p>{c.message}</p>
                  </div>
                </div>
                </li>
               ) :
              (
                <li key={index} className='list-none '>
                  <div className='flex flex-row-reverse items-center justify-content-center gap-1 flex-[1]'>
                    <div className='profileImage flex-[1]'>
                      <img src={data?.img ? data?.img : avatar} alt="" className="profileImage shadow img-fluid" />
                    </div>
                    <div className="bg-linear-gradient-45-teal-blue-transparent p-3 rounded-5 flex-[2]">
                      <p>{c.message}</p>
                    </div>
                  </div>
                </li>
              )
        ))}
      </div>
      <div className={styles['input-container']}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => { e = e.key === 'Enter' ? handleEnterKey(e) : null }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatAssistant;
