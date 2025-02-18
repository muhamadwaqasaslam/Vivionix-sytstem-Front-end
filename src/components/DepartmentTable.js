import React, { useState, useEffect } from "react";
import "./DepartmentTable.css";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import { BASE_URL } from "../config";

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [search, setSearch] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}employee/departments/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setDepartments(response.data);
        }
      } catch (err) {
        setError("Failed to fetch Department data. Please try again.");
        console.error(err);
      }
    };

    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter(
    (department) =>
      department.id.toString().includes(search.id) &&
      department.name.toLowerCase().includes(search.name.toLowerCase()) &&
      department.description
        .toLowerCase()
        .includes(search.description.toLowerCase())
  );

  const handleUpdateClick = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `${BASE_URL}employee/departments/edit/${selectedDepartment.id}/`;

      const updatedDepartmentData = {
        id: selectedDepartment.id,
        name: selectedDepartment.name,
        description: selectedDepartment.description,
      };

      const response = await axios.put(requestUrl, updatedDepartmentData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setDepartments((prevDepartments) =>
          prevDepartments.map((department) =>
            department.id === selectedDepartment.id
              ? { ...department, ...updatedDepartmentData }
              : department
          )
        );
        setSuccessMessage("Department updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setIsModalOpen(false);
      } else {
        setFailureMessage("Failed to update Department.");
        setTimeout(() => {
          setFailureMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error(
        "Error during the update:",
        err.response ? err.response.data : err.message
      );
      setFailureMessage("Failed to update Department. Please try again.");
      setTimeout(() => {
        setFailureMessage("");
      }, 2000);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(
        `http://192.168.18.29:8000/employee/departments/delete/${id}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Delete response:", response);
  
      if (response.status === 204) {
        setDepartments((prevDepartments) =>
          prevDepartments.filter((department) => department.id !== id)
        );
        setSuccessMessage("Department deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 2000);
      } else {
        setFailureMessage("Unexpected response from the server.");
        setTimeout(() => setFailureMessage(""), 2000);
      }
    } catch (err) {
      console.error("Error during deletion:", err.response?.data || err.message);
      setFailureMessage("Failed to delete Department. Please try again.");
      setTimeout(() => setFailureMessage(""), 2000);
    }
  };
  

  const handleInputChange = (field, value) => {
    setSelectedDepartment({ ...selectedDepartment, [field]: value });
  };

  return (
    <div className="Department-table">
      <h2>Department List</h2>

      {error && <div className="Department-error-message">{error}</div>}
      {successMessage && (
        <div className="Department-success-message">{successMessage}</div>
      )}
      {failureMessage && (
        <div className="Department-failure-message">{failureMessage}</div>
      )}

      <table className="Department-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="description-column">Description</th>
            <th className="action-column" rowSpan={2}>Action</th>
          </tr>
          <tr>
            <th>
              <input
                type="text"
                placeholder="Search by ID"
                value={search.id}
                onChange={(e) => setSearch({ ...search, id: e.target.value })}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Name"
                value={search.name}
                onChange={(e) => setSearch({ ...search, name: e.target.value })}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Description"
                value={search.description}
                onChange={(e) =>
                  setSearch({ ...search, description: e.target.value })
                }
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((department) => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.name}</td>
                <td  className="description-column">{department.description}</td>
                <td className="action-column">
                  <FaEdit
                    className="Department-edit-icon"
                    onClick={() => handleUpdateClick(department)}
                    title="Edit"
                  />
                  <FaTrash
                    className="Department-delete-icon"
                    title="Delete"
                    onClick={() => handleDeleteClick(department.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Department available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedDepartment && (
        <div className="department-modal">
          <div className="department-modal-content">
            <h3>Update Department</h3>
            <form onSubmit={handleFormSubmit} className="department-modal-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={selectedDepartment.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  rows="15"

                  type="text"
                  value={selectedDepartment.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>

              <div className="department-modal-buttons">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="department-cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="department-save-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
