import React, { useState } from 'react';
import { Container, Card, Button, Alert, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import SymptomSearch from '../components/SymptomSearch';
import { symptomAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const SymptomChecker = () => {
    const { user } = useAuth();
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSymptomsChange = (symptoms) => {
        console.log('Selected symptoms changed:', symptoms);
        setSelectedSymptoms(symptoms);
        setResults(null);
        setError(null);
    };

    const handleCheckSymptoms = async () => {
        if (selectedSymptoms.length === 0) {
            setError('অন্তত একটি লক্ষণ নির্বাচন করুন');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const symptomIds = selectedSymptoms.map(s => s.symptom_id);
            console.log('Checking symptoms with IDs:', symptomIds);

            const requestData = {
                symptom_ids: symptomIds,
                user_id: user?._id || null
            };

            console.log('Sending request:', requestData);

            const response = await symptomAPI.checkSymptoms(requestData);
            console.log('Received response:', response.data);

            setResults(response.data);
        } catch (err) {
            console.error('Error checking symptoms:', err);
            console.error('Error response:', err.response);

            if (err.response) {
                setError(err.response.data?.message || 'সার্ভার থেকে এরর এসেছে');
            } else if (err.request) {
                setError('সার্ভারের সাথে সংযোগ করতে পারছে না। Backend চালু আছে কিনা চেক করুন।');
            } else {
                setError('কিছু ভুল হয়েছে:  ' + err.message);
            }
        } finally {
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

    return (
        <Container className="mt-5 mb-5">
            <Card className="shadow-lg border-0">
                <Card.Header className="bg-primary text-white">
                    <h3 className="mb-0">
                        <FaCheckCircle className="me-2" />
                        সিম্পটম চেকার
                    </h3>
                </Card.Header>
                <Card.Body className="p-4">
                    <Alert variant="info">
                        <FaExclamationTriangle className="me-2" />
                        <strong>সতর্কতা:</strong> এটি শুধুমাত্র তথ্যমূলক উদ্দেশ্যে। গুরুতর সমস্যার জন্য অবশ্যই ডাক্তারের পরামর্শ নিন।
                    </Alert>

                    {/* Symptom Search Component */}
                    <SymptomSearch onSymptomsChange={handleSymptomsChange} />

                    {/* Debug Info (Remove in production) */}
                    {selectedSymptoms.length > 0 && (
                        <Alert variant="secondary" className="mt-3">
                            <small>
                                <strong>Selected Symptom IDs:</strong>{' '}
                                {selectedSymptoms.map(s => s.symptom_id).join(', ')}
                            </small>
                        </Alert>
                    )}

                    {/* Error Message */}
                    {error && (
                        <Alert variant="danger" className="mt-3">
                            <strong>Error:</strong> {error}
                        </Alert>
                    )}

                    {/* Check Button */}
                    <div className="text-center mt-4">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleCheckSymptoms}
                            disabled={selectedSymptoms.length === 0 || loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    পরীক্ষা করা হচ্ছে...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle className="me-2" />
                                    পরীক্ষা করুন ({selectedSymptoms.length} টি লক্ষণ)
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Results */}
                    {results && (
                        <div className="mt-5">
                            <Card className="border-0 shadow">
                                <Card.Header className={`bg-${getRiskBadge(results.overall_risk).bg} text-white`}>
                                    <h4 className="mb-0">
                                        <FaCheckCircle className="me-2" />
                                        পরীক্ষার ফলাফল
                                    </h4>
                                </Card.Header>
                                <Card.Body>
                                    <Row className="mb-4">
                                        <Col md={6}>
                                            <div className="text-center p-3 bg-light rounded">
                                                <h6 className="text-muted mb-2">সামগ্রিক ঝুঁকি</h6>
                                                <Badge bg={getRiskBadge(results.overall_risk).bg} className="fs-5 px-4 py-2">
                                                    {getRiskBadge(results.overall_risk).text}
                                                </Badge>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="text-center p-3 bg-light rounded">
                                                <h6 className="text-muted mb-2">মোট লক্ষণ</h6>
                                                <h3 className="text-primary mb-0">{results.total_symptoms}</h3>
                                            </div>
                                        </Col>
                                    </Row>

                                    {results.results && results.results.length > 0 ? (
                                        <>
                                            <h5 className="mb-3">
                                                <FaExclamationTriangle className="me-2 text-warning" />
                                                বিস্তারিত পরামর্শ:
                                            </h5>
                                            {results.results.map((result, index) => (
                                                <Card key={index} className="mb-3 border-start border-4 border-primary">
                                                    <Card.Body>
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <h6 className="text-primary mb-0">{result.symptom}</h6>
                                                            <Badge bg={getRiskBadge(result.risk_level).bg}>
                                                                {getRiskBadge(result.risk_level).text}
                                                            </Badge>
                                                        </div>
                                                        <p className="mb-2 text-muted">
                                                            <strong>বিভাগ:</strong> {result.category}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>পরামর্শ:</strong> {result.advice}
                                                        </p>
                                                        <p className="mb-0 text-success">
                                                            <strong>🩺 প্রস্তাবিত ডাক্তার:</strong> {result.recommended_doctor}
                                                        </p>
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </>
                                    ) : (
                                        <Alert variant="warning">
                                            {results.message || 'কোনো ফলাফল পাওয়া যায়নি'}
                                        </Alert>
                                    )}

                                    {!user && (
                                        <Alert variant="info" className="mt-4">
                                            💡 <strong>টিপ:</strong> লগইন করলে আপনার চেকআপ হিস্টরি সেভ হবে! {' '}
                                            <a href="/login" className="alert-link">এখনই লগইন করুন</a>
                                        </Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SymptomChecker;