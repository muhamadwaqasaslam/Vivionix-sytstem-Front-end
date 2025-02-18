import React, { useState, useEffect } from "react";
import "./CategoryTable.css";
import axios from "axios";
import { BASE_URL } from '../config';

const CompanyCategoryTable = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [search, setSearch] = useState({
    id: "",
    name: "",
    registered_by: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}customers/category/list_all/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setCategory(response.data);
        }
      } catch (err) {
        setError("Failed to fetch Company Category data. Please try again.");
        console.error(err);
      }
    };

    fetchCategory();
  }, []);

  const filteredCategory = category.filter((category) =>
    category.id.toString().includes(search.id) &&
    (category.name?.toLowerCase().includes(search.name.toLowerCase()) ?? false) &&
    (category.registered_by?.toLowerCase().includes(search.registered_by.toLowerCase()) ?? false)
  );
  

  const handleUpdateClick = (cat) => {
    setSelectedCategory(cat);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `${BASE_URL}customers/category/update/${selectedCategory.id}/`;

      const updatedCategoryData = {
        id: selectedCategory.id,
        name: selectedCategory.name,
        registered_by: selectedCategory.registered_by,
      };

      const response = await axios.put(requestUrl, updatedCategoryData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setCategory((prevCategory) =>
          prevCategory.map((cat) =>
            cat.id === selectedCategory.id
              ? { ...cat, ...updatedCategoryData }
              : cat
          )
        );
        setSuccessMessage("Category updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setIsModalOpen(false);
      } else {
        setFailureMessage("Failed to update category.");
        setTimeout(() => {
          setFailureMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error(
        "Error during the update:",
        err.response ? err.response.data : err.message
      );
      setFailureMessage("Failed to update category. Please try again.");
      setTimeout(() => {
        setFailureMessage("");
      }, 2000);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedCategory({ ...selectedCategory, [field]: value });
  };

  return (
    <div className="category-table">
      <h2>Company Category List</h2>

      {error && <div className="category-error-message">{error}</div>}
      {successMessage && <div className="category-success-message">{successMessage}</div>}
      {failureMessage && <div className="category-failure-message">{failureMessage}</div>}

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Registered By</th>
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
                placeholder="Search by Registered By"
                value={search.registered_by}
                onChange={(e) =>
                  setSearch({ ...search, registered_by: e.target.value })
                }
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCategory.length > 0 ? (
            filteredCategory.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.registered_by}</td>
                <td className="action-column">
                  <button
                    onClick={() => handleUpdateClick(cat)}
                    className="category-update-button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Company Category available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedCategory && (
        <div className="category-modal">
          <div className="category-modal-content">
            <h3>Update Category</h3>
            <form onSubmit={handleFormSubmit} className="category-modal-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={selectedCategory.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Registered By:</label>
                <input
                  type="text"
                  value={selectedCategory.registered_by}
                  onChange={(e) =>
                    handleInputChange("registered_by", e.target.value)
                  }
                />
              </div>

              <div className="category-modal-buttons">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="category-cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="category-save-button">
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

export default CompanyCategoryTable;
