import React, { useState } from "react";
import "./CustomerForm.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BASE_URL } from "../config";

const CustomerContactForm = () => {
  const initialCustomerState = {
    registered_by: "",
    category: "",
    Companyname: "",

    Companyemail: "",
    Company_phone_number: "",
    address: "",
    products: [
      {
        product_name: "",
        productprice: "",
      },
    ],
  };

  const [customer, setCustomer] = useState(initialCustomerState);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (value) => {
    setCustomer((prevState) => ({
      ...prevState,
      Company_phone_number: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...customer.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value,
    };
    setCustomer((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }));
  };

  const addProduct = () => {
    setCustomer((prevState) => ({
      ...prevState,
      products: [...prevState.products, { product_name: "", productprice: "" }],
    }));
  };

  const removeProduct = (index) => {
    const updatedProducts = customer.products.filter((_, i) => i !== index);
    setCustomer((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }));
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isValidPhoneNumber(customer.Company_phone_number)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
  
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    // Update the products field to ensure product_name is an array
    const updatedProducts = customer.products.map((product) => ({
      product_name: product.product_name, // Ensure product_name is an array
      productprice: product.productprice,
    }));
  
    const payload = {
      registered_by: customer.registered_by,
      Companyname: customer.Companyname,
      Companyemail: customer.Companyemail,
      Company_phone_number: customer.Company_phone_number,
      address: customer.address,
      products: updatedProducts,
    };
  
    try {
      const response = await fetch(
        `${BASE_URL}customers/customer/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from server:", errorData);
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || "Failed to register customer"
          }`
        );
      }
  
      const result = await response.json();
      console.log("Response:", result);
  
      setSuccessMessage("Customer registered successfully!");
      resetForm();
    } catch (error) {
      console.error("Failed to register customer:", error);
      setErrorMessage(error.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setCustomer(initialCustomerState);
  };

  return (
    <div className="Customer_form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form customer_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Customer Form</h1>

        <div className="input-group">
          <label>Customer Name</label>
          <input
            type="text"
            name="Companyname"
            value={customer.Companyname}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Customer Email</label>
          <input
            type="email"
            name="Companyemail"
            value={customer.Companyemail}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Customer Phone Number</label>
          <PhoneInput
            country="us"
            value={customer.Company_phone_number}
            onChange={handlePhoneChange}
            inputProps={{
              name: "Company_phone_number",
              required: true,
            }}
            className="phone-input"
          />
        </div>

        <div className="input-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={customer.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Registered By</label>
          <input
            type="text"
            name="registered_by"
            value={customer.registered_by}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={customer.category}
            onChange={handleInputChange}
          />
        </div>

        <div className="products-section">
          <label>Products</label>
          {customer.products.map((product, index) => (
            <div key={index} className="product-input-row">
              <input
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={(e) => handleProductChange(index, e)}
                placeholder="Product Name"
                required
                className="product-input"
              />
              <input
                type="number"
                name="productprice"
                value={product.productprice}
                onChange={(e) => handleProductChange(index, e)}
                placeholder="Product Price"
                required
                className="product-input"
              />
              {index === 0 ? (
                <button
                  type="button"
                  onClick={addProduct}
                  className="add-product-button"
                  title="Add Product"
                >
                  ➕
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="remove-product-button"
                  title="Remove Product"
                >
                  ➖
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="submit-container">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerContactForm;
