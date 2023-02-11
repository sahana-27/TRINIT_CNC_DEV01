import {React,useState} from 'react';
import {Form,Button,InputGroup} from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import './CreateProfilePhil.css';

const CreateProfilePhil = () =>{
    const allNGOTypes = ['Environmental','Human Rights','Disaster Relief','Development','Education','Indigenous']
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [location,setLocation] = useState('');
    const [NGOPref,setNGOPref] = useState([]);
    const [pastDonations,setPastDonations] = useState('');
    const [success,setSuccess] = useState(false);

    const submitHandler = async(e) =>{
        e.preventDefault();
            try{
                const config={
                    headers:{
                        "Content-type":"application/json"
                    }
                };
                const{data} = await axios.post(
                    'http://localhost:8180/philanthropists/create/',
                    {
                        name,
                        email,
                        password,
                        location,
                        NGOPref,
                        pastDonations
                    },config
                );
                if(data)setSuccess(true);
                console.log(data);
            }catch(error){
                console.log(error.response.data);
            }
    }

    if(success){
        return <Navigate to='/DashboardPhil'/>
    }

    return(
        <div className = "formbg">
        <div className="form">
            <h2>CREATE PHILANTHROPIST PROFILE</h2>
            <br />
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formText">
                    <Form.Label>Full Name</Form.Label>
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
                 <Form.Group className="mb-3" controlId="formText">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Please select the types of NGOs you wish to support:</Form.Label>
                    <Multiselect
                        isObject={false}
                        onRemove={(e)=>{console.log(e)}}
                        onSelect={(e)=>{setNGOPref(e)}}   
                        value = {NGOPref}
                        options={allNGOTypes}/>
                </Form.Group>
                <br />
                <InputGroup>
                    <InputGroup.Text>Provide information about past donations, if any: </InputGroup.Text>
                    <Form.Control as="textarea" aria-label="prevwork"
                        value={pastDonations}
                        onChange={(e) => setPastDonations(e.target.value)}
                     />
                </InputGroup>
                <br/>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </div>
    )
}

export default CreateProfilePhil;