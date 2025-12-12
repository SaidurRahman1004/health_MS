import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaHospital, FaMapMarkerAlt, FaPhone, FaStethoscope } from 'react-icons/fa';
import { hospitalAPI } from '../utils/api';

const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        try {
            const response = await hospitalAPI.getAll();
            setHospitals(response.data);
            setLoading(false);
        } catch (err) {
            setError('হাসপাতাল তালিকা লোড করতে সমস্যা হয়েছে');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">লোড হচ্ছে...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold text-danger">
                    <FaHospital className="me-2" />
                    হাসপাতাল তালিকা
                </h2>
                <p className="text-muted">নিকটবর্তী হাসপাতাল ও সেবা</p>
            </div>

            <Row>
                {hospitals.map((hospital) => (
                    <Col md={6} lg={4} key={hospital._id} className="mb-4">
                        <Card className="h-100 shadow border-0 hover-card">
                            <Card.Body>
                                <div className="d-flex align-items-start mb-3">
                                    <div
                                        className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center me-3"
                                        style={{ width: '50px', height: '50px' }}
                                    >
                                        <FaHospital size={24} />
                                    </div>
                                    <div>
                                        <Card.Title className="mb-1">{hospital.name_bangla}</Card.Title>
                                        <small className="text-muted">ID: {hospital.hospital_id}</small>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <FaMapMarkerAlt className="text-danger me-2" />
                                    <strong>স্থান:</strong> {hospital.location}
                                </div>

                                <div className="mb-3">
                                    <FaPhone className="text-success me-2" />
                                    <strong>যোগাযোগ: </strong>{' '}
                                    <a href={`tel:${hospital.contact}`} className="text-decoration-none">
                                        {hospital.contact}
                                    </a>
                                </div>

                                <div>
                                    <FaStethoscope className="text-primary me-2" />
                                    <strong>সেবাসমূহ:</strong>
                                    <div className="mt-2">
                                        {hospital.services && hospital.services.map((service, idx) => (
                                            <Badge bg="primary" className="me-1 mb-1" key={idx}>
                                                {service}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {hospitals.length === 0 && (
                <Alert variant="info" className="text-center">
                    এখনো কোনো হাসপাতাল তালিকাভুক্ত নেই
                </Alert>
            )}
        </Container>
    );
};

export default Hospitals;