import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { PersonCircle, Save } from 'react-bootstrap-icons';
import './Login.css'; // Reuse auth styles for consistency

const Profile = () => {
    const { patient, updateProfile } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState(''); // Only if changing password
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (patient) {
            setFirstName(patient.first_name);
            setLastName(patient.last_name);
            setGender(patient.gender);
            setAge(patient.age);
        }
    }, [patient]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        const updateData = {
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            age: parseInt(age) || null,
        };

        if (password) {
            updateData.password = password;
        }

        const result = await updateProfile(updateData);

        if (result.success) {
            setMessage('Profile updated successfully!');
            setPassword('');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <Container className="py-5" style={{ minHeight: '80vh' }}>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="auth-card shadow-lg border-0">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <div className="profile-icon-wrapper mb-3">
                                    <PersonCircle size={80} className="text-primary" />
                                </div>
                                <h2 className="auth-title">My Profile</h2>
                                <p className="text-muted">{patient?.email}</p>
                            </div>

                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit} className="auth-form">
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="profileFirstName">
                                            <Form.Label className="auth-label">First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="auth-input"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="profileLastName">
                                            <Form.Label className="auth-label">Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="auth-input"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="profileGender">
                                            <Form.Label className="auth-label">Gender</Form.Label>
                                            <Form.Select
                                                className="auth-input"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="profileAge">
                                            <Form.Label className="auth-label">Age</Form.Label>
                                            <Form.Control
                                                type="number"
                                                className="auth-input"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr className="my-4" />
                                <h5 className="mb-3">Change Password <span className="text-muted fs-6">(Optional)</span></h5>

                                <Form.Group className="mb-4" controlId="profilePassword">
                                    <Form.Label className="auth-label">New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        className="auth-input"
                                        placeholder="Leave blank to keep current password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="auth-btn w-100 d-flex align-items-center justify-content-center gap-2"
                                    disabled={loading}
                                >
                                    <Save /> {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
