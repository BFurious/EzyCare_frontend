import React, { useEffect, useRef, useState } from 'react';

export const VideoCall = ({ socket, roomId, toggleVideoCall }) => {
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
        <div className='fixed flex flex-column justify-center items-center w-1/2 h-1/2 top-1/3 p-[10px]' style={{ background: "white", zIndex: "100" }}>
            <div>
                <h2 className='center'>Video Call</h2>
            </div>
            <div className='flex flex-row flex-[1] gap-[10px] relative'>
                <video className='relative flex-[1]' style={{ width: "250px", height: "200px" }} ref={localVideoRef} autoPlay playsInline muted></video>
                <video className='relative flex-[1]' style={{ width: "250px", height: "200px" }} ref={remoteVideoRef} autoPlay playsInline alt="sdfsd"></video>
            </div>
            <div>
                <button className="red-button" onClick={toggleVideoCall}>Stop Video Call</button>
            </div>
        </div>
    </>
    );
};


export default VideoCall;
