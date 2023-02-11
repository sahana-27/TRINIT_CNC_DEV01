import React,{useState} from 'react'
import {Card,Button,Badge,Row,Col,Container} from 'react-bootstrap';
import {Navigate} from 'react-router-dom'
import './post.css'

const Post = ({name,avatar,tag,scontent,dcontent}) => {
    return (
        <Container>
            <Card className="post">
                <Card.Header className="postHeader">
                    <Row>
                    <Col align="left"><img src={avatar} width="50vw" height="30vh"/></Col>
                    <Col align="left">{name}</Col>
                    <Col align="right"><Badge className={`${tag}`}>{tag}</Badge></Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row>{scontent}</Row>
                    <Row><Card.Img variant="top" src={dcontent} /></Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Post