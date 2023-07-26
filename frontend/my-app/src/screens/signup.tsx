import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { json } from "stream/consumers";

interface SignupScreenProps extends RouteComponentProps {}


interface User {
    email: string;
    name: string;
    _id: string;
    token: string;
}


const SignupScreen: React.FC<SignupScreenProps> = ({location, history}) => {
    const url = "http://127.0.0.1:4000";

    console.log(location)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const createAccount = async() => {
        try {
            const response = await axios.post(`${url}/api/auth/register`,  {
                name: name,
                email: email,
                password: password
            })
            if(response.status==201) {
                
                console.log(response.data)
                localStorage.setItem('user', JSON.stringify(response.data))
                history.push('/')
            }
        }catch(e) {
            console.log(e)
        }
       
    }

    return (
        <React.Fragment>

<Container maxWidth="sm" >
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
      }}
    
    >
    <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField onChange={(e) => setName(e.target.value)} value={name} label="Name" fullWidth margin="normal" />
      <TextField  onChange={(e) => setEmail(e.target.value)}  value={email} label="Email" type="email" fullWidth margin="normal" />
      <TextField  onChange={(e) => setPassword(e.target.value)}  value={password} label="Password" type="password" fullWidth margin="normal" />
      <Button onClick={createAccount} variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
    </Box>
    
    </Container>



        </React.Fragment>
    )
}

export default SignupScreen;