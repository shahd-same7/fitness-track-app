import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import doctor from '../../../Assets/Images/doctor.png';
import logout from '../../../Assets/Images/logout.png';
import card from '../../../Assets/Images/cardicon.png';
import logo from '../../../Assets/Images/logo.png';
import user from '../../../Assets/Images/user.png';
import phone from '../../../Assets/Images/phonecall.png';
import messege from '../../../Assets/Images/messege.png';
import girl from '../../../Assets/Images/girl.png';
import notify from '../../../Assets/Images/bell.png';
import profile_img from '../../../Assets/Images/profile_img.jpg';
import axios from 'axios';
import './DoctorScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faHouse,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import DarkHome from '../../../Assets/assits-icons/Dark/Dark Home.png';
import DarkMessage from '../../../Assets/assits-icons/Dark/Dark Message.png';
import DarkPhone from '../../../Assets/assits-icons/Dark/Dark Phone.png';

import Logout from '../../../Assets/assits-icons/Light/LogOut.png';
import LightMessage from '../../../Assets/assits-icons/Light/Light Message.png';
import LightPhone from '../../../Assets/assits-icons/Light/Light Phone.png';
import SmallNFC from '../../../Assets/assits-icons/Dark/Small NFC.png';
import NFCSECTION from '../../../Assets/assits-icons/NFC SECTION.png';

const DoctorScreen = () => {
  const { id } = useParams();
  const doctor_id = id;
  const [data, setData] = useState({});
  const [doctorsPatient, setDoctorsPatient] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);
  const [patient_id, setPatient_id] = useState('');
  const [lab_rotary_id, setLab_rotary_id] = useState(null);
  const navigate = useNavigate();

  const addPatient = async () => {
    try {
      // Perform API call to submit form data
      const response = await axios.post(
        `http://127.0.0.1:8000/api/patients/assign`,
        {
          lab_rotary_id,
          doctor_id,
          patient_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log('API response:', response.data);
      console.log(response.data);
    } catch (error) {
      console.log('The error is :', error);
    }
  };

  function handleAddPatient() {
    addPatient();
  }

  useEffect(() => {
    const showData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/show/doctor/${id}`
        );
        console.log(response.data?.user?.name);
        setData(response.data);
      } catch (error) {
        console.log('The error is :', error);
      }
    };

    showData();
  }, [id]);

  useEffect(() => {
    const showDoctorsPatient = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/show/doctorPatients/${id}`
        );
        setDoctorsPatient(response.data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    showDoctorsPatient();
  }, [id]);

  return (
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

      <nav class="navbar ">
        <div className="line  my-1"></div>

        <div class="container-fluid">
          <p> Laboratory</p>
          {/* <p>{name} laboratory</p> */}
          <div className="search">
            <div className=" rounded-3  p-2 bg-white  mx-3">
              <img src={SmallNFC} className="w-100" alt="smallNFC" />
            </div>
            <input
              class="form-control "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
      </nav>

      <div className="container  ">
        <div className="row p-3   gx-5 ">
          <div className="col-md-4   ">
            <div
              className="d-flex align-items-center rounded-4  gap-3 "
              style={{ backgroundColor: '#436A77', minHeight: '19rem' }}
            >
              <div className="doctimg  mx-2  " style={{ minHeight: '16.5rem' }}>
                <img src={doctor} alt="Doctor" />
              </div>
              <div className="leter  mb-5">
                <h2 className=" fs-3">DR/Amal Sabry</h2>
                <p>
                  {data.clinic_name}
                  head of nutrition department faculty of medical science and
                  bio technology at October 6 university
                </p>
              </div>
            </div>

            {/* <button className="editt">edit profile</button> */}
          </div>

          <div className="col-md-4   ">
            <div
              className="d-flex flex-column rounded-4  "
              style={{ backgroundColor: '#80BDD1' }}
            >
              <div className="d-flex  gap-3">
                <img
                  src={girl}
                  className="rounded-3  me-3 my-2"
                  style={{ width: '9rem' }}
                  alt="patientImage"
                />
                <div className="">
                  {patientDetails && patientDetails.user ? (
                    <div className="numm ms-3 text-black">
                      <h3 className="fw-lighter fs-2">
                        {patientDetails.user.name}
                      </h3>
                      <h4 className="fw-lighter fs-3">
                        ID: {patientDetails.user.id}
                      </h4>
                    </div>
                  ) : (
                    <div className="numm text-black">
                      <h3>Maria Hall</h3>
                      <h4>ID: #000003</h4>
                    </div>
                  )}
                </div>
              </div>

              <div className="datag  ">
                {patientDetails && patientDetails.user ? (
                  <div className="d-flex  text-white justify-content-between align-items-center">
                    <p className="  text-black">
                      Date Of Birth: {patientDetails.date_of_birth}
                      <br />
                      joined since: {patientDetails.created_at.substr(0, 10)}
                      <br />
                      appointments made: 3 target: losing fats
                    </p>
                    <div className="w-100  d-flex flex-column text-center text-black ">
                      <div className="p-2 ms-auto  ">
                        <p className="fw-bold ">
                          {patientDetails.user.phone_number}
                        </p>
                        <img
                          src={DarkPhone}
                          style={{ width: '30px' }}
                          alt="Phone"
                        />
                        <img
                          src={DarkMessage}
                          className="mx-3 my-1"
                          style={{ width: '30px' }}
                          alt="Message"
                        />
                        <p className=" fs-5  fw-bolder">
                          Current doctor:
                          <br /> DR/Amal Sabri
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className=" text-black">
                    <div className="d-flex">
                      <div className="w-50 p-3 ">
                        32 yo
                        <br />
                        joined since: 2024 <br />
                        appointments made: 3<br />
                        target: losing fats
                      </div>

                      <div className="w-50 d-flex flex-column text-center text-black ">
                        <div className="p-2 pb-0 ms-auto">
                          <p className="fw-bold ">(+2) 1xx xxx xxx</p>
                          <img
                            src={DarkPhone}
                            style={{ width: '30px' }}
                            alt="Phone"
                          />
                          <img
                            src={DarkMessage}
                            className="mx-3"
                            style={{ width: '30px' }}
                            alt="Message"
                          />
                          <p className=" fs-5 fw-bolder">
                            Current doctor:
                            <br /> DR/Amal Sabri
                          </p>
                        </div>
                      </div>
                    </div>
                  </p>
                )}
              </div>
            </div>

            {/* here */}
          </div>

          <div className="col-md-4   ">
            <div className="notification  " style={{ minHeight: '18.5rem' }}>
              <h6>
                Notifications
                <span className="not">
                  <img src={notify} alt="Notify" />
                </span>
              </h6>
              <div className="rectangle"></div>
              <div className="rectangle"></div>
              <div className="rectangle"></div>
              <div className="rectangle"></div>
              <div className="rectangle"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-7 ">
            <div className="add-patient  " style={{ minHeight: '20rem' }}>
              <div className="d-flex justify-content-between gap-2">
                <h4 style={{ color: '#041920' }} className=" p-3   text-start">
                  Patient History
                </h4>

                <div className="d-flex gap-2 align-items-center">
                  <button
                    className="btn btn-md mx-3 text-white fw-bold mb-3  "
                    style={{
                      backgroundColor: '#041920',
                      border: '1px solid #041920',
                    }}
                    onClick={handleAddPatient}
                  >
                    ADD TO PATIENT
                  </button>

                  <input
                    type="text"
                    value={lab_rotary_id}
                    name="lab_rotary_id"
                    class="form-control  w-25 h-25 mt-1 "
                    id="exampleFormControlInput1"
                    placeholder="Lab ID"
                    onChange={(e) => setLab_rotary_id(e.target.value)}
                  />
                  <input
                    type="text"
                    value={patient_id}
                    name="patient_id"
                    class="form-control  w-25 h-25 mt-1 "
                    id="exampleFormControlInput1"
                    placeholder="Patient ID"
                    onChange={(e) => setPatient_id(e.target.value)}
                  />
                </div>
              </div>

              {doctorsPatient.length > 0 ? (
                doctorsPatient.map((patient) => (
                  <ul key={patient.user.id}>
                    <li
                      style={{ cursor: 'pointer' }}
                      className="list-patients"
                      onClick={() => setPatientDetails(patient)}
                    >
                      <span className="pat">
                        <img src={profile_img} alt="Patient" />
                      </span>
                      {patient.user.name}
                      <span className="numb">{patient.user.phone_number}</span>
                      #000002
                      <span className="ion">
                        <img src={phone} alt="Phone" />
                        <img src={messege} alt="Message" />
                      </span>
                    </li>
                  </ul>
                ))
              ) : (
                <h2 className="text-center fw-bold text-bg-primary p-3 mt-5">
                  No Patients have been Assigned
                </h2>
              )}
            </div>
          </div>
          <div className="col-lg-4 p-2 nfcCard">
            <div className="p-3 ">
              <img src={NFCSECTION} alt="nfcSection" className="w-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorScreen;

{
  /* <ul>
                <li>
                  <li>
                    <span className="pat">
                      <img src={girl} />
                    </span>
                    Maria Hall <span className="numb">(+2) 1xx xxx xxxx</span>{' '}
                    #000002{' '}
                    <span className="ion">
                      <img src={phone} /> <img src={messege} />
                    </span>
                  </li>
                  <span className="pat">
                    <img src={man} />{' '}
                  </span>
                  Alex Aldy <span className="numb">(+2) 1xx xxx xxxx</span>{' '}
                  #000003{' '}
                  <span className="ion">
                    <img src={phone} /> <img src={messege} />
                  </span>
                </li>
                <li>
                  <span className="pat">
                    <img src={woman} />
                  </span>
                  Maria Hall <span className="numb">(+2) 1xx xxx xxxx</span>{' '}
                  #000004{' '}
                  <span className="ion">
                    <img src={phone} /> <img src={messege} />
                  </span>
                </li>
              </ul> */
}

// <div className="col-lg-5">
// <div className="doctora">
//   <div className="row">
//     <div className="col-lg-6">
//       <div className="amal">
//         <div
//           className="doctimg  "
//           style={{ minHeight: '15.5rem' }}
//         >
//           <img src={doctor} alt="Doctor" />
//         </div>
//         {/* <button className="editt">edit profile</button> */}
//       </div>
//     </div>
//     <div className="col-lg-6">
//       <div className="leter">
//         <h2>DR/Amal Sabry</h2>
//         <p>
//           {data.clinic_name}
//           head of nutrition department faculty of medical science
//           and bio technology at October 6 university
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
// </div>

// <div
// className="col-lg-5  mt-3  rounded-4 text-white  "
// style={{ backgroundColor: ' #436A77' }}
// >
// <div className="d-flex ">
//   <img
//     src={girl}
//     className="rounded-3  me-3 my-2"
//     style={{ width: '9rem' }}
//     alt="patientImage"
//   />
//   <div className=" ">
//     {patientDetails && patientDetails.user ? (
//       <div className="numm ms-3 text-white">
//         <h3 className="fw-lighter fs-2">
//           {patientDetails.user.name}
//         </h3>
//         <h4 className="fw-lighter fs-3">
//           ID: {patientDetails.user.id}
//         </h4>
//       </div>
//     ) : (
//       <div className="numm text-white">
//         <h3>Maria Hall</h3>
//         <h4>ID: #000003</h4>
//       </div>
//     )}
//   </div>
// </div>
// <div className="datag  ">
//   {patientDetails && patientDetails.user ? (
//     <div className="d-flex  text-white justify-content-between align-items-center">
//       <p className="  text-white">
//         Date Of Birth: {patientDetails.date_of_birth}
//         <br />
//         joined since: {patientDetails.created_at.substr(0, 10)}
//         <br />
//         appointments made: 3 target: losing fats
//       </p>
//       <div className="w-100  d-flex flex-column text-center text-white ">
//         <div className="p-2 ms-auto">
//           <p className="fw-bold ">
//             {patientDetails.user.phone_number}
//           </p>
//           <img
//             src={LightPhone}
//             style={{ width: '30px' }}
//             alt="Phone"
//           />
//           <img
//             src={LightMessage}
//             className="mx-3 my-1"
//             style={{ width: '30px' }}
//             alt="Message"
//           />
//           <p className=" fs-4 fw-bolder">
//             Current doctor:
//             <br /> DR/Amal Sabri
//           </p>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <p className=" text-white">
//       <div className="d-flex">
//         <div className="w-50 p-3 ">
//           32 yo
//           <br />
//           joined since: 2024 <br />
//           appointments made: 3<br />
//           target: losing fats
//         </div>

//         <div className="w-50 d-flex flex-column text-center text-white ">
//           <div className="p-2 pb-0 ms-auto">
//             <p className="fw-bold ">(+2) 1xx xxx xxx</p>
//             <img
//               src={LightPhone}
//               style={{ width: '30px' }}
//               alt="Phone"
//             />
//             <img
//               src={LightMessage}
//               className="mx-3"
//               style={{ width: '30px' }}
//               alt="Message"
//             />
//             <p className=" fs-4 fw-bolder">
//               Current doctor:
//               <br /> DR/Amal Sabri
//             </p>
//           </div>
//         </div>
//       </div>
//     </p>
//   )}
// </div>
// </div>
// <div className="col-lg-3 bg-danger">
// <div className="notification">
//   <h6>
//     Notifications{' '}
//     <span className="not">
//       <img src={notify} alt="Notify" />
//     </span>
//   </h6>
//   <div className="rectangle"></div>
//   <div className="rectangle"></div>
//   <div className="rectangle"></div>
//   <div className="rectangle"></div>
// </div>
// </div>
