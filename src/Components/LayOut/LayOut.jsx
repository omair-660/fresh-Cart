import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { ScrollTopContext } from '../../Context/ScrollTopContext';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default function LayOut() {
  const { scrollTop } = useContext(ScrollTopContext);
  const location = useLocation();
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  useEffect(() => {
    scrollTop();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrollTopVisible(true);
      } else {
        setIsScrollTopVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="container my-4">
        <Breadcrumbs />
      </div>
      <Outlet />
      {isScrollTopVisible && ( 
        <button
          className="trans scroll shadow"
          onClick={scrollTop}
        >
          <i className="fa-solid fa-caret-up text-2xl"></i>
        </button>
      )}
      <Footer />
    </>
  );
}
