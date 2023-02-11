import {React,useState} from 'react';
import {Form,InputGroup,Button} from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './CreateProfileNGO.css';

const CreateProfileNGO = () =>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [type,setType] = useState('');
    const [location,setLocation] = useState('');
    const [prevWork,setPrevWork] = useState('');
    const [mission,setMission] = useState('');
    const [impact,setImpact] = useState('');
    const [funding,setFunding] = useState('');
    const [success,setSuccess] = useState(false);
    
    const handleSelect=(e)=>{
        setType(e.target.value);
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
                    'http://localhost:8180/ngos/create/',
                    {
                        name,
                        email,
                        password,
                        type,
                        location,
                        prevWork,
                        mission,
                        impact,
                        funding
                    },config
                );
                if(data)setSuccess(true);
                console.log(data);
            }catch(error){
                console.log(error.response.data);
            }
    }

    if(success){
        return <Navigate to='/dashboard'/>
    }

    return(
        <div className="formbg">
        <div className="form">
            <h2>CREATE NGO PROFILE</h2>
            <br />
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formText">
                    <Form.Label>NGO Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter full name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Which type of NGO are you?</Form.Label>
                    <Form.Select onChange={handleSelect}>
                        <option>Environmental</option>
                        <option>Human Rights</option>
                        <option>Disaster Relief</option>
                        <option>Development</option>
                        <option>Education</option>
                        <option>Indigenous</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formText">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Form.Group>
                <InputGroup>
                    <InputGroup.Text>Tell us something about your work so far: </InputGroup.Text>
                    <Form.Control as="textarea" aria-label="prevwork"
                        value={prevWork}
                        onChange={(e) => setPrevWork(e.target.value)}
                     />
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroup.Text>What is your mission?</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="mission"
                        value={mission}
                        onChange={(e) => setMission(e.target.value)} />
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroup.Text>What is your impact on society?</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="impact"
                        value={impact}
                        onChange={(e) => setImpact(e.target.value)} />
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroup.Text>What are your funding needs?</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="funding" 
                        value={funding}
                        onChange={(e) => setFunding(e.target.value)}/>
                </InputGroup>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </div>
    )
}

export default CreateProfileNGO;
