import React from 'react'
import code from '../../assets/frame.png'
export default function Footer() {
  return (
   <>
<footer className="bg-dark text-light pt-5 pb-4">
  <div className="container text-md-left">
    <div className="row">
      <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
        <h6 className="fw-bold">oShop</h6>
        <p className=' text-white '>Subscribe to get 10% off your first order.</p>
        <form className="input-group">
          <input type="email" className="form-control" placeholder="Enter your email" />
          <button className="btn btn-outline-light" type="submit">
            <i className="fas fa-arrow-right" />
          </button>
        </form>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold">Support</h6>
        <p className=' text-white '>Cairo , zaqaziq</p>
        <p className=' text-white fw-bold'>Email: <a className='fw-normal text-white' href="mailto:elrosyomair@gmail.com">elrosyomair@gmail.com</a></p>
        <p className=' text-white fw-bold'>Phone: <a className='fw-normal text-white' href="tel:01204533680">01204533680</a></p>
      </div>
      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold">Account</h6>
        <p><a href="#!" className="text-light">My Account</a></p>
        <p><a href="#!" className="text-light">Login / Register</a></p>
        <p><a href="#!" className="text-light">Cart</a></p>
        <p><a href="#!" className="text-light">Wishlist</a></p>
        <p><a href="#!" className="text-light">Shop</a></p>
      </div>
      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold">Quick Links</h6>
        <p><a href="#!" className="text-light">Privacy Policy</a></p>
        <p><a href="#!" className="text-light">Terms of Use</a></p>
        <p><a href="#!" className="text-light">FAQ</a></p>
        <p><a href="#!" className="text-light">Contact</a></p>
      </div>
      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold">Download App</h6>
        <img src={code} alt="QR Code" className="img-fluid mb-2" style={{width: 80}} />
        <p><a href="https://omair-660.github.io/personalSite/" className="text-light"><i className="fa-brands fa-google-play pe-2"></i>google play</a></p>
        <p><a href="https://omair-660.github.io/personalSite/" className="text-light"><i className="fa-brands fa-app-store pe-2"></i>appStore</a></p>
      </div>
    </div>
  </div>
  <div className="text-center py-3">
    <p className='text-white'>© Copyright <a href='https://omair-660.github.io/personalSite/'target='_blank' className='text-danger '>Omair</a> 2022. All rights reserved</p>
  </div>
</footer>


   </>
  )
}
