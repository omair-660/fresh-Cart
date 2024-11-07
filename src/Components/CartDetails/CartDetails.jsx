import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { toast, ToastContainer } from "react-toastify";
import { CartContext } from "../../Context/CartContext";
import Button from "react-bootstrap/Button";

export default function CartDetails() {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isStock, setisStock] = useState(true);
  const [loadingDele, setloadingDele] = useState(false);
  let { deleteItem } = useContext(CartContext);
  let { id } = useParams();
  let navigate = useNavigate()
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

  async function delteItemCart(id) {
    setloadingDele(true);
    let res = await deleteItem(id);
    if (res.data.status == "success") {
      setloadingDele(false);
      toast.success("product deleted successfuly");
      navigate('/')
    } else {
      setloadingDele(false);
    }
  }

  return (
    <>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
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

            {loadingDele ? (
              <Button className="m-0 w-100" variant="danger" disabled>
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
              <button
                onClick={() => delteItemCart(product?._id)}
                className="btn btn-danger trans btn-lg w-100 mb-3"
              >
                <i className="fa-solid fa-trash me-2"></i> Delete Now
              </button>
            )}

           
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
      </div>
</section>
    </>
  );
}
