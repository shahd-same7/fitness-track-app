import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import card from '../../../Assets/Images/cardicon.png';
import phone from '../../../Assets/Images/phonecall.png';
import messege from '../../../Assets/Images/messege.png';
import logout from '../../../Assets/Images/logout.png';
import home from '../../../Assets/Images/home.png';
import logo from '../../../Assets/Images/logo.png';
import folder from '../../../Assets/Images/folder.png';
import girl from '../../../Assets/Images/girl.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
/**----------------------------------------- */
import DarkHome from '../../../Assets/assits-icons/Dark/Dark Home.png';
import DarkMessage from '../../../Assets/assits-icons/Dark/Dark Message.png';
import DarkPhone from '../../../Assets/assits-icons/Dark/Dark Phone.png';
import Search from '../../../Assets/assits-icons/Dark/Search.png';
import SmallNFC from '../../../Assets/assits-icons/Dark/Small NFC.png';
import vector from '../../../Assets/assits-icons/Dark/Vector.png';

import LightMessage from '../../../Assets/assits-icons/Light/Light Message.png';
import LightPhone from '../../../Assets/assits-icons/Light/Light Phone.png';
import Logout from '../../../Assets/assits-icons/Light/LogOut.png';
import prescription from '../../../Assets/assits-icons/Light/prescription.png';

import profile_img from '../../../Assets/Images/profile_img.jpg';
import './LabScreen.css';

// file
import dataCSV from '../../../Assets/files/Data.Analysis.csv';
import { InfinitySpin } from 'react-loader-spinner';

// loader

const LabScreen = () => {
  const { id } = useParams();
  const lab_rotary_id = id;
  console.log(id);
  const [data, setData] = useState([]);
  const [labsPatient, setLabsPatient] = useState([]);
  const [labDetails, setLabDetails] = useState(null);
  const [patient_id, setPatient_id] = useState('');
  const [doctor_id, setDoctor_id] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const downloadFile = () => {
    setLoading(true); // Show loading indicator

    // Simulate loading for 2 seconds
    setTimeout(() => {
      fetch(dataCSV)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', dataCSV.split('/').pop());
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch((error) => console.error('Error downloading file:', error))
        .finally(() => {
          setLoading(false); // Hide loading indicator after file download
        });
    }, 3000); // 2 seconds timeout
  };

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
          `http://127.0.0.1:8000/api/show/lab/${id}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log('The error is :', error);
      }
    };

    showData();
  }, [id]);

  useEffect(() => {
    const showLabsPatient = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/show/labPatients/${id}`
        );
        setLabsPatient(response.data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    showLabsPatient();
  }, [id]);

  const { lab_id, name } = data;

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
          <p>{name} laboratory</p>
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
      <div className="container">
        <div className="file   h-100 p-3 ">
          {isLoading === true ? (
            <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            />
          ) : (
            <div class="dashed-border " onClick={downloadFile}>
              <img src={folder} />
              <p>
                Drag and drop your csv file here<br></br>
                <span>OR ,browse to upload</span>
              </p>
            </div>
          )}
        </div>
        <div className="row ">
          <div className="col-lg-7">
            <div className="add-patient">
              <h4>PATIENTS</h4>
              <div className="d-flex align-items-center   ">
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
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    value={patient_id}
                    name="patient_id"
                    class="form-control mt-2"
                    id="exampleFormControlInput1"
                    placeholder="Patient ID"
                    onChange={(e) => setPatient_id(e.target.value)}
                  />

                  <input
                    type="text"
                    value={doctor_id}
                    name="doctor_id"
                    class="form-control mt-2"
                    id="exampleFormControlInput1"
                    placeholder="Doctor ID"
                    onChange={(e) => setDoctor_id(e.target.value)}
                  />
                </div>
              </div>
              {labsPatient.length > 0 ? (
                labsPatient.map((patient) => (
                  <ul key={patient.user.id}>
                    <li
                      style={{ cursor: 'pointer' }}
                      className="list-patients  "
                      onClick={() => setLabDetails(patient)}
                    >
                      <div className="  d-flex flex align-items-center justify-content-between">
                        <div className="pat d-flex align-items-center   py-1 ">
                          <img src={profile_img} alt="Patient" />
                          <p>{patient.user.name}</p>
                          <span className="numb">
                            {patient.user.phone_number}
                          </span>
                        </div>
                        <div className="my-auto">
                          <p> {patient.user.id}</p>
                        </div>

                        <div className="d-flex align-items-center ">
                          <img
                            src={DarkPhone}
                            className="w-25 mx-3"
                            alt="Phone"
                          />
                          <img
                            src={DarkMessage}
                            className="w-25"
                            alt="Message"
                          />
                        </div>
                      </div>
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
          <div
            className="col-lg-5 mt-3 rounded-4 text-white "
            style={{ backgroundColor: ' #436A77' }}
          >
            <div className="d-flex ">
              <img
                src={girl}
                className="rounded-3  me-3 my-2"
                style={{ width: '9rem' }}
                alt="patientImage"
              />
              <div className="">
                {labDetails && labDetails.user ? (
                  <div className="numm ms-3 text-white">
                    <h3 className="fw-lighter fs-2">{labDetails.user.name}</h3>
                    <h4 className="fw-lighter fs-3">
                      ID: {labDetails.user.id}
                    </h4>
                  </div>
                ) : (
                  <div className="numm text-white">
                    <h3>Maria Hall</h3>
                    <h4>ID: #000003</h4>
                  </div>
                )}
              </div>
            </div>
            <div className="datag  ">
              {labDetails && labDetails.user ? (
                <div className="d-flex  text-white justify-content-between align-items-center">
                  <p className="  text-white">
                    Date Of Birth: {labDetails.date_of_birth}
                    <br />
                    joined since: {labDetails.created_at.substr(0, 10)}
                    <br />
                    appointments made: 3 target: losing fats
                  </p>
                  <div className="w-100  d-flex flex-column text-center text-white ">
                    <div className="p-2 ms-auto">
                      <p className="fw-bold ">{labDetails.user.phone_number}</p>
                      <img
                        src={LightPhone}
                        style={{ width: '30px' }}
                        alt="Phone"
                      />
                      <img
                        src={LightMessage}
                        className="mx-3 my-1"
                        style={{ width: '30px' }}
                        alt="Message"
                      />
                      <p className=" fs-4 fw-bolder">
                        Current doctor:
                        <br /> DR/Amal Sabri
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className=" text-white">
                  <div className="d-flex">
                    <div className="w-50 p-3 ">
                      32 yo
                      <br />
                      joined since: 2024 <br />
                      appointments made: 3<br />
                      target: losing fats
                    </div>

                    <div className="w-50 d-flex flex-column text-center text-white ">
                      <div className="p-2 pb-0 ms-auto">
                        <p className="fw-bold ">(+2) 1xx xxx xxx</p>
                        <img
                          src={LightPhone}
                          style={{ width: '30px' }}
                          alt="Phone"
                        />
                        <img
                          src={LightMessage}
                          className="mx-3"
                          style={{ width: '30px' }}
                          alt="Message"
                        />
                        <p className=" fs-4 fw-bolder">
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
        </div>
      </div>
    </>
  );
};

export default LabScreen;

// {/* <div className="col-lg-5 bg-danger" style={{ height: '18rem' }}>
// <div className="sec ">
//   <div className="row">
//     <div className="col-lg-6  ">
//       <div className="detail ">
//         <img src={girl} />
//         <div className="datag ">
//           {labDetails && labDetails.user ? (
//             <p className=" text-black">
//               Date Of Birth:
//               <br></br>
//               {labDetails.date_of_birth}
//               <br />
//               joined since: <br></br>
//               {labDetails.created_at}
//               <br />
//               {/* appointments made: 3<br />
//             target: losing fats */}
//             </p>
//           ) : (
//             <p className=" text-black">
//               32 yo
//               <br />
//               {/* joined since: 2024 <br />
//             appointments made: 3<br />
//             target: losing fats */}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//     <div className="col-lg-6  h-100 ">
//       {labDetails && labDetails.user ? (
//         <div className="numm ">
//           <h3>{labDetails.user.name}</h3>
//           <h4>ID: {labDetails.user.id}</h4>
//           <p className="fw-bold">{labDetails.user.phone_number}</p>
//           <span className="com">
//             <img src={phone} alt="Phone" />
//             <img src={messege} alt="Message" />
//           </span>
//         </div>
//       ) : (
//         <div className="numm  ">
//           <h3>Maria Hall</h3>
//           <h4>ID: #000003</h4>
//           <p>(+2) 1xx xxx xxxx</p>
//           <span className="com">
//             <img src={phone} alt="Phone" />
//             <img src={messege} alt="Message" />
//           </span>
//         </div>
//       )}
//     </div>
//   </div>
// </div>
// </div> */}

// ------------------------------------------------------//

{
  /* <ul key={patient.user.id}>
  <li
    style={{ cursor: 'pointer' }}
    className="list-patients"
    onClick={() => setLabDetails(patient)}
  >
    <span className="pat">
      <img src={profile_img} alt="Patient" />
    </span>
    {patient.user.name}
    <span className="numb">{patient.user.phone_number}</span>
    {patient.user.id}
    <span className="ion">
      <img src={phone} alt="Phone" />
      <img src={messege} alt="Message" />
    </span>
  </li>
</ul>; */
}
