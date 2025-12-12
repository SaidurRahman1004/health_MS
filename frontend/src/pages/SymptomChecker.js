import React from 'react';
import { Container, Card, Button, Alert, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationTriangle, FaHospital } from 'react-icons/fa';
import SymptomSearch from '../components/SymptomSearch';
import { symptomAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

class SymptomChecker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSymptoms: [],
            results: null,
            loading: false,
            error: null,
            showResults: false
        };
    }

    handleSymptomsChange = (symptoms) => {
        this.setState({
            selectedSymptoms: symptoms,
            showResults: false,
            results: null,
            error: null
        });
    }

    handleCheckSymptoms = async () => {
        const { selectedSymptoms } = this.state;

        if (selectedSymptoms.length === 0) {
            this.setState({ error: 'অন্তত একটি লক্ষণ নির্বাচন করুন' });
            return;
        }

        this.setState({ loading: true, error: null, showResults: false });

        try {
            const symptomIds = selectedSymptoms.map(s => s.symptom_id);
            const userId = this.props.user ? this.props.user._id : null;

            const response = await symptomAPI.checkSymptoms({
                symptom_ids: symptomIds,
                user_id: userId
            });

            this.setState({
                results: response.data,
                showResults: true,
                loading: false
            }, () => {
                setTimeout(() => {
                    const element = document.getElementById('results-section');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 200);
            });

        } catch (err) {
            this.setState({
                error: err.response?.data?.message || 'কিছু ভুল হয়েছে',
                loading: false,
                showResults: false
            });
        }
    }

    getRiskColor(risk) {
        if (risk === 'High') return 'danger';
        if (risk === 'Medium') return 'warning';
        return 'success';
    }

    getRiskText(risk) {
        if (risk === 'High') return 'উচ্চ ঝুঁকি';
        if (risk === 'Medium') return 'মাঝারি ঝুঁকি';
        return 'নিম্ন ঝুঁকি';
    }

    render() {
        const { selectedSymptoms, results, loading, error, showResults } = this.state;
        const { user } = this.props;

        return (
            <Container className="my-5">
                <Card className="shadow-lg border-0">
                    <Card.Header className="bg-primary text-white text-center py-4">
                        <h2 className="mb-0">সিম্পটম চেকার</h2>
                        <p className="mb-0 mt-2">আপনার লক্ষণ দিয়ে স্বাস্থ্য পরীক্ষা করুন</p>
                    </Card.Header>

                    <Card.Body className="p-4">
                        <Alert variant="warning">
                            <FaExclamationTriangle className="me-2" />
                            <strong>সতর্কতা:</strong> এটি শুধুমাত্র তথ্যমূলক।
                        </Alert>

                        <SymptomSearch onSymptomsChange={this.handleSymptomsChange} />

                        {error && (
                            <Alert variant="danger" className="mt-3">
                                {error}
                            </Alert>
                        )}

                        <div className="text-center mt-4">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={this.handleCheckSymptoms}
                                disabled={selectedSymptoms.length === 0 || loading}
                                className="px-5 py-3"
                            >
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        পরীক্ষা করা হচ্ছে...
                                    </>
                                ) : (
                                    <>পরীক্ষা করুন ({selectedSymptoms.length} টি)</>
                                )}
                            </Button>
                        </div>

                        {/* <Card className="mt-3 bg-info text-white">
                            <Card.Body>
                                <small>
                                    Selected: {selectedSymptoms.length} |
                                    Loading: {loading ? 'Yes' : 'No'} |
                                    Show:  {showResults ? 'Yes' : 'No'} |
                                    Results: {results ? 'Yes' : 'No'}
                                </small>
                            </Card.Body>
                        </Card> */}
                    </Card.Body>
                </Card>

                {showResults && results ? (
                    <div id="results-section" style={{ marginTop: '30px' }}>
                        <Card className="shadow-lg border-0">
                            <Card.Header className={'bg-' + this.getRiskColor(results.overall_risk) + ' text-white py-4'}>
                                <h3 className="mb-0 text-center">পরীক্ষার ফলাফল</h3>
                            </Card.Header>

                            <Card.Body className="p-4">
                                <Row className="mb-4">
                                    <Col md={6}>
                                        <Card className="text-center p-4">
                                            <h6>সামগ্রিক ঝুঁকি</h6>
                                            <Badge bg={this.getRiskColor(results.overall_risk)} className="fs-4 px-4 py-2">
                                                {this.getRiskText(results.overall_risk)}
                                            </Badge>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card className="text-center p-4">
                                            <h6>মোট লক্ষণ</h6>
                                            <h1 className="text-primary">{results.total_symptoms}</h1>
                                        </Card>
                                    </Col>
                                </Row>

                                {results.results && results.results.length > 0 ? (
                                    <div>
                                        <h5 className="mb-4">
                                            <FaHospital className="me-2" />
                                            বিস্তারিত পরামর্শ
                                        </h5>

                                        {results.results.map((item, idx) => (
                                            <Card key={idx} className="mb-3 shadow-sm">
                                                <Card.Body>
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h5 className="text-primary">{idx + 1}. {item.symptom}</h5>
                                                        <Badge bg={this.getRiskColor(item.risk_level)}>
                                                            {this.getRiskText(item.risk_level)}
                                                        </Badge>
                                                    </div>
                                                    <p><strong>বিভাগ:</strong> {item.category}</p>
                                                    <Alert variant="light">
                                                        <strong>পরামর্শ:</strong> {item.advice}
                                                    </Alert>
                                                    <div className="bg-success bg-opacity-10 p-3 rounded">
                                                        <strong>ডাক্তার:</strong> {item.recommended_doctor}
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Alert variant="warning">কোনো ফলাফল পাওয়া যায়নি</Alert>
                                )}

                                {!user && (
                                    <Alert variant="info" className="mt-4">
                                        লগইন করুন হিস্টরি সেভের জন্য
                                    </Alert>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                ) : null}
            </Container>
        );
    }
}

function SymptomCheckerWrapper() {
    const { user } = useAuth();
    return <SymptomChecker user={user} />;
}

export default SymptomCheckerWrapper;