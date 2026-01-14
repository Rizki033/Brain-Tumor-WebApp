import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Activity } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { isAuthenticated, doctor, logout } = useAuth();

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <Navbar expand="lg" className={`${scrolled ? "scrolled" : ""} custom-navbar`} fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-logo">
                    <Activity size={30} className="brand-icon" />
                    <span className="brand-text">NeuroScan AI</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-center align-items-center">
                        <Nav.Link as={NavLink} to="/" end className="nav-item-link">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/diagnostic" className="nav-item-link">Diagnosis</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" className="nav-item-link">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/team" className="nav-item-link">Team</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact" className="nav-item-link">Contact</Nav.Link>

                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={NavLink} to="/doctor-dashboard" className="nav-item-link">
                                    Dashboard
                                </Nav.Link>
                                <Button
                                    variant="outline-light"
                                    className="ms-lg-3 mt-3 mt-lg-0"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : null}

                        <Button
                            as={Link}
                            to="/diagnostic"
                            className="nav-cta-btn ms-lg-3 mt-3 mt-lg-0"
                        >
                            Start Analysis
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
