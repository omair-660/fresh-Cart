import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Dropdown from 'react-bootstrap/Dropdown';
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
export default function NavBar() {
  let { userLogin, logOut } = useContext(UserContext);
  let { numberOfCart } = useContext(CartContext);
  let { numberOfWishList } = useContext(WishListContext)
  let navigate = useNavigate();

  function handleLogOut() {
    logOut(); 
    navigate("/login");
    window.location.reload();
  }
  return (
    <>
      <marquee className="w-100 bg-danger-subtle p-2 fs-5">
        E-Commerece Website front-end by omair mohamed && Back-end with Route
      </marquee>
     
      <Navbar expand="lg" className="bg-body-tertiary border-bottom position-sticky top-0 w-100 z-3">
        <Container>
       <div className="d-flex gap-2 align-items-center">
       <Link to="#" onClick={() => history.back()} className="back-button">
      <i className="fa-solid fa-arrow-left trans"></i> 
    </Link>
          <Link to="/" className="navbar-brand fw-bold fs-4">oShop</Link>
       </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {userLogin ? (
              <Nav className="my-2 my-lg-0 mx-auto" navbarScroll>
                <NavLink 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
            to="/"
          >
            Home
          </NavLink>
              <NavLink className="nav-link " to="/about">About</NavLink>
                <NavLink className="nav-link " to="/brands">Brands</NavLink>
                <NavLink className="nav-link " to="/contact">Contact</NavLink>
              </Nav>
            ):(
              <Nav className="my-2 my-lg-0 mx-auto" navbarScroll>
              <NavLink className="nav-link " to="/">Home</NavLink>
                <NavLink className="nav-link " to="/about">About</NavLink>
                <NavLink className="nav-link " to="/contact">Contact</NavLink>
              </Nav>
            )
          }

          <Dropdown className="ms-auto my-3 my-md-0">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="me-3">
              <i className="fa-solid fa-user"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {userLogin ? (
               <>
                <Dropdown.Item as={NavLink} className="acc" to="/user">Your Account</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut}>LogOut</Dropdown.Item>
               </>

              ) : (
                <>
                  <Dropdown.Item as={NavLink} className="acc" to="/user">Your Account</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/login">Login</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/rejister">Rejister</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>

          {userLogin && (
            <div className="d-flex align-items-center">
               <NavLink className="nav-link fs-5 position-relative" to={'/wishList'}>
               <i className={`fa-solid fa-heart me-3 fs-4 trans ${numberOfWishList > 0 ? 'text-danger shadow-lg' : 'text-black'}`}></i>

              {numberOfWishList > 0 && (
        <span className="badge d-flex justify-content-center align-items-center position-absolute top-0 translate-middle bg-danger rounded-circle">
          {numberOfWishList}
        </span>
         )}
               </NavLink>
              <NavLink className="nav-link fs-5 position-relative" to={'/cart'}>
      <i className="fa-solid fa-cart-shopping"></i>
      {numberOfCart > 0 && (
        <span className="badge d-flex justify-content-center align-items-center position-absolute top-0 start-100 translate-middle bg-danger rounded-circle">
          {numberOfCart}
        </span>
      )}
    </NavLink>
            </div>
          )}
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
}
