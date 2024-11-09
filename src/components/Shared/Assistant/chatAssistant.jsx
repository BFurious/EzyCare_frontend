import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from "./chatAssiatance.module.css";
import { MdClose, MdVideoCall, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { VideoCall } from './videoCall.jsx';
const SOCKET_SERVER_ENDPOINT = process.env.REACT_APP_SOCKET_SERVER_ENDPOINT;

let socket;

const ChatAssistant = ({ data, content, avatar, toggleChatAssistantActive }) => {
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [notification, setNotification] = useState('');
  const [videoCall, setVideoCall] = useState(false);
  const [maximizeChatBox, toggleMaximizeChatBox] = useState(false);
  const [userId, setUserId] = useState(''); // For storing the user identity
  const chatEndRef = useRef(null);
  let timer;

  const handleNotifaction = (message) => {
    setNotification("");
    clearTimeout(timer);
    setNotification(message);
    timer = setTimeout(() => {
      setNotification("");
    }, 3000);
  }

  useEffect(() => {

    socket = io(SOCKET_SERVER_ENDPOINT, {
      transports: ['polling', 'websocket']
    });
    // Listen for incoming messages
    socket.on('message', (message) => {
      if (message?.['notification']) {
        handleNotifaction(message['notification']);
      } else {
        if (message !== chat[0]) {
          setChat((prevChat) => {
            return [...prevChat, message]
          });
          if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });

    return () => {
      socket.off('message'); // Clean up the listener on component unmount
      socket.disconnect(); // Disconnect the socket
    };
  }, []);

  const createRoom = () => {
    socket.emit('createRoom', (response) => {
      if (response.error) {
        handleNotifaction(response.error);
      } else {
        setRoomId(response.roomId);
        setUserId(socket.id);
        setChat([]);
        setNotification(`Room created with ID: ${response.roomId}`);
      }
    });
  };

  const joinRoom = () => {
    const roomId = prompt('Enter your guest ID to join the room:');
    socket.emit('joinRoom', { roomId }, (response) => {
      if (response.error) {
        handleNotifaction(response.error);
      } else {
        setUserId(socket.id);
        setRoomId(roomId);
        setChat([]);
        handleNotifaction('Joined room successfully');
      }
    });
  };

  const sendMessage = () => {
    socket.emit('message', { roomId, message });
    setMessage('');
  };

  const disconnectSocket = () => {
    socket.disconnect();
    setVideoCall(false);
    toggleChatAssistantActive(false); // Close the chat assistant window
  }

  const leaveRoom = () => {
    setVideoCall(false);
    socket.emit('leaveRoom', { roomId }, (response) => {
      if (response.error) {
        handleNotifaction(response.error);
      } else {
        handleNotifaction('Left room successfully');
        setRoomId('');
        setChat([]);
      }
    });
  }

  const toggleVideoCall = () => {
    setVideoCall((videoCall) => { return !videoCall });
  }

  const handleEnterKey = (event) => {
    event.preventDefault(); // Prevent default behavior of the Enter key
    sendMessage(); // Call sendMessage function
  };

  return (
    <>
      {!videoCall &&
        <div>
          {roomId &&
            <div className='flex flex-row justify-center gap-2 my-[10px]'>
              <div className='absolute top-1 p-2 bg-orange-300 rounded-3 items-center '>
                <h2 className='mb-0 text-[15px]'>Room ID: {roomId}</h2>
              </div>
              <div className='absolute right-0 top-0'>
                <button className="mb-2 hover:bg-red-600 p-2 bg-red-400 rounded-3 flex-[1] text-[15px]" onClick={leaveRoom}><MdClose /></button>
              </div>
            </div>
          }
          <div className={styles['chat-box-container']} style={{ height: maximizeChatBox ? "460px" : "" }}>
            <div className={styles['chat-box']} style={{ height: maximizeChatBox ? "420px" : "" }}>
              <div className={styles['scroll-content']}>
                {chat.map((c, index) => (
                  c.sender === userId ? (
                    <li key={index} className='list-none w-full flex justify-end my-[6px]'>
                      <div className='flex flex-row-reverse items-center gap-1 flex-[1]' style={{ maxWidth: '75%' }}>
                        <div className='profileImage'>
                          <img src={data?.img ? data?.img : avatar} alt="" className="profileImage img-fluid" />
                        </div>
                        <div className="bg-gradient-to-r from-pink-500 to-orange-500  p-3 rounded-5 flex-[2] flex justify-end max-w-fit">
                          <p>{c.message}</p>
                        </div>
                      </div>
                    </li>
                  ) :
                    (
                      <li key={index} className='list-none  flex justify-start my-[5px]' >
                        <div className='flex flex-row items-center gap-1 flex-[1]' style={{ maxWidth: '75%' }}>
                          <div className='profileImage'>
                            <img src={data?.img ? data?.img : avatar} alt="" className="profileImage img-fluid" />
                          </div>
                          <div className="bg-linear-gradient-45-teal-blue-transparent p-3 rounded-5 flex-[2] max-w-fit">
                            <p>{c.message}</p>
                          </div>
                        </div>
                      </li>
                    )
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
            {
              <div className={styles['notification']} style={notification ? { opacity: '1' } : { opacity: '0' }}>
                <p>{notification}</p>
              </div>
            }
          </div>
          {!roomId &&
            <div className='flex flex-row w-full align-iten-center justify-content-center gap-2'>

              <div>
                <button className="green-button flex-[1]" onClick={createRoom}>Create Room</button>
              </div>
              <div>
                <button className="orange-button flex-[1]" onClick={joinRoom}>Join Room</button>
              </div>
              <div className='absolute right-0 top-0'>
                <button className="mb-2 red-button p-2 bg-red-400 rounded-3 flex-[1] text-[15px]" onClick={disconnectSocket}><MdClose /></button>
              </div>
            </div>
          }
          <div className='absolute left-0 top-0'>
            <button
              className="maximize mb-2 teal-button p-2 bg-red-400 rounded-3 flex-[1] text-[15px]"
              onClick={(e) => toggleMaximizeChatBox((currentState) => { return !currentState; })}>
              {maximizeChatBox ? <MdFullscreenExit /> : <MdFullscreen />}
            </button>

          </div>

          <div className={`${styles['input-container']} mt-[10px] flex gap-[10px]`}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { e = e.key === 'Enter' ? handleEnterKey(e) : null }}
              placeholder="Type a message..."
              className='rounded-3 border-2 border-blue-700 border-dotted focus:border-purple-700 focus:outline-none'
            />
            <button className="blue-button" onClick={sendMessage}>Send</button>
            {roomId &&
              <button className="pink-button" onClick={toggleVideoCall}><MdVideoCall className='text-lg' /></button>
            }
          </div>
        </div>
      }
      {videoCall && <VideoCall socket={socket} roomId={roomId} toggleVideoCall={toggleVideoCall} notification={notification} handleNotifaction={handleNotifaction} />}
    </>
  );
};

export default ChatAssistant;
