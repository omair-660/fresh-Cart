import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function ChangePass() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Must be a valid email'),
        newPassword: Yup.string()
            .required("New password is required")
            .min(6, "Minimum length must be 6 characters"),
    });

    function ChangePassword(value) {
        setIsLoading(true);
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value)
            .then((res) => {
                setIsLoading(false);
                console.log(res);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Password changed successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/login')
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
                setMessage(err.response.data.message || 'An error occurred');
            });
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        onSubmit: ChangePassword,
        validationSchema: schema
    });

    return (
        <section className="container d-flex justify-content-center align-items-center vh-100"> 
            <div className="card p-4 shadow boxAuth">
                <h2 className="text-center mb-4">Change Password</h2>
                {message && <div className="alert alert-danger">{message}</div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            className={`form-control trans ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            type="password"
                            className={`form-control trans ${formik.touched.newPassword && formik.errors.newPassword ? 'is-invalid' : ''}`}
                            name='newPassword'
                            onChange={formik.handleChange}
                            value={formik.values.newPassword}
                            onBlur={formik.handleBlur}
                            placeholder="Enter new password"
                        />
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <div className="invalid-feedback">{formik.errors.newPassword}</div>
                        ) : null}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 trans" disabled={isLoading}>
                        {isLoading ? "Please wait..." : "Change Password"}
                    </button>
                </form>
            </div>
        </section>
    );
}
