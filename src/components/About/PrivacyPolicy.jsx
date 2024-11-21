import React from 'react'
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import SubHeader from '../Shared/SubHeader';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { Empty, message } from 'antd';
import { Link } from 'react-router-dom';
import { truncate } from '../../utils/truncate';
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';

const PrivacyPolicy = () => {
    const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 4 });
    const { data: doctorData, isLoading: DoctorIsLoading, isError: doctorIsError } = useGetDoctorsQuery({ limit: 4 });

    const blogData = data?.blogs;
    const doctors = doctorData?.doctors;

    let doctorContent = null;
    if (!DoctorIsLoading && doctorIsError) doctorContent = <div>Something Went Wrong !</div>
    if (!DoctorIsLoading && !doctorIsError && doctors?.length === 0) doctorContent = <div><Empty /></div>
    if (!DoctorIsLoading && !doctorIsError && doctors?.length > 0) doctorContent =
        <>
            {doctors && doctors.map((item, id) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={id + item.id}>
                    <div className="card shadow border-0 mb-5 mb-lg-0">
                        {item.img && <img src={item.img} class="img-fluid w-100" alt="" />}
                        <div className="p-2">
                            <h4 className="mt-4 mb-0" style={{ color: '#223a66' }}><a>{item?.firstName + ' ' + item?.lastName}</a></h4>
                            <p>{item?.designation}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>

    let content = null;
    if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && blogData?.length === 0) content = <Empty />
    if (!isLoading && !isError && blogData?.length > 0) content =
        <>
            {
                blogData && blogData?.map((item, id) => (
                    <div className="col-lg-3 col-md-6" key={id + item.id}>
                        <div className="card shadow border-0 mb-5 mb-lg-0">
                            <img src={item?.img} alt="blog Image" width={300} height={200} className="w-100  rounded-top image-hover" style={{ objectFit: 'contain' }} />

                            <div className='p-2'>
                                <Link to={`/blog/${item?.id}`}>
                                    <h6 className="text-start mb-1 text-capitalize" style={{ color: '#223a66' }}>{truncate(item?.title, 40)}</h6>
                                </Link>
                                <div className="px-2">
                                    <p className="form-text text-start text-capitalize">{truncate(item?.description, 80)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <>
            <Header />
            <SubHeader title="Privacy Policy" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="w-full text-center m-0">
                        <div className='section-title text-center'>
                        </div>
                        <div>
                            <ol>
                                <li>
                                    1. Information We Collect
                                    When you use our appointment booking services, we may collect:

                                    Personal details: Name, contact information, and date of birth.
                                    Medical information: Reason for visit and any required medical history.
                                    Payment information: Credit/debit card details, UPI IDs, or other payment methods.
                                </li>
                                <li>
                                    2. How We Use Your Information
                                    To schedule and confirm appointments.
                                    To communicate with you regarding your booking or follow-ups.
                                    For billing and payment processing.
                                    To improve our services and provide personalized healthcare recommendations.
                                </li>
                                <li>
                                    3. Sharing Your Information
                                    We do not share your personal information with third parties, except:

                                    With healthcare professionals involved in your treatment.
                                    For legal compliance or in response to a court order.
                                    With payment processors for billing purposes.
                                </li>
                                <li>
                                    4. Data Security
                                    We implement industry-standard measures to protect your information from unauthorized access, theft, or loss. However, no system can guarantee complete security.
                                </li>
                                <li>
                                    5. Your Rights
                                    You can:

                                    Request access to the personal information we hold about you.
                                    Request corrections or updates to your data.
                                    Request deletion of your data (subject to legal and regulatory requirements).
                                </li>
                                <li>
                                    6. Cookies and Tracking
                                    We use cookies to enhance user experience and monitor site performance. You can disable cookies in your browser settings if desired.
                                </li>
                                <li>

                                    7. Contact Us
                                    For questions about this policy or data protection, contact us at:

                                    Email: ashutoshth456@gmail.com
                                    Phone: +9876543210

                                </li>
                            </ol>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default PrivacyPolicy