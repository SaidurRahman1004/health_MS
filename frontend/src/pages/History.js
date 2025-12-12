import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner, Badge } from 'react-bootstrap';
import { FaHistory, FaCalendar } from 'react-icons/fa';
import { historyAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchHistory();
    }, [user, navigate]);

    const fetchHistory = async () => {
        try {
            const response = await historyAPI.getAll();
            setHistory(response.data);
            setLoading(false);
        } catch (err) {
            setError('হিস্টরি লোড করতে সমস্যা হয়েছে');
            setLoading(false);
        }
    };

    const getRiskBadge = (risk) => {
        const badges = {
            High: { bg: 'danger', text: 'উচ্চ ঝুঁকি' },
            Medium: { bg: 'warning', text: 'মাঝারি ঝুঁকি' },
            Low: { bg: 'success', text: 'নিম্ন ঝুঁকি' }
        };
        return badges[risk] || badges.Low;
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
            <Card className="shadow-lg border-0">
                <Card.Header className="bg-info text-white">
                    <h3 className="mb-0">
                        <FaHistory className="me-2" />
                        আপনার চেকআপ হিস্টরি
                    </h3>
                </Card.Header>
                <Card.Body className="p-4">
                    {history.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            আপনার এখনো কোনো চেকআপ হিস্টরি নেই
                        </Alert>
                    ) : (
                        history.map((item, index) => (
                            <Card key={item._id} className="mb-3 border-0 shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="mb-0">চেকআপ #{history.length - index}</h5>
                                        <small className="text-muted">
                                            <FaCalendar className="me-1" />
                                            {new Date(item.date).toLocaleString('bn-BD')}
                                        </small>
                                    </div>

                                    <div className="mb-3">
                                        <strong>নির্বাচিত লক্ষণ:</strong>
                                        <div className="mt-2">
                                            {item.symptoms && item.symptoms.map((symptom, idx) => (
                                                <Badge bg="secondary" className="me-1 mb-1" key={idx}>
                                                    {symptom}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <strong>ফলাফল:</strong>
                                    <div className="mt-2">
                                        {item.results && item.results.map((result, idx) => (
                                            <Card key={idx} className="mb-2 border-start border-4 border-primary">
                                                <Card.Body className="p-3">
                                                    <div className="d-flex justify-content-between">
                                                        <small><strong>{result.symptom_id}</strong></small>
                                                        {result.risk_level && (
                                                            <Badge bg={getRiskBadge(result.risk_level).bg}>
                                                                {getRiskBadge(result.risk_level).text}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <small className="d-block mt-2">{result.advice}</small>
                                                    {result.doctor && (
                                                        <small className="text-success d-block mt-1">
                                                            <strong>ডাক্তার: </strong> {result.doctor}
                                                        </small>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default History;