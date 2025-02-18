import React, { useState, useEffect } from "react";
import "./VendorTable.css";
import axios from "axios";
import { BASE_URL } from "../config";

const VendorTable = () => {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [filters, setFilters] = useState({
    vendor_id: "",
    vendorname: "",
    company_email: "",
    company_phone_number: "",
    address: "",
    contract_start_date: "",
    is_vendor: "",
    registered_by: "",
    category_name: "",
    representatives_name: "",
  });

  // Toggle navbar visibility when modal is open
  useEffect(() => {
    const navbar = document.querySelector(".navbar"); // Assuming your navbar has this class
    if (isModalOpen) {
      navbar?.classList.add("hidden");
    } else {
      navbar?.classList.remove("hidden");
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}vendors/list_all/`
        );
        if (response.data) {
          const formattedVendors = response.data.map((vendor) => ({
            ...vendor,
            representatives_name: vendor.representatives_name || [],
          }));
          setVendors(formattedVendors);
        }
      } catch (err) {
        console.error("Error fetching vendors:", err.message);
        setError("Failed to fetch vendor data. Please try again.");
      }
    };

    fetchVendors();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredVendors = vendors.filter((vendor) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      const value = vendor[key]?.toString().toLowerCase() || "";
      return value.includes(filters[key].toLowerCase());
    });
  });

  const handleUpdateClick = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVendor(null);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `${ BASE_URL }vendors/update/${selectedVendor.vendor_id}/`;

      const updatedVendorData = {
        ...selectedVendor,
        representatives: selectedVendor.representatives_name,
      };

      const response = await axios.put(requestUrl, updatedVendorData);

      if (response.status === 200) {
        const updatedVendor = response.data;
        setVendors((prevVendors) =>
          prevVendors.map((vendor) =>
            vendor.vendor_id === selectedVendor.vendor_id
              ? { ...vendor, ...updatedVendor }
              : vendor
          )
        );
        setSuccessMessage("Vendor updated successfully!");
        setTimeout(() => setSuccessMessage(""), 2000);
        setIsModalOpen(false);
      } else {
        setFailureMessage("Failed to update vendor.");
        setTimeout(() => setFailureMessage(""), 2000);
      }
    } catch (err) {
      console.error(
        "Error during the update:",
        err.response ? err.response.data : err.message
      );
      setFailureMessage("Failed to update vendor. Please try again.");
      setTimeout(() => setFailureMessage(""), 2000);
    }
  };

  const handleInputChange = (field, value) => {
    const updatedVendor = { ...selectedVendor };
    updatedVendor[field] = value;
    setSelectedVendor(updatedVendor);
  };

  return (
    <div className="vendor-list">
      <h2>Vendor List</h2>

      {error && <div className="vendor-error-message">{error}</div>}
      {successMessage && (
        <div className="vendor-success-message">{successMessage}</div>
      )}
      {failureMessage && (
        <div className="vendor-failure-message">{failureMessage}</div>
      )}

      <table className="vendor-table">
        <thead>
          <tr>
            <th>Vendor ID</th>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Contract Start Date</th>
            <th>Is Vendor</th>
            <th>Registered By</th>
            <th>Category</th>
            <th>Representative Name</th>
            <th>Action</th>
          </tr>
          <tr className="search-row">
            {Object.keys(filters).map((key) => (
              <th key={key}>
                <input
                  type="text"
                  placeholder={`Search by ${key.replace("_", " ")}...`}
                  value={filters[key]}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                />
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <tr key={vendor.vendor_id}>
                <td>{vendor.vendor_id}</td>
                <td>{vendor.vendorname}</td>
                <td>{vendor.company_email}</td>
                <td>{vendor.company_phone_number}</td>
                <td>{vendor.address}</td>
                <td>{vendor.contract_start_date}</td>
                <td>{vendor.is_vendor ? "Yes" : "No"}</td>
                <td>{vendor.registered_by}</td>
                <td>{vendor.category_name || "N/A"}</td>
                <td>
                  {vendor.representatives_name.length > 0
                    ? vendor.representatives_name.join(", ")
                    : "N/A"}
                </td>
                <td>
                  <button
                    onClick={() => handleUpdateClick(vendor)}
                    className="vendor-update-button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No vendors available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedVendor && (
        <div className="vendor-modal">
          <div className="vendor-modal-content">
            <h3>Update Vendor</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Vendor Name:
                <input
                  type="text"
                  value={selectedVendor.vendorname || ""}
                  onChange={(e) =>
                    handleInputChange("vendorname", e.target.value)
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={selectedVendor.company_email || ""}
                  onChange={(e) =>
                    handleInputChange("company_email", e.target.value)
                  }
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={selectedVendor.company_phone_number || ""}
                  onChange={(e) =>
                    handleInputChange("company_phone_number", e.target.value)
                  }
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={selectedVendor.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </label>
              <label>
                Contract Start Date:
                <input
                  type="date"
                  value={selectedVendor.contract_start_date || ""}
                  onChange={(e) =>
                    handleInputChange("contract_start_date", e.target.value)
                  }
                />
              </label>
              <label>
                Is Vendor:
                <input
                  type="checkbox"
                  checked={selectedVendor.is_vendor || false}
                  onChange={(e) =>
                    handleInputChange("is_vendor", e.target.checked)
                  }
                />
              </label>
              <label>
                Registered By:
                <input
                  type="text"
                  value={selectedVendor.registered_by || ""}
                  onChange={(e) =>
                    handleInputChange("registered_by", e.target.value)
                  }
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  value={selectedVendor.category_name || ""}
                  onChange={(e) =>
                    handleInputChange("category_name", e.target.value)
                  }
                />
              </label>
              <label>
                Representative Names (comma-separated):
                <input
                  type="text"
                  value={selectedVendor.representatives_name.join(", ")}
                  onChange={(e) =>
                    handleInputChange(
                      "representatives_name",
                      e.target.value.split(",").map((rep) => rep.trim())
                    )
                  }
                />
              </label>
              <div className="vendor-modal-buttons">
                <button
                  onClick={handleModalClose}
                  className="vendor-modal-close"
                >
                  Close
                </button>
                <button type="submit" className="vendor-modal-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorTable;
