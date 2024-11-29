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

const Terms = () => {
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
            <SubHeader title="Terms & Conditions" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="w-full m-0">
                        <div className='section-title text-center'>
                        </div>
                        <ol>
                            <li>
                                1. Introduction
                                <p>Welcome to EzyCare website. By accessing and using our services, you agree to be bound by the following terms and conditions. These terms govern the use of our website, including the appointment booking system, payment processing, and any other features or services offered.</p>

                            </li>
                            <li>
                                2. Scope of Services
                                <p>
                                    The website is designed to allow patients to:
                                    Book, modify, or cancel appointments with healthcare professionals.
                                    Make payments for appointments or other medical services.
                                    Access related services such as consultation history or follow-up details.
                                </p>
                            </li>
                            <li>
                                3. User Responsibilities
                                <p> Eligibility:</p>
                                <p>
                                    The platform is available to individuals aged 18 years or older. For minors, a parent or guardian must complete the booking process on their behalf.
                                    Accurate Information:
                                    Users must provide accurate personal, contact, and medical details when booking appointments. False or incomplete information may result in the cancellation of services.
                                    Account Security:
                                    Users are responsible for maintaining the confidentiality of their account login credentials and for all activities performed under their account.
                                </p>
                            </li>
                            <li>
                                4. Appointment Booking
                                <p>
                                    Confirmation of Appointments:
                                </p>
                                <p>
                                    Appointments are confirmed only upon successful payment. Users will receive an email or SMS confirmation containing the appointment details.
                                    Scheduling and Availability:
                                    Appointment times are subject to the availability of the healthcare professional.
                                    The hospital reserves the right to reschedule or cancel appointments due to unforeseen circumstances.
                                </p>
                            </li>
                            <li>
                                5. Payment Terms
                                <p>
                                    Accepted Payment Methods:
                                </p>
                                <p>
                                    Payments can be made via credit/debit cards, UPI, net banking, or other options provided on the website.
                                    Payment Confirmation:
                                    Users must ensure that payment is successfully processed. The hospital is not responsible for failed transactions caused by technical errors or insufficient funds.
                                    Receipts:
                                    Upon successful payment, users will receive a payment receipt via email or SMS.
                                </p>
                            </li>
                            <li>
                                6. Cancellation and Refund Policy
                                <p> Patient Cancellations:
                                </p>
                                <p>
                                    Cancellations made at least 24 hours before the appointment are eligible for a full refund.
                                    No refunds will be provided for cancellations made within 24 hours of the appointment or for no-shows.
                                    Hospital Cancellations:
                                    If the hospital cancels an appointment, users will receive a full refund or the option to reschedule.
                                    Refund Processing:
                                    Refunds will be processed within 5-7 business days to the original payment method.
                                    Disputes:
                                    Any payment-related disputes must be reported within 7 days by contacting our billing team.
                                    For detailed information, refer to our Refund Policy.
                                </p>
                            </li><li>
                                7. Privacy Policy
                                <p>By using this website, you agree to our data collection and usage practices.</p>

                                <p>Data Collection:</p>
                                <p>Personal and medical data is collected to facilitate appointment booking, payment processing, and service improvement.
                                    Data Sharing:
                                    Information will only be shared with authorized personnel involved in your care or for legal compliance.
                                    Data Security:
                                    We implement security measures to protect your data but cannot guarantee complete security against cyber threats.
                                    For detailed information, refer to our Privacy Policy.</p>
                            </li>
                            <li>
                                8. Limitation of Liability
                                <p>The hospital is not liable for any damages resulting from:
                                    Errors or interruptions in the website's operation.
                                    Delays or failures in appointment confirmations caused by third-party systems.
                                    Unauthorized access to your account due to user negligence.
                                    In no event will the hospital's liability exceed the amount paid by the user for the affected appointment.</p>
                            </li>
                            <li>
                                9. Prohibited Activities
                                <p>Users must not:</p>
                                <p>Use the website for fraudulent activities or unauthorized transactions.
                                    Attempt to hack, disable, or disrupt the website’s services.
                                    Misuse the appointment system to block slots or create dummy bookings.</p>
                            </li>
                            <li>
                                10. Modification of Terms
                                <p>
                                    The hospital reserves the right to update these Terms and Conditions at any time.
                                    Users will be notified of significant changes via email or website announcements. Continued use of the website implies acceptance of the updated terms.
                                </p>
                            </li>
                            <li>
                                11. Governing Law
                                <p>These Terms and Conditions are governed by the laws of India. Any disputes arising out of these terms will be resolved in courts located in New Delhi.</p>
                            </li>
                            <li>
                                12. Contact Information
                                <p>For any queries or concerns regarding these Terms and Conditions, you may contact us:</p>
                                <ul>

                                    <li>Email: ashutoshth456@gmail.com</li>
                                    <li>Phone: +919876543210</li>
                                    <li>Address: Kunwar singh nagar</li>
                                </ul>
                            </li>
                        </ol>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default Terms