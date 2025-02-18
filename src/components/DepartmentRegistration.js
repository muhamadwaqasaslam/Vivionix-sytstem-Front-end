import React, { useState } from "react";
import "./DepartmentForm.css";
import { BASE_URL } from "../config";

const DepartmentForm = () => {
  const initialDepartmentState = {
    name: "",
    description: "",
  };

  const [Department, setDepartment] = useState(initialDepartmentState);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = { ...Department };

    try {
      const response = await fetch(
        `${BASE_URL}employee/departments/`,
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
            errorData.message || "Failed to register Department"
          }`
        );
      }

      setSuccessMessage("Department added successfully!");
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDepartment(initialDepartmentState);
  };

  return (
    <div className="Department_form-container">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="form Department_registration" onSubmit={handleSubmit}>
        <h1 className="heading">Department Form</h1>

        <div className="input-group">
          <label>Department Name</label>
          <input
            type="text"
            name="name"
            value={Department.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            value={Department.description}
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

export default DepartmentForm;
