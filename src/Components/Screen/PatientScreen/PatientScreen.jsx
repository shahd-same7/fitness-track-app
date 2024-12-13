import React, { useEffect, useState } from 'react';
import './PatientScreen.css';
import { useNavigate, useParams } from 'react-router-dom';
import notify from '../../../Assets/Images/bell.png';
import patient from '../../../Assets/Images/patient.jpeg';
import doctor from '../../../Assets/Images/doctor.png';
import phone from '../../../Assets/Images/phonecall.png';
import messege from '../../../Assets/Images/messege.png';
import charts from '../../../Assets/Images/charts.png';
import user from '../../../Assets/Images/user.png';
import prec from '../../../Assets/Images/paper.png';
import logo from '../../../Assets/Images/logo.png';
import logout from '../../../Assets/Images/logout.png';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import DarkHome from '../../../Assets/assits-icons/Dark/Dark Home.png';
import LightMessage from '../../../Assets/assits-icons/Light/Light Message.png';
import LightPhone from '../../../Assets/assits-icons/Light/Light Phone.png';

import Logout from '../../../Assets/assits-icons/Light/LogOut.png';

const PatientScreen = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: '',
    patient_id: '',
    gender: '',
    date_of_birth: '',
    created_at: '',
    total_body_water: '',
    total_body_fat: '',
    height: '',
    weight: '',
    bmi: '',
    muscles_percentage: '',
    phone_number: '',
    email: '',
    address: '',
  });
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(true);
  // const calculateAge = (dateOfBirth) => {
  //   const today = new Date();
  //   const birthDate = new Date(dateOfBirth);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = today.getMonth() - birthDate.getMonth();
  //   if (
  //     monthDiff < 0 ||
  //     (monthDiff === 0 && today.getDate() < birthDate.getDate())
  //   ) {
  //     age--;
  //   }
  //   return age;
  // };

  const showData = async () => {
    setData('');
    try {
      // Perform API call to submit form data
      const response = await axios.get(
        `http://127.0.0.1:8000/api/show/patient/${id}`
      );

      console.log('API response:', response.data);
      setData(response.data);
    } catch (error) {
      console.log('The error is :', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    showData();
    console.log(data);
  }, [id]);
  // const {
  //   date_of_birth,
  //   patient_id,
  //   muscles_percentage,
  //   weight,
  //   height,
  //   bmi,
  //   total_body_water,
  //   total_body_fat,
  //   gender,
  // } = data;
  // const { user: { name, created_at, phone_number, email, address } = {} } =
  //   data;
  return isEdit === true ? (
    <>
      <div className="sidebar " style={{ backgroundColor: '#041920' }}>
        <ul className="nav_list">
          <div className="logoicon ">
            <img src={logo} alt="logo" />

            <div
              className="logout p-2 mt-5  ms-1 rounded-start-3"
              style={{ backgroundColor: '#d8f6ff' }}
            >
              <img src={DarkHome} className="mw-100" />
            </div>
          </div>
          <li className="li">
            <a class="nav-link active" aria-current="page">
              <div className="person   " style={{ backgroundColor: '#d8f6ff' }}>
                {/* <FontAwesomeIcon
                  icon={faHouse}
                  size="2xl"
                  color={'#041920'}
                  className="rounded-start-2  p-2   mx-2"
                  style={{ backgroundColor: '#d8f6ff' }}
                /> */}

                {/* <img
                  className="icn  w-75 rounded-start-2 "
                  src={DarkHome}
                  alt="Home"
                /> */}
              </div>
            </a>
          </li>

          <li className="li">
            <a href="#">
              <div className="logout p-2 mt-5  ms-1 rounded-start-3">
                {/* <FontAwesomeIcon
                  size="2x"
                  className="icn  rounded-start-2 "
                  icon={faRightFromBracket}
                  onClick={() => navigate('/login')}
                /> */}

                <img
                  src={Logout}
                  alt="logout"
                  className="w-100"
                  onClick={() => navigate('/login')}
                />
              </div>
            </a>
          </li>
        </ul>
      </div>

      <nav class="navbar ">
        <div className="line my-1 "></div>

        <div class="container-fluid">
          <p>WELCOME MR/ {data?.user?.name}</p>
          <div className="notify">
            <img src={notify} />
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="user">
          <div className="row">
            <div className="col-lg-6 ">
              <div className="userdata">
                <div className="sorto">
                  <img
                    src={patient}
                    alt="image_profile"
                    className="w-50 h-auto"
                  />

                  <h2>
                    {data?.user?.name} <br></br>#{data.patient_id}
                    <br></br>
                    Gender: {data.gender}
                  </h2>
                </div>
                <div className="  text-white">
                  <div className="container">
                    <div className="row p-3">
                      <div className="col-md-6 p-2">
                        <p>
                          Age: {data.date_of_birth} Years old
                          <br></br>
                        </p>
                        <p className="">
                          Joined Since:
                          <br></br>{' '}
                          <span className=" w-100">{data.created_at}</span>
                        </p>
                        <p>Total Body Water: {data.total_body_water}%</p>
                        <p>Total Body Fat: {data.total_body_fat}%</p>
                        <p>Height: {data.height}M</p>
                        <p>Weight: {data.weight}K</p>
                        <p>BMI: {data.bmi}</p>
                        appointments made: 12
                        <p>
                          target gaining muscle mass: {data.muscles_percentage}%
                        </p>
                      </div>
                      <div className="col-md-6 p-2 ">
                        <p>Phone Number: {data.user?.phone_number}</p>
                        <p>Email: {data.user?.email}</p>
                        <p>Address: {data.user?.address}</p>
                        <p className="cdoc">Current doctor: DR/Amal Sabri</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="edit" onClick={() => setIsEdit(false)}>
                  edit profile
                </button>
              </div>
            </div>

            <div className="col-lg-6 ">
              <div className="doc">
                <div className="docdata">
                  <p className="docc"> Current doctor</p>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="letter">
                        <h2>DR/Amal Sabry </h2>
                        <p>
                          head of nutrition department faculty of medical
                          science and bio technology at October 6 university
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="amal">
                        <div className="docimg">
                          <img src={doctor} />
                        </div>
                        <div className="com">
                          <img src={LightPhone} alt="Phone" />
                          <img src={LightMessage} alt="Message" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="analyze">
                <h3>My states vs target</h3>
                <img src={charts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="sidebar " style={{ backgroundColor: '#041920' }}>
        <ul className="nav_list">
          <div className="logoicon ">
            <img src={logo} alt="logo" />

            <div
              className="logout p-2 mt-5  ms-1 rounded-start-3"
              style={{ backgroundColor: '#d8f6ff' }}
            >
              <img src={DarkHome} className="mw-100" alt="Home" />
            </div>
          </div>
          <li className="li">
            <a class="nav-link active" aria-current="page">
              <div className="person   " style={{ backgroundColor: '#d8f6ff' }}>
                {/* <FontAwesomeIcon
                  icon={faHouse}
                  size="2xl"
                  color={'#041920'}
                  className="rounded-start-2  p-2   mx-2"
                  style={{ backgroundColor: '#d8f6ff' }}
                /> */}

                {/* <img
                  className="icn  w-75 rounded-start-2 "
                  src={DarkHome}
                  alt="Home"
                /> */}
              </div>
            </a>
          </li>

          <li className="li">
            <a href="#">
              <div className="logout p-2 mt-5  ms-1 rounded-start-3">
                {/* <FontAwesomeIcon
                  size="2x"
                  className="icn  rounded-start-2 "
                  icon={faRightFromBracket}
                  onClick={() => navigate('/login')}
                /> */}

                <img
                  src={Logout}
                  alt="logout"
                  className="w-100"
                  onClick={() => navigate('/login')}
                />
              </div>
            </a>
          </li>
        </ul>
      </div>

      <nav className="navbar">
        <div className="container-fluid">
          <p>WELCOME MR/{data.name}</p>
          <div className="notify">
            <img src={notify} alt="Notify" />
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="user">
          <div className="row">
            <div className="col-lg-6">
              <div className="userdata">
                <div className="sorto">
                  <img
                    src={patient}
                    alt="image_profile"
                    className="w-50 h-auto"
                  />
                  <h2>
                    {data?.user?.name} <br />#{data.patient_id}
                    <br />
                    Gender: {data.gender}
                  </h2>
                </div>
                <div className="text-white">
                  <div className="container">
                    <div className="row p-3">
                      <div className="col-md-6 p-2">
                        <p>
                          Age:{' '}
                          <input
                            name="date_of_birth"
                            type="number"
                            value={data.date_of_birth}
                            onChange={handleChange}
                          />
                          Years old
                          <br />
                        </p>
                        <p className="">
                          Joined Since:
                          <br />{' '}
                          <span className="w-100">{data.created_at}</span>
                        </p>
                        <p>
                          Total Body Water:{' '}
                          <input
                            name="total_body_water"
                            type="text"
                            value={data.total_body_water}
                            onChange={handleChange}
                          />
                          %
                        </p>
                        <p>
                          Total Body Fat:{' '}
                          <input
                            name="total_body_fat"
                            type="text"
                            value={data.total_body_fat}
                            onChange={handleChange}
                          />
                          %
                        </p>
                        <p>
                          Height:{' '}
                          <input
                            name="height"
                            type="text"
                            value={data.height}
                            onChange={handleChange}
                          />
                          M
                        </p>
                        <p>
                          Weight:{' '}
                          <input
                            name="weight"
                            type="text"
                            value={data.weight}
                            onChange={handleChange}
                          />
                          K
                        </p>
                        <p>
                          BMI:{' '}
                          <input
                            name="bmi"
                            type="text"
                            value={data.bmi}
                            onChange={handleChange}
                          />
                        </p>
                        appointments made: 12
                        <p>
                          Target gaining muscle mass:{' '}
                          <input
                            name="muscles_percentage"
                            type="text"
                            value={data.muscles_percentage}
                            onChange={handleChange}
                          />
                          %
                        </p>
                      </div>
                      <div className="col-md-6 p-2">
                        <p>
                          Phone Number:{' '}
                          <input
                            name="phone_number"
                            type="text"
                            value={data.phone_number}
                            onChange={handleChange}
                          />
                        </p>
                        <p>
                          Email:{' '}
                          <input
                            name="email"
                            type="text"
                            value={data.email}
                            onChange={handleChange}
                          />
                        </p>
                        <p>
                          Address:{' '}
                          <input
                            name="address"
                            type="text"
                            value={data.address}
                            onChange={handleChange}
                          />
                        </p>
                        <p className="cdoc">Current doctor: DR/Amal Sabri</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="edit" onClick={() => setIsEdit(true)}>
                  Confirm edit
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="doc">
                <div className="docdata">
                  <p className="docc"> Current doctor</p>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="letter">
                        <h2>DR/Amal Sabry </h2>
                        <p>
                          head of nutrition department faculty of medical
                          science and bio technology at October 6 university
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="amal">
                        <div className="docimg">
                          <img src={doctor} alt="Doctor" />
                        </div>
                        <div className="com">
                          <img src={LightPhone} alt="Phone" />
                          <img src={LightMessage} alt="Message" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="analyze">
                <h3>My states vs target</h3>
                <img src={charts} alt="Charts" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientScreen;

/*
ADDRESS,PHONE NUMBER,EMAIL IS NOT CONTROLLED BY STATE!!
(TO BE FIXED)
*/
