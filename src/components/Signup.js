import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = ({setCurrentUser}) => {

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: ""
      })

    const [errors, setErrors] = useState([]);
    
    const history = useHistory();
    
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }

    const handleSignup = (e) => {
        e.preventDefault();
        // POST /signup
        fetch(`${process.env.REACT_APP_RAILS_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.errors) {
              // set errors to show errors in the form
              console.log(data.errors)
              setErrors(data.errors);
            } else {
              // use the response to set state
              const { user, token } = data;
    
              localStorage.setItem("token", token);
    
              setCurrentUser(user);
              history.push('/rosters');
            }
          });
    }

    return (
        <Grid container justify="center" alignItems="center" direction="column">
                
            <form onSubmit={handleSignup}>
                
                <Grid container >
                
                    <Grid container item xs={4}/>
                        
                    <Grid container item xs={3} spacing={3}>
                        <Grid item>
                            <Typography variant="h3" color="primary">Signup</Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="username"
                                label="Username"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.username}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </Grid>
                        <Grid container xs={12} item direction="column">
                            {errors.map((error, index) => {
                                return (
                                    <Grid item key={index}>
                                        <Typography variant="body1" color="error">
                                            {error}
                                        </Typography>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary">
                                    Register
                            </Button>
                        </Grid>
                </Grid>
                    <Grid container item xs={4}/>
                </Grid>
            </form>

        </Grid>
    )
}

export default Signup;