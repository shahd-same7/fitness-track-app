import React, { useState } from 'react';
import './SignUp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState('');
  let userID = undefined;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone_number: '',
    role: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    handlePageChange(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Registration successful:');
        userID = response.data.user.id;
        console.log(response.data.user.id);
        console.log(userID);
        handelNavigate();
      } else {
        setError(
          response.data.message || 'An error occurred during registration.'
        );
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };
  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const handelNavigate = () => {
    const { role } = formData;
    if (role === 'lab') {
      navigate('/page3/' + userID);
    } else if (role === 'patient') {
      navigate('/page1/' + userID);
    } else if (role === 'doctor') {
      navigate('/page2/' + userID);
    }
  };
  return (
    <div className="container">
      <div className="hom">
        <div className="row">
          <div className="col">
            <div className="Signin">
              <div className="header">
                <span className="sync">Sign Up</span>
              </div>
              <form className="inputt" onSubmit={handleSubmit}>
                <div className="inputs" required>
                  Full Name
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <div className="inputs" required>
                  Phone Number
                </div>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />

                <div className="inputs">Email</div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="inputs">Address</div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <div className="inputs">Password</div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="inputs">Re-Enter password</div>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(event) => {
                    handleChange(event);
                    handlePageChange(event.target.value);
                  }}
                  style={{ display: 'block', marginTop: '1rem' }}
                >
                  <option value="">Select Role</option>
                  <option value="patient">Patient</option>
                  <option value="lab">Lab</option>
                  <option value="doctor">Doctor</option>
                </select>

                <button className=" submit btn" type="submit">
                  continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
