import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [allBrands, setallBrands] = useState([]);
  const [oneBrand, setoneBrand] = useState(null);
  const [isLoadinBrand, setisLoadinBrand] = useState(false);
  const [isLoadinBrands, setisLoadinBrands] = useState(false);
  const [noBrands, setNoBrands] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getAllBrands() {
    setisLoadinBrands(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((res) => {
      console.log(res);
      setisLoadinBrands(false);
      setallBrands(res.data.data);
      if (res.data.data.length === 0) {
        setNoBrands('No brands available');
      } else {
        setallBrands(res.data.data);
        setNoBrands(null);
      }
    });
  }

  function getOneBrand(id) {
    setisLoadinBrand(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        console.log(res);
        setisLoadinBrand(false);
        setoneBrand(res.data.data);
      });
  }

  useEffect(() => {
    getAllBrands();
  }, []);
  return (
    <>
    <section>
    <div className="container mt-5">
      {noBrands ? (
        <Alert variant="warning" className="d-flex align-items-center">
         <i className="fa-solid fa-triangle-exclamation me-2"></i>
          {noBrands}
        </Alert>
      ) : null}
    </div>
    <div className="container">
        <div className="row">
          {isLoadinBrands ? (
            <Loading />
          ) : (
            allBrands.map((brand) => (
              <div key={brand._id} className="col-md-6 col-lg-3 mb-3">
                <div
                  className="shadow-sm rounded-2 bg-body-tertiary pointer"
                  onClick={() => {
                    getOneBrand(brand._id);
                    handleShow();
                  }}
                >
                  <img src={brand.image} alt={brand.name} className="w-100" />
                  <h2 className="text-center pb-5">{brand.name}</h2>
                </div>
              </div>
            ))
          )}
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-success">
              {" "}
              {isLoadinBrand ? (
                <Skeleton width={200} height={24} />
              ) : (
                oneBrand?.name
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            {isLoadinBrand ? (
              <div>
                <Skeleton height={200} width="100%" />
              </div>
            ) : (
              <img
                src={oneBrand?.image}
                alt={oneBrand?.name}
                className="w-100"
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
    </>
  );
}
