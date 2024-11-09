import React, { useEffect, useRef, useState } from 'react';
import styles from "./chatAssiatance.module.css";

export const VideoCall = ({ socket, roomId, toggleVideoCall, notification }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [peerConnection, setPeerConnection] = useState(null);

    useEffect(() => {
        const connection = new RTCPeerConnection();
        const setupConnection = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;

            stream.getTracks().forEach((track) => connection.addTrack(track, stream));

            connection.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('ice-candidate', { roomId, candidate: event.candidate });
                }
            };

            connection.ontrack = (event) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };

            setPeerConnection(connection);

            // Send initial offer
            const offer = await connection.createOffer();
            await connection.setLocalDescription(offer);
            socket.emit('offer', { roomId, offer });

        };
        setupConnection();
        // Socket event handlers
        socket.on('offer', async (offer) => {
            await connection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await connection.createAnswer();
            await connection.setLocalDescription(answer);
            socket.emit('answer', { roomId, answer });
        });

        socket.on('answer', async (answer) => {
            await connection.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on('ice-candidate', async (candidate) => {
            await connection.addIceCandidate(new RTCIceCandidate(candidate));
        });


        // Cleanup on component unmount
        return () => {
            socket.off('offer');
            socket.off('answer');
            socket.off('ice-candidate');
            peerConnection?.close();

        };
    }, [socket, roomId]);


    return (<>
        <div className='shadow'></div>
        <div className="flex flex-col justify-center items-center fixed left-[5%] right-[5%] top-[10%] md:left-[25%] md:top-[10%] bg-black/90 p-[20px] rounded md:max-h-[50%] max-h-[100%] gap-4 md:w-1/2" style={{ zIndex: "100" }}>
            <div className="flex-[1]">
                <div className="flex flex-row gap-2 p-2 bg-orange-300 rounded-3 items-center blue-button">
                    <div>
                        <h2 className="center text-white">Video Call</h2>
                    </div>
                    <div>
                        <h2 className="mb-0 text-[15px]">Room ID: {roomId}</h2>
                    </div>
                </div>
            </div>

            <div className={`flex flex-col flex-[1] md:flex-row gap-[10px] relative items-center max-w-[100%] overflow-hidden ${notification ? 'pb-5  md:pb-10' : ''}`} >
                <div className="rounded-4 md:w-1/2 m-4" >
                    <video className="relative w-full max-h-full object-contain shadow-[0px_0px_16px_white]" ref={localVideoRef} autoPlay muted ></video>
                </div>
                <div className="rounded-4 md:w-1/2 m-4">
                    <video className="relative w-full max-h-full object-contain shadow-[0px_0px_16px_white]" ref={remoteVideoRef} autoPlay playsInline alt="remote"></video>
                </div>
                {
                    <div className={styles['notification']} style={notification ? { opacity: '1' } : { opacity: '0' }}>
                        <p>{notification}</p>
                    </div>
                }
            </div>
            <div className="flex-[1]">
                <button className="red-button" onClick={toggleVideoCall}>Stop Video Call</button>
            </div>
        </div>

    </>
    );
};


export default VideoCall;
