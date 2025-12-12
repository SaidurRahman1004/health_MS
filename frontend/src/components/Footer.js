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
                        Made with love by HealthCheck Pro Team
                    </p>
                    <p className="mb-2 text-muted">
                        © 2025 HealthCheck Pro.  All rights reserved.
                    </p>
                    <p className="mb-0">
                        <small className="text-warning">
                            ⚠️ এটি শুধুমাত্র শিক্ষামূলক প্রজেক্ট। গুরুতর স্বাস্থ্য সমস্যার জন্য অবশ্যই ডাক্তারের পরামর্শ নিন।
                        </small>
                    </p>
                    <div className="mt-3">
                        <a
                            href="https://github.com/SaidurRahman1004/health_MS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-decoration-none"
                        >
                            <FaGithub size={24} /> View on GitHub
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;