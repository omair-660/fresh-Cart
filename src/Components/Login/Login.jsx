import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import img from "../../assets/img.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let {setuserLogin , setUsername, setuserPhone ,setuserEmail} = useContext(UserContext)
  const [ApiError, setApiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  let schema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .required("password is required")
      .min(6, "min length must be 6 charcter"),
  });
  function handleRejister(value) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, value)
      .then((res) => {
        console.log(res);
        
        setisLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.user.name); 
          localStorage.setItem("userEmail", res.data.user.email); 
          setuserLogin(res.data.token);
          setUsername(res.data.user.name)
          setuserEmail(res.data.user.email)
          setuserPhone(value.phone)
          
          navigate("/");
          window.location.reload();
        }
      })
   .catch((err) => {
    setisLoading(false)
      setApiError(err.response.data.message);
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
    validationSchema: schema,
  });
  return (
    <>
      <section className="overflow-hidden my-5 py-3" id="signin">
        <div className="row align-items-center">
          <div className="col-md-7 pe-0 pe-md-5">
            <img src={img} alt="" className="w-100" />
          </div>
          <div className="col-md-5 col-sm-12">
            <h2 className="text-center mb-4">Log in oShop</h2>

            <form onSubmit={formik.handleSubmit} className="container pe-4">
              {ApiError ? (
                <div className="text-center alert alert-danger">{ApiError}</div>
              ) : null}
              <div>
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

                <div className="d-flex justify-content-between align-items-center">
                 
                    <button
                    disabled={isLoading}
                      type="submit"
                      className="btn btn-submit text-white trans px-5"
                    >
                      {isLoading ? "Signing in" : "Login"}
                    </button>
                  
                  <Link className="" to={'/forgetpass'}>Forget Password</Link>
                </div>
              </div>
            </form>
            <p className="text-center mt-3">
              {" "}
              Dont have account?{" "}
              <Link
                className="ps-3 text-black fw-bold text-decoration-underline"
                to={"/rejister"}
              >
                Rejister
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
