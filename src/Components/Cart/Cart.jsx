import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import EmptyCart from "../EmptyCart/EmptyCart";
import Loading from "../Loading/Loading";

export default function Cart() {
  let {
    getUserCart,
    deleteItem,
    updateProduct,
    deleteCart,
    numberOfCart,
    setnumberOfCart,
  } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [currentDelete, setcurrentDelete] = useState("");
  const [loadingDele, setloadingDele] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [loadingCart, setloadingCart] = useState(false);
  const [currentIdUpdate, setcurrentIdUpdate] = useState(0)

  async function showCart() {
    setloadingCart(true);
    let res = await getUserCart();
    setloadingCart(false);
    setCart(res.data.data);
  }
  async function delteItemCart(id) {
    setloadingDele(true);
    setcurrentDelete(id);
    let res = await deleteItem(id);
    if (res.data.status == "success") {
      setnumberOfCart(numberOfCart - 1);
      setloadingDele(false);
      toast.success("product deleted successfuly");
      setCart(res.data.data);
      setloadingCart(false);
    } else {
      setloadingDele(false);
    }
  }
  async function deleteAllCart() {
    setloadingCart(true);
    let res = await deleteCart();
    console.log(res);
    if (res.data.message == "success") {
      setloadingDele(false);
      toast.success("product deleted successfuly");
      showCart();
    }
  }
  async function updateCount(id, count) {
    setloadingUpdate(true);
    setcurrentIdUpdate(id)
    let res = await updateProduct(id, count);
    console.log(res);
    if (res.data.status == "success") {
      setloadingUpdate(false);
      toast.success("product updated successfuly");
      setCart(res.data.data);
    } else {
      setloadingUpdate(false);
    }
  }
  useEffect(() => {
    showCart();
  }, []);

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
      {cart?.products?.length === 0 ? (
        <EmptyCart />
      ) : loadingCart ? (
        <div className="spin d-flex justify-content-center align-items-center vh-100 w-100">
        <Loading/>
        </div>
      ) : (
          <div className="container my-4">
          <h2 className="text-center mb-4">Shopping Cart</h2>

          <Table striped bordered hover responsive className="trans">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.products?.map((cartItem) => (
                <tr
                  key={cartItem.product._id}
                  className="trans align-middle text-center"
                >
                  <td className="text-start">
                    <Link
                      to={`/cartDetails/${cartItem.product._id}`}
                      className="text-black"
                    >
                      <LazyLoadImage
                        src={cartItem.product.imageCover}
                        alt={cartItem.product.title}
                        width="100"
                        height="100"
                        className="me-2"
                      />
                      {cartItem.product.title}
                      <td>{cartItem.product.brand?.name}</td>
                    </Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <button
                        className="btn btn-secondary trans me-2"
                        disabled={loadingUpdate && cartItem.product._id === currentIdUpdate}
                        onClick={() =>
                          updateCount(cartItem.product._id, cartItem.count - 1)
                        }
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-start border-end">
                        {loadingUpdate  && cartItem.product._id === currentIdUpdate ? "loading" : cartItem.count}
                      </span>
                      <button
                        className="btn btn-success trans ms-2"
                        disabled={loadingUpdate && cartItem.product._id === currentIdUpdate}
                        onClick={() =>
                          updateCount(cartItem.product._id, cartItem.count + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${cartItem.price}</td>
                  <td>
                    {loadingDele && currentDelete === cartItem.product._id ? (
                      <Button className=" m-0" variant="danger" disabled>
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
                    ) : (
                      <Button
                        onClick={() => delteItemCart(cartItem.product._id)}
                        variant="danger"
                        className="me-2"
                      >
                        Remove
                      </Button>
                    )}
                  </td>
                  <td>${cartItem.price * cartItem.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-end mt-4">
            <h4>
              Total Price: $
              {cart.products?.reduce(
                (total, item) => total + item.price * item.count,
                0
              )}
            </h4>
           <div className="d-flex justify-content-between align-items-center flex-row-reverse">
           {/* <Button variant="success" className="mt-2">
              Proceed to Checkout
            </Button> */}
          <button
            onClick={() => deleteAllCart()}
            className="btn btn-outline-danger mt-4 px-4 py-2 fw-bold shadow-sm delete-all-btn"
          >
            <i className="fa-solid fa-trash me-2"></i>Delete All Items
          </button>
           </div>
          </div>
        </div>
      )}
      </section>
    </>
  );
}
