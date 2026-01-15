import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [error, setError] = useState('');

    return (
        <Container className="py-5">
            <h2 className="mb-4">Patient Dashboard</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                <Col md={12}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Card.Title>Welcome, {user ? user.full_name : 'Patient'}!</Card.Title>
                            <Card.Text>
                                Here you can view your diagnostic history and manage your profile.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Placeholder for future diagnostic history or other patient-specific features */}
        </Container>
    );
};

export default PatientDashboard;
