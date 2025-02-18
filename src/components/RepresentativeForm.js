import React, { useState } from 'react';
import './RepresentativeForm.css'; 
import { BASE_URL } from '../config';

const RepresentativeForm = () => {
  const initialRepresentativeState = {
    name: '',
    contact_number: '',
    email: '',
  };

  const [representative, setRepresentative] = useState(initialRepresentativeState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRepresentative((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(representative.contact_number)) {
      setErrorMessage('Please enter a valid contact number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const payload = { ...representative };

    try {
      const response = await fetch(`${BASE_URL}vendors/representatives/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from server:', errorData);
        throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to register representative'}`);
      }

      setSuccessMessage('Representative added successfully!');
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRepresentative(initialRepresentativeState);
  };

  return (
    <div className="form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form representative_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Representative Form</h1>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={representative.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contact_number"
            value={representative.contact_number}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={representative.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="submit-container">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RepresentativeForm;
