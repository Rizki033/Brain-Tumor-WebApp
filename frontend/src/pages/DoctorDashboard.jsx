import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
    const { doctor, logout, getAuthHeaders } = useAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/doctor/dashboard', {
                    headers: getAuthHeaders(),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                const data = await response.json();
                setDashboardData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [getAuthHeaders]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
                <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0">Doctor Dashboard</h2>
                    <p className="text-muted">Welcome, {dashboardData?.message || doctor?.name}</p>
                </div>
                <Button variant="outline-danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <Row className="g-4">
                <Col md={4}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Body>
                            <Card.Title className="text-primary">Profile Info</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {doctor?.name}<br />
                                <strong>Email:</strong> {doctor?.email}<br />
                                <strong>Competency:</strong> {doctor?.competency_doc}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Body>
                            <Card.Title className="text-success">Statistics</Card.Title>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Total Patients:</span>
                                <span className="fw-bold">{dashboardData?.dashboard_data?.total_patients || 0}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Pending Reviews:</span>
                                <span className="fw-bold">{dashboardData?.dashboard_data?.pending_reviews || 0}</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow-sm border-0 bg-primary text-white">
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                            <Card.Title>Analysis Tool</Card.Title>
                            <Card.Text className="text-center opacity-75">
                                Go to the diagnostic tool to analyze new MRI scans.
                            </Card.Text>
                            <Button variant="light" onClick={() => navigate('/diagnostic')}>
                                Start Diagnosis
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DoctorDashboard;
