import {React,useState,useEffect} from 'react';
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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const username= userInfo.name;
    const[postText,setPostText] = useState('');
    const[fundTag,setFundTag] = useState('');
    const[success,setSuccess] = useState(false);

    const handleSelect=(e)=>{
        setFundTag(e.target.value);
    }
    const submitHandler = async(e) =>{
        e.preventDefault();
            try{
                const config={
                    headers:{
                        "Content-type":"application/json"
                    }
                };
                const{data} = await axios.post(
                    'http://localhost:8180/posts/createPost',
                    {
                        username,
                        postText,
                        fundTag
                    },config
                );
                if(data)setSuccess(true);
                console.log(data);
                setPostText('');setFundTag('');
            }catch(error){
                console.log(error.response.data);
            }
    }

    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts = async() =>{
            const res = await axios.get('http://localhost:8180/posts');
            console.log(res.data);
            setPosts(res.data);
        };
        fetchPosts();
    },[]);

    return(
         <div className="dashboardNGO">
            <Header/>
            <Container>
                    <Row>
                        <Col xs={3}>
                            <Card style={{ width: '14rem', margin: '20px'}}>
                                <Card.Img variant="top" src={avatar} />
                                <Card.Body>
                                    <Card.Title>Welcome {userInfo.name}!</Card.Title>
                                    <Card.Text>
                                        India based NGO focused on promoting sustainable development
                                    </Card.Text>
                                    <Button align="center" variant="primary">View your chats</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={6}>
                            <ul>
                            {posts.map((post) => (
                                <Post name={post.name} avatar={avatar} scontent={post.postText}
                                dcontent={dcontent} tag={post.fundTag}/>
                            ))}
                            </ul>
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
                                    <Form.Select onChange={handleSelect}>
                                        <option>Select funding tag:</option>
                                        <option value="Recipient">Recipient</option>
                                        <option value="Donor">Donor</option>
                                    </Form.Select>
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