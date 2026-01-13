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
    const { login, register } = useAuth();
    const navigate = useNavigate();

    // Login State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Sign Up State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');

    // Success Message
    const [successMessage, setSuccessMessage] = useState('');

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        // Reset forms on toggle
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setNewEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setGender('male');
        setAge('');
        setError('');
        setSuccessMessage('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        const result = await login(email, password);

        if (result.success) {
            navigate('/diagnostic'); // Direct to diagnostic or dashboard
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email: newEmail,
            password: newPassword,
            gender: gender,
            age: parseInt(age) || null,
        };

        const result = await register(userData);

        if (result.success) {
            setSuccessMessage("Account created successfully! Please check your email to verify your account before logging in.");
            setTimeout(() => {
                setIsLogin(true);
            }, 5000);
        } else {
            setError(result.error);
        }
        setLoading(false);
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
                                            {successMessage && (
                                                <Alert variant="success" className="mb-3">
                                                    {successMessage}
                                                </Alert>
                                            )}
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
                                            {successMessage && (
                                                <Alert variant="success" className="mb-3">
                                                    {successMessage}
                                                </Alert>
                                            )}
                                            {error && (
                                                <Alert variant="danger" className="mb-3">
                                                    {error}
                                                </Alert>
                                            )}
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="signupFirstName">
                                                        <Form.Label className="auth-label">First Name</Form.Label>
                                                        <div className="input-group-custom">
                                                            <PersonVcard className="input-icon" />
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Jane"
                                                                className="auth-input"
                                                                value={firstName}
                                                                onChange={(e) => setFirstName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="signupLastName">
                                                        <Form.Label className="auth-label">Last Name</Form.Label>
                                                        <div className="input-group-custom">
                                                            <PersonVcard className="input-icon" />
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Doe"
                                                                className="auth-input"
                                                                value={lastName}
                                                                onChange={(e) => setLastName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="signupGender">
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
                                                    <Form.Group className="mb-3" controlId="signupAge">
                                                        <Form.Label className="auth-label">Age</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="30"
                                                            className="auth-input"
                                                            value={age}
                                                            onChange={(e) => setAge(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

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
                                                {newEmail && (
                                                    <Form.Text className={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail) ? "text-success" : "text-danger"}>
                                                        {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
                                                            ? "✓ Email format looks good"
                                                            : "Please enter a valid email address"}
                                                    </Form.Text>
                                                )}
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
                                                        {newPassword && (
                                                            <Form.Text className={newPassword.length >= 6 ? "text-success" : "text-danger"}>
                                                                {newPassword.length >= 6
                                                                    ? "✓ Good length"
                                                                    : "Must be at least 6 characters"}
                                                            </Form.Text>
                                                        )}
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
                                                        {confirmPassword && (
                                                            <Form.Text className={newPassword === confirmPassword ? "text-success" : "text-danger"}>
                                                                {newPassword === confirmPassword
                                                                    ? "✓ Passwords match"
                                                                    : "Passwords do not match"}
                                                            </Form.Text>
                                                        )}
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="auth-btn w-100 mb-3"
                                                disabled={loading}
                                            >
                                                {loading ? 'Creating Account...' : 'Create Account'}
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
