import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const NewScoring = ({setIsNewRoster}) => {

    const {id} = useParams()

    const [formData, setFormData] = useState({
        roster_id: id,
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        threes_made: 0,
        turnovers: 0,
        games_played: 0,
        field_goals_made: 0,
        field_goals_attempted: 0,
        threes_attempted: 0,
        free_throws_made: 0,
        free_throws_attempted: 0
    })

    const [errors, setErrors] = useState([])

    const history = useHistory()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        if (token) {
            fetch("http://localhost:3000/score_settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData),
            })
            .then((r) => r.json())
            .then((data) => {
                setIsNewRoster(false)
                history.push(`/rosters/${id}`)
            })
          }
    }

    const inputProps = {
        step: 0.1,
      };

    return (
        <Grid container justify="center" alignItems="center" direction="column">
            <form onSubmit={handleSubmit}>
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
                                onChange={handleChange}
                                value={formData.points}
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
                                onChange={handleChange}
                                value={formData.rebounds}
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
                                onChange={handleChange}
                                value={formData.assists}
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
                                onChange={handleChange}
                                value={formData.steals}
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
                                onChange={handleChange}
                                value={formData.blocks}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                3-Pointers Made
                            </InputLabel>
                            <Input
                                name="threes_made"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                                onChange={handleChange}
                                value={formData.threes_made}
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
                                onChange={handleChange}
                                value={formData.turnovers}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                Games Played
                            </InputLabel>
                            <Input
                                name="games_played"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                                onChange={handleChange}
                                value={formData.games_played}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                FG Made
                            </InputLabel>
                            <Input
                                name="field_goals_made"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                                onChange={handleChange}
                                value={formData.field_goals_made}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                FG Attempted
                            </InputLabel>
                            <Input
                                name="field_goals_attempted"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                                onChange={handleChange}
                                value={formData.field_goals_attempted}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                3-Pointers Attempted
                            </InputLabel>
                            <Input
                                name="threes_attempted"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                                onChange={handleChange}
                                value={formData.threes_attempted}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                FT Made
                            </InputLabel>
                            <Input
                                name="free_throws_made"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                                onChange={handleChange}
                                value={formData.free_throws_made}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                FT Attempted
                            </InputLabel>
                            <Input
                                name="free_throws_attempted"
                                variant="outlined"
                                type="number"
                                inputProps={inputProps}
                                onChange={handleChange}
                                value={formData.free_throws_attempted}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
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