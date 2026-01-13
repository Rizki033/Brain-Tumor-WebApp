import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { PersonCircle, Lock, Envelope, PersonVcard } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    // Login State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Sign Up State
    const [fullName, setFullName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        // Reset forms on toggle
        setEmail('');
        setPassword('');
        setFullName('');
        setNewEmail('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(email, password);

        if (result.success) {
            navigate('/doctor-dashboard');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Sign Up:", fullName, newEmail);
    };

    return (
        <div className="login-page">
            <Container>
                <Row className="justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
                    <Col md={10} lg={8} xl={5}>
                        <Card className="auth-card shadow-lg border-0">
                            <Card.Body className="p-0">
                                {/* Toggle Header */}
                                <div className="auth-toggle-header">
                                    <button
                                        className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
                                        onClick={() => !isLogin && toggleAuthMode()}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
                                        onClick={() => isLogin && toggleAuthMode()}
                                    >
                                        Sign Up
                                    </button>
                                </div>

                                <div className="auth-content p-5">
                                    <div className="text-center mb-4">
                                        <h2 className="auth-title">
                                            {isLogin ? 'Welcome Back' : 'Create Account'}
                                        </h2>
                                        <p className="text-muted">
                                            {isLogin
                                                ? 'Secure Access for Medical Professionals'
                                                : 'Join the Future of AI Diagnostics'}
                                        </p>
                                    </div>

                                    {isLogin ? (
                                        /* LOGIN FORM */
                                        <Form onSubmit={handleLogin} className="auth-form fade-in">
                                            {error && (
                                                <Alert variant="danger" className="mb-3">
                                                    {error}
                                                </Alert>
                                            )}
                                            <Form.Group className="mb-4" controlId="loginEmail">
                                                <Form.Label className="auth-label">Email Address</Form.Label>
                                                <div className="input-group-custom">
                                                    <PersonCircle className="input-icon" />
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="doctor@hospital.com"
                                                        className="auth-input"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-4" controlId="loginPassword">
                                                <Form.Label className="auth-label">Password</Form.Label>
                                                <div className="input-group-custom">
                                                    <Lock className="input-icon" />
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="auth-input"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </Form.Group>

                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <Form.Check type="checkbox" label="Remember me" id="remember-me" className="custom-check" />
                                                <Link to="#" className="forgot-password">Forgot Password?</Link>
                                            </div>

                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="auth-btn w-100 mb-3"
                                                disabled={loading}
                                            >
                                                {loading ? 'Signing In...' : 'Sign In'}
                                            </Button>

                                            <div className="text-center mt-3">
                                                <span className="text-muted">New here? </span>
                                                <span onClick={toggleAuthMode} className="switch-link">Create an account</span>
                                            </div>
                                        </Form>
                                    ) : (
                                        /* SIGN UP FORM */
                                        <Form onSubmit={handleSignUp} className="auth-form fade-in">
                                            <Form.Group className="mb-3" controlId="signupName">
                                                <Form.Label className="auth-label">Full Name</Form.Label>
                                                <div className="input-group-custom">
                                                    <PersonVcard className="input-icon" />
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Dr. Jane Doe"
                                                        className="auth-input"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="signupEmail">
                                                <Form.Label className="auth-label">Email Address</Form.Label>
                                                <div className="input-group-custom">
                                                    <Envelope className="input-icon" />
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="name@hospital.com"
                                                        className="auth-input"
                                                        value={newEmail}
                                                        onChange={(e) => setNewEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </Form.Group>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="signupPassword">
                                                        <Form.Label className="auth-label">Password</Form.Label>
                                                        <div className="input-group-custom">
                                                            <Lock className="input-icon" />
                                                            <Form.Control
                                                                type="password"
                                                                placeholder="••••••••"
                                                                className="auth-input"
                                                                value={newPassword}
                                                                onChange={(e) => setNewPassword(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="signupConfirm">
                                                        <Form.Label className="auth-label">Confirm</Form.Label>
                                                        <div className="input-group-custom">
                                                            <Lock className="input-icon" />
                                                            <Form.Control
                                                                type="password"
                                                                placeholder="••••••••"
                                                                className="auth-input"
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Button variant="primary" type="submit" className="auth-btn w-100 mb-3">
                                                Create Account
                                            </Button>

                                            <div className="text-center mt-3">
                                                <span className="text-muted">Already have an account? </span>
                                                <span onClick={toggleAuthMode} className="switch-link">Login here</span>
                                            </div>
                                        </Form>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
