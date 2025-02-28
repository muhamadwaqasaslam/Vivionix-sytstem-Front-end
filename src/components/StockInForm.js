import React, { useState } from "react";
import "./StockForm.css";
import { FaPlus, FaMinus } from "react-icons/fa";


const dummyData = {
    Product1: {
      ref: "REF001",
      brand: "BrandA",
      packSize: "10 Units",
      packPrice: "$50",
      lotNo: "LOT1234"
    },
    Product2: {
      ref: "REF002",
      brand: "BrandB",
      packSize: "20 Units",
      packPrice: "$80",
      lotNo: "LOT5678"
    }
  };
const StockForm = () => {

    
    const [products, setProducts] = useState([{}]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const addProduct = () => {
    setProducts([...products, {}]);
  };

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSave = () => {
    setIsSaved(true);
    setIsSubmitted(false);
    alert("Stock details saved successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSaved) {
      alert("Please save the form before submitting.");
      return;
    }
    setIsSubmitted(true);
    setIsSaved(false);
    alert("Stock entry submitted successfully!");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setReceipt(file);
    } else {
      alert("Please upload a valid PDF file.");
      setReceipt(null);
    }
  };

  const handleProductChange = (index, value) => {
    const updatedProducts = [...products];
    if (value in dummyData) {
      updatedProducts[index] = dummyData[value];
    } else {
      updatedProducts[index] = {};
    }
    setProducts(updatedProducts);
  };

  return (
    <div className="stock-form-container">
      <h2 className="stock-form-title">Stock Information Form</h2>

      <div className="stock-form-section">
        <div className="stock-form-group">
          <label>Stock In Date:</label>
          <input type="text" value={new Date().toLocaleDateString()} disabled />
        </div>

        <div className="stock-form-group">
          <label>Stock In By:</label>
          <input type="text" value="User123 (Auto Fetched)" disabled />
        </div>

        <div className="stock-form-group">
          <label>Stock In Type:</label>
          <select>
            <option value="import">Import</option>
            <option value="local purchase">Local Purchase</option>
            <option value="loan">Loan</option>
            <option value="product return">Product Return</option>
            <option value="replacement">Replacement</option>
          </select>
        </div>

        <div className="stock-form-group">
          <label>Receipt No:</label>
          <input type="text" />
        </div>

        <div className="stock-form-group">
          <label>Attach Receipt (PDF):</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
      </div>

      <h3 className="stock-item-title">Product Details</h3>
      <table className="stock-item-table">
        <thead>
        <tr>
            <th style={{ width: "150px" }}>Product Name</th>
            <th style={{ width: "150px" }}>Product Ref/Cat No</th>
            <th style={{ width: "150px" }}>Brand Name</th>
            <th style={{ width: "150px" }}>Pack Size</th>
            <th style={{ width: "150px" }}>Pack Price</th>
            <th style={{ width: "150px" }}>Lot No</th>
            <th style={{ width: "150px" }}>Manufacturing Date</th>
            <th style={{ width: "150px" }}>Expiry Date</th>
            <th style={{ width: "150px" }}>Quantity</th>
            <th style={{ width: "150px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <select onChange={(e) => handleProductChange(index, e.target.value)}>
                  <option value="">Select Product</option>
                  <option value="Product1">Product1</option>
                  <option value="Product2">Product2</option>
                </select>
              </td>
              <td><input type="text" value={product.ref || ""} disabled /></td>
              <td><input type="text" value={product.brand || ""} disabled /></td>
              <td><input type="text" value={product.packSize || ""} disabled /></td>
              <td><input type="text" value={product.packPrice || ""} disabled /></td>
              <td><input type="text" value={product.lotNo || ""} /></td>
              <td><input type="date" /></td>
              <td><input type="date" /></td>
              <td><input type="number" /></td>
              <td className="Stockrow-icon">
                <button className="icon-button plus" onClick={addProduct}>
                  <FaPlus />
                </button>
                {products.length > 1 && (
                  <button className="icon-button remove" onClick={() => removeProduct(index)}>
                    <FaMinus />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="button-container">
        <button type="button" className="stock-btn save" onClick={handleSave} disabled={isSaved}>
          Save
        </button>
        <button type="submit" className="stock-btn submit" onClick={handleSubmit} disabled={!isSaved || isSubmitted}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default StockForm;
