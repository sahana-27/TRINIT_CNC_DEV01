import {React,useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import './CreateProfilePhil.css';

const CreateProfilePhil = () =>{
    const allNGOTypes = ['Environmental','Human Rights','Disaster Relief','Development','Education','Indigenous']
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [NGOType,setNGOType] = useState('');
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
                    `/api/Phil/createProfile/${email}`,
                    {
                        name,
                        email,
                        NGOType
                    },config
                );
                if(data)setSuccess(true);
            }catch(error){
                console.log(error.response.data);
            }
    }

    if(success){
        return <Navigate to='/PhilDashboard'/>
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
                <Form.Group>
                    <Form.Label>Please select the types of NGOs you wish to support:</Form.Label>
                    <Multiselect
                        isObject={false}
                        onRemove={(e)=>{console.log(e)}}
                        onSelect={(e)=>{setNGOType(e)}}   
                        value = {NGOType}
                        options={allNGOTypes}/>
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </div>
    )
}

export default CreateProfilePhil;