import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaCalculator, FaNewspaper, FaHospital } from 'react-icons/fa';

const Home = () => {
  return (
    <Container className="mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">
          স্বাগতম HealthCheck Pro তে
        </h1>
        <p className="lead text-muted">
          আপনার স্বাস্থ্য পরীক্ষা করুন, সঠিক পরামর্শ পান
        </p>
      </div>

      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm border-0 feature-card">
            <Card. Body className="text-center">
              <FaStethoscope size={50} className="text-primary mb-3" />
              <Card.Title>সিম্পটম চেকার</Card.Title>
              <Card.Text>
                আপনার লক্ষণ দিয়ে সম্ভাব্য রোগ জানুন
              </Card.Text>
              <Button as={Link} to="/symptom-checker" variant="primary">
                চেক করুন
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm border-0 feature-card">
            <Card.Body className="text-center">
              <FaCalculator size={50} className="text-success mb-3" />
              <Card.Title>BMI ক্যালকুলেটর</Card.Title>
              <Card.Text>
                আপনার BMI হিসাব করুন
              </Card.Text>
              <Button as={Link} to="/bmi-calculator" variant="success">
                হিসাব করুন
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm border-0 feature-card">
            <Card.Body className="text-center">
              <FaNewspaper size={50} className="text-info mb-3" />
              <Card.Title>হেলথ টিপস</Card. Title>
              <Card.Text>
                স্বাস্থ্য সম্পর্কিত টিপস পড়ুন
              </Card.Text>
              <Button as={Link} to="/articles" variant="info">
                পড়ুন
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm border-0 feature-card">
            <Card.Body className="text-center">
              <FaHospital size={50} className="text-danger mb-3" />
              <Card.Title>হাসপাতাল</Card. Title>
              <Card.Text>
                নিকটস্থ হাসপাতাল খুঁজুন
              </Card.Text>
              <Button as={Link} to="/hospitals" variant="danger">
                খুঁজুন
              </Button>
            </Card. Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;