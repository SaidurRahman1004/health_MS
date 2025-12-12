import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, ProgressBar, ButtonGroup } from 'react-bootstrap';
import { FaCalculator, FaRuler, FaWeight } from 'react-icons/fa';

const BMICalculator = () => {
    const [heightUnit, setHeightUnit] = useState('ft'); // 'ft' or 'cm'
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [heightCm, setHeightCm] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');

    const calculateBMI = (e) => {
        e.preventDefault();

        let heightInMeters = 0;

        if (heightUnit === 'ft') {
            const feet = parseFloat(heightFeet) || 0;
            const inches = parseFloat(heightInches) || 0;
            const totalInches = (feet * 12) + inches;
            heightInMeters = (totalInches * 2.54) / 100;
        } else {
            heightInMeters = (parseFloat(heightCm) || 0) / 100;
        }

        const weightKg = parseFloat(weight) || 0;

        if (heightInMeters > 0 && weightKg > 0) {
            const bmiValue = (weightKg / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);

            if (bmiValue < 18.5) {
                setCategory('কম ওজন (Underweight)');
                setColor('info');
            } else if (bmiValue >= 18.5 && bmiValue < 25) {
                setCategory('স্বাভাবিক ওজন (Normal)');
                setColor('success');
            } else if (bmiValue >= 25 && bmiValue < 30) {
                setCategory('অতিরিক্ত ওজন (Overweight)');
                setColor('warning');
            } else {
                setCategory('স্থূলতা (Obese)');
                setColor('danger');
            }
        }
    };

    const resetForm = () => {
        setHeightFeet('');
        setHeightInches('');
        setHeightCm('');
        setWeight('');
        setBmi(null);
        setCategory('');
    };

    const getBMIPercentage = () => {
        if (!bmi) return 0;
        return Math.min((bmi / 40) * 100, 100);
    };

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-lg border-0">
                        <Card.Header className="bg-gradient text-white text-center py-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            <h2 className="mb-0">
                                <FaCalculator className="me-2" />
                                BMI ক্যালকুলেটর
                            </h2>
                            <p className="mb-0 mt-2">আপনার বডি মাস ইনডেক্স জানুন</p>
                        </Card.Header>

                        <Card.Body className="p-4">
                            <Alert variant="info" className="mb-4">
                                <strong>BMI কী?</strong> Body Mass Index - আপনার উচ্চতা অনুযায়ী ওজন পরিমাপের একটি আন্তর্জাতিক সূচক
                            </Alert>

                            <Form onSubmit={calculateBMI}>
                                {/* Height Unit Selector */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">
                                        <FaRuler className="me-2" />
                                        উচ্চতা পরিমাপ পদ্ধতি নির্বাচন করুন
                                    </Form.Label>
                                    <div>
                                        <ButtonGroup className="w-100">
                                            <Button
                                                variant={heightUnit === 'ft' ? 'primary' : 'outline-primary'}
                                                onClick={() => setHeightUnit('ft')}
                                                type="button"
                                            >
                                                ফিট ও ইঞ্চি
                                            </Button>
                                            <Button
                                                variant={heightUnit === 'cm' ? 'primary' : 'outline-primary'}
                                                onClick={() => setHeightUnit('cm')}
                                                type="button"
                                            >
                                                সেন্টিমিটার
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Form.Group>

                                {/* Height Input */}
                                {heightUnit === 'ft' ? (
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>উচ্চতা (ফিট)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={heightFeet}
                                                    onChange={(e) => setHeightFeet(e.target.value)}
                                                    placeholder="যেমন: 5"
                                                    min="3"
                                                    max="8"
                                                    step="1"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>উচ্চতা (ইঞ্চি)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={heightInches}
                                                    onChange={(e) => setHeightInches(e.target.value)}
                                                    placeholder="যেমন: 8"
                                                    min="0"
                                                    max="11"
                                                    step="1"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                ) : (
                                    <Form.Group className="mb-3">
                                        <Form.Label>উচ্চতা (সেন্টিমিটার)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={heightCm}
                                            onChange={(e) => setHeightCm(e.target.value)}
                                            placeholder="যেমন: 170"
                                            required
                                            min="100"
                                            max="250"
                                        />
                                    </Form.Group>
                                )}

                                {/* Weight Input */}
                                <Form.Group className="mb-4">
                                    <Form.Label>
                                        <FaWeight className="me-2" />
                                        ওজন (কেজি)
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        placeholder="যেমন: 70"
                                        required
                                        min="20"
                                        max="300"
                                        step="0.1"
                                    />
                                </Form.Group>

                                {/* Buttons */}
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" size="lg">
                                        <FaCalculator className="me-2" />
                                        হিসাব করুন
                                    </Button>
                                    {bmi && (
                                        <Button variant="outline-secondary" onClick={resetForm} type="button">
                                            রিসেট করুন
                                        </Button>
                                    )}
                                </div>
                            </Form>

                            {/* Results */}
                            {bmi && (
                                <div className="mt-5">
                                    <Card className={`border-${color} border-3 shadow`}>
                                        <Card.Body className="p-4">
                                            <div className="text-center mb-4">
                                                <h1 className={`text-${color} display-3 mb-3`}>
                                                    {bmi}
                                                </h1>
                                                <h4 className="mb-4">
                                                    <span className={`badge bg-${color} px-4 py-2`}>
                                                        {category}
                                                    </span>
                                                </h4>

                                                <ProgressBar
                                                    now={getBMIPercentage()}
                                                    variant={color}
                                                    className="mb-4"
                                                    style={{ height: '30px' }}
                                                />
                                            </div>

                                            <Row className="mb-4">
                                                <Col md={6}>
                                                    <Card className="bg-light border-0 mb-3">
                                                        <Card.Body>
                                                            <h6 className="fw-bold mb-3">📊 BMI রেঞ্জ:</h6>
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                <span className="badge bg-info">{'<'} 18.5</span>
                                                                <span>কম ওজন</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                <span className="badge bg-success">18.5 - 24.9</span>
                                                                <span>স্বাভাবিক</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                <span className="badge bg-warning">25 - 29.9</span>
                                                                <span>অতিরিক্ত</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <span className="badge bg-danger">≥ 30</span>
                                                                <span>স্থূলতা</span>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>

                                                <Col md={6}>
                                                    <Card className="bg-light border-0">
                                                        <Card.Body>
                                                            <h6 className="fw-bold mb-3">💡 আপনার জন্য পরামর্শ:</h6>
                                                            <p className="mb-0">
                                                                {bmi < 18.5 && '🍎 পুষ্টিকর খাবার খান, নিয়মিত ব্যায়াম করুন এবং ডাক্তারের পরামর্শ নিন।'}
                                                                {bmi >= 18.5 && bmi < 25 && '✅ চমৎকার!  আপনার ওজন স্বাভাবিক রয়েছে। এভাবেই চালিয়ে যান! '}
                                                                {bmi >= 25 && bmi < 30 && '🏃 নিয়মিত ব্যায়াম করুন, স্বাস্থ্যকর খাবার খান এবং ওজন নিয়ন্ত্রণ করুন।'}
                                                                {bmi >= 30 && '⚠️ দ্রুত ডাক্তারের পরামর্শ নিন এবং ওজন কমানোর পরিকল্পনা করুন।'}
                                                            </p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>

                                            <Alert variant={color} className="mb-0">
                                                <strong>📌 মনে রাখবেন:</strong> BMI শুধুমাত্র একটি সূচক। বয়স, লিঙ্গ, পেশীর পরিমাণ ইত্যাদি বিবেচনা করা হয় না। সঠিক মূল্যায়নের জন্য ডাক্তারের পরামর্শ নিন।
                                            </Alert>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BMICalculator;