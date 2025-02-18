import React, { useState } from "react";
import "./OrderdetailForm.css"; 
import { BASE_URL } from "../config";

const OrderDetailForm = () => {
  const initialOrderdetailState = {
    product_name: "",
    productquantity: "",
    order:""
  };

  const [Orderdetail, setOrderdetail] = useState(initialOrderdetailState);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderdetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = { ...Orderdetail };

    try {
      const response = await fetch(
        `${BASE_URL}orders/ordersdetail/create`,
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
            errorData.message || "Failed to Create Order Details"
          }`
        );
      }

      setSuccessMessage("Order Details Created successfully!");
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setOrderdetail(initialOrderdetailState);
  };

  return (
    <div className="Orderdetail_form-container">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form Orderdetail_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Order Detail Form</h1>

        <div className="input-group">
          <label>Product Name</label>
          <input
            type="text"
            name="product_name"
            value={Orderdetail.product_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>product Quantity </label>
          <input
            type="number"
            name="productquantity"
            value={Orderdetail.productquantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Order</label>
          <input
            type="text"
            name="order"
            value={Orderdetail.order}
            onChange={handleInputChange}
            required
          />
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

export default OrderDetailForm;
