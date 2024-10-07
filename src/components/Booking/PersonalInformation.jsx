import { Checkbox, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthCheck from '../../redux/hooks/useAuthCheck';

const PersonalInformation = ({ handleChange, selectValue, setCurrentPatientData, patientId }) => {
    const { firstName, lastName, email, phone, reasonForVisit, description, address } = selectValue;
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const onChange = (e) => {
        setChecked(e.target.checked);
    };
    
    useEffect(() =>{
        if(checked){
            if(patientId){
                setCurrentPatientData(!checked);
                message.success("User Has Found !")
            }else{
                message.error("User is not Found, Please Login!")
                navigate('/login');
            }
        } else{
            setCurrentPatientData(!checked);
        }
    }, [checked, patientId])

    return (
        <form className="rounded p-3 mt-5" style={{ background: "#f8f9fa" }}>
            <div className="row">
                <Checkbox checked={checked} onChange={onChange}>
                    Use Current Account Details ?
                </Checkbox>

                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>First Name</label>
                        <input onChange={(e) => handleChange(e)} name='firstName' value={firstName && firstName} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Last Name</label>
                        <input onChange={(e) => handleChange(e)} name='lastName' value={lastName && lastName} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Email</label>
                        <input onChange={(e) => handleChange(e)} name='email' value={email && email} className="form-control" type="email" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Phone</label>
                        <input onChange={(e) => handleChange(e)} name='phone' value={phone && phone} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Reason For Visit</label>
                        <textarea rows={8} onChange={(e) => handleChange(e)} name='reasonForVisit' value={reasonForVisit && reasonForVisit} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Description</label>
                        <textarea rows={8} onChange={(e) => handleChange(e)} name='description' value={description && description} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Address</label>
                        <input onChange={(e) => handleChange(e)} name='address' value={address && address} className="form-control" type="text" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PersonalInformation;