import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Button, Card, Container } from 'react-bootstrap';
import { Fireworks } from 'fireworks-js';
import { Link } from 'react-router-dom';

export default function User() {
    const { username , userPhone , userEmail} = useContext(UserContext);

    useEffect(() => {
        if (username) {
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = 0;
            container.style.left = 0;
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.pointerEvents = 'none'; 

            document.body.appendChild(container);

            const fireworks = new Fireworks(container);
            fireworks.start();

            const timer = setTimeout(() => {
                fireworks.stop();
                if (document.body.contains(container)) {
                    document.body.removeChild(container);
                }
            }, 5000);

            return () => {
                fireworks.stop();
                clearTimeout(timer);
                if (document.body.contains(container)) {
                    document.body.removeChild(container);
                }
            };
        }
    }, [username]);

    return (
       <section>
         <Container className="user-profile my-5">
        <Card className="text-center shadow-lg">
            <Card.Header className={`fs-5 text-black ${username ? 'bg-success-subtle' : 'bg-danger-subtle'}`}>
                <i className="fas fa-user-circle fa-1x"></i> User Profile
            </Card.Header>
            <Card.Body>
                {username ? (
                    <>
                        <h1 className="fs-2">Welcome, <span className="text-info fw-bold">{username}</span> !</h1>
                        <div className="row">
                            <div className="col-md-6 my-1">
                                <div>
                                    <label htmlFor="username" className="form-label">Your-name:</label>
                                    <input 
                                        type="text" 
                                        id="username"
                                        value={username} 
                                        className='form-control notAllow' 
                                        disabled 
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 my-1">
                                <div>
                                    <label htmlFor="userPhone" className="form-label">Phone:</label>
                                    <input 
                                        type="text" 
                                        id="userPhone"
                                        value={userPhone} 
                                        className='form-control notAllow' 
                                        disabled 
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 my-1">
                                <div>
                                    <label htmlFor="userEmail" className="form-label">Email:</label>
                                    <input 
                                        type="text" 
                                        id="userEmail"
                                        value={userEmail} 
                                        className='form-control notAllow' 
                                        disabled 
                                    />
                                </div>
                            </div>
                        </div>
                        <Button 
                            variant="warning trans fs-6" 
                            as={Link} 
                            to={'/updatePass'} 
                            className="mt-5 mb-3"
                        >
                            <i className="fas fa-shield-alt"></i> Update Password
                        </Button>
                        <Button 
                            variant="primary trans fs-6" 
                            as={Link} 
                            to={'/editProfile'} 
                            className="mt-5 mb-3 ms-2"
                        >
                            <i className="fas fa-edit"></i> Edit Profile
                        </Button>
                    </>
                ) : (
                    <h1 className="fs-2">Welcome, Guest!</h1>
                )}
            </Card.Body>
            <Card.Footer className="text-muted">
                {username ? "You are logged in." : "Please log in to access more features."}
            </Card.Footer>
        </Card>
    </Container>
       </section>
    );
}
