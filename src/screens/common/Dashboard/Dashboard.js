import {React,useState,useEffect} from 'react';
import Post from '../../../components/post/post.js';
import {Container,Col,Row,Card,Button,Form,InputGroup,ListGroup} from 'react-bootstrap';
import avatar from './avatar.png';
import dcontent from './postpic.jpg';
import Header from '../../../components/header/header.js';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import io from "socket.io-client";
import Chat from "./Chat";
import "./Dashboard.css";

const socket = io.connect();
if(socket.connected) console.log("Socket connected");
else console.log("Socket is Not connected");

const DashboardNGO = () =>{
    const tempname="XYZ";
    const scontent="This is post 1";
    const tag="donor";
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userType = JSON.parse(localStorage.getItem("userType"));
    const name= userInfo.name;
    console.log(name);
    const[postText,setPostText] = useState('');
    const[fundTag,setFundTag] = useState('');
    const[success,setSuccess] = useState(false);
    const[reco,setReco] = useState(false);
    const[text,setText] = useState('SHOW RECOMMENDED NGOs');
    const[NGOs,setNGOs] = useState([]);

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
    // Username and room should not be null
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
     }
    };

    const handleSelect=(e)=>{
        setFundTag(e.target.value);
    }
    const handleClick=()=>{
        if(userType==='Philanthropist'){
            if(reco===false){
                setReco(true);
                setText("HIDE RECOMMENDED NGOs");
            }
            else{
                setReco(false);
                setText("SHOW RECOMMENDED NGOs");
            }
        }
        
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
                        name,
                        postText,
                        fundTag
                    },config
                );
                if(data)setSuccess(true);
                console.log(data);
                setPostText('');setFundTag('');
                return <Navigate to='/dashboard'/>
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

    useEffect(()=>{
        const fetchNGOs = async() =>{
            const res = await axios.get(`http://localhost:8180/recommend/${userInfo._id}`);
            console.log(res.data);
            setNGOs(res.data);
        };
        fetchNGOs();
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
                                    {!showChat ? (
                                        <div className="communityChat">
                                            <Card.Title>Join Community</Card.Title>
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                onChange={(event) => { setUsername(event.target.value); }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Community Name"
                                                onChange={(event) => { setRoom(event.target.value); }}
                                            />
                                            <Button align="center" variant="primary" onClick={joinRoom}>Join</Button>
                                        </div>
                                    ) : ( //Show chat only if true 
                                    // Passing socket as a prop
                                    <Chat socket={socket} username={username} room={room} />
                                    )}
                                    
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
                            <Row>
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
                            </Row>
                            <Row>
                                {userType==='Philanthropist' && <Button style={{ width: '15rem',margin: '20x',aligntext:'center'}} onClick={handleClick}>{text}</Button>}
                                {reco &&
                                    <Card style={{ width: '15rem',margin: '20x',aligntext:'center'}}>
                                        <ListGroup variant="flush">
                                            {NGOs.map((NGO) => (
                                                <ListGroup.Item>{NGO}</ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card>                                   
                                }
                            </Row>
                        </Col>     
                    </Row>       
            </Container>
        </div>
    )
}

export default DashboardNGO;