import React, { useRef, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Envelope, GeoAlt, Telephone } from 'react-bootstrap-icons';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import './ContactSection.css';

const ContactSection = () => {
    const form = useRef();
    const [sending, setSending] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setSending(true);
        const SERVICE_ID = 'service_e8svokv';
        const TEMPLATE_ID = 'template_kvy4lpr';
        const PUBLIC_KEY = 'yR63CHlkjk-PIT7ls';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                setSending(false);
                Swal.fire({
                    title: 'Magnifique!',
                    text: 'Votre message a été envoyé avec succès.',
                    icon: 'success',
                    confirmButtonText: 'Super',
                    confirmButtonColor: '#0d6efd',
                    background: '#ffffff',
                    color: '#333'
                });
                form.current.reset();
            }, (error) => {
                setSending(false);
                console.log(error.text);
                Swal.fire({
                    title: 'Oups!',
                    text: 'Une erreur s\'est produite. Veuillez réessayer.',
                    icon: 'error',
                    confirmButtonText: 'Fermer',
                    confirmButtonColor: '#dc3545'
                });
            });
    };

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
                                                <p>123 Medical Plaza, Marrakech Morocco</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <Envelope className="contact-icon" />
                                            <div>
                                                <h5>Email</h5>
                                                <p>a.rizki7131@uca.ac.ma</p>
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
                                        <Form ref={form} onSubmit={sendEmail}>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="formName">
                                                        <Form.Label>Your Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Dr. name"
                                                            className="custom-input"
                                                            name="user_name"
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="formEmail">
                                                        <Form.Label>Email Address</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="name@hospital.com"
                                                            className="custom-input"
                                                            name="user_email"
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-4" controlId="formSubject">
                                                <Form.Label>Subject</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Partnership Inquiry"
                                                    className="custom-input"
                                                    name="subject"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-4" controlId="formMessage">
                                                <Form.Label>Message</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    placeholder="How can we help you?"
                                                    className="custom-input"
                                                    name="message"
                                                    required
                                                />
                                            </Form.Group>

                                            <Button variant="primary" type="submit" className="submit-btn w-100" disabled={sending}>
                                                {sending ? 'Sending...' : 'Send Message'}
                                            </Button>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactSection;
