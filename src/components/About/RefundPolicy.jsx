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

const RefundPolicy = () => {
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
            <SubHeader title="Refund Policy" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="w-full text-center m-0">
                        <div className='section-title text-center'>
                        </div>
                        <p className='mt-3'>
                            <ol>
                                <li>
                                    1. Appointment Booking Refunds
                                    Cancellation by the Patient:
                                    If you cancel your appointment at least 24 hours before the scheduled time, a full refund will be issued to your original payment method.
                                    Cancellations made within 24 hours of the appointment time are non-refundable.
                                    Rescheduling Appointments:
                                    You can reschedule your appointment free of charge at least 24 hours in advance. For rescheduling requests within 24 hours of the appointment, a rescheduling fee may apply.
                                </li>
                                <li>
                                    2. Hospital-Initiated Cancellations
                                    If the hospital cancels your appointment due to unforeseen circumstances, you will be offered a full refund or the option to reschedule at no extra cost.
                                </li>
                                <li>
                                    3. No-Show Policy
                                    Refunds will not be provided for missed appointments without prior cancellation or rescheduling.
                                </li>
                                <li>
                                    4. Payment Disputes
                                    If you believe you have been charged in error, please contact our billing team within 7 business days at [email address/phone number]. Refunds for disputed charges will be processed after verification.
                                </li>
                                <li>
                                    5. Processing Time
                                    Refunds will typically be processed within 5-7 business days. The actual time may vary depending on your payment provider.
                                </li>
                            </ol>
                        </p>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default RefundPolicy