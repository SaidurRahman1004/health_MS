import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaVenusMars } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: ''
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

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('পাসওয়ার্ড মিলছে না');
            return;
        }

        if (formData.password.length < 6) {
            setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
            return;
        }

        setLoading(true);

        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            age: formData.age,
            gender: formData.gender
        });

        setLoading(false);

        if (result.success) {
            setSuccess(result.message);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } else {
            setError(result.message);
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <Card className="shadow-lg border-0">
                        <Card.Header className="bg-success text-white text-center">
                            <h3 className="mb-0">
                                <FaUserPlus className="me-2" />
                                রেজিস্টার করুন
                            </h3>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaUser className="me-2" />
                                        নাম
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="আপনার পুরো নাম"
                                        required
                                    />
                                </Form.Group>

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
                                        placeholder="example@email.com"
                                        required
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaBirthdayCake className="me-2" />
                                                বয়স
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                placeholder="বয়স"
                                                min="1"
                                                max="150"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaVenusMars className="me-2" />
                                                লিঙ্গ
                                            </Form.Label>
                                            <Form.Select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                            >
                                                <option value="">নির্বাচন করুন</option>
                                                <option value="male">পুরুষ</option>
                                                <option value="female">মহিলা</option>
                                                <option value="other">অন্যান্য</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

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
                                        placeholder="কমপক্ষে ৬ অক্ষর"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaLock className="me-2" />
                                        পাসওয়ার্ড নিশ্চিত করুন
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="আবার পাসওয়ার্ড লিখুন"
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    variant="success"
                                    type="submit"
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            রেজিস্টার হচ্ছে...
                                        </>
                                    ) : (
                                        'রেজিস্টার করুন'
                                    )}
                                </Button>
                            </Form>

                            <hr />

                            <p className="text-center mb-0">
                                ইতিমধ্যে অ্যাকাউন্ট আছে? {' '}
                                <Link to="/login" className="text-success fw-bold">
                                    লগইন করুন
                                </Link>
                            </p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default Register;