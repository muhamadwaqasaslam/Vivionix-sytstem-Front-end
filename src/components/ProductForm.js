import React, { useState } from 'react';
import './ProductForm.css';  

const ProductForm = () => {
  const initialProductState = {
    name: '',
    referenceNumber: '',
    brandName: '',
    packSize: '',
    unitPerPack: '',
    qualityCertifications: '',
    productCategory: 'Equipment',
    productId: '',
    brochure: null,
    ifu: null,
    certificates: null,
  };

  const [vendor, setVendor] = useState('');
  const [vendorList] = useState(['Vendor A', 'Vendor B', 'Vendor C']);
  const [products, setProducts] = useState([{ ...initialProductState, id: Date.now() }]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVendorChange = (e) => {
    setVendor(e.target.value);
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
    alert("Product details saved successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSaved) {
      alert("Please save the form before submitting.");
      return;
    }
    setIsSubmitted(true);
    setIsSaved(false);
    alert("Product registration submitted successfully!");
  };

  return (
    <div className="product-form-container">
      <h1 className="product-heading">Product Registration Form</h1>
      
      <label>Vendor Name:</label>
      <input 
        type="text" 
        value={vendor} 
        onChange={handleVendorChange} 
        list="vendor-list" 
        placeholder="Search or enter vendor name" 
        required 
        className='vendor-search'
      />
      <datalist id="vendor-list">
        {vendorList.map((v, index) => (
          <option key={index} value={v} />
        ))}
      </datalist>

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Product Registration Date</th>
              <th>Name</th>
              <th>Ref No/ Cat No</th>
              <th>Brand Name</th>
              <th>Pack Size</th>
              <th>Unit/Tests Per Pack</th>
              <th>Quality Certifications</th>
              <th>Product Category</th>
              <th>Product ID</th>
              <th>Brochure</th>
              <th>IFU</th>
              <th>Certificates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td><input type="text" name="name" value={product.name} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="referenceNumber" value={product.referenceNumber} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="brandName" value={product.brandName} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="packSize" value={product.packSize} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="unitPerPack" value={product.unitPerPack} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="qualityCertifications" value={product.qualityCertifications} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td>
                  <select name="productCategory" value={product.productCategory} onChange={(e) => handleProductChange(product.id, e)}>
                    <option value="Equipment">Equipment</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Consumable Device">Consumable Device</option>
                  </select>
                </td>
                <td><input type="text" name="productId" value={product.productId} onChange={(e) => handleProductChange(product.id, e)} /></td>
                <td><input type="file" name="brochure" onChange={(e) => handleProductChange(product.id, e)} /></td>
                <td><input type="file" name="ifu" onChange={(e) => handleProductChange(product.id, e)} /></td>
                <td><input type="file" name="certificates" onChange={(e) => handleProductChange(product.id, e)} /></td>
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

      <div className="product-button-container">
        <button type="button" className="product-btn save" onClick={handleSave} disabled={isSaved}>
          Save
        </button>
        <button type="submit" className="product-btn submit" onClick={handleSubmit} disabled={!isSaved || isSubmitted}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
