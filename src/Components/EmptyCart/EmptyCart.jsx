import React from 'react';
import { Link } from 'react-router-dom';
import style from './EmptyCart.module.css'; 

const EmptyCart = () => {
  return (
    <div className={style.emptycartcontainer}>
    <div className={style.carticon}>
      <div className={style.carteyes}>
        <div className={style.eye}></div>
        <div className={style.eye}></div>
      </div>
      <div className={style.cartbody}></div>
    </div>
    <h2>Your Cart is Empty!</h2>
    <p>It looks like you haven't added any products yet. Where's your shopping?</p>
    <Link to="/" className={style.returnbutton}>RETURN TO SHOP</Link>
  </div>
  );
};

export default EmptyCart;