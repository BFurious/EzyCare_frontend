import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import log from '../../images/doc/info.svg';
import register from '../../images/doc/register.svg';
import SignIn from './SignIn';
import './SignInForm.css';
import SignUp from './SignUp';
import { message } from 'antd';
import { isLoggedIn } from '../../service/auth.service';
import { LoadingScreen } from '../Shared/LoadingScreen';

const SignInForm = () => {
    const [isSignUp, setSignUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
            message.success("Already Logged In");
        } else {
            setLoading(false);
        }
    }, [navigate])

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className={`${isSignUp ? "signin-signup-container sign-up-mode" : "signin-signup-container"}`}>
            <Link to="/">
                <span className="pageCloseBtn"><FaTimes /></span>
            </Link>
            <div className="forms-container">
                <div className="signIn-singUp">
                    <SignIn />
                    <SignUp setSignUp={setSignUp} />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3 className='text-white'>New here ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae quas magnam!</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(true)}>Sign Up</button>
                    </div>
                    <img src={`${log}`} alt="" className="pImg" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3 className='text-white'>One of us ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae quas magnam!</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(false)}>Sign In</button>
                    </div>
                    <img src={`${register}`} alt="" className="pImg" />
                </div>
            </div>
        </div>
    );
};

export default SignInForm;