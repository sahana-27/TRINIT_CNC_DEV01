import {React,useState} from 'react';
import Post from '../../../components/post/post.js';
import {Container,Col,Row,Card,Button,Form,InputGroup} from 'react-bootstrap';
import avatar from './avatar.png';
import dcontent from './postpic.jpg';
import Header from '../../../components/header/header.js';
import axios from 'axios';

const DashboardNGO = () =>{
    const name="XYZ";
    const scontent="This is post 1";
    const tag="donor";

    const[postText,setPostText] = useState('');
    const[fundTag,setFundTag] = useState('');
    const[success,setSuccess] = useState(false);
    const submitHandler = async(e) =>{
        e.preventDefault();
            try{
                const config={
                    headers:{
                        "Content-type":"application/json"
                    }
                };
                const{data} = await axios.put(
                    `/api/posts/createPost`,
                    {
                        postText,
                        fundTag
                    },config
                );
                if(data)setSuccess(true);
                setPostText('');setFundTag('');
            }catch(error){
                console.log(error.response.data);
            }
    }

    return(
         <div className="dashboardNGO">
            <Header/>
            <Container>
                    <Row>
                        <Col xs={3}>
                            <Card style={{ width: '14rem', margin: '20px'}}>
                                <Card.Img variant="top" src={avatar} />
                                <Card.Body>
                                    <Card.Title>Welcome XYZ!</Card.Title>
                                    <Card.Text>
                                        India based NGO focused on promoting sustainable development
                                    </Card.Text>
                                    <Button align="center" variant="primary">View your chats</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={6}>
                            <Post name={name} avatar={avatar} scontent={scontent}
                            dcontent={dcontent} tag={tag}/>
                        </Col>
                        <Col xs={3}>
                            <Card style={{ width: '15rem', margin: '20px'}}>
                                <Card.Header>
                                    <Card.Title align="center">CREATE POST</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                <Form onSubmit={submitHandler}>
                                    <InputGroup>
                                        <InputGroup.Text>What's on your mind?</InputGroup.Text>
                                        <Form.Control as="textarea" aria-label="postText"
                                            value={postText}
                                            onChange={(e) => setPostText(e.target.value)} />
                                    </InputGroup>
                                    <br/>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Funding tag:</Form.Label>
                                        <Form.Select id="fundTag" 
                                            onSelect={(e)=>{setFundTag(e)}}>
                                            <option>Looking for funds</option>
                                            <option>Willing to donate</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                                </Card.Body>
                            </Card>
                        </Col>     
                    </Row>       
            </Container>
        </div>
    )
}

export default DashboardNGO;