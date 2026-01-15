import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <Container className="py-5">
                <p>Please log in to view your profile.</p>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4">My Profile</h2>
            <Card className="shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">Patient Information</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong>Full Name:</strong> {user.full_name}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Email:</strong> {user.email}
                        </ListGroup.Item>
                        {/* Add other user fields as necessary, e.g. date joined, etc. */}
                    </ListGroup>
                    {/* Future: Add 'Edit Profile' button here */}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
