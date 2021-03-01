import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const Login = ({setCurrentUser, currentUser}) => {

    const history = useHistory()

    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3000/login", {
            method: "POST",
        })
            .then((r) => r.json())
            .then((user) => {
                // response -> user saved in state
                setCurrentUser(user)
                history.push(`/users/${user.id}/rosters`)
            });
        
    }

    return (
        <Grid container justify="center" alignItems="center" direction="column">
                
            <form onSubmit={handleSubmit}>
            
                <Grid container >
                
                    <Grid container item xs={4}/>
                
                    <Grid container item xs={4} spacing={3}>
                        <Typography>Login</Typography>
                        <Grid item>
                            <TextField 
                                name="username"
                                label="Username"
                                variant="outlined"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit">
                                    Login 
                            </Button>
                        </Grid>
                </Grid>
                    <Grid container item xs={4}/>
                </Grid>
            </form>

        </Grid>
    )
}

export default Login;