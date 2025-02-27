import React, { useState } from "react";
import "./VendorRegistration.css";

const VendorForm = () => {
  const initialRepresentativeState = {
    name: "",
    designation: "",
    productEmail: "",
    officeproduct: "",
    personalproduct: "",
    address: "",
    visitingCard: null,
    id: Date.now(),
  };

  const [vendor, setVendor] = useState({
    name: "",
    address: "",
    website: "",
    type: "",
    productEmail: "",
    productNumber: "",
    productCatalog: null,
  });

  const [representative, setRepresentative] = useState([initialRepresentativeState]);
  const [isSaved, setIsSaved] = useState(false);
  const [savedVendor, setSavedVendor] = useState(null);

  const handleVendorChange = (e) => {
    const { name, value, files } = e.target;
    setVendor((prevVendor) => ({
      ...prevVendor,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRepresentativeChange = (id, e) => {
    const { name, value, files } = e.target;
    setRepresentative((prevReps) =>
      prevReps.map((rep) =>
        rep.id === id ? { ...rep, [name]: files ? files[0] : value } : rep
      )
    );
  };

  const addMoreRepresentatives = () => {
    setRepresentative([...representative, { ...initialRepresentativeState, id: Date.now() }]);
  };

  const removeRepresentative = (id) => {
    setRepresentative(representative.filter((rep) => rep.id !== id));
  };

  const handleSave = () => {
    setIsSaved(true);
    setSavedVendor(vendor);
    alert("Vendor details saved successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSaved) {
      alert("Please save the form before submitting.");
      return;
    }
    alert("Vendor registration submitted successfully!");
  };

  return (
    <div className="vendor-form-container">
      <h1 className="vendor-heading">Vendor Registration Form</h1>
      <h2>Vendor Information Table</h2>

      <div className="table-container">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Website</th>
              <th>Type</th>
              <th>Product Email</th>
              <th>Product Number</th>
              <th>Product Catalog</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" name="name" value={vendor.name} onChange={handleVendorChange} required /></td>
              <td><input type="text" name="address" value={vendor.address} onChange={handleVendorChange} required /></td>
              <td><input type="text" name="website" value={vendor.website} onChange={handleVendorChange} /></td>
              <td>
                <select name="type" value={vendor.type} onChange={handleVendorChange}>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Importer">Importer</option>
                  <option value="Distributor">Distributor</option>
                </select>
              </td>
              <td><input type="text" name="productEmail" value={vendor.productEmail} onChange={handleVendorChange} required /></td>
              <td><input type="text" name="productNumber" value={vendor.productNumber} onChange={handleVendorChange} /></td>
              <td><input type="file" name="productCatalog" onChange={handleVendorChange} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Product Person/Representative</h2>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Product Email</th>
              <th>Office Product</th>
              <th>Personal Product</th>
              <th>Address</th>
              <th>Visiting Card</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {representative.map((rep) => (
              <tr key={rep.id}>
                <td><input type="text" name="name" value={rep.name} onChange={(e) => handleRepresentativeChange(rep.id, e)} /></td>
                <td><input type="text" name="designation" value={rep.designation} onChange={(e) => handleRepresentativeChange(rep.id, e)} /></td>
                <td><input type="text" name="productEmail" value={rep.productEmail} onChange={(e) => handleRepresentativeChange(rep.id, e)} /></td>
                <td><input type="text" name="officeproduct" value={rep.officeproduct} onChange={(e) => handleRepresentativeChange(rep.id, e)} /></td>
                <td><input type="text" name="personalproduct" value={rep.personalproduct} onChange={(e) => handleRepresentativeChange(rep.id, e)} /></td>
                <td><input type="text" name="address" value={rep.address} onChange={(e) => handleRepresentativeChange(rep.id, e)} /></td>
                <td><input type="file" name="visitingCard" onChange={(e) => handleRepresentativeChange(rep.id, e)} /></td>
                <td>
                  <button type="button" className="add-btn" onClick={addMoreRepresentatives}>+</button>
                  {representative.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removeRepresentative(rep.id)}>-</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button type="button" className="vendor-btn save" onClick={handleSave}>Save</button>
        <button type="submit" className="vendor-btn submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default VendorForm;
