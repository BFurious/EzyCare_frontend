import { useEffect, useState } from 'react';
import './index.css';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import TopHeader from '../TopHeader/TopHeader';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../images/logo.png';
import avatar from '../../../images/avatar.jpg';
import { Button, message } from 'antd';
import { loggedOut } from '../../../service/auth.service';
import HeaderNav from './HeaderNav';
import ChatAssistant from '../Assistant/chatAssistant';
import { useRole } from '../../Login/RoleCheck'
import { notAllowdedDoctor } from '../../../constant/role';

const Header = () => {
    const navigate = useNavigate();
    const { authChecked, data } = useAuthCheck();
    const [isLoggedIn, setIsLogged] = useState(false);
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [chatAssistantActive, setChatAssistantActive] = useState(false);
    const { userRole, setRole } = useRole();
    // const lastScrollRef = useRef(0);
    const handleScroll = () => {
        const currentScroll = window.scrollY;
        // if (currentScroll > lastScrollRef.current) { // Undo scroll up effect
        if (currentScroll > 50) {
            setShow(false);
        } else {
            setShow(true);
        }
        // lastScrollRef.current = currentScroll;
    }
    useEffect(() => {
        authChecked && setIsLogged(true)
        window.addEventListener('scroll', handleScroll);
        return (() => window.removeEventListener('scroll', handleScroll));
    }, [authChecked]);

    const hanldeSignOut = () => {
        loggedOut(setRole);
        message.success("Successfully Logged Out");
        setIsLogged(false);
        navigate('/login');
    }

    const content = (
        <div className='nav-popover'>
            <div className='my-2'>
                <h5 className='text-capitalize'>{data?.firstName + ' ' + data?.lastName}</h5>
                <p className='my-0'>{data?.email}</p>
                <Link to="/dashboard">
                    <button className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 w-100 text-white font-bold rounded py-1'>
                        Dashboard
                    </button>
                </Link>
            </div>
            <Button className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 w-100 text-white font-bold rounded py-1' onClick={hanldeSignOut}>
                Log Out
            </Button>
        </div >
    );
    return (
        <>
            <div className={`navbar navbar-expand-lg navbar-light ${!show && "hideTopHeader"}`} expand="lg">
                <TopHeader />
            </div>
            <header id="header" className={`fixed-top ${!show && "stickyHeader"}`}>
                <div className="container d-flex align-items-center">

                    <Link to={'/'} className="logo me-auto">
                        <img src={img} alt="" className="img-fluid" />
                    </Link>
                    <HeaderNav isLoggedIn={isLoggedIn} data={data}
                        avatar={avatar} content={content} open={open} setOpen={setOpen} userRole={userRole} />

                    {!notAllowdedDoctor.includes(userRole) && <Link to={'/appointment'} className="blue-button font-bold appointment-btn scrollto"><span className="d-none d-md-inline">Make an</span> Appointment</Link>
                    }
                    {!notAllowdedDoctor.includes(userRole) &&
                        <span
                            className="blue-button font-bold appointment-btn scrollto"
                            style={{ display: `${chatAssistantActive ? "none" : "block"}` }}
                            onClick={(e) => setChatAssistantActive(!chatAssistantActive)}>
                            ChatAssistant
                        </span>
                    }
                </div>
            </header>
            <div className={`chat-container ${chatAssistantActive ? 'active p-[10px] border-2 border-blue-200 border-solid' : 'notActive'}`}>
                <ChatAssistant
                    isLoggedIn={true}
                    data={{ someData: 'example' }}
                    avatar="avatar.png"
                    content="Hello, how can I assist you today?"
                    toggleChatAssistantActive={setChatAssistantActive}
                />
            </div>
        </>
    )
}

export default Header