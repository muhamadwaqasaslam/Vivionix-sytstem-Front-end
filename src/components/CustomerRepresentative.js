import React, { useState } from 'react';
import './CustomerRepresentativeForm.css';  // Ensure CSS is similar to your existing 
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BASE_URL } from '../config';

const CustomerRepresentativeForm = () => {
  const initialRepresentativeState = {
    registered_by: null,
    customer: '',
    Contact_person_name: '',
    Contact_person_email: '',
    Contact_person_number: '',
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

  const handlePhoneChange = (value) => {
    setRepresentative((prevState) => ({
      ...prevState,
      Contact_person_number: value,
    }));
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(representative.Contact_person_number)) {
      setErrorMessage('Please enter a valid contact number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const payload = { ...representative };

    try {
      const response = await fetch(`${BASE_URL}customers/representative/create/`, {
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
    <div className="customer_form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form representative_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Customer Representative Form</h1>

        <div className="input-group">
          <label>Registered By</label>
          <input
            type="text"
            name="registered_by"
            value={representative.registered_by}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Customer</label>
          <input
            type="text"
            name="customer"
            value={representative.customer}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Contact Person Name</label>
          <input
            type="text"
            name="Contact_person_name"
            value={representative.Contact_person_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Contact Person Email</label>
          <input
            type="email"
            name="Contact_person_email"
            value={representative.Contact_person_email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Contact Person Number</label>
          <PhoneInput
            country="us"
            value={representative.Contact_person_number}
            onChange={handlePhoneChange}
            inputProps={{
              name: "Contact_person_number",
              required: true,
            }}
            className="phone-input"
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

export default CustomerRepresentativeForm;
