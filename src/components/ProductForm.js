import React, { useState } from 'react';
import './ProductForm.css';  
import { BASE_URL } from '../config';

const ProductForm = () => {
  const initialProductState = {
    product_name: '',
    reference_number: '',
    packsize: '',
    packprice: '',
    price_date: null,
    vendorname: '',
    is_available: false,
    remarks: '',
    registered_by: '',  // Added field for registered_by
  };

  const [product, setProduct] = useState(initialProductState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      is_available: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const payload = { ...product };

    try {
      const response = await fetch(`${BASE_URL}products/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from server:', errorData);
        throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to register product'}`);
      }

      setSuccessMessage('Product added successfully!');
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setProduct(initialProductState);
  };

  return (
    <div className="form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form product_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Product Registration Form</h1>

        <div className="input-group">
          <label>Product Name</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Reference Number</label>
          <input
            type="text"
            name="reference_number"
            value={product.reference_number}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Pack Size</label>
          <input
            type="text"
            name="packsize"
            value={product.packsize}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Pack Price</label>
          <input
            type="number"
            name="packprice"
            value={product.packprice}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Price Date</label>
          <input
            type="date"
            name="price_date"
            value={product.price_date}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Vendor Name</label>
          <input
            type="text"
            name="vendorname"
            value={product.vendorname}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Availability
          <input
            type="checkbox"
            name="is_available"
            checked={product.is_available}
            onChange={handleCheckboxChange}
            className='checkbox-availability'
          />
          </label>
        </div>

        <div className="input-group">
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={product.remarks}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Registered By</label>
          <input
            type="text"
            name="registered_by"
            value={product.registered_by}
            onChange={handleInputChange}
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

export default ProductForm;
