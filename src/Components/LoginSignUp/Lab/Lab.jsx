import React, { useState } from 'react';
import Logo from '../../../Assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Lab = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  let url = '127.0.0.1:8000/api/users?id';

  const [formData, setFormData] = useState({
    user_id: id,
    name: '',
    contact_person: '',
    contact_number: '',
    tax_number: '',
    license: null,
    lab_logo: null,
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
    console.log(formData.license);
    console.log(formData.lab_logo);

    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Perform API call to submit form data
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/lab',
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
          <div className="col-lg">
            <div className="Signin">
              <div className="header">
                <img src={Logo} alt="Logo" />{' '}
                <span className="sync">Sign Up</span>
              </div>
              <form
                onSubmit={handleSubmit}
                className="input tt"
                encType="multipart/form-data"
              >
                <input type="intger" name="user_id" value={id} />
                <div className="inputs">Clinic Name</div>
                <input
                  type="string"
                  onChange={handleChange}
                  name="name"
                  value={formData.name}
                />

                <div className="inputs">Contact person</div>
                <input
                  type="string"
                  onChange={handleChange}
                  name="contact_person"
                  value={formData.contact_person}
                />
                <div className="inputs">Contact Number</div>
                <input
                  type="integer"
                  onChange={handleChange}
                  name="contact_number"
                  value={formData.contact_number}
                />
                <div className="inputs">Tax number</div>
                <input
                  type="integer"
                  onChange={handleChange}
                  name="tax_number"
                  value={formData.tax_number}
                />

                <div className="inputs">License</div>
                <input
                  type="file"
                  accept="image/jpeg ,image/png, image/jpg"
                  name="lab_papers"
                  value={formData.license}
                  onChange={handleFileChange}
                />

                <div className="inputs">Lab Logo</div>
                <input
                  type="file"
                  accept="image/jpeg ,image/png, image/jpg"
                  name="logo"
                  value={formData.lab_logo}
                  onChange={handleFileChange}
                />

                <button className="submit btn" type="submit">
                  SignUp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab;
