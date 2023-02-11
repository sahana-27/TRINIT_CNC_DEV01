import React from 'react';
import { Container,Row,Col,Button} from 'react-bootstrap'

const RegistrationPage = () =>{
    return(
        <Container className="bg">
            <Row>
                <Col><Button href="/createProfileNGO">NGO</Button> </Col>
                <Col><Button href="/createProfilePhil">Philanthropist</Button></Col>
            </Row>
       </Container>      
    )
}

export default RegistrationPage;