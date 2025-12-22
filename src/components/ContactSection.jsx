import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Envelope, GeoAlt, Telephone } from 'react-bootstrap-icons';
import './ContactSection.css';

const ContactSection = () => {
    return (
        <section className="contact-section" id="contact">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <div className="contact-wrapper">
                            <Row className="g-0">
                                <Col lg={5} className="contact-info-col">
                                    <div className="contact-info-content">
                                        <h3 className="mb-4">Get in Touch</h3>
                                        <p className="mb-5">
                                            Interested in deploying our AI solution in your hospital?
                                            Contact our research team for a demo or partnership inquiry.
                                        </p>

                                        <div className="contact-item">
                                            <GeoAlt className="contact-icon" />
                                            <div>
                                                <h5>Location</h5>
                                                <p>Marrakech, Morocco</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <Envelope className="contact-icon" />
                                            <div>
                                                <h5>Email</h5>
                                                <p>rizkiabdelhadi4@gmail.com</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <Telephone className="contact-icon" />
                                            <div>
                                                <h5>Phone</h5>
                                                <p>+212 659 030 899</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={7} className="contact-form-col">
                                    <div className="contact-form-content">
                                        <h3 className="form-title">Send us a Message</h3>
                                        <Form>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="formName">
                                                        <Form.Label>Your Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Dr. name" className="custom-input" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="formEmail">
                                                        <Form.Label>Email Address</Form.Label>
                                                        <Form.Control type="email" placeholder="name@hospital.com" className="custom-input" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-4" controlId="formSubject">
                                                <Form.Label>Subject</Form.Label>
                                                <Form.Control type="text" placeholder="Partnership Inquiry" className="custom-input" />
                                            </Form.Group>

                                            <Form.Group className="mb-4" controlId="formMessage">
                                                <Form.Label>Message</Form.Label>
                                                <Form.Control as="textarea" rows={4} placeholder="How can we help you?" className="custom-input" />
                                            </Form.Group>

                                            <Button variant="primary" type="submit" className="submit-btn w-100">
                                                Send Message
                                            </Button>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>

            <footer className="main-footer">
                <Container className="text-center">
                    <p className="mb-0">© 2025 Brain Tumor AI Detection. All Rights Reserved.</p>
                </Container>
            </footer>
        </section>
    );
};

export default ContactSection;
