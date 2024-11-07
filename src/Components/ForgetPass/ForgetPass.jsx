import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function ForgetPass() {
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false)
  let schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  function handleSubmit(value) {
    setisLoading(true)
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value)
      .then((res) => {
        setisLoading(false)
        if (res.data.statusMsg === "success") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${res.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/restCode");
        }
      })
      .catch((err) => {
        setisLoading(false)
        console.log(err);
        setMessage(err.response.data.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
  });

  return (
    <section className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 boxAuth">
        <h3 className="text-center mb-4">Forget Password</h3>
        
        {message ? <div className="alert alert-danger">{message}</div> : null}
        
        <form onSubmit={formik.handleSubmit} className="p-4 border rounded-3 shadow-sm">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
          
          <button disabled={isLoading} type="submit" className="btn btn-primary w-100 trans">{isLoading ? 'Sendind..' : 'Send'}</button>
        </form>
      </div>
    </section>
  );
}
