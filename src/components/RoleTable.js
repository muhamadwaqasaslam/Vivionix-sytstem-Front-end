import React, { useState, useEffect } from "react";
import "./RoleTable.css";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import { BASE_URL } from "../config"; 

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [search, setSearch] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}employee/roles/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setRoles(response.data);
        }
      } catch (err) {
        setError("Failed to fetch role data. Please try again.");
        console.error(err);
      }
    };

    fetchRoles();
  }, []);

  const filteredRoles = roles.filter((role) =>
    role.id.toString().includes(search.id) &&
    (role.title?.toLowerCase().includes(search.title.toLowerCase()) ?? false) &&
    (role.description?.toLowerCase().includes(search.description.toLowerCase()) ?? false)
  );

  const handleUpdateClick = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `${ BASE_URL }employee/roles/edit/${selectedRole.id}/`;

      const updatedRoleData = {
        id: selectedRole.id,
        title: selectedRole.title,
        description: selectedRole.description,
      };

      const response = await axios.put(requestUrl, updatedRoleData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.id === selectedRole.id
              ? { ...role, ...updatedRoleData }
              : role
          )
        );
        setSuccessMessage("Role updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setIsModalOpen(false);
      } else {
        setFailureMessage("Failed to update role.");
        setTimeout(() => {
          setFailureMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error(
        "Error during the update:",
        err.response ? err.response.data : err.message
      );
      setFailureMessage("Failed to update role. Please try again.");
      setTimeout(() => {
        setFailureMessage("");
      }, 2000);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(
        `${ BASE_URL }employee/roles/delete/${id}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        setRoles((prevRoles) =>
          prevRoles.filter((role) => role.id !== id)
        );
        setSuccessMessage("Role deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 2000);
      } else {
        setFailureMessage("Unexpected response from the server.");
        setTimeout(() => setFailureMessage(""), 2000);
      }
    } catch (err) {
      console.error("Error during deletion:", err.response?.data || err.message);
      setFailureMessage("Failed to delete role. Please try again.");
      setTimeout(() => setFailureMessage(""), 2000);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedRole({ ...selectedRole, [field]: value });
  };

  return (
    <div className="Role-table">
      <h2>Role List</h2>

      {error && <div className="Role-error-message">{error}</div>}
      {successMessage && (
        <div className="Role-success-message">{successMessage}</div>
      )}
      {failureMessage && (
        <div className="Role-failure-message">{failureMessage}</div>
      )}

      <table className="Role-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th className="description-column">Description</th>
            <th className="action-column">Action</th>
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
                placeholder="Search by Title"
                value={search.title}
                onChange={(e) =>
                  setSearch({ ...search, title: e.target.value })
                }
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.length > 0 ? (
            filteredRoles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.title}</td>
                <td className="description-column">{role.description}</td>
                <td className="action-column">
                  <FaEdit
                    className="Role-edit-icon"
                    onClick={() => handleUpdateClick(role)}
                    title="Edit"
                  />
                  <FaTrash
                    className="Role-delete-icon"
                    title="Delete"
                    onClick={() => handleDeleteClick(role.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Roles available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedRole && (
        <div className="role-modal">
          <div className="role-modal-content">
            <h3>Update Role</h3>
            <form onSubmit={handleFormSubmit} className="role-modal-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={selectedRole.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  rows="15"
                  type="text"
                  value={selectedRole.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>

              <div className="role-modal-buttons">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="role-cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="role-save-button">
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

export default RoleTable;
