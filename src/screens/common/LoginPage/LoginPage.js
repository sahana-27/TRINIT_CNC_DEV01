import React from 'react';
import { useState } from 'react';
import { Form,Button} from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './LoginPage.css'

const LoginPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userType,setUserType] = useState('');
    const [success,setSuccess] = useState(false);

    const handleSelect=(e)=>{
        setUserType(e.target.value);
        console.log(userType);
    }

    if(success){
        return <Navigate to='/dashboard'/>
    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        try{
            const config={
                headers:{
                    "Content-type":"application/json"
                }
            };

            let url
            if(userType==='NGO'){
                url='http://localhost:8180/ngos/login'
            }
            else if(userType==='Philanthropist')
            url='http://localhost:8180/philanthropists/login'

            const{data}=await axios.post(
                `${url}`,
                {
                    email,
                    password
                },config
            );
            if(data) setSuccess(true);
            console.log(data);
            localStorage.setItem("userInfo",JSON.stringify(data));
            localStorage.setItem("userType",JSON.stringify(userType));
        }catch(error){
            console.log(error);
        }
    }

    return (
       <div className = "formbg">
        <div className="form">
        <h2>LOGIN</h2>
        <br />
            <Form onSubmit={submitHandler}>
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
                <Form.Select onChange={handleSelect}>
                    <option>Select user type:</option>
                    <option value="NGO">NGO</option>
                    <option value="Philanthropist">Philanthropist</option>
                </Form.Select>
                <br/>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </div>
    )
}

export default LoginPage;
