import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import "./VendorTable.css";

const VendorTable = () => {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredVendors = vendors.filter((vendor) => {
    return (
      Object.values(vendor).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(search)
      ) ||
      (vendor.representative &&
        Object.values(vendor.representative).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(search)
        ))
    );
  });
  

  useEffect(() => {
    fetch("https://my.vivionix.com/vendors/list_all/")
      .then((response) => response.json())
      .then((data) => setVendors(data))
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://my.vivionix.com/vendors/update/${selectedVendor.vendor_id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update vendor");
      }

      setVendors((prev) =>
        prev.map((vendor) =>
          vendor.vendor_id === selectedVendor.vendor_id
            ? { ...vendor, ...formData }
            : vendor
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };


  const openModal = (vendor, type) => {
    setSelectedVendor({ ...vendor });
    setModalType(type);
    
    if (type === "update") {
      setShowUpdateModal(true); 
      setFormData({ ...vendor }); 
    }
  };
  

  const closeModal = () => {
    setSelectedVendor(null);
    setModalType(null);
    setShowUpdateModal(false); 
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };




  return (
    <div className="vendor-container">
      <h2 className="vendor-title">Registered Vendor List</h2>
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Vendor ID</th>
            <th>Vendor Name</th>
            <th>Company Email</th>
            <th>Type</th>
            <th>Website</th>
            <th>Company Phone</th>
            <th className="vendor-list-address">Address</th>
            <th>Is Vendor</th>
            <th>Contract Start Date</th>
            <th>Registered By</th>
            <th>Product Catalog</th>
            <th>Action</th>
          </tr>
          <tr>
            {[
              "id",
              "name",
              "dateRegistered",
              "address",
              "isVendor",
              "contarct-start-date",
              "registeredby",
              "website",
              "type",
              "email",
              "contactNumber",
            ].map((key) => (
              <th key={key}>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => handleSearchChange(e, key)}
                />
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.vendor_id ?? "null"}</td>
              <td>{vendor.vendorname ?? "null"}</td>
              <td>{vendor.company_email ?? "null"}</td>
              <td>{vendor.type ?? "null"}</td>
              <td>
                {vendor.website ? (
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {vendor.website}
                  </a>
                ) : (
                  "null"
                )}
              </td>
              <td>{vendor.company_phone_number ?? "null"}</td>
              <td className="vendor-address">{vendor.address ?? "null"}</td>
              <td>{vendor.is_vendor ? "Yes" : "No"}</td>
              <td>{vendor.contract_start_date ?? "null"}</td>
              <td>{vendor.registered_by ?? "null"}</td>
              <td>{vendor.productcatalog ?? "null"}</td>
              <td className="vendor-row-button">
              <Pencil
                    className="vendor-update-icon"
                    onClick={() => openModal(vendor, "update")}
                  
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && selectedVendor && (
  <div className="vendor-update-modal">
    <div className="vendor-update-modal-content">
      <h3>Update Vendor</h3>
      <form onSubmit={handleSubmitUpdate}>
        <div className="form-group">
          <label>Vendor Name</label>
          <input
            name="vendorname"
            value={formData.vendorname || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Company Email</label>
          <input
            type="email"
            name="company_email"
            value={formData.company_email || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Company Phone</label>
          <input
            name="company_phone_number"
            value={formData.company_phone_number || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input
            name="website"
            value={formData.website || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select
            name="type"
            value={formData.type || ""}
            onChange={handleInputChange}
          >
            <option value="Manufacturer">Manufacturer</option>
            <option value="Distributor">Distributor</option>
            <option value="Supplier">Supplier</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contract Start Date</label>
          <input
            type="date"
            name="contract_start_date"
            value={formData.contract_start_date || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Registered By</label>
          <input
            name="registered_by"
            value={formData.registered_by || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Is Vendor</label>
          <select
            name="is_vendor"
            value={formData.is_vendor || ""}
            onChange={handleInputChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Product Catalog</label>
          <input
            name="productcatalog"
            value={formData.productcatalog || "null"}
            onChange={handleInputChange}
          />
        </div>
        <div className="modal-button-container">
          <button
            className="modal-close-button"
            onClick={() => setShowUpdateModal(false)}
          >
            Close
          </button>
          <button className="modal-button" >Save</button>
        </div>
      </form>
    </div>
  </div>
)}



    
    </div>
  );
};

export default VendorTable;
