import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, ProgressBar } from 'react-bootstrap';
import { FaCalculator, FaRuler, FaWeight } from 'react-icons/fa';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');

    const calculateBMI = (e) => {
        e.preventDefault();

        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);

            // Determine category
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
        setHeight('');
        setWeight('');
        setBmi(null);
        setCategory('');
    };

    const getBMIPercentage = () => {
        if (!bmi) return 0;
        return Math.min((bmi / 40) * 100, 100);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg border-0">
                        <Card.Header className="bg-success text-white text-center">
                            <h3 className="mb-0">
                                <FaCalculator className="me-2" />
                                BMI ক্যালকুলেটর
                            </h3>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Alert variant="info">
                                <strong>BMI কী?</strong> Body Mass Index - আপনার উচ্চতা অনুযায়ী ওজন পরিমাপের একটি সূচক
                            </Alert>

                            <Form onSubmit={calculateBMI}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaRuler className="me-2" />
                                        উচ্চতা (সেন্টিমিটারে)
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        placeholder="যেমন: 170"
                                        required
                                        min="50"
                                        max="250"
                                    />
                                    <Form.Text className="text-muted">
                                        ১ ফুট = ৩০. ৪৮ সেমি | ১ ইঞ্চি = ২. ৫৪ সেমি
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaWeight className="me-2" />
                                        ওজন (কেজিতে)
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        placeholder="যেমন: 70"
                                        required
                                        min="20"
                                        max="300"
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="success" type="submit" size="lg">
                                        হিসাব করুন
                                    </Button>
                                    {bmi && (
                                        <Button variant="outline-secondary" onClick={resetForm}>
                                            রিসেট করুন
                                        </Button>
                                    )}
                                </div>
                            </Form>

                            {bmi && (
                                <div className="mt-4">
                                    <Card className={`border-${color} border-3`}>
                                        <Card.Body className="text-center">
                                            <h2 className={`text-${color} mb-3`}>
                                                আপনার BMI: {bmi}
                                            </h2>
                                            <h4 className="mb-3">{category}</h4>

                                            <ProgressBar
                                                now={getBMIPercentage()}
                                                variant={color}
                                                className="mb-3"
                                                style={{ height: '30px' }}
                                            />

                                            <div className="text-start mt-4">
                                                <h6 className="fw-bold">BMI রেঞ্জ:</h6>
                                                <ul className="list-unstyled">
                                                    <li className="mb-2">
                                                        <span className="badge bg-info me-2">{'<'} 18.5</span>
                                                        কম ওজন
                                                    </li>
                                                    <li className="mb-2">
                                                        <span className="badge bg-success me-2">18.5 - 24.9</span>
                                                        স্বাভাবিক ওজন
                                                    </li>
                                                    <li className="mb-2">
                                                        <span className="badge bg-warning me-2">25 - 29.9</span>
                                                        অতিরিক্ত ওজন
                                                    </li>
                                                    <li className="mb-2">
                                                        <span className="badge bg-danger me-2">≥ 30</span>
                                                        স্থূলতা
                                                    </li>
                                                </ul>
                                            </div>

                                            <Alert variant={color} className="mt-3">
                                                <strong>পরামর্শ:</strong>{' '}
                                                {bmi < 18.5 && 'পুষ্টিকর খাবার খান এবং ডাক্তারের পরামর্শ নিন।'}
                                                {bmi >= 18.5 && bmi < 25 && 'চমৎকার!  আপনার ওজন স্বাভাবিক রয়েছে।'}
                                                {bmi >= 25 && bmi < 30 && 'নিয়মিত ব্যায়াম করুন এবং স্বাস্থ্যকর খাবার খান।'}
                                                {bmi >= 30 && 'দ্রুত ডাক্তারের পরামর্শ নিন এবং ওজন কমানোর পরিকল্পনা করুন।'}
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