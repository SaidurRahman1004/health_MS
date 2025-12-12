import React from 'react';
import { Container } from 'react-bootstrap';
import { FaHeart, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <Container>
                <div className="text-center">
                    <p className="mb-2">
                        <FaHeart className="text-danger me-2" />
                        DPI Friends Circle Team
                    </p>
                    <p className="mb-2 text-muted">
                        © 2025 HealthCheck Pro.  All rights reserved.
                    </p>
                    <p className="mb-0">
                        <small className="text-warning">
                            ⚠️ এটি শুধুমাত্র শিক্ষামূলক প্রজেক্ট। গুরুতর স্বাস্থ্য সমস্যার জন্য অবশ্যই ডাক্তারের পরামর্শ নিন।
                        </small>
                    </p>

                </div>
            </Container>
        </footer>
    );
};

export default Footer;