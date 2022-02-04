import React, { useContext, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../contexts/AuthContext';
import { PostContext } from '../contexts/PostContext';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import SinglePost from '../components/posts/SinglePost';
import AddPostModal from '../components/posts/AddPostModal';
import addIcon from '../assets/plus-circle-fill.svg';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';

const Dashboard = () => {
    // load contexts
    const { postState, getPosts, setShowAddPostModal } =
        useContext(PostContext);
    const { posts, postsLoading } = postState;
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);

    // Start: get all posts
    useEffect(() => getPosts(), []);

    const handleClick = () => {
        setShowAddPostModal(true);
    };

    let body = null;

    if (postsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <Card className='text-center mx-5 my-5'>
                <Card.Header as='h1'>Hi</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome to LearnIt</Card.Title>
                    <Card.Text>
                        Click the button below to track your first skill to
                        learn
                    </Card.Text>
                    <Button variant='primary'>LearnIt!</Button>
                </Card.Body>
            </Card>
        );
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map((post) => {
                        return (
                            <Col key={post._id} className='my-2'>
                                <SinglePost post={post} />
                            </Col>
                        );
                    })}
                </Row>
                {/* Open Add Post Modal */}
                <OverlayTrigger
                    placement='left'
                    overlay={<Tooltip>Add new thing to learn</Tooltip>}
                >
                    <Button className='btn-floating' onClick={handleClick}>
                        <img
                            src={addIcon}
                            alt='addPost'
                            width='60'
                            height='60'
                        />
                    </Button>
                </OverlayTrigger>
            </>
        );
    }

    return (
        <>
            {body}
            <AddPostModal />
        </>
    );
};

export default Dashboard;
