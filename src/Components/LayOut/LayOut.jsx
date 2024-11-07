import React, { useContext, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { ScrollTopContext } from '../../Context/ScrollTopContext';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default function LayOut() {
  const { scrollTop } = useContext(ScrollTopContext);
  const location = useLocation();

  useEffect(() => {
    scrollTop();
  }, [location.pathname]); 

  return (
    <>
     <NavBar/>
    <div className="container my-4">
    <Breadcrumbs/>
    </div>
    <Outlet/>
    <Footer/>
  
    </>
)

}
