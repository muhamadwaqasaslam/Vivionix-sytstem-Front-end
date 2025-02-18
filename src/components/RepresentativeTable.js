import React, { useState, useEffect } from "react";
import "./RepresentativeTable.css";
import axios from "axios";
import { BASE_URL } from "../config";

const RepresentativeTable = () => {
  const [representatives, setRepresentatives] = useState([]);
  const [error, setError] = useState("");
  const [selectedRepresentative, setSelectedRepresentative] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [search, setSearch] = useState({
    id: "",
    name: "",
    contact_number: "",
    email: "",
  });

  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}vendors/representatives/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setRepresentatives(response.data);
        }
      } catch (err) {
        setError("Failed to fetch representative data. Please try again.");
        console.error(err);
      }
    };

    fetchRepresentatives();
  }, []);

  // Filter representatives based on the search query for each column
  const filteredRepresentatives = representatives.filter((representative) =>
    (representative.id.toString().includes(search.id) &&
    representative.name.toLowerCase().includes(search.name.toLowerCase()) &&
    (representative.contact_number ? representative.contact_number.includes(search.contact_number) : true) &&
    (representative.email ? representative.email.toLowerCase().includes(search.email.toLowerCase()) : true))
  );

  const handleUpdateClick = (representative) => {
    setSelectedRepresentative(representative);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRepresentative(null);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `${BASE_URL}vendors/representatives/update/${selectedRepresentative.id}/`;

      const updatedRepresentativeData = {
        id: selectedRepresentative.id,
        name: selectedRepresentative.name,
        contact_number: selectedRepresentative.contact_number,
        email: selectedRepresentative.email,
      };

      const response = await axios.put(requestUrl, updatedRepresentativeData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setRepresentatives((prevRepresentatives) =>
          prevRepresentatives.map((representative) =>
            representative.id === selectedRepresentative.id
              ? { ...representative, ...updatedRepresentativeData }
              : representative
          )
        );
        setSuccessMessage("Representative updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setIsModalOpen(false);
      } else {
        setFailureMessage("Failed to update representative.");
        setTimeout(() => {
          setFailureMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error(
        "Error during the update:",
        err.response ? err.response.data : err.message
      );
      setFailureMessage("Failed to update representative. Please try again.");
      setTimeout(() => {
        setFailureMessage("");
      }, 2000);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedRepresentative({ ...selectedRepresentative, [field]: value });
  };

  return (
    <div className="representative-table">
      <h2>Representative List</h2>

      {error && <div className="representative-error-message">{error}</div>}
      {successMessage && <div className="representative-success-message">{successMessage}</div>}
      {failureMessage && <div className="representative-failure-message">{failureMessage}</div>}

      <table className="representative-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Action</th>
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
                placeholder="Search by Contact"
                value={search.contact_number}
                onChange={(e) =>
                  setSearch({ ...search, contact_number: e.target.value })
                }
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Email"
                value={search.email}
                onChange={(e) => setSearch({ ...search, email: e.target.value })}
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredRepresentatives.length > 0 ? (
            filteredRepresentatives.map((representative) => (
              <tr key={representative.id}>
                <td>{representative.id}</td>
                <td>{representative.name}</td>
                <td>{representative.contact_number}</td>
                <td>{representative.email}</td>
                <td>
                  <button
                    onClick={() => handleUpdateClick(representative)}
                    className="representative-update-button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No representatives available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedRepresentative && (
        <div className="representative-modal">
          <div className="representative-modal-content">
            <h3>Update Representative</h3>
            <form onSubmit={handleFormSubmit} className="representative-modal-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={selectedRepresentative.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contact Number:</label>
                <input
                  type="text"
                  value={selectedRepresentative.contact_number}
                  onChange={(e) =>
                    handleInputChange("contact_number", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={selectedRepresentative.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="representative-modal-buttons">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="representative-cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="representative-save-button">
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

export default RepresentativeTable;
