import RosterCard from './RosterCard'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const RostersList = () => {


    return (
        <Grid container justify="center" alignItems="center" direction="column">
            <Grid container item xs={6} direction="row">
                <Grid container item xs={8} justify="flex-start" >
                    <Grid item  >
                        <Typography variant="h4" color="primary">
                            User's Rosters
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={4} justify="flex-end">
                    <Grid item>
                        <Button variant="contained" color="primary">
                            Create New Roster
                        </Button>
                    </Grid>
                </Grid>
                
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <RosterCard />
                    </Grid>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

export default RostersList;