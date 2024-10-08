import React from 'react';
import './InfoPage.css';
import { FaClock, FaHeadset, FaHouseUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const InfoPage = () => {
    return (
        <section className="why-us mt-5 mt-md-0">
            <div className="container flex w-full gap-3">
                <div className="flex-[1]">
                    <div className="flip-card w-full h-full">
                        <div className="flip-card-inner !bg-linear-gradient-45-teal-blue transition-transform duration-700 ease-in-out transform-style-3d text-white rounded-xl">
                            {/* Front Side (Heading) */}
                            <div className="flip-card-front text-white">
                                <h3 className="text-2xl font-bold">Why Choose Us?</h3>
                            </div>
                            {/*  Back Side (Paragraph) */}
                            <div className="flip-card-back">
                                <p className="mb-4 text-white">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit. Asperiores dolores sed et.
                                </p>
                                <div className="text-center">
                                    <Link href="/" className="more-btn text-teal-500 hover:underline">Learn More <i className="bx bx-chevron-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-[2]">
                    <div className="icon-boxes flex w-full gap-3">
                        <div className="col-xl-4 d-flex align-items-stretch">
                            <div className="flip-card w-full h-full">
                                <div className="flip-card-inner transition-transform duration-700 ease-in-out transform-style-3d text-white">
                                    {/* Front Side (Heading) */}
                                    <div className="flip-card-front text-white">
                                        <FaHouseUser className="icon" />
                                        <h4>Appointment</h4>
                                    </div>
                                    {/*  Back Side (Paragraph) */}
                                    <div className="flip-card-back text-gray-900">
                                        <small className='secondary-text'>24/7 Hours Service</small>
                                        <p className="mb-4">Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 d-flex align-items-stretch">
                            <div className="flip-card w-full h-full">
                                <div className="flip-card-inner transition-transform duration-700 ease-in-out transform-style-3d text-white">
                                    {/* Front Side (Heading) */}
                                    <div className="flip-card-front text-white">
                                        <FaHeadset className="icon" />
                                        <h4>Emegency Cases</h4>
                                    </div>
                                    {/*  Back Side (Paragraph) */}
                                    <div className="flip-card-back text-gray-900">
                                        <h6 className='secondary-text'>+88 01751 040425</h6>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui facilis perferendis quia maxime. Laboru~m excepturi pariatur laboriosam nihil, dolor molestias.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 d-flex align-items-stretch">
                            <div className="flip-card w-full h-full">
                                <div className="flip-card-inner transition-transform duration-700 ease-in-out transform-style-3d text-white">
                                    {/* Front Side (Heading) */}
                                    <div className="flip-card-front text-white">
                                        <FaClock className="icon" />
                                        <h4>Working Hours</h4>
                                    </div>
                                    {/*  Back Side (Paragraph) */}
                                    <div className="flip-card-back text-gray-900">
                                        <small className='secondary-text'>Timing schedule</small>
                                        <ul className='list-group list-group-flush'>
                                            <li className="list-group-item d-flex justify-content-between text-nowrap" ><p>Sun - Wed : </p> <p>8:00 - 17: 00</p></li>
                                            <li className="list-group-item d-flex justify-content-between text-nowrap" ><p>Thus - Fri : </p> <p>9:00 - 17: 00</p></li>
                                            <li className="list-group-item d-flex justify-content-between text-nowrap" ><p>Sat - Sun : </p> <p>10:00 - 17: 00</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoPage