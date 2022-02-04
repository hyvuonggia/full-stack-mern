import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const About = () => {
    return (
        <Row className='mt-5 mx-auto'>
            <Col className='text-center'>
                <Button
                    variant='primary'
                    href='https://www.facebook.com/vugihy'
                    size='lg'
                >
                    My Profile
                </Button>
            </Col>
        </Row>
    );
};

export default About;
