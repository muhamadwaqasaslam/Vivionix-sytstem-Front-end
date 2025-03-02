import React, { useState } from 'react';
import './OrderForm.css';  

const OrderForm = () => {
  const initialProductState = {
    productCode: '',
    productName: '',
    productRefNumber: '',
    brandName: '',
    packSize: '',
    unitPerPack: '',
    packPrice: '',
    orderQuantity: '',
    gstPercentage: '',
    totalPrice: '',
  };

   // File Change Handler
   const handleFileChange = (e) => {
    setOrderAttachment(e.target.files[0]);
  };

  // Missing State Variables
  const [orderNo, setOrderNo] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderDeliveryDate, setOrderDeliveryDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const [orderAttachment, setOrderAttachment] = useState(null);
  const [customer, setcustomer] = useState('');
  const [CustomerList] = useState(['Customer A', 'Customer B', 'Customer C']);
  const [products, setProducts] = useState([{ ...initialProductState, id: Date.now() }]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCustomerChange = (e) => {
    setcustomer(e.target.value);
  };

  const handleProductChange = (id, e) => {
    const { name, value, files } = e.target;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [name]: files ? files[0] : value } : product
      )
    );
  };

  const addMoreProducts = () => {
    setProducts([...products, { ...initialProductState, id: Date.now() }]);
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSave = () => {
    setIsSaved(true);
    setIsSubmitted(false);
    alert("Order details saved successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSaved) {
      alert("Please save the form before submitting.");
      return;
    }
    setIsSubmitted(true);
    setIsSaved(false);
    alert("Order submission successful!");
  };

  return (
    <div className="order-form-container">
      <h1 className="order-heading">Order Form</h1>
      
      <label>Order No:</label>
      <input type="text" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} required />

      <label>Order Date:</label>
      <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />

      <label>Order Attachment:</label>
      <input type="file" onChange={handleFileChange} />

      <label>Customer Name:</label>
      <input 
        type="text" 
        value={customer} 
        onChange={handleCustomerChange} 
        list="customer-list" 
        placeholder="Search or enter Customer name" 
        required 
        className='Customer-search'
      />
      <datalist id="customer-list">
        {CustomerList.map((v, index) => (
          <option key={index} value={v} />
        ))}
      </datalist>

      <label>Order Delivery Date:</label>
      <input type="date" value={orderDeliveryDate} onChange={(e) => setOrderDeliveryDate(e.target.value)} required />

      <label>Instructions (if any):</label>
      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />

      
      <h2 order-table-heading>Product Detail</h2>
      <div className="order-table-container">
        
        <table className="order-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Product Ref #</th>
              <th>Brand Name</th>
              <th>Pack Size</th>
              <th>Unit/Tests Per Pack</th>
              <th>Pack Price</th>
              <th>Order Quantity</th>
              <th>GST %</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td><input type="text" name="productCode" value={product.productCode} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="productName" value={product.productName} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="productRefNumber" value={product.productRefNumber} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="brandName" value={product.brandName} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="number" name="packSize" value={product.packSize} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="number" name="unitPerPack" value={product.unitPerPack} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="number" name="packPrice" value={product.packPrice} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="number" name="orderQuantity" value={product.orderQuantity} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="gstPercentage" value={product.gstPercentage} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="totalPrice" value={product.totalPrice} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td>
                  <button type="button" className="add-btn" onClick={addMoreProducts}>+</button>
                  {products.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removeProduct(product.id)}>-</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-button-container">
        <button type="button" className="order-btn save" onClick={handleSave} disabled={isSaved}>
          Save
        </button>
        <button type="submit" className="order-btn submit" onClick={handleSubmit} disabled={!isSaved || isSubmitted}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
