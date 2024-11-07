import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { ScrollTopContext } from "../../Context/ScrollTopContext";
import { CartContext } from "../../Context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import { Button, Spinner } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";
import { WishListContext } from "../../Context/WishListContext";

export default function Productdetail() {
  let { id , category} = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isStock, setisStock] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingBtn, setisLoadingBtn] = useState(false);
  const [isLoadingBtnRelated, setisLoadingBtnRelated] = useState(false);
  const [relatedProducts, setrelatedProducts] = useState([])
  let {scrollTop} = useContext(ScrollTopContext)
  let { addProductToCart } = useContext(CartContext)
  let {userLogin} = useContext(UserContext)
  let {addToWishList} = useContext(WishListContext)
  const [isLoadingWishList, setisLoadingWishList] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  async function addWishList(id) {
   
    if (userLogin === null) {
      toast.error("You are not logged in. Please login to get access");
    } else {
      setisLoadingWishList(true)
      let res = await addToWishList(id);

      if (res.data.status == "success") {
      setisLoadingWishList(false)
      toast.success(res.data.message);
      } else {
      setisLoadingWishList(false)
      toast.error(res.data.message);
      }
    }
  }
  async function addCart(id) {
    setisLoadingBtn(true);
    setisLoadingBtnRelated(true)
    setCurrentProductId(id)
    let res = await addProductToCart(id)
    if (res.data.status == "success") {
      toast.success(res.data.message);
      setisLoadingBtn(false);
      setisLoadingBtnRelated(false)
    } else {
      toast.error(res.data.message);
      setisLoadingBtn(false);
      setisLoadingBtnRelated(false)
    }
  }
  const allProduct = () => {
    setisLoading(true)
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        let related = res.data.data.filter((product)=> product.category.name == category)
        setrelatedProducts(related);
    currentProductId(relatedProducts._id)
        console.log(related);

        setisLoading(false)
      })
      .catch(() => {
        setisLoading(false)

      });
  };

  useEffect(()=>{allProduct()},[])
  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setMainImage(res.data.data.imageCover);
        if (res.data.data.quantity > 0) {
          setisStock(false);
        } else {
          setisStock(true);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);
  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  return (
    <>
    <div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    <section>
    <div className="container py-5">
        <div className="row">
         
          <div className="col-md-6 mb-5 mb-md-0">
            <div className="row">
             
              <div className="col-3">
                {product?.images.map((img, index) => (
                  <div key={index} className="mb-3">
                    <LazyLoadImage
                      src={img}
                      className="w-50 rounded cursor-pointer"
                      effect="blur"
                      onMouseMove={() => handleThumbnailClick(img)}
                    />
                  </div>
                ))}
              </div>
            
              <div className="col-9">
                <LazyLoadImage
                  src={mainImage}
                  effect="blur"
                  className="w-100 rounded shadow-sm"
                />
              </div>
            </div>
          </div>

          
          <div className="col-md-6">
            <h2>{product?.title}</h2>
            <div className="d-flex align-items-center mt-1">
              {Array.from({
                length: Math.floor(product?.ratingsAverage),
              }).map((_, index) => (
                <i
                  key={index}
                  className="fa-solid fa-star text-warning pe-1"
                ></i>
              ))}

              {product?.ratingsAverage % 1 !== 0 && (
                <i className="fa-solid fa-star-half-stroke text-warning pe-1"></i>
              )}

              <span className="ms-2 border-end border-3 pe-3">
                ({product?.ratingsQuantity} Reviews)
              </span>
              <span
                className={`ms-3 fw-bold ${
                  isStock ? "text-danger" : "text-success"
                }`}
              >
                {isStock ? "outStock" : "instock"}
              </span>
            </div>
            <p className="text-muted pt-2">{product?.description}</p>
            <h4 className="text-danger pb-2">${product?.price}</h4>

          
            {/* <div className="d-flex align-items-center mb-3">
              <button className="btn btn-danger trans me-2">-</button>
              <span className="px-4 py-1 border-start border-end">2</span>
              <button className="btn btn-danger trans ms-2">+</button>
            </div> */}

            {isLoadingBtn &&
                    currentProductId === product._id &&
                    userLogin !== null ?(
                      <Button className="w-100 rounded-0 mb-3" variant="danger" disabled>
                        <Spinner
                       className=" me-2"
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </Button>
                    ) : 
            <button className="btn btn-danger trans btn-lg w-100 mb-3" onClick={()=> addCart(product?._id)}>
            <i className="fa-solid fa-cart-plus pe-2"></i>  Add Now
            </button>
}
            {isLoadingWishList ?  <Button variant="secondary" className="mb-3" disabled>
        <Spinner
        className=" me-2 "
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>:
      <div className="d-flex align-items-center mb-3"   onClick={() => addWishList(product?._id)}>
              <button className="btn btn-outline-secondary me-2 trans">
                <i className="fas fa-heart"></i> Add to Wishlist
              </button>
            </div>

      }
            
         
            <div className="border p-3 rounded mb-2">
              <i className="fas fa-truck me-2"></i> Free Delivery - Enter your
              postal code for availability
            </div>
            <div className="border p-3 rounded">
              <i className="fas fa-undo me-2"></i> Return Delivery - Free 30
              Days Delivery Returns
            </div>
          </div>
        </div>
              <div className="row mt-5 py-5">
              {isLoading ? (
                <div className="spin d-flex justify-content-center align-items-center">
                  <div className="sk-chase">
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                  </div>
                </div>
              ) : (
                relatedProducts.map((related) => (
                  <div key={related._id} className="col-md-6 col-lg-3 mb-4">
                    <div className="card overflow-hidden">
                      <div className="image mx- position-relative overflow-hidden">
                        <LazyLoadImage
                          effect="blur"
                          src={related.imageCover}
                          className="card-img-top rounded-2"
                          alt={related.title}
                        />
                          {isLoadingBtnRelated &&
                    currentProductId === related._id &&
                    userLogin !== null ?(
                      <Button className="w-100 rounded-0 mb-3" variant="black" disabled>
                        <Spinner
                       className=" me-2"
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </Button>
                    ) : 
                        <button onClick={()=>addCart(related._id)} className="btn btn-dark w-100 position-absolute bottom-0 start-0 rounded-0 ">
                          Add to cart
                        </button>}
                      
                      </div>
                      <Link to={`/productdetail/${related._id}/${related.category.name}`} onClick={scrollTop()} className="card-body text-decoration-none">
                        <h5 className="card-title">
                          {related.title.split(" ").slice(0, 2).join(" ")}
                        </h5>
                        <span className="text-danger price">$ {related.price}</span>
                        <br />
                        <div className="d-flex align-items-center mt-1">
                          {Array.from({
                            length: Math.floor(related.ratingsAverage),
                          }).map((_, index) => (
                            <i
                              key={index}
                              className="fa-solid fa-star text-warning pe-1"
                            ></i>
                          ))}
    
                          {related.ratingsAverage % 1 !== 0 && (
                            <i className="fa-solid fa-star-half-stroke text-warning pe-1"></i>
                          )}
    
                          <span className="ms-2">({related.ratingsQuantity})</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
        
      </div>
    </section>
    </>
  );
}
