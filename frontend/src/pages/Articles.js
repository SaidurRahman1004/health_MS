import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { FaNewspaper, FaCalendar, FaExclamationTriangle } from 'react-icons/fa';
import { articleAPI } from '../utils/api';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await articleAPI.getAll();
            console.log('Articles response:', response.data);
            setArticles(response.data);
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError(err.response?.data?.message || err.message || 'আর্টিকেল লোড করতে সমস্যা হয়েছে');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">আর্টিকেল লোড হচ্ছে...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <FaExclamationTriangle className="me-2" />
                    <strong>Error:</strong> {error}
                </Alert>
                <div className="text-center">
                    <Button variant="primary" onClick={fetchArticles}>
                        আবার চেষ্টা করুন
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="mt-5 mb-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold text-primary">
                    <FaNewspaper className="me-2" />
                    হেলথ টিপস ও আর্টিকেল
                </h2>
                <p className="text-muted">স্বাস্থ্য সম্পর্কিত গুরুত্বপূর্ণ তথ্য</p>
            </div>

            {articles.length === 0 ? (
                <Alert variant="info" className="text-center">
                    এখনো কোনো আর্টিকেল নেই
                </Alert>
            ) : (
                <Row>
                    {articles.map((article, index) => (
                        <Col md={6} lg={4} key={article._id || index} className="mb-4">
                            <Card className="h-100 shadow-sm border-0 hover-card">
                                <Card.Body>
                                    <div className="d-flex align-items-center mb-3">
                                        <div
                                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                            style={{ width: '50px', height: '50px' }}
                                        >
                                            <FaNewspaper size={24} />
                                        </div>
                                        <div>
                                            <Card.Title className="mb-0">{article.title}</Card.Title>
                                            {article.createdAt && (
                                                <small className="text-muted">
                                                    <FaCalendar className="me-1" />
                                                    {new Date(article.createdAt).toLocaleDateString('bn-BD')}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                    <Card.Text>{article.content}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Articles;