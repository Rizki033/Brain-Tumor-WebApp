import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Lightbulb, CodeSquare, ShieldCheck } from 'react-bootstrap-icons';
import './AboutSection.css';

const AboutSection = () => {
    return (
        <section className="about-section" id="about">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="about-title">About Our Mission</h2>
                    <p className="about-subtitle">Pioneering the future of neurological diagnostics</p>
                </div>

                <Row className="align-items-center mb-5">
                    <Col lg={6} md={12}>
                        <div className="about-content">
                            <h3 className="section-heading">Early Detection Saves Lives</h3>
                            <p className="text-muted">
                                Brain tumors are among the most complex medical conditions to diagnose early.
                                Our mission is to empower radiologists and neurologists with a second pair of
                                "AI eyes" that never tire. By leveraging cutting-edge deep learning, we aim
                                to reduce diagnostic errors and drastically shorten the time from scan to treatment.
                            </p>
                            <p className="text-muted">
                                We believe that technology should not replace doctors, but amplify their
                                expertise, providing rapid, data-driven insights when it matters most.
                            </p>
                        </div>
                    </Col>
                    <Col lg={6} md={12}>
                        {/* Placeholder for an image or graphic if needed, for now using a styled card */}
                        <div className="vision-card">
                            <h4>Our Vision</h4>
                            <p>"A world where neurological diseases are detected instantly and accurately, accessible to everyone, everywhere."</p>
                        </div>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={4}>
                        <Card className="info-card">
                            <Card.Body className="text-center">
                                <CodeSquare size={40} className="info-icon" />
                                <h5 className="info-title">Advanced Technology</h5>
                                <p className="info-text">
                                    Built on <strong>PyTorch</strong> and state-of-the-art Convolutional Neural Networks (CNNs),
                                    trained on thousands of verified MRI datasets.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="info-card">
                            <Card.Body className="text-center">
                                <ShieldCheck size={40} className="info-icon" />
                                <h5 className="info-title">Trust & Security</h5>
                                <p className="info-text">
                                    We prioritize patient data privacy with enterprise-grade encryption
                                    and strict adherence to medical data handling standards.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="info-card">
                            <Card.Body className="text-center">
                                <Lightbulb size={40} className="info-icon" />
                                <h5 className="info-title">Continuous Innovation</h5>
                                <p className="info-text">
                                    Our models are constantly refined by partnering with leading research
                                    hospitals to ensure the highest diagnostic accuracy.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutSection;
