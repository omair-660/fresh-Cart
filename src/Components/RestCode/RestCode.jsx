import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

export default function RestCode() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    let schema = Yup.object().shape({
        resetCode: Yup.string().required("Code is required")
    });

    function handleSubmit(value) {
        setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value)
            .then((res) => {
                setIsLoading(false);
                if (res.data.status === 'Success') {
                    navigate('/changePass');
                }
                console.log(res);
            })
            .catch((err) => {
                setIsLoading(false);
                setMessage(err.response.data.message);
                console.log(err);
            });
    }

    let formik = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: handleSubmit,
        validationSchema: schema
    });

    return (
        <section className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow boxAuth">
                <h2 className="text-center mb-4">Verify Reset Code</h2>
                {message && <div className="alert alert-danger">{message}</div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Reset Code</label>
                        <input
                            name='resetCode'
                            type="text"
                            className={`form-control trans ${formik.touched.resetCode && formik.errors.resetCode ? 'is-invalid' : ''}`}
                            value={formik.values.resetCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.resetCode && formik.errors.resetCode ? (
                            <div className="invalid-feedback">{formik.errors.resetCode}</div>
                        ) : null}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 trans" disabled={isLoading}>
                        {isLoading ? "Checking..." : "Send"}
                    </button>
                </form>
            </div>
        </section>
    );
}
