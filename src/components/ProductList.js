import React, { useState } from "react";
import "./ProductTable.css";

const ProductTable = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const dummyProducts = [
    {
      id: 1,
      name: "Test Kit A",
      refNo: "ABC123",
      brand: "BrandX",
      packSize: "10",
      unitsPerPack: "100",
      certifications: "ISO",
      category: "Medical",
      productID: "P001",
      brochure: "#",
      ifu: "#",
      certificates: "#",
      vendor: {
        id: "V001",
        dateRegistered: new Date().toISOString().split("T")[0],
        name: "Vendor1",
        address: "123 Main St, City A",
        website: "https://vendor1.com",
        type: "Manufacturer",
        email: "contact@vendor1.com",
        contactNumber: "+1234567890",
      },
    },
    {
      id: 2,
      name: "Test Kit B",
      refNo: "DEF456",
      brand: "BrandY",
      packSize: "20",
      unitsPerPack: "200",
      certifications: "CE",
      category: "Lab",
      productID: "P002",
      brochure: "#",
      ifu: "#",
      certificates: "#",
      vendor: {
        id: "V002",
        dateRegistered: new Date().toISOString().split("T")[0],
        name: "Vendor2",
        address: "456 Elm St, City B",
        website: "https://vendor2.com",
        type: "Distributor",
        email: "info@vendor2.com",
        contactNumber: "+9876543210",
      },
    },
  ];

  const [searchTerms, setSearchTerms] = useState({});

  const handleSearchChange = (e, key) => {
    setSearchTerms((prev) => ({
      ...prev,
      [key]: e.target.value.toLowerCase(),
    }));
  };

  const filteredProducts = dummyProducts.filter((product) =>
    Object.entries(searchTerms).every(([key, value]) =>
      product[key]?.toString().toLowerCase().includes(value)
    )
  );

  const handlePrint = () => {
    window.print();
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  return (
    <div className="product-container">
      <h1 className="product-heading">Product List</h1>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Ref No/ Cat No</th>
              <th>Brand Name</th>
              <th>Pack Size</th>
              <th>Unit/Tests Per Pack</th>
              <th>Quality Certifications</th>
              <th>Product Category</th>
              <th>Product ID</th>
              <th>Actions</th>
            </tr>
            <tr>
              {[
                "id",
                "name",
                "refNo",
                "brand",
                "packSize",
                "unitsPerPack",
                "certifications",
                "category",
                "productID",
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
            {filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.refNo}</td>
                <td>{product.brand}</td>
                <td>{product.packSize}</td>
                <td>{product.unitsPerPack}</td>
                <td>{product.certifications}</td>
                <td>{product.category}</td>
                <td>{product.productID}</td>
                <td className="product-btn-row">
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(product)}
                  >
                    Update
                  </button>
                  <button
                    className="view-btn"
                    onClick={() => handleView(product)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUpdateModal && selectedProduct && (
        <div className="product-modal">
          <div className="product-modal-content">
            <h3>Update Product</h3>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" defaultValue={selectedProduct.name} />
              </div>
              <div className="form-group">
                <label>Ref No/ Cat No</label>
                <input type="text" defaultValue={selectedProduct.refNo} />
              </div>
              <div className="form-group">
                <label>Brand Name</label>
                <input type="text" defaultValue={selectedProduct.brand} />
              </div>
              <div className="form-group">
                <label>Pack Size</label>
                <input type="text" defaultValue={selectedProduct.packSize} />
              </div>
              <div className="form-group">
                <label>Unit/Tests Per Pack</label>
                <input
                  type="text"
                  defaultValue={selectedProduct.unitsPerPack}
                />
              </div>
              <div className="form-group">
                <label>Quality Certifications</label>
                <input
                  type="text"
                  defaultValue={selectedProduct.certifications}
                />
              </div>
              <div className="form-group">
                <label>Product Category</label>
                <input type="text" defaultValue={selectedProduct.category} />
              </div>
              <div className="form-group">
                <label>Product ID</label>
                <input type="text" defaultValue={selectedProduct.productID} />
              </div>
              <div className="modal-button-container">
                <button className="modal-button">Save</button>
                <button
                  className="modal-close-button"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedProduct && (
        <div className="product-modal">
          <div className="product-modal-content">
            <h3>Vendor Information</h3>
            <form>
              <div className="form-group">
                <label>Vendor ID</label>
                <input type="text" value={selectedProduct.vendor.id} disabled />
              </div>
              <div className="form-group">
                <label>Date of Registration</label>
                <input
                  type="text"
                  value={selectedProduct.vendor.dateRegistered}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={selectedProduct.vendor.name}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={selectedProduct.vendor.address}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  value={selectedProduct.vendor.website}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  value={selectedProduct.vendor.type}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  value={selectedProduct.vendor.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  value={selectedProduct.vendor.contactNumber}
                  disabled
                />
              </div>
              <div className="modal-button-container">
                <button
                  className="modal-close-button"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="footer">
        <p>Total Products: {dummyProducts.length}</p>
        <button className="print-btn" onClick={handlePrint}>
          Print Page
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
