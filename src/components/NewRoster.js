import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const NewRoster = () => {

    return (
        <Grid container justify="center" alignItems="center" direction="column">
            <form>
                <Grid container >
                    <Grid container item xs={12} spacing={3} direction="column">
                        <Typography variant="h4">Create Roster</Typography>
                        <Grid item xs={12}>
                            <TextField 
                                name="rosterName"
                                label="Roster Name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="leagueName"
                                label="League Name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="season"
                                label="Season"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="slogan"
                                label="Slogan"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary">
                                    Create Team
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
        
    )
}

export default NewRoster;