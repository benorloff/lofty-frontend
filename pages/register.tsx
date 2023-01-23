import { 
    Box,
    Typography,
    TextField,
    Stack,
    Grid,
    Button,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register () {

    const router = useRouter()

    const [input, setInput] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const value = e.target.value;
        setInput({
            ...input,
            [e.target.name]: value
        })
        console.log(input, '<-- input')
    }

    const handleSubmit = async () => {
        const res = await fetch('http://catstagram.lofty.codes/api/users/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        })

        if ( !res.ok ) {
            setMessage('Uh oh! There was an error creating your account. Please try again.');
            console.log(res, '<-- create account error')
            return;
        }

        setMessage('Success! Your account has been created. Taking you to Sign In...') 
        console.log(res, '<-- create account res')

        setTimeout(() => {
            router.push('/api/auth/signin')
        }, 2000)
    }

    return (
        <Grid container alignItems='center' justifyContent='center' sx={{ height: '100vh' }}>
            <Box 
                sx={{ 
                    border: '1px solid grey',
                    width: 400,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'white',
                }}    
            >
                <Stack spacing={2}>
                    <Typography variant="h5" sx={{ color: 'black '}}>Sign Up</Typography>
                    <TextField
                        required
                        id="firstName"
                        name="first_name"
                        label="First Name"
                        value={input.first_name}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        required
                        id="lastName"
                        name="last_name"
                        label="Last Name"
                        value={input.last_name}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        value={input.email}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        value={input.password}
                        type="password"
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                    />
                    <Button variant="contained" onClick={handleSubmit}>Create Account</Button>
                </Stack>
                { message && 
                    <Typography sx={{ color: 'black', pt: 1 }}>{message}</Typography>
                }
            </Box>
        </Grid>
    )

}