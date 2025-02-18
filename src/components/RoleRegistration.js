import React, { useState } from "react";
import "./RoleForm.css"; 
import { BASE_URL } from "../config";

const RoleForm = () => {
  const initialRoleState = {
    title: "",
    description: "",
  };

  const [Role, setRole] = useState(initialRoleState);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRole((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = { ...Role };

    try {
      const response = await fetch(
        `${ BASE_URL }employee/roles/`,
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
            errorData.message || "Failed to register Role"
          }`
        );
      }

      setSuccessMessage("Role added successfully!");
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRole(initialRoleState);
  };

  return (
    <div className="Role_form-container">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form Role_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Role Form</h1>

        <div className="input-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={Role.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            value={Role.description}
            onChange={handleInputChange}
            required
            className="textarea"
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

export default RoleForm;
