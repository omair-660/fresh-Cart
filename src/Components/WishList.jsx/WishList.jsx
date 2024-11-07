import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../Context/WishListContext'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Button, Spinner } from 'react-bootstrap'
import Loading from '../Loading/Loading'
import EmptyWishlist from '../EmptyWishList/EmptyWishList'


export default function WishList() {
    const [wishList, setwishList] = useState([])
    let {getUserWishList , removeItem} = useContext(WishListContext)
    let {userLogin} = useContext(UserContext)
    let {addProductToCart , setnumberOfCart} = useContext(CartContext)
    const [isLoadingBtn, setisLoadingBtn] = useState(false)
    const [currentProductId, setCurrentProductId] = useState('')
    const [showLoading, setshowLoading] = useState(false)
    const [isLoadingWishList, setisLoadingWishList] = useState(false)
    const [cuurentIWishList, setcuurentIWishList] = useState(0)

    async function showWishList() {
        setshowLoading(true);
        try {
          let res = await getUserWishList();
          console.log("Fetched wishlist:", res.data.data);
          setwishList(res.data.data);
        } catch (error) {
          console.error("Error loading wishlist:", error);
        } finally {
          setshowLoading(false);
        }
      }
      
      useEffect(() => {
        showWishList();
      }, []);

    async function addToCart(id) {
        if (userLogin === null) {
          toast.error("You are not logged in. Please login to get access");
        } else {
          setisLoadingBtn(true);
          setCurrentProductId(id);
          let res = await addProductToCart(id);
          console.log(res.data.data.products);
    
          setnumberOfCart(res.data.numOfCartItems);
          if (res.data.status == "success") {
            toast.success(res.data.message);
            setisLoadingBtn(false);
          } else {
            toast.error(res.data.message);
            setisLoadingBtn(false);
          }
        }
      }
      async function deleteItem(id){
        setisLoadingWishList(true)
        setcuurentIWishList(id)
        let res = await removeItem(id)
        if(res.data.status === 'success'){
            setisLoadingWishList(false)
            showWishList()
            toast.success(res.data.message);

        }else{
            setisLoadingWishList(false)
        }
      }
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
    <div className="container">
            <div className="row">
                {showLoading ? (
                    <div className="spin d-flex justify-content-center align-items-center vh-100 w-100 opacity-50">
                        <Loading />
                    </div>
                ) : wishList.length === 0 ? (
                    <EmptyWishlist />
                ) : (

     wishList.map((product) => (
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
                        className=' ms-2'
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
                     <i className="fa-solid fa-cart-plus pe-2"></i>   Add to cart
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
                        onClick={() => deleteItem(product._id)}
                        className="fa-regular fa-trash-can rounded-circle d-flex justify-content-center align-items-center bg-secondary bg-opacity-10 pointer"
                      ></i>
                        }
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
                  </Link>
                </div>
              </div>
            ))
      )
    }
   
    </div>
   </div>
    </section>
    </>
  )
}
