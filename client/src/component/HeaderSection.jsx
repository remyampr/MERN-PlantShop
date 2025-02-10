import React, {useEffect, useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  InputGroup,
  Offcanvas
} from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';  
import { FaSearch, FaUser, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

import "../style/HeaderSection.css"
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalPrice,searchProducts,clearCart } from '../Redux/productsSlice';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const HeaderSection = () => {

// for Login
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

 

  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // Remove token
  //   setIsAuthenticated(false); 
  //   navigate("/login");
  // };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      navigate("/cart"); // Proceed to cart if authenticated
    }
  };


// for Login


// 

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setIsAuthenticated(false);
  dispatch(clearCart()); // Clear the cart when logging out
  navigate("/login");
};
// 

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const totalPrice=useSelector(selectTotalPrice);
  const cartItems=useSelector((state)=> state.products.cart);
  const itemCount=cartItems.length;


const dispatch=useDispatch();
const searchTerm=useSelector((state)=> state.products.searchTerm);

const handleSearch=(event)=>{
  const query=event.target.value;
  dispatch(searchProducts(query));
  console.log("Search term dispatched: ", query); 
}





  const categories = [
    "Indoor Plants",
    "Outdoor Plants",
    "Home & Garden Supply",
    "Seeds & Grow Kits",
    "Pots",
    "Artificial Plants",
    "Sale",
    
  ];

  return (
    <header className="bg-white shadow-sm header-container">
      {/* Top Header */}
      <Navbar className="py-3 border-bottom">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between w-100">
            <Navbar.Brand as={NavLink} to="/" className="me-4 logo">
              <img 
                src="/icon/logo.png" 
                alt="Plant Shop" 
                className="h-8 logo-img"
                loading='lazy'
              />
              Pantora
            </Navbar.Brand>

            <Form className="d-none d-lg-flex flex-grow-1 mx-4 form-box">
              <InputGroup className='input-group-box'>
                <FormControl
                  type="text"
                  placeholder="Search products..."
                  className="border-end-0 input-box"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                  <FaSearch className='search-icon' />
               
              </InputGroup>
            </Form>

            {/* Right Section Icons */}
            <div className="d-flex align-items-center gap-4 right-section">
              <button 
                className="btn p-0 d-lg-none"
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? <FaTimes size={20} /> : <FaSearch size={20} />}
              </button>

              <Nav.Link as={NavLink} to={isAuthenticated ? "/profile" : "/login"} className="p-0 user">
                <FaUser size={20} />
              </Nav.Link>
               {/* Show Logout Button if Logged In  */}
               {isAuthenticated && (
        <button onClick={handleLogout}>Logout</button>
      )}
              
              <Nav.Link onClick={handleCartClick} className="d-flex align-items-center p-0 cart">
                <div className="position-relative">
                  <FaShoppingCart size={20} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                   {itemCount}
                  </span>
                </div>
                <span className="ms-2 d-none d-lg-block">AED {totalPrice}</span>
              </Nav.Link>
            </div>
          </div>
        </div>
      </Navbar>

      {/* Mobile Search Bar - Slides down when active */}
      <div 
        className={`d-lg-none bg-white py-3 ${showSearch ? 'd-block' : 'd-none'}`}
        style={{ transition: 'all 0.3s ease-in-out' }}
      >
        <div className="container">
          <Form>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search products..."
                className="border-end-0"
              />
              <InputGroup.Text className="bg-white">
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>
      </div>

      {/* Bottom Header - Navigation Menu */}
      <Navbar className="py-2 bg-white">
        <div className="container">
          <div className="d-flex align-items-center w-100">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setShowMenu(true)}
              className="btn p-0 d-lg-none"
            >
              <FaBars size={20} />
            </button>

            {/* Desktop Navigation */}
            <Nav className="d-none d-lg-flex w-100 justify-content-between">
              {categories.map((category) => (
                <Nav.Link 
                  key={category}
                  as={NavLink} 
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3"
                >
                  {category}
                </Nav.Link>
              ))}
            </Nav>
          </div>
        </div>
      </Navbar>

      {/* Mobile Menu Offcanvas */}
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {categories.map((category) => (
              <Nav.Link 
                key={category}
                as={NavLink}
                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="py-2"
                onClick={() => setShowMenu(false)}
              >
                {category}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default HeaderSection;