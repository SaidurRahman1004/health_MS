import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const result = await login(formData);

        setLoading(false);

        if (result.success) {
            setSuccess(result.message);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            setError(result.message);
        }
    };

    return (
        <Container className="mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <Card className="shadow-lg border-0">
                        <Card.Header className="bg-primary text-white text-center">
                            <h3 className="mb-0">
                                <FaSignInAlt className="me-2" />
                                লগইন করুন
                            </h3>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaEnvelope className="me-2" />
                                        ইমেইল
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="আপনার ইমেইল লিখুন"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaLock className="me-2" />
                                        পাসওয়ার্ড
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="পাসওয়ার্ড লিখুন"
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            লগইন হচ্ছে...
                                        </>
                                    ) : (
                                        'লগইন করুন'
                                    )}
                                </Button>
                            </Form>

                            <hr />

                            <p className="text-center mb-0">
                                নতুন ইউজার? {' '}
                                <Link to="/register" className="text-primary fw-bold">
                                    রেজিস্টার করুন
                                </Link>
                            </p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default Login;