import React, { useState } from "react";
import "./VendorTable.css";

const VendorTable = () => {
  const [vendors, setVendors] = useState([
    {
      id: "VRF123",
      registrationDate: "2024-01-15",
      name: "ABC Supplies",
      address: "123 Market Street, NY",
      website: "https://abc-supplies.com",
      type: "Manufacturer",
      representative: {
        name: "John Doe",
        designation: "Sales Manager",
        email: "johndoe@example.com",
        officePhone: "+1 234 567 890",
        personalPhone: "+1 987 654 321",
        address: "456 Business Ave, NY",
      },
      products: [
        {
          id: "P12345",
          name: "Product A",
          refNo: "CAT123",
          brand: "BrandX",
          packSize: "10 units",
          unitPerPack: "1",
          certifications: "ISO 9001",
          category: "Equipment",
        },
      ],
    },
  ]);

  const [search, setSearch] = useState("");


  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredVendors = vendors.filter((vendor) => {
    return (
      Object.values(vendor).some(value =>
        typeof value === "string" && value.toLowerCase().includes(search)
      ) ||
      Object.values(vendor.representative).some(value =>
        typeof value === "string" && value.toLowerCase().includes(search)
      )
    );
  });
  

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (vendor, type) => {
    setSelectedVendor({ ...vendor }); // Ensure fresh copy of vendor
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedVendor(null);
    setModalType("");
  };

  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setSelectedVendor((prev) => ({ ...prev, [name]: value }));
  };

  const updateVendor = () => {
    setVendors((prev) =>
      prev.map((vendor) =>
        vendor.id === selectedVendor.id ? selectedVendor : vendor
      )
    );
    closeModal();
  };

  return (
    <div className="vendor-container">
      <h2 className="vendor-title">Registered Vendor List</h2>
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Vendor ID</th>
            <th>Registration Date</th>
            <th>Vendor Name</th>
            <th>Address</th>
            <th>Website</th>
            <th>Type</th>
            <th>Representative</th>
            <th>Actions</th>
          </tr>
          <tr>
            <th><input type="text" name="id" onChange={handleSearchChange} /></th>
            <th><input type="text" name="registrationDate" onChange={handleSearchChange} /></th>
            <th><input type="text" name="name" onChange={handleSearchChange} /></th>
            <th><input type="text" name="address" onChange={handleSearchChange} /></th>
            <th><input type="text" name="website" onChange={handleSearchChange} /></th>
            <th><input type="text" name="type" onChange={handleSearchChange} /></th>
            <th><input type="text" name="representative" onChange={handleSearchChange} /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {filteredVendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.registrationDate}</td>
              <td>{vendor.name}</td>
              <td>{vendor.address}</td>
              <td>
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {vendor.website}
                </a>
              </td>
              <td>{vendor.type}</td>
              <td>
                <a href="#" onClick={() => openModal(vendor, "representative")}>
                  {vendor.representative.name}
                </a>
              </td>
              <td className="action">
                <button
                  onClick={() => openModal(vendor, "products")}
                  className="btn-view"
                >
                  View Products
                </button>
                <button
                  onClick={() => openModal(vendor, "update")}
                  className="btn-update"
                >
                  Update Vendor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Single Modal for Update & Product Details */}
      {selectedVendor && (
        <div className="modal-vendor">
          <div className="modal-content-vendor">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            {modalType === "update" && (
              <div>
                <h3>Update Vendor</h3>
                <form className="vendor-form">
                  <label>
                    Vendor Name:
                    <input
                      type="text"
                      name="name"
                      value={selectedVendor.name}
                      onChange={handleVendorChange}
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      type="text"
                      name="address"
                      value={selectedVendor.address}
                      onChange={handleVendorChange}
                    />
                  </label>
                  <label>
                    Website:
                    <input
                      type="text"
                      name="website"
                      value={selectedVendor.website}
                      onChange={handleVendorChange}
                    />
                  </label>
                  <label>
                    Type:
                    <input
                      type="text"
                      name="type"
                      value={selectedVendor.type}
                      onChange={handleVendorChange}
                    />
                  </label>
                  <label>
                    Representative:
                    <input
                      type="text"
                      name="representative"
                      value={selectedVendor.representative}
                      onChange={handleVendorChange}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn-save"
                    onClick={updateVendor}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {modalType === "products" && (
              <div>
                <h3>Product Details</h3>
                {selectedVendor.products.map((product, index) => (
                  <form key={index} className="product-form">
                    <label>
                      Sr. No.: <input type="text" value={index + 1} disabled />
                    </label>
                    <label>
                      Product Registration Date:{" "}
                      <input
                        type="text"
                        value={selectedVendor.registrationDate}
                        disabled
                      />
                    </label>
                    <label>
                      Name: <input type="text" value={product.name} disabled />
                    </label>
                    <label>
                      Ref No/ Cat No:{" "}
                      <input type="text" value={product.refNo} disabled />
                    </label>
                    <label>
                      Brand Name:{" "}
                      <input type="text" value={product.brand} disabled />
                    </label>
                    <label>
                      Pack Size:{" "}
                      <input type="text" value={product.packSize} disabled />
                    </label>
                    <label>
                      Unit/Tests Per Pack:{" "}
                      <input type="text" value={product.unitPerPack} disabled />
                    </label>
                    <label>
                      Quality Certifications:{" "}
                      <input
                        type="text"
                        value={product.certifications}
                        disabled
                      />
                    </label>
                    <label>
                      Product Category:
                      <select value={product.category} disabled>
                        <option>Equipment</option>
                        <option>Chemical</option>
                        <option>Consumable Device</option>
                      </select>
                    </label>
                    <label>
                      Product ID:{" "}
                      <input type="text" value={product.id} disabled />
                    </label>
                  </form>
                ))}
              </div>
            )}
          </div>

          {/* Modal for Representative Details */}
          {selectedVendor && modalType === "representative" && (
            <div className="modal-representative">
              <div className="modal-content-representative">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h3>Representative Details</h3>
                <form>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={selectedVendor.representative.name}
                      disabled
                    />
                  </label>
                  <label>
                    Designation:
                    <input
                      type="text"
                      value={selectedVendor.representative.designation}
                      disabled
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="text"
                      value={selectedVendor.representative.email}
                      disabled
                    />
                  </label>
                  <label>
                    Office Phone:
                    <input
                      type="text"
                      value={selectedVendor.representative.officePhone}
                      disabled
                    />
                  </label>
                  <label>
                    Personal Phone:
                    <input
                      type="text"
                      value={selectedVendor.representative.personalPhone}
                      disabled
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      type="text"
                      value={selectedVendor.representative.address}
                      disabled
                    />
                  </label>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorTable;