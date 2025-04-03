import React, { useState, useEffect } from "react";
import "./ProductTable.css";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerms, setSearchTerms] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("https://my.vivionix.com/products/list_all/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchProductById = (productId) => {
    fetch(`https://my.vivionix.com/products/update/${productId}/`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedProduct(data);
        setFormData(data);
        setShowUpdateModal(true);
      })
      .catch((error) => console.error("Error fetching product:", error));
  };
  const handleSearchChange = (e, key) => {
    setSearchTerms((prev) => ({
      ...prev,
      [key]: e.target.value.toLowerCase(),
    }));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (product) => {
    fetchProductById(product.product_id);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    fetch(
      `https://my.vivionix.com/products/update/${selectedProduct.product_id}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((updatedProduct) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.product_id === updatedProduct.product_id
              ? updatedProduct
              : product
          )
        );
        setShowUpdateModal(false);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  const filteredProducts = products.filter((product) =>
    Object.entries(searchTerms).every(([key, value]) =>
      product[key]?.toString().toLowerCase().includes(value)
    )
  );

  const handlePrint = () => {
    const printContent = document.getElementById("printable-section").innerHTML;
    const newWindow = window.open("", "_blank");
  
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Product List</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; table-layout: fixed; word-wrap: break-word; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
            }
            @page { size: landscape; margin: 10mm; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
  
    newWindow.document.close();
    newWindow.print();
  };
  
  

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  return (
    <div id="printable-section" className="product-container">
      <h1 className="product-heading">Product List</h1>
      <div className="table-container">
        <table id="product-table" className="product-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Ref No</th>
              <th>Pack Size</th>
              <th>Pack Price</th>
              <th>Price Date</th>
              <th>Vendor</th>
              <th>Availability</th>
              <th>Certifications</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
            <tr>
              {[
                "index",
                "product_id ",
                "product_name",
                "reference_number",
                "packsize",
                "packprice",
                "price_date",
                "vendor_display_name",
                "is_available",
                "Qualitycertifications",
                "product_category",
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
              <tr key={product.product_id}>
                <td>{index + 1}</td>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>{product.reference_number}</td>
                <td>{product.packsize}</td>
                <td>{product.packprice}</td>
                <td>{product.price_date}</td>
                <td>{product.vendor_display_name}</td>
                <td>{product.is_available ? "Yes" : "No"}</td>
                <td>{product.Qualitycertifications}</td>
                <td>{product.product_category}</td>
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
        <div className="product-List-modal">
          <div className="product-List-modal-content">
            <h3>Update Product</h3>
            <form onSubmit={handleSubmitUpdate}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  name="product_name"
                  value={formData.product_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Ref No/ Cat No</label>
                <input
                  name="reference_number"
                  value={formData.reference_number || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Pack Size</label>
                <input
                  name="packsize"
                  value={formData.packsize || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Unit/Tests Per Pack</label>
                <input
                  name="packprice"
                  value={formData.packprice || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Price Date</label>
                <input
                  type="date"
                  name="price_date"
                  value={formData.price_date || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Vendor</label>
                <input
                  name="vendor_display_name"
                  value={formData.vendor_display_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Availability</label>
                <input
                  name="is_available"
                  value={formData.is_available || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Quality Certifications</label>
                <input
                  name="Qualitycertifications"
                  value={formData.Qualitycertifications || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Product Category</label>
                <select
                  name="product_category"
                  value={formData.product_category || ""}
                  onChange={handleInputChange}
                >
                  <option value="Equipment">Equipment</option>
                  <option value="Chemical">Chemical</option>
                  <option value="Consumable Device">Consumable Device</option>
                </select>
              </div>
              <div className="modal-button-container">
                
                <button
                  className="modal-close-button"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Close
                </button>
                <button className="modal-button">Save</button>
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
        <p>Total Products: {products.length}</p>
        <button className="print-btn" onClick={handlePrint}>
          Print Page
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
