import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin as LinkedInIcon, Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="brand-icon"><i className="bi bi-activity"></i></span>
                            NeuroScan AI
                        </Link>
                        <p className="footer-description">
                            Advanced AI-powered brain tumor detection system assisting medical professionals
                            with rapid and accurate diagnostic support.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><a href="/#features">Features</a></li>
                            <li><Link to="/team">Our Team</Link></li>
                            <li><Link to="/contact">Contact Support</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <div className="contact-item">
                            <GeoAlt className="contact-icon" />
                            <span>123 Medical Plaza, Marrakech Morocco</span>
                        </div>
                        <div className="contact-item">
                            <Envelope className="contact-icon" />
                            <span>support@neuroscan.ai</span>
                        </div>
                        <div className="contact-item">
                            <Telephone className="contact-icon" />
                            <span>+212 659 030 899</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        &copy; {new Date().getFullYear()} NeuroScan AI. All rights reserved.
                    </div>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><Facebook /></a>
                        <a href="#" aria-label="Twitter"><Twitter /></a>
                        <a href="#" aria-label="Instagram"><Instagram /></a>
                        <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
