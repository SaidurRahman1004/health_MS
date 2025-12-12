import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaCalculator, FaNewspaper, FaHospital, FaFirstAid, FaUserMd, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FaStethoscope size={50} />,
      title: 'সিম্পটম চেকার',
      description: 'আপনার লক্ষণ দিয়ে সম্ভাব্য রোগ জানুন এবং সঠিক ডাক্তারের পরামর্শ পান',
      link: '/symptom-checker',
      color: 'primary',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: <FaCalculator size={50} />,
      title: 'BMI ক্যালকুলেটর',
      description: 'আপনার বডি মাস ইনডেক্স হিসাব করুন এবং স্বাস্থ্য স্ট্যাটাস জানুন',
      link: '/bmi-calculator',
      color: 'success',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    {
      icon: <FaNewspaper size={50} />,
      title: 'হেলথ টিপস',
      description: 'দৈনন্দিন স্বাস্থ্য টিপস এবং গুরুত্বপূর্ণ তথ্য পড়ুন',
      link: '/articles',
      color: 'info',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: <FaHospital size={50} />,
      title: 'হাসপাতাল তালিকা',
      description: 'বাংলাদেশের বিভিন্ন জেলার নিকটবর্তী হাসপাতাল খুঁজুন',
      link: '/hospitals',
      color: 'danger',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: <FaFirstAid size={50} />,
      title: 'প্রাথমিক চিকিৎসা',
      description: 'জরুরি অবস্থায় প্রাথমিক চিকিৎসা পদ্ধতি জানুন',
      link: '/first-aid',
      color: 'warning',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      icon: <FaUserMd size={50} />,
      title: 'ডাক্তার সাজেশন',
      description: 'আপনার সমস্যা অনুযায়ী সঠিক ডাক্তারের পরামর্শ পান',
      link: '/symptom-checker',
      color: 'secondary',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section text-white py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start">
              <h1 className="display-3 fw-bold mb-4 animate-fade-in">
                <FaHeartbeat className="me-3" />
                HealthCheck Pro
              </h1>
              <p className="lead mb-4">
                আপনার স্বাস্থ্য পরীক্ষা করুন, সঠিক পরামর্শ পান - সম্পূর্ণ বাংলায়
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Button as={Link} to="/symptom-checker" variant="light" size="lg" className="px-4">
                  এখনই শুরু করুন
                </Button>
                <Button as={Link} to="/register" variant="outline-light" size="lg" className="px-4">
                  রেজিস্টার করুন
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center mt-4 mt-lg-0">
              <div className="hero-icon" style={{ fontSize: '15rem', opacity: 0.2 }}>
                <FaShieldAlt />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="my-5 py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">আমাদের সেবাসমূহ</h2>
          <p className="text-muted">সম্পূর্ণ বিনামূল্যে স্বাস্থ্য সেবা পান</p>
        </div>

        <Row className="g-4">
          {features.map((feature, index) => (
            <Col md={6} lg={4} key={index}>
              <Card
                className="h-100 border-0 shadow-lg feature-card"
                style={{
                  background: feature.gradient,
                  color: 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                <Card.Body className="p-4 text-center">
                  <div className="mb-3" style={{ opacity: 0.9 }}>
                    {feature.icon}
                  </div>
                  <Card.Title className="mb-3 fw-bold">{feature.title}</Card.Title>
                  <Card.Text className="mb-4" style={{ opacity: 0.95 }}>
                    {feature.description}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={feature.link}
                    variant="light"
                    className="px-4"
                  >
                    ব্যবহার করুন
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Stats Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4 mb-md-0">
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-primary">40+</h2>
                <p className="text-muted">লক্ষণ ডাটাবেজ</p>
              </div>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-success">12+</h2>
                <p className="text-muted">হাসপাতাল</p>
              </div>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-info">13+</h2>
                <p className="text-muted">বিভাগ</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-danger">24/7</h2>
                <p className="text-muted">অ্যাক্সেস</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="my-5 py-5">
        <Card className="border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <Card.Body className="p-5 text-center text-white">
            <h3 className="display-6 fw-bold mb-3">আজই শুরু করুন</h3>
            <p className="lead mb-4">রেজিস্টার করুন এবং আপনার স্বাস্থ্য ট্র্যাক করুন</p>
            <Button as={Link} to="/register" variant="light" size="lg" className="px-5">
              বিনামূল্যে রেজিস্টার করুন
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Home;