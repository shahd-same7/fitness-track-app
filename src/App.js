import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/LoginSignUp/Login/Login';
import SignUp from './Components/LoginSignUp/SignUp/SignUp';
import Patient from './Components/LoginSignUp/Patient/Patient';
import Doctor from './Components/LoginSignUp/Doctor/Doctor';
import Lab from './Components/LoginSignUp/Lab/Lab';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LabScreen from './Components/Screen/LabScreen/LabScreen';
import PatientScreen from './Components/Screen/PatientScreen/PatientScreen';
import DoctorScreen from './Components/Screen/DoctorScreen/DoctorScreen';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/page1/:id" element={<Patient />} />
          <Route path="/page2/:id" element={<Doctor />} />
          <Route path="/page3/:id" element={<Lab />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/patientscreen/:id" element={<PatientScreen />} />
          <Route path="/doctorscreen/:id" element={<DoctorScreen />} />
          <Route path="/labscreen/:id" element={<LabScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
