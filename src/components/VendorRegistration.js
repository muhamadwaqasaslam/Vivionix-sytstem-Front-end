import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "./VendorRegistration.css";


const VendorForm = () => {

  const [vendor, setVendor] = useState({
    vendorname: "",
    address: "",
    website: "",
    type: "",
    company_email: "",
    company_phone_number: "",
    productcatalog: "",
    registered_by: "",
    is_vendor: false,  
    contract_start_date: "",
  });
  


  const initialRepresentativeState = {
    name: "",
    designation: "",
    email: "",
    contact_number: "",
    contact_number2: "",
    visitingCard: "",
    registered_by: "" ,
    vendor: "",
    id: Date.now(),
  };

  const handlePhoneChange = (value) => {
    setVendor((prevVendor) => ({ ...prevVendor, company_phone_number: value }));
  };

 

  const [representatives, setRepresentatives] = useState([
    initialRepresentativeState,
  ]);
 
  const [loading, setLoading] = useState(false);

  const handleVendorChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    console.log("Selected file:", files ? files[0] : "No file selected"); // Debugging
    setVendor((prevVendor) => ({
      ...prevVendor,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };
  
  

  const handleRepresentativeChange = (id, e) => {
    const { name, value, files } = e.target;
    setRepresentatives((prevReps) =>
      prevReps.map((rep) =>
        rep.id === id ? { ...rep, [name]: files ? files[0] : value } : rep
      )
    );
  };

  const addMoreRepresentatives = () => {
    setRepresentatives([
      ...representatives,
      { ...initialRepresentativeState, id: Date.now() },
    ]);
  };

  const removeRepresentative = (id) => {
    setRepresentatives(representatives.filter((rep) => rep.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object
    const formData = new FormData();
  
    // Append vendor details
    formData.append("vendorname", vendor.vendorname);
    formData.append("address", vendor.address);
    formData.append("website", vendor.website);
    formData.append("type", vendor.type);
    formData.append("company_email", vendor.company_email);
    formData.append("company_phone_number", vendor.company_phone_number);
    formData.append("registered_by", vendor.registered_by);
    formData.append("is_vendor", vendor.is_vendor);
    formData.append("contract_start_date", vendor.contract_start_date);
  
    // Handle file upload for product catalog
    if (vendor.productcatalog) {
      formData.append("productcatalog", vendor.productcatalog);
    }
  
    // Append Representatives Data (Using Your Structure)
    representatives.forEach((rep, index) => {
      formData.append(`representatives[${index}][name]`, rep.name);
      formData.append(`representatives[${index}][designation]`, rep.designation);
      formData.append(`representatives[${index}][email]`, rep.email);
      formData.append(`representatives[${index}][contact_number]`, rep.contact_number);
      formData.append(`representatives[${index}][contact_number2]`, rep.contact_number2);
      formData.append(`representatives[${index}][registered_by]`, rep.registered_by);
      formData.append(`representatives[${index}][vendor]`, rep.vendor);
      
      // Handle visiting card upload
      if (rep.visitingCard) {
        formData.append(`representatives[${index}][visitingCard]`, rep.visitingCard);
      }
    });
  
    try {
      // Send request using fetch
      const response = await fetch("https://my.vivionix.com/vendors/create/", {
        method: "POST",
        body: formData, // Content-Type is automatically set to multipart/form-data
      });
  
      if (response.ok) {
        alert("Vendor registration submitted successfully!");
        setVendor({
          vendorname: "",
          address: "",
          website: "",
          type: "",
          company_email: "",
          company_phone_number: "",
          productcatalog: null,
          registered_by: "ds668640",
          is_vendor: true,
          contract_start_date: "",
        });
  
        // Reset representatives with new structure
        setRepresentatives([{
          name: "",
          designation: "",
          email: "",
          contact_number: "",
          contact_number2: "",
          visitingCard: "",
          registered_by: "",
          vendor: "",
        }]);
      } else {
        alert("Failed to submit vendor registration.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting.");
    }
  };
  
  
  
  
  return (
    <div className="vendor-form-container">
      <h2 className="vendor-heading">Vendor Registration Form</h2>

      <div className="vendor-section">
        <label>Name:</label>
        <input
          type="text"
          name="vendorname"
          value={vendor.vendorname}
          onChange={handleVendorChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={vendor.address}
          onChange={handleVendorChange}
          required
        />

        <label>Website:</label>
        <input
          type="text"
          name="website"
          value={vendor.website}
          onChange={handleVendorChange}
        />

        <label>Type:</label>
        <select name="type" value={vendor.type} onChange={handleVendorChange}>
          <option value="Manufacturer">Manufacturer</option>
          <option value="Importer">Importer</option>
          <option value="Distributor">Distributor</option>
        </select>

        <label>Contact Email:</label>
        <input
          type="text"
          name="company_email"
          value={vendor.company_email}
          onChange={handleVendorChange}
          required
        />

        <label>Contact Number:</label>
        <PhoneInput
          country={"us"}
          value={vendor.company_phone_number}
          onChange={handlePhoneChange}
          className="phone-input"
        />

        <label>Registered By:</label>
        <input
          type="text"
          name="registered_by"
          value={vendor.registered_by}
          onChange={handleVendorChange}
        />

        <label className="Is-vendor">
          Is Vendor:
          <input
            type="checkbox"
            name="is_vendor"
            className="vendor-checkbox"
            checked={vendor.is_vendor}
            onChange={handleVendorChange}
          />
        </label>

        <label>Contract Start Date:</label>
        <input
          type="date"
          name="contract_start_date"
          value={vendor.contract_start_date}
          onChange={handleVendorChange}
        />

        <label>Product Catalog:</label>
        <input
          type="file"
          name="productcatalog"
          onChange={handleVendorChange}
          accept=".pdf,.docx,.xlsx"
        />
      </div>

      <h2>Contact Person/Representative</h2>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Contact Email</th>
              <th>Register By</th>
              <th>Vendor</th>
              <th>Contact No (Office)</th>
              <th>Contact No (Personal)</th>
              <th>Visiting Card</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {representatives.map((rep) => (
              <tr key={rep.id}>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={rep.name}
                    onChange={(e) => handleRepresentativeChange(rep.id, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="designation"
                    value={rep.designation}
                    onChange={(e) => handleRepresentativeChange(rep.id, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={rep.email}
                    onChange={(e) => handleRepresentativeChange(rep.id, e)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="registered_by"
                    value={rep.registered_by}
                    onChange={(e) => handleRepresentativeChange(rep.id, e)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="vendor"
                    value={rep.vendor}
                    onChange={(e) => handleRepresentativeChange(rep.id, e)}
                  />
                </td>

                
                <td>
                  <input
                    type="text"
                    name="contact_number"
                    value={rep.contact_number}
                    onChange={(e) => handleRepresentativeChange(rep.id, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="contact_number2"
                    value={rep.contact_number2}
                    onChange={(e) => handleRepresentativeChange(rep.id, e)}
                  />
                </td>
                <td>
                  <input
                    type="file"
                    name="visitingCard"
                    onChange={(e) => handleRepresentativeChange(rep.id, e)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addMoreRepresentatives}
                  >
                    +
                  </button>
                  {representatives.length > 1 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeRepresentative(rep.id)}
                    >
                      -
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button type="submit" className="vendor-btn submit"  disabled={loading} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default VendorForm;
