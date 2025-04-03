import React, { useState } from 'react';
import './ProductForm.css';  

const ProductForm = () => {
  const initialProductState = {
    product_name: '',
    reference_number: '',
    packsize: '',
    packprice: '',
    price_date: '',
    vendor_display_name: '',
    is_available:'',
    remarks:'',
    registered_by: '',
    Qualitycertifications: '',
    product_category: '',
    brochure: null,
    ifu: null, 
    certificates: null,
  };

  
// {
//   "product_id": "dsp096702",
//   "product_name": "sanitizer",
//   "reference_number": "1122",
//   "packsize": "12",
//   "packprice": "234",
//   "price_date": "2025-04-02",
//   "vendor_display_name": "taimorrs",
//   "is_available": true,
//   "remarks": "erdsssss",
//   "registered_by": "ds045776",
//   "Qualitycertifications": "yes",
//   "product_category": "Chemical",
//   "brocure": null,
//   "ifu": null,
//   "certificates": null
// }


  const [products, setProducts] = useState([{ ...initialProductState, id: Date.now() }]);

  const handleVendorChange = (e, id) => {
    const { value } = e.target;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, vendor_display_name: value } : product
      )
    );
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
    setProducts((prevProducts) => {
      if (prevProducts.length === 0) {
        return [{ ...initialProductState, id: Date.now() }];
      }
  
      return [
        ...prevProducts,
        {
          ...initialProductState,
          id: Date.now(),
          vendor_display_name: prevProducts[0].vendor_display_name, // Keep the first product's vendor
        },
      ];
    });
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object
    const formData = new FormData();
  
    // Loop through all the products and append each field to the FormData object
    products.forEach((product) => {
      formData.append('product_name', product.product_name);
      formData.append('reference_number', product.reference_number);
      formData.append('packsize', product.packsize);
      formData.append('packprice', product.packprice);
      formData.append('price_date', product.price_date);
      formData.append('vendorname', product.vendor_display_name);
      formData.append('is_available', product.is_available);
      formData.append('remarks', product.remarks);
      formData.append('registered_by', product.registered_by);
      formData.append('Qualitycertifications', product.Qualitycertifications);
      formData.append('product_category', product.product_category);
      // Handle files
      if (product.brochure) formData.append('brochure', product.brochure);
      if (product.ifu) formData.append('ifu', product.ifu);
      if (product.certificates) formData.append('certificates', product.certificates);
    });
  
    try {
      // Send the request using FormData. Do not set Content-Type manually as it is automatically set by the browser
      const response = await fetch('https://my.vivionix.com/products/register/', {
        method: 'POST',
        body: formData,  // Automatically sets Content-Type to multipart/form-data
      });
  
      if (response.ok) {
        alert('Product registration submitted successfully!');
        setProducts([{ ...initialProductState, id: Date.now() }]);
      } else {
        alert('Failed to submit product registration.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting.');
    }
  };
  

  return (
    <div className="product-form-container">
      <h1 className="product-heading">Product Registration Form</h1>
      
      {products.map((product, index) => (
      <div key={product.id}>
        <label>Vendor Name:</label>
        <input
          type="text"
          name="vendorname"
          value={product.vendor_display_name}
          onChange={(e) => handleVendorChange(e, product.id)}
          placeholder="Enter vendor name"
          required
          className="vendor-search"
        />
      </div>
    ))}

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Product Name</th>
              <th>Ref No/ Cat No</th>
              <th>Pack Size</th>
              <th>Pack Price</th>
              <th>Price Date</th>
              <th>Is Available</th>
              <th>remarks</th>
              <th>Registered By</th>
              <th>Quality Certifications</th>
              <th>Product Category</th>
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
                <td><input type="text" name="product_name" value={product.product_name} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="reference_number" value={product.reference_number} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="number" name="packsize" value={product.packsize} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="number" name="packprice" value={product.packprice} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="date" name="price_date" value={product.price_date} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="checkbox" name="is_available" value={product.is_available} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="remarks" value={product.remarks} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="registered_by" value={product.registered_by} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td><input type="text" name="Qualitycertifications" value={product.Qualitycertifications} onChange={(e) => handleProductChange(product.id, e)} required /></td>
                <td>
                  <select name="product_category" value={product.product_category} onChange={(e) => handleProductChange(product.id, e)}>
                    <option value="Equipment">Equipment</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Consumable Device">Consumable Device</option>
                  </select>
                </td>
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
        <button type="submit" className="product-btn submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
