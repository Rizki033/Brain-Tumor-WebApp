import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Linkedin as LinkedInIcon, Github, PersonCircle } from 'react-bootstrap-icons';
import './TeamSection.css';

const TeamSection = () => {
    const teamMembers = [
        {
            id: 1,
            name: "RIZKI Abdelhadi",
            role: "Cyber Security Engineering Student",
            description: "Building smart, secure AI-powered systems.",
            social: { linkedin: "https://www.linkedin.com/in/abdelhadi-rizki-403280251/", github: "https://github.com/Rizki033" }
        },
        {
            id: 2,
            name: "Mouad SAKHI",
            role: "Cyber Security Engineering Student",
            description: "Crafting secure, data-driven intelligent systems.",
            social: { linkedin: "https://www.linkedin.com/in/mouad-sakhi-223265330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "https://github.com/M-ShadowTracker" }
        },
        {
            id: 4,
            name: "Amine IDELKADI",
            role: "Cyber Security Engineering Student",
            description: "Integrating AI, security, and beautiful design.",
            social: { linkedin: "https://www.linkedin.com/in/amine-idelkadi-827889231?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/Amine-iD/" }
        },
        {
            id: 3,
            name: "Mohamed El Idrissi",
            role: "Cyber Security Engineering Student",
            description: "Designing elegant UIs, passionate about mathematics.",
            social: { linkedin: "https://www.linkedin.com/in/mohamed-el-idrissi-681a96338/", github: "https://github.com/Mohamed-EL-IDRISSI" }
        }
    ];

    return (
        <section className="team-section" id="team">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="team-title">Meet Our Team</h2>
                    <p className="team-subtitle">The minds behind the innovation</p>
                </div>

                <Row className="g-4 justify-content-center">
                    {teamMembers.map((member) => (
                        <Col lg={3} md={6} sm={12} key={member.id}>
                            <Card className="team-card h-100">
                                <div className="card-bg-shape"></div>
                                <Card.Body className="d-flex flex-column align-items-center text-center">
                                    <div className="avatar-wrapper">
                                        <PersonCircle size={80} className="avatar-placeholder" />
                                    </div>
                                    <h5 className="member-name">{member.name}</h5>
                                    <span className="member-role">{member.role}</span>
                                    <p className="member-desc">{member.description}</p>

                                    <div className="social-links mt-auto">
                                        <a href={member.social.linkedin} className="social-icon linkedin" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
                                        <a href={member.social.github} className="social-icon github" target="_blank" rel="noopener noreferrer"><Github /></a>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default TeamSection;
