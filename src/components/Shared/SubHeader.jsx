import React from 'react';
import bgImage from '../../images/img/banner.jpg'

const SubHeader = ({ title, subtitle }) => {
    const sectionStyle = {
        zIndex: -1,
        background: `url(${bgImage}) no-repeat 50% 50%`,
        backgroundSize: 'cover',
        position: 'relative',
        marginTop: '88px',
        padding: '120px 0px 70px 0px',
    };

    return (
        <section style={sectionStyle} className="about-us">
            <div className="overlay"></div>
            <div className="container position-relative">
                <div className="row">
                    <div className="col-md-12">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-white text-uppercase'>{title}</h2>
                            <p className='text-white m-0'>{subtitle && subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SubHeader;
