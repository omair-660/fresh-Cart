import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

export default function UpdatePass() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    let navigate = useNavigate()

    let schema = Yup.object().shape({
        currentPassword: Yup.string().required("Current password is required"),
        password: Yup.string().required("New password is required").min(6, "Password must be at least 6 characters"),
        rePassword: Yup.string()
            .required("Re-enter your password")
            .oneOf([Yup.ref('password'), null], "Passwords must match")
    });

    function handleSubmit(values) {
        setIsLoading(true);
        axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, 
            values, 
            { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
            setIsLoading(false);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Password updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login')
            return res

        })
        .catch((err) => {
            setIsLoading(false);
            setMessage(err.response ? err.response.data.message : "An error occurred.");
        });
    }

    let formik = useFormik({
        initialValues: {
            currentPassword: '',
            password: '',
            rePassword: ''
        },
        onSubmit: handleSubmit,
        validationSchema: schema
    });

    return (
        <section className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Update Password</h2>
                {message && <div className={`alert ${message === "Password updated successfully!" ? "alert-success" : "alert-danger"}`}>{message}</div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Current Password</label>
                        <input 
                            name="currentPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.currentPassword}
                            type="password"
                            className={`form-control ${formik.touched.currentPassword && formik.errors.currentPassword ? 'is-invalid' : ''}`}
                        />
                        {formik.touched.currentPassword && formik.errors.currentPassword && (
                            <div className="invalid-feedback">{formik.errors.currentPassword}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input 
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            type="password"
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Re-enter Password</label>
                        <input 
                            name="rePassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.rePassword}
                            type="password"
                            className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ''}`}
                        />
                        {formik.touched.rePassword && formik.errors.rePassword && (
                            <div className="invalid-feedback">{formik.errors.rePassword}</div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 trans" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </section>
    );
}
