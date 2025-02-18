import React, { useState } from 'react';
import './CategoryForm.css';  
import { BASE_URL } from '../config';

const CustomerCategoryForm = () => {
  const initialCategoryState = {
    name: '',
    registered_by: '',
  };

  const [Category, setCategory] = useState(initialCategoryState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const payload = { ...Category };

    try {
      const response = await fetch(`${BASE_URL}customers/category/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from server:', errorData);
        throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to register Company Category'}`);
      }

      setSuccessMessage('Company Category added successfully!');
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCategory(initialCategoryState);
  };

  return (
    <div className="Category-form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form Category_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Company Category Form</h1>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={Category.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Register By</label>
          <input
            type="text"
            name="registered_by"
            value={Category.registered_by}
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

export default CustomerCategoryForm;
