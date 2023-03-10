import React from 'react';
import { Container,Row,Col,Button} from 'react-bootstrap'
import './LandingPage2.css'
import bg from './bg3.png';

const LandingPage = () =>{
    const google = () => {
        window.open("http://localhost:8180/auth/google")
    }
    return(
        <Container className="bg">
            <Row>
                <Col className="justify-content-md-center">
                    <Row className="row1"><div className="welcome"><h3>Welcome to</h3></div></Row>
                    <Row className="row2"><h4>Connect for a Cause</h4></Row>
                    <Row className="row2"><Button onClick={google}>REGISTER</Button></Row>
                    <Row className="row2"><Button href="/login">LOGIN</Button></Row>
                </Col>
                <Col className="image"><img src={bg}/></Col>
            </Row>
       </Container>      
    )
}

export default LandingPage;