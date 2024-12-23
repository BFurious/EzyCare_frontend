import React, { useEffect } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { showSlides, changeSlide } from "../../../utils/slideshow";

const HeroSection = () => {
    useEffect(() => {
        const timer=setTimeout(() => { showSlides(); }, 10);
    }, []);
    return (
        <section id="hero" className="d-flex align-items-center">
            <div id="gallery-container-1" className="gallery-container">
                <div className="slideshow">
                    <div className="slide slide1 active">
                    </div>
                    <div className="slide slide2">
                    </div>
                    <div className="slide slide3">
                    </div>
                    <div className="slide slide4">
                    </div>

                    <div className="gallery-navigation" id="gallery-navigation-1"></div>
                </div>
                <button className="prev-btn" onClick={(e) => changeSlide(-1, 'gallery-container-1')}>&#10094;</button>
                <button className="next-btn" onClick={(e) => changeSlide(1, 'gallery-container-1')}>&#10095;</button>
                <div className="overlay"></div>
                <div className="hero-content">
                        <p className=''>TOTAL HEALTH CARE SOLUTION</p>
                        <h1 className="heading"></h1>
                        <p className=''></p>
                        <div className="d-flex justify-content-center gap-2">
                            <Link to={'/doctors'} className="btn-get-started  scrollto">Get Started</Link>
                            <Link to={'/track-appointment'} className="btn-get-started  scrollto">Track Appointment</Link>
                        </div>
                </div>
            </div>
        </section>
    )
}
export default HeroSection;