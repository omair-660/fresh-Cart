import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import MainSlider from "../MainSlider/MainSlider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserContext } from "../../Context/UserContext";
import { WishListContext } from "../../Context/WishListContext";

export default function Home() {
  const [show, setShow] = useState(false);
  let { userLogin, username } = useContext(UserContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [partProducts, setPartProducts] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [isLoadingeye, setIsLoadingeye] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [allProductsShow, setAllProductsShow] = useState(false);
  let { addProductToCart, setnumberOfCart } = useContext(CartContext);
  const [oneproduct, setoneproduct] = useState(null);
  let { addToWishList } = useContext(WishListContext);
  const [isLoadingWishList, setisLoadingWishList] = useState(false);
const [cuurentIWishList, setcuurentIWishList] = useState(0)
  // function addToWishList
  async function addWishList(id) {
   
    if (userLogin === null) {
      toast.error("You are not logged in. Please login to get access");
    } else {
      setisLoadingWishList(true)
      setcuurentIWishList(id)
      let res = await addToWishList(id);
console.log(res);

      if (res.data.status == "success") {
      setisLoadingWishList(false)
      toast.success(res.data.message);
      } else {
      setisLoadingWishList(false)
      toast.error(res.data.message);
      }
    }
  }
  //function addToCart
  async function addToCart(id) {
    if (userLogin === null) {
      toast.error("You are not logged in. Please login to get access");
    } else {
      setIsLoadingBtn(true);
      setCurrentProductId(id);
      let res = await addProductToCart(id);
      console.log(res.data.data.products);

      setnumberOfCart(res.data.numOfCartItems);
      if (res.data.status == "success") {
        toast.success(res.data.message);
        setIsLoadingBtn(false);
      } else {
        toast.error(res.data.message);
        setIsLoadingBtn(false);
      }
    }
  }

  // Fetch categories
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // Fetch all products initially
  const allProduct = () => {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
        setallProducts(res.data.data);
        setPartProducts(res.data.data.slice(0, 10));
        setIsLoading(false);
        setAllProductsShow(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const oneProduct = (id) => {
    setIsLoadingeye(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setoneproduct(res.data.data);
        setIsLoadingeye(false);
      })
      .catch(() => {
        setIsLoadingeye(false);
      });
  };
  function handleProduct() {
    setPartProducts(allProducts);
    setAllProductsShow(true);
  }

  useEffect(() => {
    allProduct();
    handleProduct();
  }, []);

  // Fetch products by category
  const fetchProductsByCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
      )
      .then((res) => {
        setProducts(res.data.data);
        setPartProducts(res.data.data.slice(0, 10));
        setIsLoading(false);
        setAllProductsShow(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    };
    

  

  let settings = {
    dots: false,
    infinity: true,
    autoplay: true,
    slideToShow: 1,
    slideToscroll: 1,
  };
  return (
    <>
      <div className="user-profile">
        {username ? <h1>Welcome, <span className="text-info fw-bold">{username}</span> !</h1> : <h1>Welcome, Guest!</h1>}
      </div>
      <MainSlider />
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {isLoadingeye ? (
            <Skeleton width={200} height={24} />
          ) : (
            <Modal.Title>{oneproduct?.title}</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          {isLoadingeye ? (
            <div>
              <Skeleton height={200} width="100%" />
            </div>
          ) : (
            <Slider {...settings}>
              {oneproduct?.images.map((img, index) => (
                <div key={index} className="mb-3 imageEye">
                  <LazyLoadImage
                    src={img}
                    className="w-100 rounded cursor-pointer"
                    effect="blur"
                  />
                </div>
              ))}
            </Slider>
          )}

          {isLoadingeye ? (
            <Skeleton count={3} />
          ) : (
            <p>{oneproduct?.description}</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            <Link
              to={`/productdetail/${oneproduct?._id}/${oneproduct?.category.name}`}
              className="card-body text-decoration-none"
            >
              Show More
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    <section>
    <div className="container">
        <h2 className="my-4">Browse Categories</h2>
        <ul className="d-flex flex-wrap list-unstyled fillter">
          <li 
            className="me-2 px-3 py-2 rounded-5 my-2 bg-danger bg-opacity-75 text-white pointer"
            onClick={() => handleProduct()}
            style={{ cursor: "pointer" }}
          >
            allProduct
          </li>
          {categories.map((category) => (
            <li 
              key={category._id}
              className="me-2 px-3 py-2 rounded-5 my-2 bg-danger bg-opacity-75 text-white pointer"
              onClick={() => fetchProductsByCategory(category._id)}
              style={{ cursor: "pointer" }}
            >
              {category.name}
            </li>
          ))}
        </ul>

        <h3 className="my-3">Products in Category</h3>
        {products.length === 0 && selectedCategory && (
          <p>No products found for this category.</p>
        )}
        <div className="row">
          {isLoading ? (
            <Loading />
          ) : (
            partProducts.map((product) => (
              <div key={product._id} className="col-md-6 col-lg-3 mb-4">
                <div className="card overflow-hidden">
                  <div className="image mx- position-relative overflow-hidden">
                    <LazyLoadImage
                      effect="blur"
                      src={product.imageCover}
                      className="card-img-top rounded-2"
                      alt={product.title}
                    />
                    {isLoadingBtn &&
                    currentProductId === product._id &&
                    userLogin !== null ? (
                      <Button
                        className="w-100 rounded-0 m-0"
                        variant="dark"
                        disabled
                      >
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </Button>
                    ) : (
                      <button
                        className="btn btn-dark w-100 position-absolute bottom-0 start-0 rounded-0"
                        onClick={() => addToCart(product._id)}
                      >
                       <i className="fa-solid fa-cart-plus pe-2"></i> Add to cart
                      </button>
                    )}

                    <div className="icon position-absolute d-flex flex-column gap-2">
                    {isLoadingWishList && cuurentIWishList == product._id ?  <Button variant="secondary" className="mb-3" disabled>
        <Spinner
      
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
       
      </Button>:
                      <i
                        onClick={() => addWishList(product?._id)}
                        className="fa-solid fa-heart rounded-circle d-flex justify-content-center align-items-center bg-secondary bg-opacity-10 pointer"
                      ></i>}
                      <i
                        className="fa-solid fa-eye rounded-circle d-flex justify-content-center align-items-center bg-secondary bg-opacity-10 pointer"
                        onClick={() => {
                          oneProduct(product._id);
                          handleShow();
                        }}
                      ></i>
                    </div>
                  </div>
                  <Link
                    to={`/productdetail/${product._id}/${product.category.name}`}
                    className="card-body text-decoration-none"
                  >
                    <h5 className="card-title">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h5>
                    <span className="text-danger price">$ {product.price}</span>
                    <br />
                    <div className="d-flex align-items-center mt-1">
                      {Array.from({
                        length: Math.floor(product.ratingsAverage),
                      }).map((_, index) => (
                        <i
                          key={index}
                          className="fa-solid fa-star text-warning pe-1"
                        ></i>
                      ))}

                      {product.ratingsAverage % 1 !== 0 && (
                        <i className="fa-solid fa-star-half-stroke text-warning pe-1"></i>
                      )}

                      <span className="ms-2">({product.ratingsQuantity})</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
      <button
        onClick={handleProduct}
        className={`btn btn-outline-danger text-center d-flex justify-content-center my-3 fw-bold rounded-0 trans mx-auto ${
          allProductsShow ? "d-none" : ""
        }`}
      >
        Show All Products
      </button>
    </>
  );
}
