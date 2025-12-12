import React, { useState } from 'react';
import { Container, Card, Button, Alert, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationTriangle, FaHospital, FaHeartbeat } from 'react-icons/fa';
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
        console.log('✅ Selected symptoms:', symptoms);
        setSelectedSymptoms(symptoms);
        // Clear previous results when symptoms change
        if (results) {
            setResults(null);
        }
        if (error) {
            setError(null);
        }
    };

    const handleCheckSymptoms = async () => {
        console.log('🔍 Button clicked!  Starting symptom check...');

        if (selectedSymptoms.length === 0) {
            setError('অন্তত একটি লক্ষণ নির্বাচন করুন');
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null); // Clear previous results

        try {
            const symptomIds = selectedSymptoms.map(s => s.symptom_id);
            console.log('📤 Sending symptom IDs:', symptomIds);

            const requestData = {
                symptom_ids: symptomIds,
                user_id: user?._id || null
            };

            console.log('📤 Full request data:', requestData);

            const response = await symptomAPI.checkSymptoms(requestData);

            console.log('📥 Full API response:', response);
            console.log('📥 Response data:', response.data);
            console.log('📥 Response status:', response.status);

            if (response && response.data) {
                console.log('✅ Setting results to state:', response.data);
                setResults(response.data);

                // Scroll to results
                setTimeout(() => {
                    const resultsSection = document.getElementById('results-section');
                    if (resultsSection) {
                        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            } else {
                console.error('❌ No data in response');
                setError('সার্ভার থেকে কোনো ডাটা আসেনি');
            }

        } catch (err) {
            console.error('❌ Full error object:', err);

            if (err.response) {
                console.error('❌ Error response data:', err.response.data);
                console.error('❌ Error status:', err.response.status);
                setError(err.response.data?.message || 'সার্ভার এরর');
            } else if (err.request) {
                console.error('❌ No response received:', err.request);
                setError('সার্ভারের সাথে সংযোগ করতে পারছে না');
            } else {
                console.error('❌ Error message:', err.message);
                setError('কিছু ভুল হয়েছে:  ' + err.message);
            }
        } finally {
            setLoading(false);
            console.log('🏁 Check process completed');
        }
    };

    const getRiskBadge = (risk) => {
        const badges = {
            'High': { bg: 'danger', text: 'উচ্চ ঝুঁকি', icon: '🔴' },
            'Medium': { bg: 'warning', text: 'মাঝারি ঝুঁকি', icon: '🟡' },
            'Low': { bg: 'success', text: 'নিম্ন ঝুঁকি', icon: '🟢' }
        };
        return badges[risk] || badges['Low'];
    };

    // Log when results change
    React.useEffect(() => {
        console.log('🔄 Results state updated:', results);
    }, [results]);

    return (
        <Container className="mt-5 mb-5">
            <Card className="shadow-lg border-0">
                <Card.Header className="bg-primary text-white py-4">
                    <h2 className="mb-0 text-center">
                        <FaHeartbeat className="me-2" />
                        সিম্পটম চেকার
                    </h2>
                    <p className="text-center mb-0 mt-2">আপনার লক্ষণ দিয়ে স্বাস্থ্য পরীক্ষা করুন</p>
                </Card.Header>

                <Card.Body className="p-4">
                    {/* Warning Alert */}
                    <Alert variant="warning" className="mb-4">
                        <div className="d-flex align-items-center">
                            <FaExclamationTriangle size={24} className="me-3" />
                            <div>
                                <strong>⚠️ সতর্কতা:</strong> এটি শুধুমাত্র তথ্যমূলক উদ্দেশ্যে।
                                গুরুতর সমস্যার জন্য অবশ্যই ডাক্তারের পরামর্শ নিন।
                            </div>
                        </div>
                    </Alert>

                    {/* Symptom Search Component */}
                    <SymptomSearch onSymptomsChange={handleSymptomsChange} />

                    {/* Error Message */}
                    {error && (
                        <Alert
                            variant="danger"
                            className="mt-4"
                            dismissible
                            onClose={() => setError(null)}
                        >
                            <strong>❌ Error:</strong> {error}
                        </Alert>
                    )}

                    {/* Check Button */}
                    <div className="text-center mt-4">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleCheckSymptoms}
                            disabled={selectedSymptoms.length === 0 || loading}
                            className="px-5 py-3 shadow"
                            style={{ fontSize: '1.2rem' }}
                        >
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    পরীক্ষা করা হচ্ছে...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle className="me-2" />
                                    পরীক্ষা শুরু করুন {selectedSymptoms.length > 0 && `(${selectedSymptoms.length} টি লক্ষণ)`}
                                </>
                            )}
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {/* Results Section */}
            {results && (
                <div id="results-section" className="mt-5">
                    <Card className="shadow-lg border-0 animate-fade-in">
                        <Card.Header
                            className={`bg-${getRiskBadge(results.overall_risk).bg} text-white py-4`}
                        >
                            <h3 className="mb-0 text-center">
                                <FaCheckCircle className="me-2" />
                                ✅ পরীক্ষার ফলাফল
                            </h3>
                        </Card.Header>

                        <Card.Body className="p-4">
                            {/* Summary Section */}
                            <Row className="mb-4 g-4">
                                <Col md={6}>
                                    <Card className="border-0 shadow-sm h-100 text-center p-4">
                                        <h6 className="text-muted mb-3">সামগ্রিক ঝুঁকি মাত্রা</h6>
                                        <div style={{ fontSize: '4rem' }} className="mb-2">
                                            {getRiskBadge(results.overall_risk).icon}
                                        </div>
                                        <Badge
                                            bg={getRiskBadge(results.overall_risk).bg}
                                            className="fs-4 px-4 py-3"
                                        >
                                            {getRiskBadge(results.overall_risk).text}
                                        </Badge>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card className="border-0 shadow-sm h-100 text-center p-4">
                                        <h6 className="text-muted mb-3">পরীক্ষিত লক্ষণ</h6>
                                        <div className="display-1 text-primary mb-2">
                                            {results.total_symptoms}
                                        </div>
                                        <p className="text-muted mb-0">টি লক্ষণ বিশ্লেষণ করা হয়েছে</p>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Detailed Results */}
                            {results.results && results.results.length > 0 ? (
                                <>
                                    <div className="mb-4">
                                        <h4 className="border-bottom pb-3 mb-4">
                                            <FaHospital className="me-2 text-primary" />
                                            বিস্তারিত পরামর্শ ও সুপারিশ
                                        </h4>
                                    </div>

                                    {results.results.map((result, index) => (
                                        <Card
                                            key={index}
                                            className="mb-4 border-0 shadow hover-lift"
                                            style={{
                                                borderLeft: `6px solid ${result.risk_level === 'High' ? '#dc3545' :
                                                        result.risk_level === 'Medium' ? '#ffc107' : '#28a745'
                                                    }`
                                            }}
                                        >
                                            <Card.Body className="p-4">
                                                {/* Header */}
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div className="flex-grow-1">
                                                        <h4 className="text-primary mb-2">
                                                            {index + 1}. {result.symptom}
                                                        </h4>
                                                        <p className="text-muted mb-0">
                                                            <strong>📂 বিভাগ:</strong> {result.category}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        bg={getRiskBadge(result.risk_level).bg}
                                                        className="px-3 py-2 ms-3"
                                                        style={{ fontSize: '1rem' }}
                                                    >
                                                        {getRiskBadge(result.risk_level).icon} {getRiskBadge(result.risk_level).text}
                                                    </Badge>
                                                </div>

                                                {/* Advice Box */}
                                                <Alert variant="light" className="mb-3 border-start border-4 border-primary">
                                                    <div className="d-flex">
                                                        <div className="me-3" style={{ fontSize: '2rem' }}>💊</div>
                                                        <div>
                                                            <strong className="text-primary">পরামর্শ:</strong>
                                                            <p className="mb-0 mt-2" style={{ fontSize: '1.05rem' }}>
                                                                {result.advice}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Alert>

                                                {/* Doctor Recommendation */}
                                                <div
                                                    className="p-3 rounded"
                                                    style={{
                                                        backgroundColor: '#d4edda',
                                                        border: '2px solid #28a745'
                                                    }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-3" style={{ fontSize: '2rem' }}>🩺</div>
                                                        <div>
                                                            <strong className="text-success d-block mb-1">
                                                                প্রস্তাবিত ডাক্তার:
                                                            </strong>
                                                            <h5 className="mb-0 text-dark">
                                                                {result.recommended_doctor}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </>
                            ) : (
                                <Alert variant="warning" className="text-center py-5">
                                    <div style={{ fontSize: '3rem' }} className="mb-3">⚠️</div>
                                    <h5 className="mb-3">কোনো ম্যাচিং তথ্য পাওয়া যায়নি</h5>
                                    <p className="mb-0">
                                        {results.message || 'অনুগ্রহ করে ডাক্তারের পরামর্শ নিন।'}
                                    </p>
                                </Alert>
                            )}

                            {/* Additional Info */}
                            <div className="mt-4">
                                {!user ? (
                                    <Alert variant="info" className="border-0 shadow-sm">
                                        <Row className="align-items-center">
                                            <Col md={8}>
                                                <div className="d-flex align-items-center">
                                                    <div className="me-3" style={{ fontSize: '2rem' }}>💡</div>
                                                    <div>
                                                        <strong>টিপ:</strong> লগইন করলে আপনার সব চেকআপ হিস্টরি সেভ হবে!
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={4} className="text-end">
                                                <Button
                                                    variant="primary"
                                                    href="/login"
                                                    className="px-4"
                                                >
                                                    এখনই লগইন করুন
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Alert>
                                ) : (
                                    <Alert variant="success" className="border-0 shadow-sm">
                                        <div className="d-flex align-items-center">
                                            <div className="me-3" style={{ fontSize: '2rem' }}>✅</div>
                                            <div>
                                                <strong>সফল! </strong> আপনার চেকআপ হিস্টরিতে সেভ করা হয়েছে।
                                                <a href="/history" className="ms-2 text-decoration-none">
                                                    হিস্টরি দেখুন →
                                                </a>
                                            </div>
                                        </div>
                                    </Alert>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {/* Debug Info (Remove in production) */}
            {process.env.NODE_ENV === 'development' && (
                <Card className="mt-3 bg-dark text-white">
                    <Card.Body>
                        <small>
                            <strong>Debug Info: </strong><br />
                            Selected Symptoms: {selectedSymptoms.length}<br />
                            Results Available: {results ? 'Yes' : 'No'}<br />
                            Loading: {loading ? 'Yes' : 'No'}<br />
                            Error: {error || 'None'}
                        </small>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default SymptomChecker;