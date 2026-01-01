
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import brainImage from '../Assets/brain_hero_3d.png';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>

            <Container style={{ position: 'relative', zIndex: 2 }}>
                <Row className="align-items-center">
                    <Col lg={7} md={12} className="text-content">
                        <h1 className="hero-title">
                            AI-Powered <br />
                            Brain Tumor Detection
                        </h1>
                        <h3 className="hero-subtitle">
                            Precision MRI Analysis Using Deep Learning
                        </h3>
                        <p className="hero-description">
                            Harnessing the power of advanced neural networks to provide rapid, accurate, and reliable brain tumor diagnostics. Empowering medical professionals with early detection capabilities.
                        </p>
                        <div className="cta-container">
                            <Button className="cta-btn primary-cta" as={Link} to="/diagnostic">Start Diagnosis</Button>
                            <Button className="cta-btn secondary-cta" as={Link} to="/login">Login</Button>
                        </div>
                    </Col>

                    <Col lg={5} md={12} className="image-content">
                        <div className="brain-image-wrapper">
                            <img
                                src={brainImage}
                                alt="AI Brain Analysis"
                                className="brain-image"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;
