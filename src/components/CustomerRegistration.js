import React, { useState } from "react";
import "./CustomerForm.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const CustomerForm = () => {
  const [representatives, setRepresentatives] = useState([{}]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addRepresentative = () => {
    setRepresentatives([...representatives, {}]);
  };

  const removeRepresentative = (index) => {
    const updatedReps = representatives.filter((_, i) => i !== index);
    setRepresentatives(updatedReps);
  };

  const handleSave = () => {
    setIsSaved(true);
    setIsSubmitted(false); // Reset submit state when saving again
    alert("Vendor details saved successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSaved) {
      alert("Please save the form before submitting.");
      return;
    }
    setIsSubmitted(true);
    setIsSaved(false); // Disable "Save" again after submission
    alert("Vendor registration submitted successfully!");
  };

  return (
    <div className="customer-form-container">
      <h2 className="customer-form-title">Customer Information Form</h2>
      <div className="customer-form-section">
        <div className="customer-form-group">
          <label>Date of Registration:</label>
          <input type="text" value="Auto Generated" disabled />
        </div>
        <div className="customer-form-group">
          <label>Customer ID:</label>
          <input type="text" value="Auto Generated" disabled />
        </div>
        <div className="customer-form-group">
          <label>Name:</label>
          <input type="text" />
        </div>
        <div className="customer-form-group">
          <label>Address:</label>
          <input type="text" />
        </div>
        <div className="customer-form-group">
          <label>City:</label>
          <input type="text" />
        </div>
        <div className="customer-form-group">
          <label>Office Email Contact:</label>
          <input type="email" />
        </div>
        <div className="customer-form-group">
          <label>Office Contact No:</label>
          <input type="text" />
        </div>
        <div className="customer-form-group">
          <label>Category:</label>
          <select>
            <option>Private</option>
            <option>Public</option>
          </select>
        </div>
        <div className="customer-form-group">
          <label>Type:</label>
          <select>
            <option>Hospital</option>
            <option>Clinic</option>
          </select>
        </div>
        <div className="customer-form-group">
          <label>Patient Capacity:</label>
          <select>
            <option>High End</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      <h3 className="representative-title">Representatives Information</h3>
      <div className="representative-table-container">
        <table className="representative-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Education Field</th>
              <th>Designation</th>
              <th>Contact No</th>
              <th>Contact Email</th>
              <th>Qualification</th>
              <th>Customer Name</th>
              <th>Visiting Card/CV</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {representatives.map((_, index) => (
              <tr key={index}>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="email" /></td>
                <td><input type="text" /></td>
                <td><select><option>Select from register</option></select></td>
                <td><input type="file" /></td>
                <td className="row-icon">
                  <button type="button" className="add-btn" onClick={addRepresentative}>
                    <FaPlus />
                  </button>
                  {representatives.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removeRepresentative(index)}>
                      <FaMinus />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button type="button" className="vendor-btn save" onClick={handleSave} disabled={isSaved}>
          Save
        </button>
        <button type="submit" className="vendor-btn submit" onClick={handleSubmit} disabled={!isSaved || isSubmitted}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CustomerForm;
