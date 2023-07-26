import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { RouteComponentProps } from 'react-router-dom';

interface LoginScreenProps extends RouteComponentProps {}


interface User {
    email: string;
    name: string;
    _id: string;
    token: string;
}


const LoginScreen: React.FC<LoginScreenProps> = ({location, history}) => {
    const url = "http://127.0.0.1:4000";
    console.log("hrr")
    console.log(location)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async() => {
        try {
            const response = await axios.post(`${url}/api/auth/login`,  {
                email: email,
                password: password
            })
            if(response.status==200) {
                
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
        Login
      </Typography>
      <TextField  onChange={(e) => setEmail(e.target.value)}  value={email} label="Email" type="email" fullWidth margin="normal" />
      <TextField  onChange={(e) => setPassword(e.target.value)}  value={password} label="Password" type="password" fullWidth margin="normal" />
      <Button onClick={login} variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
    
    </Container>



        </React.Fragment>
    )
}

export default LoginScreen;