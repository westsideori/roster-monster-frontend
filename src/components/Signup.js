import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Signup = () => {

    return (
        <Grid container justify="center" alignItems="center" direction="column">
                
            <form>
                
                <Grid container >
                
                    <Grid container item xs={4}/>
                        
                    <Grid container item xs={4} spacing={3}>
                    <Typography>Signup</Typography>
                        <Grid item>
                            <TextField 
                                name="name"
                                label="Name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="username"
                                label="Username"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                            />
                        </Grid>
                        <Grid item>
                            <Button
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