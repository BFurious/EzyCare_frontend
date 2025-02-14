import React, { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const MeetScheduler = () => {
    const [meetLink, setMeetLink] = useState('');

    const startAuthFlow = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("authorization token: ", tokenResponse);
            try {
                const response = await axios.post('http://localhost:5050/meet', tokenResponse, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                setMeetLink(data);
            } catch (error) {
                console.error('Failed to create meeting:', error);
            }
        },
        onError: (error) => {
            console.error('Auth Error:', error);
        },
        flow: 'auth-code', // Use authorization code flow
        scope: 'https://www.googleapis.com/auth/calendar',
        state: JSON.stringify({ role: "patient" }), // Pass role as state
        redirect_uri: "https://ezy-care-backend.vercel.app/oauth/callback", // Add this line
    })

    return (
        <div className='blue-button' style={{ fontSize: "1.2em" }}>
            <button onClick={startAuthFlow}>Create Online Meeting</button>

            {meetLink && (
                <div className="meet-info">
                    <p>Meeting Link: <a href={meetLink} target="_blank">{meetLink}</a></p>
                </div>
            )}
        </div>
    );
};

// Wrap in GoogleOAuthProvider at root level
const SetCalendarEvent = () => (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "381501017707-l2i1r1p1vfue4rg782dl8apopdet9bvv.apps.googleusercontent.com"} >
        <MeetScheduler />
    </GoogleOAuthProvider>
);

export default SetCalendarEvent;