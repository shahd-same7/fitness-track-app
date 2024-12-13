import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import boyImage from '../../../Assets/Images/boy.png';
import logo from '../../../Assets/Images/logo.png';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [selectedPage, setSelectedPage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataToBePost, setDataToBePost] = useState({
    email: '',
    password: '',
  });
  function handleEmail(e) {
    setDataToBePost({ ...dataToBePost, email: e.target.value });
  }

  function handlePassword(e) {
    setDataToBePost({ ...dataToBePost, password: e.target.value });
  }


  const showData = async () => {
    try {
      // Perform API call to submit form data
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login',
        dataToBePost
      );

      console.log('API response:', response.data);

      return response.data;
    } catch (error) {
      console.log('The error is :', error);
    }
  };
  async function handleNavigate() {
    let data = await showData();
    console.log(data?.user.role);
    if (data?.user.role === 'lab') {
      navigate(
        `/${data?.user.role}screen/${data?.user.lab_rotary.lab_rotary_id}`
      );
    }
    if (data?.user.role === 'patient') {
      navigate(`/${data?.user.role}screen/${data?.user.patient.patient_id}`);
    }
    if (data?.user.role === 'doctor') {
      navigate(`/${data?.user.role}screen/${data?.user.doctor.doctor_id}`);
    }
  }

  return (
    <div className="container">
      <div className="homee">
        <div className="row">
          <div className="col-lg-6">
            <div className="home">
              <div className="content">
                <div className="overlay"></div>
                <div className="boy">
                  {' '}
                  <img src={boyImage} />{' '}
                </div>
                <p>
                  <strong>Always Synchronized </strong>
                  <br></br>
                  Keep your health info always packed and<br></br> synced
                  wherever you go{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 login">
            <div className="header">
              <img src={logo} /> <span className="sync">Nutra-sync</span>
            </div>
            <form action="" className="input">
              <div className="inputs">Email</div>
              <input
                type="email"
                name="email"
                value={dataToBePost.email}
                onChange={(e) => handleEmail(e)}
              />
              <div className="inputs">Password</div>
              <input
                type="password"
                name="password"
                value={dataToBePost.password}
                onChange={(e) => handlePassword(e)}
              />
              <div className="forgot-password">
                Forgot password? <span className="click">click here!</span>{' '}
              </div>
            </form>
            <div className="submit-container">
              <button className="submit" type="button" onClick={handleNavigate}>
                Login
              </button>
              <button
                className="submit sign-up"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
