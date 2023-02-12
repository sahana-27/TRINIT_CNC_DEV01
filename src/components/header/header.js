import React from 'react';
import { Container, Navbar, Button, Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import logo from './logo.png';
import './header.css'

const Header = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                <Navbar.Brand href="#home" color="#fffbf0">CNC</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                    <Button variant="success" href="/search">Search and Filter NGOs</Button>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="loggedIn">
                    Signed in as:  
                    <a href="#login" variant="primary">
                        {userInfo.name}
                    </a>
                </Navbar.Text>
            </Navbar.Collapse>
                <Button variant="light" className="headerButton"onClick={()=>{
                    localStorage.removeItem("userInfo");
                    navigate('/');
                }}>
                    Log Out
                </Button>
        </Container>
        </Navbar>
    )
}

export default Header