import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'



const EditRosterDetails = ({currentUser, handleNewRoster}) => {


    const {id} = useParams()


    const [roster, setRoster] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/rosters/${id}`)
            .then(resp => resp.json())
            .then((roster) => {
                setRoster(roster)
            })
    }, [roster])

    const [formData, setFormData] = useState({
        user_id: currentUser.id,
        name: roster.name,
        league: roster.league,
        season: roster.season,
        slogan: roster.slogan
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
        fetch(`http://localhost:3000/rosters/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.errors) {
                setErrors(data.errors)
            } else {
                history.push(`/rosters/${data.id}`)
            }
          })
    }

    return (
        <Grid container justify="center" alignItems="center" direction="column">
            <form onSubmit={handleSubmit}>
                <Grid container >
                    <Grid container item xs={12} spacing={3} direction="column">
                        <Typography variant="h4">Create Roster</Typography>
                        <Grid item xs={12}>
                            <TextField 
                                name="name"
                                label="Roster Name"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="league"
                                label="League Name"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.league}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="season"
                                label="Season"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.season}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="slogan"
                                label="Slogan"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.slogan}
                            />
                        </Grid>
                        <Grid container xs={4} item>
                            {errors.map((error) => {
                                return (
                                    <Grid item>
                                        <Typography variant="h6">
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
                                    Save Team
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
        
    )
}

export default EditRosterDetails;