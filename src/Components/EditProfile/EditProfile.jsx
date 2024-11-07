import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from "yup";
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
   let {  setUsername,setuserEmail,setuserPhone} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    let navigate = useNavigate()
    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid phone number").required("Phone is required"),
    });

    function updateData(values) {
        setIsLoading(true);
        axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, 
            values,
            { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
            setIsLoading(false);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            setUsername(values.name)
            setuserEmail(values.email)
            setuserPhone(values.phone)
            navigate('/')
            return res
        })
        .catch((err) => {
            setIsLoading(false);
            setMessage(err.response ? err.response.data.message : "An error occurred.");
        });
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: ''
        },
        onSubmit: updateData,
        validationSchema: schema
    });

    return (
       <section>
         <Container className="my-5">
            <Card className="shadow-lg">
                <Card.Header className="text-center fs-5">
                    <i className="fas fa-user-edit"></i> Edit Profile
                </Card.Header>
                <Card.Body>
                    {message && <Alert variant="warning" className='text-center fs-5'><i className="fa-solid fa-triangle-exclamation me-2"></i>{message}</Alert>}
                    <form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                isInvalid={formik.touched.name && !!formik.errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                isInvalid={formik.touched.email && !!formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                isInvalid={formik.touched.phone && !!formik.errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" className="btn btn-primary w-100 trans" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Data"}
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </Container>
       </section>
    );
}
