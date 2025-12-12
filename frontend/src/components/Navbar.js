import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { FaHeartbeat, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const NavigationBar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <FaHeartbeat className="me-2" />
                    HealthCheck Pro
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">হোম</Nav.Link>
                        <Nav.Link as={Link} to="/symptom-checker">সিম্পটম চেকার</Nav.Link>
                        <Nav.Link as={Link} to="/bmi-calculator">BMI ক্যালকুলেটর</Nav.Link>

                        <NavDropdown title="আরও তথ্য" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/articles">হেলথ টিপস</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/first-aid">প্রাথমিক চিকিৎসা</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/hospitals">হাসপাতাল</NavDropdown.Item>
                        </NavDropdown>

                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/history">
                                    <FaUser className="me-1" />
                                    {user?.name}
                                </Nav.Link>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="ms-2"
                                >
                                    <FaSignOutAlt className="me-1" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <FaSignInAlt className="me-1" />
                                    Login
                                </Nav.Link>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    as={Link}
                                    to="/register"
                                    className="ms-2"
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;