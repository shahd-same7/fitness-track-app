import React from 'react';
import logo from '../../../Assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Doctor = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  let url = '127.0.0.1:8000/api/users?id';
  let userID = undefined;

  const [formData, setFormData] = useState({
    user_id: id,
    clinic: '',
    license_number: '',
    tax_number: '',

    gender: '',
    owner: '',
    specialization: '',
    personal_id: '',
    personal_photo: '',
    national_id: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/doctor',
        formData
      );
      console.log('API response:', response.data);
      setSubmitting(false);
      setSubmitSuccess(true);
      navigate('/login');
    } catch (error) {
      console.error('Error submitting form:', error.response.data);
      setSubmitting(false);
      setSubmitError('An error occurred while submitting the form.');
    }
  };

  return (
    <div className=" container">
      <div className="hom">
        <div className="row">
          <div className="col">
            <div className="Signin ">
              <div className="header me-5">
                <img src={logo} /> <span className="sync">Sign Up</span>
              </div>
              <div className="row  d-flex justify-content-center">
                <div className="col-lg-6">
                  <form onSubmit={handleSubmit} action="" className="input">
                    <div className="inputs">Clinic Name</div>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="clinic"
                      value={formData.clinic}
                    />
                    <div className="inputs">License_number</div>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="license_number"
                      value={formData.license_number}
                    />
                    <div className="inputs">Tax Number</div>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="tax_number"
                      value={formData.tax_number}
                    />

                    <div className="inputs">Gender</div>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="gender"
                      value={formData.gender}
                    />

                    <div className="inputs">Specialization</div>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="specialization"
                      value={formData.specialization}
                    />
                    <div className="inputs">Clinc Logo</div>
                    <input
                      type="file"
                      accept="image/jpeg ,image/png, image/jpg"
                      onChange={handleChange}
                      value={formData.clinic_logo}
                    />

                    <div className="inputs">Personal ID</div>
                    <input
                      type="number"
                      name="personal_id"
                      value={formData.personal_id}
                      onChange={handleChange}
                    />
                    <div className="inputs">Personal Photo</div>
                    <input
                      type="file"
                      accept="image/jpeg ,image/png, image/jpg"
                      name="personal_photo"
                      value={formData.personal_photo}
                      onChange={handleChange}
                    />
                    <div className="inputs">National ID</div>
                    <input
                      type="file"
                      accept="image/jpeg ,image/png, image/jpg"
                      name="national_id"
                      value={formData.national_id}
                      onChange={handleChange}
                    />
                    <div className="inputs">Clinic Ownership (yes or no)</div>
                    <div className=" d-flex mx-2">
                      <label for="yes">Yes</label>
                      <input
                        type="radio"
                        name="owner"
                        value={'yes'}
                        onChange={handleChange}
                        id="yes"
                      />
                      <label for="no">No</label>

                      <input
                        type="radio"
                        name="owner"
                        value={'no'}
                        onChange={handleChange}
                        id="no"
                      />
                    </div>

                    <button className="submit btn" type="submit">
                      SignUp
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
