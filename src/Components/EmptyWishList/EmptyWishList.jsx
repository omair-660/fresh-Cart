import React from 'react';
import { Link } from 'react-router-dom';
import style from './EmptyWishlist.module.css';

const FunnyEmptyWishlist = () => {
  return (
    <div className={style.emptywishlistcontainer}>
      <div className={style.wishlisticon}>
        <i className="fa-solid fa-heart-crack fa-5x"></i>
        <div className={style.funnyface}>😢</div>
      </div>
      <h2>Uh-oh! Your Wishlist is Empty!</h2>
      <p>Looks like your heart is not in love yet! Let's change that!</p>
      <Link to="/" className={style.returnbutton}>Back to Shopping</Link>
    </div>
  );
};

export default FunnyEmptyWishlist;
