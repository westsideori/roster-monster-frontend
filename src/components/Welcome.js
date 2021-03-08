import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Welcome = () => {
    return (
        <Grid container justify="center" alignItems="center" direction="column">
            
                <Typography variant="h2" color="primary">
                    Welcome to RosterMonster!
                </Typography>
                <br></br>
                <Typography variant="h4" color="primary">
                    The must have tool for your fantasy basketball squads.
                </Typography>
                <img src={`https://media.giphy.com/media/7XsgQ0fmpLM8HJjbk2/giphy.gif`} alt={`RosterMonster`} />
            
        </Grid>
    )
}

export default Welcome;