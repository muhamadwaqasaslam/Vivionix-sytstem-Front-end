import React, { useState} from "react";
import "./OrderForm.css";
import { BASE_URL } from "../config";

const OrderForm = () => {
  const initialOrderState = {
    customer: "",
    order_delivery: "",
    GST: "",
    registered_by_id: "",
    orderdetails: [
      {
        product_name: "",
        productquantity: "",
      },
    ],
 
  };

  const [Order, setOrder] = useState(initialOrderState);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...Order.orderdetails];
    updatedProducts[index] = {
      product_name: updatedProducts[index].product_name || "",
      productquantity: updatedProducts[index].productquantity || "",
      [name]: value, 
    };
    setOrder((prevState) => ({
      ...prevState,
      orderdetails: updatedProducts,
    }));
  };
  

  const addProduct = () => {
    setOrder((prevState) => ({
      ...prevState,
      orderdetails: [
        ...prevState.orderdetails,
        { product_name: "", productquantity: "" },
      ],
    }));
  };

  const removeProduct = (index) => {
    const updatedProducts = Order.orderdetails.filter((_, i) => i !== index);
    setOrder((prevState) => ({
      ...prevState,
      orderdetails: updatedProducts,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = { ...Order };

    try {
      const response = await fetch(`${BASE_URL}orders/orders/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from server:", errorData);
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || "Failed to Create Order"
          }`
        );
      }

      setSuccessMessage("Order Created successfully!");
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setOrder(initialOrderState);
  };

  return (
    <div className="Order_form-container">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form Order_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Order Form</h1>

        <div className="input-group">
          <label>Customer Name</label>
          <input
            type="text"
            name="customer"
            value={Order.customer}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Order Delivery (YYYY-MM-DDThh:mm:ss)</label>
          <input
            type="datetime-local"
            name="order_delivery"
            value={Order.order_delivery}
            onChange={handleInputChange}
            required
          />
        </div>


        <div className="input-group">
          <label>GST</label>
          <input
            type="text"
            name="GST"
            value={Order.GST}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Register By</label>
          <input
            type="text"
            name="registered_by_id"
            value={Order.registered_by_id}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="products-section">
          <label>Order Detail</label>
          {Order.orderdetails.map((orderdetails, index) => (
            <div key={index} className="product-input-row">
              <input
                type="text"
                name="product_name"
                value={orderdetails.product_name}
                onChange={(e) => handleProductChange(index, e)}
                placeholder="Product Name"
                required
                className="product-input"
              />
              <input
                type="number"
                name="productquantity"
                value={orderdetails.productquantity}
                onChange={(e) => handleProductChange(index, e)}
                placeholder="Product Quantity"
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

export default OrderForm;
