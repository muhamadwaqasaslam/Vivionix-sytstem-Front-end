import React, { useState } from "react";
import "./VendorRegistration.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BASE_URL } from "../config";

const VendorContactForm = () => {
  const initialVendorState = {
    vendor_id: "",
    vendorname: "",
    company_email: "",
    company_phone_number: "",
    address: "",
    contract_start_date: "",
    is_vendor: true,
    registered_by: "",
    category_name: "",
    representatives: [], // Changed to store representative names directly
  };

  const [vendor, setVendor] = useState(initialVendorState);
  const [newRepresentative, setNewRepresentative] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (value) => {
    setVendor((prevState) => ({
      ...prevState,
      company_phone_number: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setVendor((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleAddRepresentative = () => {
    if (!newRepresentative.trim()) {
      alert("Representative name cannot be empty!");
      return;
    }
    // Check if the representative already exists
    if (
      vendor.representatives.some(
        (rep) => rep === newRepresentative.trim()
      )
    ) {
      alert("This representative is already added!");
      return;
    }

    setVendor((prevState) => ({
      ...prevState,
      representatives: [
        ...prevState.representatives,
        newRepresentative.trim(),
      ],
    }));
    setNewRepresentative("");
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Update regex based on your phone validation rules
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(vendor.company_phone_number)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      ...vendor,
      representatives: vendor.representatives, // Send names directly
    };

    try {
      const response = await fetch(
        `${ BASE_URL }vendors/create/`,
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
        throw new Error(`Error ${response.status}: ${errorData.message || "Failed to register vendor"}`);
      }

      setSuccessMessage("Vendor registered successfully!");
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setVendor(initialVendorState);
    setNewRepresentative("");
  };

  return (
    <div className="vendor_form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form vendor_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Vendor Form</h1>

        {/* Vendor Name */}
        <div className="input-group">
          <label>Vendor Name</label>
          <input
            type="text"
            name="vendorname"
            value={vendor.vendorname}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Company Email */}
        <div className="input-group">
          <label>Company Email</label>
          <input
            type="email"
            name="company_email"
            value={vendor.company_email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Company Phone Number */}
        <div className="input-group">
          <label>Company Phone Number</label>
          <PhoneInput
            country="us"
            value={vendor.company_phone_number}
            onChange={handlePhoneChange}
            inputProps={{
              name: "company_phone_number",
              required: true,
            }}
            className="phone-input"
          />
        </div>

        {/* Address */}
        <div className="input-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={vendor.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Contract Start Date */}
        <div className="input-group">
          <label>Contract Start Date</label>
          <input
            type="date"
            name="contract_start_date"
            value={vendor.contract_start_date}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Registered By */}
        <div className="input-group">
          <label>Register by</label>
          <input
            type="text"
            name="registered_by"
            value={vendor.registered_by}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Vendor Type */}
        <div className="input-group checkbox-group">
          <label>
            Is Vendor
            <input
              type="checkbox"
              name="is_vendor"
              checked={vendor.is_vendor}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>

        {/* Category */}
        <div className="input-group">
          <label>Category</label>
          <select
            name="category_name"
            value={vendor.category_name}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="technology">Technology</option>
            <option value="importer">Importer</option>
          </select>
        </div>

        {/* Representatives */}
        <div className="input-group">
          <label>Representatives </label>
          <div className="representatives-list">
            {vendor.representatives.map((rep, index) => (
              <li key={index} className="representative-item">
                {rep}
              </li>
            ))}
          </div>

          <div className="representative-input">
            <input
              type="text"
              value={newRepresentative}
              onChange={(e) => setNewRepresentative(e.target.value)}
              placeholder="Add a representative"
            />
            <button
              type="button"
              className="add-icon"
              onClick={handleAddRepresentative}
            >
              +
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-container">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorContactForm;
