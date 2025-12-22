import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Cpu, Activity, ShieldLock, CloudLightning } from 'react-bootstrap-icons';
import './FeaturesSection.css';

const FeaturesSection = () => {
    const features = [
        {
            id: 1,
            icon: <Activity size={50} />,
            title: "Automated MRI Segmentation",
            description: "Advanced algorithms to isolate and analyze brain structures with precision."
        },
        {
            id: 2,
            icon: <Cpu size={50} />,
            title: "High Accuracy Deep Learning",
            description: "State-of-the-art neural networks trained on thousands of verified medical datasets."
        },
        {
            id: 3,
            icon: <ShieldLock size={50} />,
            title: "Secure Data Handling",
            description: "Enterprise-grade encryption ensuring patient data privacy and HIPAA compliance."
        },
        {
            id: 4,
            icon: <CloudLightning size={50} />,
            title: "Fast Cloud Analysis",
            description: "Rapid processing power delivering diagnostic insights in seconds, anywhere."
        }
    ];

    return (
        <section className="features-section">
            <Container>
                <div className="features-header text-center">
                    <h2 className="features-title">Cutting-Edge AI Technology</h2>
                    <p className="features-subtitle">Revolutionizing medical diagnostics with speed and accuracy</p>
                </div>

                <Row className="g-4">
                    {features.map((feature) => (
                        <Col lg={3} md={6} sm={12} key={feature.id}>
                            <Card className="feature-card h-100">
                                <Card.Body className="text-center d-flex flex-column align-items-center">
                                    <div className="icon-wrapper">
                                        {feature.icon}
                                    </div>
                                    <Card.Title className="feature-card-title">{feature.title}</Card.Title>
                                    <Card.Text className="feature-card-text">
                                        {feature.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default FeaturesSection;
