import React, { useRef, useState } from 'react';
import logo from '../../../Assets/Images/logo.png';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Patient = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  let url = '127.0.0.1:8000/api/users?id';

  const [formData, setFormData] = useState({
    user_id: id,
    date_of_birth: '',
    gender: '',
    height: '',
    weight: '',
    muscles_percentage: '',
    total_body_fat: '',
    total_body_water: '',
    bmi: '',
    personal_id: '',
    personal_image: null,
    personal_id_front: null,
    personal_id_back: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log(name);
    console.log(files[0]);
    console.log(formData.personal_image);
    console.log(formData.personal_id_front);

    console.log(formData.personal_id_back);

    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Perform API call to submit form data
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/patient',
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
    <div className="container">
      <div className="hom">
        <div className="row">
          <div className="col">
            <div className="Signin">
              <div className="header">
                <img src={logo} alt="logo" />
                <span className="sync">Sign Up</span>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="input"
                  >
                    <input type="number" name="user_id" value={id} hidden />
                    <div className="inputs">Age</div>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                    />
                    <div className="inputs">Gender</div>
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    />
                    <div className="inputs">Height</div>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                    />
                    <div className="inputs">Weight</div>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                    <div className="inputs">Muscles percentage</div>
                    <input
                      type="number"
                      name="muscles_percentage"
                      value={formData.muscles_percentage}
                      onChange={handleChange}
                    />
                    <div className="inputs">Total Body Fat</div>
                    <input
                      type="number"
                      name="total_body_fat"
                      value={formData.total_body_fat}
                      onChange={handleChange}
                    />
                  </form>
                </div>
                <div className="col-lg-6">
                  <form onSubmit={handleSubmit} className="input">
                    <div className="inputs">Total Body Water</div>
                    <input
                      type="number"
                      name="total_body_water"
                      value={formData.total_body_water}
                      onChange={handleChange}
                    />
                    <div className="inputs">BMI</div>
                    <input
                      type="number"
                      name="bmi"
                      value={formData.bmi}
                      onChange={handleChange}
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
                      // accept="image/jpeg ,image/png, image/jpg"
                      accept="image/*"
                      onChange={handleFileChange}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                    />
                    <div className="inputs">National ID "front"</div>
                    <input
                      type="file"
                      // accept="image/jpeg ,image/png, image/jpg"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div className="inputs">National ID "back"</div>
                    <input
                      id="upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <button
                      className="submit btn"
                      type="submit"
                    >
                      Sign Up
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

export default Patient;
