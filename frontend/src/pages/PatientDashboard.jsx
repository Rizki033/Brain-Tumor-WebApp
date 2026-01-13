import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { PersonCircle, ClipboardData, FileText, Calendar } from 'react-bootstrap-icons';

const PatientDashboard = () => {
    const { patient, getAuthHeaders, logout } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/patient/dashboard', {
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }

            const data = await response.json();
            setDashboardData(data.dashboard_data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading dashboard...</div>;
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    Error loading dashboard: {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="text-primary">
                            <PersonCircle className="me-2" />
                            Welcome, {patient?.first_name} {patient?.last_name}
                        </h1>
                        <Button variant="outline-danger" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                    <p className="text-muted">Patient Portal</p>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={4}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <ClipboardData size={48} className="text-primary mb-3" />
                            <Card.Title>Total Scans</Card.Title>
                            <h2 className="text-primary">{dashboardData?.total_scans || 0}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Calendar size={48} className="text-success mb-3" />
                            <Card.Title>Recent Activity</Card.Title>
                            <h2 className="text-success">{dashboardData?.recent_predictions?.length || 0}</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">Patient Information</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Name:</strong> {patient?.first_name} {patient?.last_name}</p>
                                    <p><strong>Email:</strong> {patient?.email}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Age:</strong> {patient?.age}</p>
                                    <p><strong>Gender:</strong> {patient?.gender}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PatientDashboard;
