import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTachometerAlt,
  FaBox,
  FaUserTie,
  FaUserCircle,
  FaSignOutAlt,
  FaBuilding,
  FaThLarge,
  FaChevronDown,
  FaChevronRight,
  FaUser,
  FaStore,
  FaShoppingCart,
  FaEnvelope,
  FaBell,
  FaExpand,
  FaInbox,
  FaEdit,
  FaCogs,
} from "react-icons/fa";

import { AlignLeft, Search, Warehouse } from "lucide-react";

import "./HomePage.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Schedules from "./components/Schedules";
import History from "./components/History";
import Sales from "./components/Sales";
import Messages from "./components/Messages";
import Notifications from "./components/Notifications";
import Pending from "./components/Pending";
import Outstanding from "./components/Outstanding";
import Completed from "./components/Completed";
import AddUser from "./components/AddUser";
import CompanyRegistration from "./components/CompanyRegistration";
import Settings from "./components/Settings";
import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployeeTable from "./components/EmployeeTable";
import VendorRegistration from "./components/VendorRegistration";
import VendorList from "./components/VendorList";
import RepresentativeForm from "./components/RepresentativeForm";
import RepresentativeTable from "./components/RepresentativeTable";
import CustomerRepresentativeForm from "./components/CustomerRepresentative";
import CustomerContactForm from "./components/CustomerRegistration";
import CustomerTable from "./components/CustomerTable";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductList";
import logo from "./logo.png";
import DepartmentForm from "./components/DepartmentRegistration";
import DepartmentTable from "./components/DepartmentTable";
import RoleForm from "./components/RoleRegistration";
import RoleTable from "./components/RoleTable";
import OrderRegistaration from "./components/OrderRegistration";
import OrderDetailForm from "./components/OrderdetailsRegistration";
import CustomerCategoryForm from "./components/CategoryRegistration";
import CustomerCategoryTable from "./components/CategoryTable";
import StockForm from "./components/StockInForm";
import SavedOrder from "./components/SavedOrder";

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleUserDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarVisible((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    setIsSidebarCollapsed(false);
  };

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("us"); // Default country
  const [selectedCountryIcon, setSelectedCountryIcon] = useState("🇺🇸"); // Default icon

  const handleCountrySelect = (country, icon) => {
    setSelectedCountry(country);
    setSelectedCountryIcon(icon);
    setCountryDropdownOpen(false); // Close dropdown after selection
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

 

  const renderContent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Analytics":
        return <Analytics />;
      case "Schedules":
        return <Schedules />;
      case "History":
        return <History />;
      case "Sales":
        return <Sales />;
      case "Messages":
        return <Messages />;
      case "Notifications":
        return <Notifications />;
      case "Department Registration":
        return <DepartmentForm />;
      case "Department Table":
        return <DepartmentTable />;
      case "Role Registration":
        return <RoleForm />;
      case "Role Table":
        return <RoleTable />;
      case "Employee Registration":
        return <EmployeeRegistration />;
      case "Employee Table":
        return <EmployeeTable />;
      case "CustomerCategory Form":
        return <CustomerCategoryForm />;
      case "Customer Category Table":
        return <CustomerCategoryTable />;
      case "vendor Registration":
        return <VendorRegistration />;
      case "Vendor List":
        return <VendorList />;
      case "Vendor Representative Form":
        return <RepresentativeForm />;
      case "Vendor Representative List":
        return <RepresentativeTable />;
      case "Customer Representative Form":
        return <CustomerRepresentativeForm />;
      case "Customer Contact Form":
        return <CustomerContactForm />;
      case "Customer Table":
        return <CustomerTable />;
      case "Product Form":
        return <ProductForm />;
      case "Product List":
        return <ProductTable />;
      case "order Registration":
        return <OrderRegistaration />;
      case "Order Details Registration":
        return <OrderDetailForm />;
      case "Saved Order Details":
        return <SavedOrder />;
    
      case "Pending":
        return <Pending />;
      case "Outstanding":
        return <Outstanding />;
      case "Completed":
        return <Completed />;
      case "Add User":
        return <AddUser />;
      case "Company Registration":
        return <CompanyRegistration />;
      case "Settings":
        return <Settings />;
      case "Home":
        return <Home />;
      case "Stock In":
        return <StockForm />;
      default:
        return <Dashboard />;
    }
  };

  const [searchValue, setSearchValue] = useState("");

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false);
    }
  };

  return (
    <div
      className={`homepage-container ${isSidebarCollapsed ? "collapsed" : ""} ${
        isSidebarVisible ? "sidebar-open" : ""
      }`}
    >
      {/* Sidebar */}
      <div
        className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""} ${
          isSidebarVisible ? "show" : ""
        }`}
        onMouseEnter={handleMouseEnter}
      >
        <div className="sidebar-header">
          <a href="/home">
            {" "}
            <img src={logo} alt="Logo" className="logo" />
            {!isSidebarCollapsed && <h2>Vivionix</h2>}
          </a>
        
        </div>
        


        <div className="sidebar-content">
          {!isSidebarCollapsed && <h4 className="main-items">MAIN</h4>}
          <div
            className="sidebar-item"
            onClick={() => handleMenuItemClick("Home")}
          >
            <FaHome size={14} />
            {!isSidebarCollapsed && <span className="items">Home</span>}
          </div>

          <div
            className="sidebar-item"
            onClick={() => handleMenuItemClick("Dashboard")}
          >
            <FaTachometerAlt size={14} />
            {!isSidebarCollapsed && <span className="items">Dashboard</span>}
          </div>

          {!isSidebarCollapsed && <h4 className="main-items">GENERAL</h4>}

          {/* Employee Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Employee")}
          >
            {/* Conditionally render the Chevron icon based on the dropdown state */}
            <FaUser size={14} />
            {!isSidebarCollapsed && <span className="items">Employee</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "50px" }}>
                {activeDropdown === "Employee" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {activeDropdown === "Employee" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Employee Registration")}
              >
                Employee Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Employee Table")}
              >
                Employees List
              </div>
            </div>
          )}

          {/* Category Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("category")}
          >
            <FaThLarge className="icon" />{" "}
            {!isSidebarCollapsed && (
              <>
                <span className="items">Category</span>
                <span style={{ marginLeft: "55px" }}>
                  {activeDropdown === "category" ? (
                    <FaChevronDown className="dropdown-icon" />
                  ) : (
                    <FaChevronRight className="dropdown-icon" />
                  )}
                </span>
              </>
            )}
          </div>

          {activeDropdown === "category" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("CustomerCategory Form")}
              >
                Category Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Customer Category Table")}
              >
                Category List
              </div>
            </div>
          )}

          {/* Department Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Department")}
          >
            <FaBuilding size={14} />
            {!isSidebarCollapsed && <span className="items">Department</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "45px" }}>
                {activeDropdown === "Department" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Department" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Department Registration")}
              >
                Department Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Department Table")}
              >
                Department Table
              </div>
            </div>
          )}

          {/* Role Dropdown */}
          <div className="sidebar-item" onClick={() => toggleDropdown("Role")}>
            <FaUserTie size={14} />
            {!isSidebarCollapsed && <span className="items">Role</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "85px" }}>
                {activeDropdown === "Role" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Role" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Role Registration")}
              >
                Role Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Role Table")}
              >
                Role Table
              </div>
            </div>
          )}

          {/* Vendor Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Vendor")}
          >
            <FaStore size={14} />
            {!isSidebarCollapsed && <span className="items">Vendor</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "70px" }}>
                {activeDropdown === "Vendor" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Vendor" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("vendor Registration")}
              >
                Vendor Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Vendor List")}
              >
                Vendor List
              </div>
            </div>
          )}

          {/* Representative Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Representative")}
          >
            <FaStore size={14} />
            {!isSidebarCollapsed && (
              <span className="items">Representative</span>
            )}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "20px" }}>
                {activeDropdown === "Representative" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Representative" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Vendor Representative Form")}
              >
                Vendor Representative Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Vendor Representative List")}
              >
                Vendor Representative List
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Customer Representative Form")}
              >
                Customer Representative Registration
              </div>
            </div>
          )}

          {/* Customer Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Customer")}
          >
            <FaUser size={14} />
            {!isSidebarCollapsed && <span className="items">Customer</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "52px" }}>
                {activeDropdown === "Customer" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Customer" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Customer Contact Form")}
              >
                Customer Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Customer Table")}
              >
                Customer List
              </div>
            </div>
          )}

          {/* Product Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Product")}
          >
            <FaBox size={14} />
            {!isSidebarCollapsed && <span className="items">Product</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "62px" }}>
                {activeDropdown === "Product" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Product" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Product Form")}
              >
                Product Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Product List")}
              >
                Product List
              </div>
            </div>
          )}

          {/* Order Dropdown */}
          <div className="sidebar-item" onClick={() => toggleDropdown("Form")}>
            <FaShoppingCart size={14} />
            {!isSidebarCollapsed && <span className="items">Order Management</span>}
            {!isSidebarCollapsed && (
              <span >
                {activeDropdown === "Form" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Form" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("order Registration")}
              >
                Register Order
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Saved Order Details")}
              >
                Saved Order
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Pending")}
              >
                Pending Approval
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Pending")}
              >
                Approved/ Accepted Orders
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Pending")}
              >
                Outstanding Orders
              </div>
            </div>
          )}

           {/* Vendor Dropdown */}
          <div className="sidebar-item" onClick={() => toggleDropdown("stock")}>
            <Warehouse size={14} />
            {!isSidebarCollapsed && <span className="items">Stock In</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "70px" }}>
                {activeDropdown === "stock" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "stock" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Stock In")}
              >
                Form
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Vendor List")}
              >
                Pending Approval
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => handleMenuItemClick("Vendor List")}
              >
                Approved Stock In
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`main-content ${isSidebarVisible ? "overlay" : ""}`}>
        <nav
          className={`navbar ${isSidebarCollapsed ? "collapsed-navbar" : ""}`}
        >
          <div className="navbar-left">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <div>
              <button className="leftalign">
                <AlignLeft size={20} onClick={toggleSidebar} />
              </button>
            </div>

            <div className="main-header-center d-none d-lg-block">
              <input
                className="search-input"
                type="search"
                placeholder="Search for anything..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="btn">
                <Search className="d-none d-md-block" />
              </button>
            </div>
          </div>
          <div className="navbar-right">
            {/* Country Dropdown */}
            <div className={`navbar-item dropdown country-${selectedCountry}`}>
              <button
                className="dropdown-toggle country-button"
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              >
                <span className="country-icon">{selectedCountryIcon}</span>
              </button>

              {countryDropdownOpen && (
                <div className="country-dropdown-menu">
                  <div
                    className="country-dropdown-item"
                    onClick={() => handleCountrySelect("us", "🇺🇸")}
                  >
                    <span className="country-icon">🇺🇸</span> USA
                  </div>
                  <div
                    className="country-dropdown-item"
                    onClick={() => handleCountrySelect("uk", "🇬🇧")}
                  >
                    <span className="country-icon">🇬🇧</span> UK
                  </div>
                  <div
                    className="country-dropdown-item"
                    onClick={() => handleCountrySelect("fr", "🇫🇷")}
                  >
                    <span className="country-icon">🇫🇷</span> French
                  </div>
                  <div
                    className="country-dropdown-item"
                    onClick={() => handleCountrySelect("de", "🇩🇪")}
                  >
                    <span className="country-icon">🇩🇪</span> German
                  </div>
                </div>
              )}
            </div>


            {/* Message Icon */}
            <div className="navbar-item">
              <FaEnvelope size={15} />
            </div>

            {/* Notification Icon */}
            <div className="navbar-item">
              <FaBell size={15} />
            </div>

            {/* Large Screen Mode */}
            <div className="navbar-item" onClick={toggleFullScreen}>
              <FaExpand className="large-screen" size={15} />
            </div>

            {/* Session Details */}
            <div className="session-details" onClick={toggleUserDropdown}>
              <FaUserCircle size={18} />
             
            </div>
          

          {dropdownOpen && (
            <div className="dropdown-menu session-dropdown">
              <div className="dropdown-item person">
                 <p className="person-name">Petey Cruiser
                 <p className="designation">Premium Member</p></p>
              </div>
              


              

              <div className="dropdown-session-item">
                <FaUser className="dropdown-session-icon" /> Profile
              </div>
              <div className="dropdown-session-item">
                <FaEdit className="dropdown-session-icon" /> Edit Profile
              </div>

             

              <div className="dropdown-session-item">
                <FaInbox className="dropdown-session-icon" /> Inbox
              </div>
              <div className="dropdown-session-item">
                <FaEnvelope className="dropdown-session-icon" /> Messages
              </div>

             

              <div className="dropdown-session-item">
                <FaCogs className="dropdown-session-icon" /> Account Settings
              </div>

          

              <div className="dropdown-session-item logout">
                <FaSignOutAlt className="dropdown-session-icon" /> Sign Out
              </div>
            </div>
          )}
          </div>
        </nav>
        <div className="content">{renderContent()}  </div>
      </div>
    </div>
  );
};

export default HomePage;
