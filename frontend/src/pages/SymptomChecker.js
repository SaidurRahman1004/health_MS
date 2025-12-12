import React, { useState, useCallback, useEffect } from 'react';
import { Container, Card, Button, Alert, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationTriangle, FaHospital } from 'react-icons/fa';
import SymptomSearch from '../components/SymptomSearch';
import { symptomAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const SymptomChecker = () => {
    const { user } = useAuth();
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Log state changes for debugging
    useEffect(() => {
        console.log('SymptomChecker - Results updated:', results);
    }, [results]);

    useEffect(() => {
        console.log('SymptomChecker - Selected symptoms updated:', selectedSymptoms);
    }, [selectedSymptoms]);

    // Memoize the callback to prevent unnecessary re-renders
    const handleSymptomsChange = useCallback((symptoms) => {
        console.log('handleSymptomsChange called with:', symptoms);
        setSelectedSymptoms(symptoms);
        // Only clear results if user is removing symptoms or changing selection
        // Don't clear during initial component mount or when results are already null
        if (results !== null) {
            console.log('Clearing previous results due to symptom change');
            setResults(null);
        }
        setError(null);
    }, [results]);

    const handleCheckSymptoms = async () => {
        if (selectedSymptoms.length === 0) {
            setError('অন্তত একটি লক্ষণ নির্বাচন করুন');
            return;
        }

        console.log('Starting symptom check with:', selectedSymptoms);
        setLoading(true);
        setError(null);
        setResults(null); // Clear previous results before new check

        try {
            const symptomIds = selectedSymptoms.map(s => s.symptom_id);
            console.log('Calling API with symptom IDs:', symptomIds);
            
            const response = await symptomAPI.checkSymptoms({
                symptom_ids: symptomIds,
                user_id: user?._id || null
            });

            console.log('API Response received:', response.data);
            setResults(response.data);
            console.log('Results state updated successfully');

            // Auto-scroll to results with a slight delay to ensure DOM is updated
            setTimeout(() => {
                const element = document.getElementById('results-section');
                if (element) {
                    console.log('Scrolling to results section');
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    console.warn('Results section element not found in DOM');
                }
            }, 100);

        } catch (err) {
            console.error('Error checking symptoms:', err);
            setError(err.response?.data?.message || 'কিছু ভুল হয়েছে');
        } finally {
            setLoading(false);
            console.log('Symptom check completed');
        }
    };

    const getRiskColor = (risk) => {
        if (risk === 'High') return 'danger';
        if (risk === 'Medium') return 'warning';
        return 'success';
    };

    const getRiskText = (risk) => {
        if (risk === 'High') return 'উচ্চ ঝুঁকি';
        if (risk === 'Medium') return 'মাঝারি ঝুঁকি';
        return 'নিম্ন ঝুঁকি';
    };

    const getRiskIcon = (risk) => {
        if (risk === 'High') return '🔴';
        if (risk === 'Medium') return '🟡';
        return '🟢';
    };

    return (
        <Container className="my-5">
            <Card className="shadow-lg border-0">
                <Card.Header className="bg-primary text-white text-center py-4">
                    <h2 className="mb-0">
                        <FaCheckCircle className="me-2" />
                        সিম্পটম চেকার
                    </h2>
                    <p className="mb-0 mt-2">আপনার লক্ষণ দিয়ে স্বাস্থ্য পরীক্ষা করুন</p>
                </Card.Header>

                <Card.Body className="p-4">
                    <Alert variant="warning" className="mb-4">
                        <FaExclamationTriangle className="me-2" />
                        <strong>সতর্কতা: </strong> এটি শুধুমাত্র তথ্যমূলক উদ্দেশ্যে। গুরুতর সমস্যার জন্য অবশ্যই ডাক্তারের পরামর্শ নিন।
                    </Alert>

                    <SymptomSearch onSymptomsChange={handleSymptomsChange} />

                    {error && (
                        <Alert variant="danger" className="mt-3" dismissible onClose={() => setError(null)}>
                            <strong>❌ Error:</strong> {error}
                        </Alert>
                    )}

                    <div className="text-center mt-4">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleCheckSymptoms}
                            disabled={selectedSymptoms.length === 0 || loading}
                            className="px-5 py-3"
                        >
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    পরীক্ষা করা হচ্ছে...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle className="me-2" />
                                    পরীক্ষা শুরু করুন ({selectedSymptoms.length} টি লক্ষণ)
                                </>
                            )}
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {results !== null && (
                <div id="results-section" className="mt-5">
                    <Card className="shadow-lg border-0 result-card">
                        <Card.Header className={`bg-${getRiskColor(results.overall_risk)} text-white py-4`}>
                            <h3 className="mb-0 text-center">
                                {getRiskIcon(results.overall_risk)} পরীক্ষার ফলাফল
                            </h3>
                        </Card.Header>

                        <Card.Body className="p-4">
                            <Row className="mb-4 g-4">
                                <Col md={6}>
                                    <Card className="border-0 shadow-sm h-100 text-center p-4">
                                        <h6 className="text-muted mb-3">সামগ্রিক ঝুঁকি মাত্রা</h6>
                                        <div style={{ fontSize: '3rem' }} className="mb-2">
                                            {getRiskIcon(results.overall_risk)}
                                        </div>
                                        <Badge bg={getRiskColor(results.overall_risk)} className="fs-4 px-4 py-2">
                                            {getRiskText(results.overall_risk)}
                                        </Badge>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card className="border-0 shadow-sm h-100 text-center p-4">
                                        <h6 className="text-muted mb-3">পরীক্ষিত লক্ষণ</h6>
                                        <div className="display-3 text-primary mb-2">
                                            {results.total_symptoms}
                                        </div>
                                        <p className="text-muted mb-0">টি লক্ষণ বিশ্লেষণ করা হয়েছে</p>
                                    </Card>
                                </Col>
                            </Row>

                            {results.results && results.results.length > 0 ? (
                                <>
                                    <h5 className="mb-4 pb-2 border-bottom">
                                        <FaHospital className="me-2 text-primary" />
                                        বিস্তারিত পরামর্শ ও সুপারিশ
                                    </h5>

                                    {results.results.map((item) => (
                                        <Card
                                            key={item.symptom_id}
                                            className="mb-4 border-0 shadow-sm hover-card"
                                            style={{
                                                borderLeft: `5px solid ${item.risk_level === 'High' ? '#dc3545' :
                                                    item.risk_level === 'Medium' ? '#ffc107' : '#28a745'
                                                    }`
                                            }}
                                        >
                                            <Card.Body className="p-4">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div className="flex-grow-1">
                                                        <h5 className="text-primary mb-2">
                                                            {results.results.indexOf(item) + 1}. {item.symptom}
                                                        </h5>
                                                        <p className="text-muted mb-0">
                                                            <strong>📂 বিভাগ:</strong> {item.category}
                                                        </p>
                                                    </div>
                                                    <Badge bg={getRiskColor(item.risk_level)} className="px-3 py-2">
                                                        {getRiskIcon(item.risk_level)} {getRiskText(item.risk_level)}
                                                    </Badge>
                                                </div>

                                                <Alert variant="light" className="mb-3 border-start border-4 border-primary">
                                                    <div className="d-flex">
                                                        <div className="me-3" style={{ fontSize: '1.5rem' }}>💊</div>
                                                        <div>
                                                            <strong className="text-primary">পরামর্শ:</strong>
                                                            <p className="mb-0 mt-2">{item.advice}</p>
                                                        </div>
                                                    </div>
                                                </Alert>

                                                <div className="bg-success bg-opacity-10 p-3 rounded border border-success">
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-3" style={{ fontSize: '1.5rem' }}>🩺</div>
                                                        <div>
                                                            <strong className="text-success d-block mb-1">
                                                                প্রস্তাবিত ডাক্তার:
                                                            </strong>
                                                            <h6 className="mb-0 text-dark">
                                                                {item.recommended_doctor}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </>
                            ) : (
                                <Alert variant="warning" className="text-center py-4">
                                    <h5>⚠️ কোনো ম্যাচিং তথ্য পাওয়া যায়নি</h5>
                                    <p className="mb-0">অনুগ্রহ করে ডাক্তারের পরামর্শ নিন।</p>
                                </Alert>
                            )}

                            {!user ? (
                                <Alert variant="info" className="mt-4 mb-0">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            💡 <strong>টিপ:</strong> লগইন করলে আপনার চেকআপ হিস্টরি সেভ হবে!
                                        </div>
                                        <Button variant="primary" size="sm" href="/login">
                                            লগইন করুন
                                        </Button>
                                    </div>
                                </Alert>
                            ) : (
                                <Alert variant="success" className="mt-4 mb-0">
                                    ✅ আপনার চেকআপ হিস্টরিতে সেভ করা হয়েছে!
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Container>
    );
};

export default SymptomChecker;