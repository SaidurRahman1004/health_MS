import React, { useState, useEffect } from 'react';
import { Container, Card, Accordion, Spinner, Alert } from 'react-bootstrap';
import { FaFirstAid, FaCheckCircle } from 'react-icons/fa';
import { firstAidAPI } from '../utils/api';

const FirstAid = () => {
    const [firstAidTips, setFirstAidTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFirstAid();
    }, []);

    const fetchFirstAid = async () => {
        try {
            const response = await firstAidAPI.getAll();
            setFirstAidTips(response.data);
            setLoading(false);
        } catch (err) {
            setError('প্রাথমিক চিকিৎসা তথ্য লোড করতে সমস্যা হয়েছে');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">লোড হচ্ছে... </p>
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
            <Card className="shadow-lg border-0">
                <Card.Header className="bg-danger text-white text-center">
                    <h2 className="mb-0">
                        <FaFirstAid className="me-2" />
                        প্রাথমিক চিকিৎসা গাইড
                    </h2>
                </Card.Header>
                <Card.Body className="p-4">
                    <Alert variant="warning">
                        <strong>⚠️ সতর্কতা:</strong> এটি শুধুমাত্র প্রাথমিক সহায়তার জন্য। জরুরি অবস্থায় দ্রুত ডাক্তার বা হাসপাতালে যোগাযোগ করুন।
                    </Alert>

                    <Accordion defaultActiveKey="0">
                        {firstAidTips.map((tip, index) => (
                            <Accordion.Item eventKey={index.toString()} key={tip._id}>
                                <Accordion.Header>
                                    <FaFirstAid className="text-danger me-2" />
                                    <strong>{tip.title}</strong>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ol className="mb-0">
                                        {tip.steps && tip.steps.map((step, idx) => (
                                            <li key={idx} className="mb-2">
                                                <FaCheckCircle className="text-success me-2" />
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>

                    {firstAidTips.length === 0 && (
                        <Alert variant="info" className="text-center">
                            এখনো কোনো প্রাথমিক চিকিৎসা টিপস নেই
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FirstAid;