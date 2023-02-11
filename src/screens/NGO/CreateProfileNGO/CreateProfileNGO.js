import {React,useState} from 'react';
import {Form,InputGroup,Button} from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './CreateProfileNGO.css';

const CreateProfileNGO = () =>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [NGOType,setNGOType] = useState('');
    const [prevWork,setPrevWork] = useState('');
    const [endGoal,setEndGoal] = useState('');
    const [howGoal,setHowGoal] = useState('');
    const [impact,setImpact] = useState('');
    const [funding,setFunding] = useState('');
    const [success,setSuccess] = useState(false);
    
    const submitHandler = async(e) =>{
        e.preventDefault();
            try{
                const config={
                    headers:{
                        "Content-type":"application/json"
                    }
                };
                const{data} = await axios.put(
                    `/api/NGO/createProfile/${email}`,
                    {
                        name,
                        email,
                        NGOType,
                        prevWork,
                        endGoal,
                        howGoal,
                        impact,
                        funding
                    },config
                );
                if(data)setSuccess(true);
            }catch(error){
                console.log(error.response.data);
            }
    }

    if(success){
        return <Navigate to='/NGODashboard'/>
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
                <Form.Group className="mb-3">
                    <Form.Label>Which type of NGO are you?</Form.Label>
                    <Form.Select id="NGOtype" 
                        onSelect={(e)=>{setNGOType(e)}}>
                        <option>Environmental</option>
                        <option>Human Rights</option>
                        <option>Disaster Relief</option>
                        <option>Development</option>
                        <option>Education</option>
                        <option>Indigenous</option>
                    </Form.Select>
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
                    <InputGroup.Text>What is your end goal?</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="endgoal"
                        value={endGoal}
                        onChange={(e) => setEndGoal(e.target.value)} />
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroup.Text>How do you plan to achieve this goal?</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="howgoal"
                        value={howGoal}
                        onChange={(e) => setHowGoal(e.target.value)} />
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroup.Text>What has been your impact on the environment and society?</InputGroup.Text>
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