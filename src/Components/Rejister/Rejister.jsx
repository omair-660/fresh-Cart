import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import img from "../../assets/img.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
export default function Rejister() {
   let {setuserLogin , setUsername,setuserEmail,setuserPhone} = useContext(UserContext)
   const [isLoading, setisLoading] = useState(false)
   const [ApiError, setApiError] = useState(null)
   let navigate = useNavigate()

    let schema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        email: Yup.string().email("invalid email").required("email is required"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone number").required("phone is required"),
        password: Yup.string().required("password is required").min(6,"min length must be 6 charcter"),
        rePassword: Yup.string().oneOf([Yup.ref("password")],"password not match").required("rePassword is required")
    })
    function handleRejister(value) {
      setisLoading(true)
      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value)
        .then((res) => {
          setisLoading(false)
          if (res.data.message === 'success') {
            localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.user.name); 
          localStorage.setItem("userEmail", res.data.user.email); 
          localStorage.setItem("userPhone", value.phone); 
          setuserLogin(res.data.token);
          setUsername(res.data.user.name)
          setuserEmail(res.data.user.email)
          setuserPhone(value.phone)
          
          
            navigate("/");
          window.location.reload();

          }
        })
        .catch((err) => {
          setApiError(err.response.data.message);
          setisLoading(false)
        });
    }
    
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: handleRejister,
    validationSchema: schema
  });

  return (
    <>
      <section className="overflow-hidden my-5 py-3" id="signup">
        <div className="row align-items-center">
          <div className="col-md-7 pe-5">
            <img src={img} alt="" className="w-100" />
          </div>
          <div className="col-md-5 col-sm-12">
            <h2 className="text-center mb-4">Create an Account</h2>
        
            <form onSubmit={formik.handleSubmit} className="container pe-4">
      {ApiError?  <div className="text-center alert alert-danger">{ApiError}</div> : null}
              <div>
                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    name="name"
                    type="text"
                    className="form-control border-0 border-bottom"
                    id="floatingName"
                    placeholder="Name"
                  />
                  <label htmlFor="floatingName">Name</label>
                </div>
                {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}

                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    name="email"
                    type="email"
                    className="form-control border-0 border-bottom"
                    id="floatingEmail"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}

                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    name="phone"
                    type="tel"
                    className="form-control border-0 border-bottom"
                    id="floatingPhone"
                    placeholder="Phone"
                  />
                  <label htmlFor="floatingPhone">Phone</label>
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-danger">{formik.errors.phone}</div>
                  ) : null}

                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name="password"
                    type="password"
                    className="form-control border-0 border-bottom"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rePassword}
                    name="rePassword"
                    type="password"
                    className="form-control border-0 border-bottom"
                    id="floatingrePassword"
                    placeholder="rePassword"
                  />
                  <label htmlFor="floatingrePassword">rePassword</label>
                </div>
                {formik.touched.rePassword && formik.errors.rePassword ? (
                    <div className="text-danger">{formik.errors.rePassword}</div>
                  ) : null}
                <button
                    disabled={isLoading}
                      type="submit"
                      className="btn btn-submit text-white trans px-5"
                    >
                      {isLoading ? "Creating an account" : "Create Account"}
                    </button>
              </div>
            </form>
            <p className="text-center mt-3">
              {" "}
              Already have account?{" "}
              <Link
                className="ps-3 text-black fw-bold text-decoration-underline"
                to={"/login"}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
