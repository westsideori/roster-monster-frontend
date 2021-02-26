import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const NewScoring = () => {

    const inputProps = {
        step: 0.1,
      };

    return (
        <Grid container justify="center" alignItems="center" direction="column">
            <form>
                <Grid container >
                    <Grid container item xs={12} spacing={3} direction="column">
                        <Typography variant="h4">Set Scoring</Typography>
                        <Grid item xs={12}>
                            <InputLabel>
                                Points
                            </InputLabel>
                            <Input
                                name="points"                              
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                Rebounds
                            </InputLabel>
                            <Input
                                name="rebounds"                              
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                Assists
                            </InputLabel>
                            <Input
                                name="assists"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                Steals
                            </InputLabel>
                            <Input
                                name="steals"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                Blocks
                            </InputLabel>
                            <Input
                                name="blocks"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                3-Pointers Made
                            </InputLabel>
                            <Input
                                name="threes"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                Turnovers
                            </InputLabel>
                            <Input
                                name="turnovers"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                Games Played
                            </InputLabel>
                            <Input
                                name="games"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                FG Made
                            </InputLabel>
                            <Input
                                name="fgMade"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                FG Attempted
                            </InputLabel>
                            <Input
                                name="fgAttempted"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                3-Pointers Attempted
                            </InputLabel>
                            <Input
                                name="threesAttempted"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                FT Made
                            </InputLabel>
                            <Input
                                name="ftMade"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                FT Attempted
                            </InputLabel>
                            <Input
                                name="ftAttempted"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary">
                                    Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
        
    )
}

export default NewScoring;