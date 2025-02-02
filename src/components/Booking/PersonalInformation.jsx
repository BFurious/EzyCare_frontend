import { Checkbox, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInformation = ({ handleChange, selectValue, setCurrentPatientData, patientId }) => {
    const { firstName, lastName, email, phone, reasonForVisit, description, address } = selectValue;
    const [checked, setChecked] = useState(false);
    const [isFocus, setIsFocus] = useState({});
    const navigate = useNavigate();
    const onChange = (e) => {
        setChecked(e.target.checked);
    };

    // Handle onFocus to set focus state
    const handleFocus = (e) => {
        const { name } = e.target;
        setIsFocus((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    // Handle onBlur to check if value is empty and reset focus
    const handleBlur = (e) => {
        const { name } = e.target;
        if (!selectValue[name]) {
            setIsFocus((prev) => ({
                ...prev,
                [name]: false,
            }));
        }
    };
    useEffect(() => {
        if (checked) {
            if (patientId) {
                setCurrentPatientData(!checked);
                message.success("User Has Found !")
            } else {
                message.error("User is not Found, Please Login!")
                navigate('/login');
            }
        } else {
            setCurrentPatientData(!checked);
        }
    }, [checked, patientId])

    return (
        <form className="rounded p-3 mt-5" style={{ background: "#f8f9fa" }}>
            <div className="row">
                <div className="w-full p-1 m-3">
                    <Checkbox checked={checked} onChange={onChange}>
                        Use Current Account Details ?
                    </Checkbox>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <input
                            name="firstName"
                            value={firstName && firstName}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={`${isFocus.firstName ? "" : "First Name"}`}
                            onChange={handleChange}
                            className="form-control"
                            type="text"
                        />
                        <label
                            className={` ${isFocus.firstName || firstName ? "focus" : ""}`} >
                            First Name *
                        </label>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label className={` ${isFocus.lastName || lastName ? "focus" : ""}`}>Last Name *</label>
                        <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={`${isFocus.lastName ? "" : "Last Name"}`}
                            onChange={(e) => handleChange(e)} 
                            name='lastName' 
                            value={lastName && lastName} 
                            className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label className={` ${isFocus.email || email ? "focus" : ""}`}>Email *</label>
                        <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={`${isFocus.email ? "" : "Email"}`}
                            onChange={(e) => handleChange(e)} name='email' 
                            value={email && email} 
                            className="form-control" type="email" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label className={` ${isFocus.phone || phone ? "focus" : ""}`}>Phone *</label>
                        <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={`${isFocus.phone ? "" : "Phone"}`}
                            onChange={(e) => handleChange(e)} 
                            name='phone' 
                            value={phone && phone} 
                            className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label className={` ${isFocus.reasonForVisit || reasonForVisit ? "focus" : ""}`}>Reason For Visit *</label>
                        <textarea rows={8}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={`${isFocus.reasonForVisit ? "" : "Reason For Visit"}`}
                            onChange={(e) => handleChange(e)} 
                            name='reasonForVisit' 
                            value={reasonForVisit && reasonForVisit} 
                            className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label className={` ${isFocus.description || description ? "focus" : ""}`} >Description</label>
                        <textarea rows={8}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={`${isFocus.description ? "" : "Description"}`}
                            onChange={(e) => handleChange(e)} 
                            name='description' 
                            value={description && description} 
                            className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label className={`${isFocus.address || address ? "focus" : ""}`}>Address</label>
                        <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={`${isFocus.address ? "" : "Address"}`}
                            onChange={(e) => handleChange(e)} 
                            name='address' 
                            value={address && address} 
                            className="form-control" type="text" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PersonalInformation;