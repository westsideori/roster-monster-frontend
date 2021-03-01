import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'



const NewRoster = ({selectedRoster, setSelectedRoster}) => {

    const [formData, setFormData] = useState({
        user_id: 1,
        name: "",
        league: "",
        season: "",
        slogan: ""
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
        fetch("http://localhost:3000/rosters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
           
            console.log(data)
            setSelectedRoster(data)
        
            history.push(`/users/${1}/rosters/${data.id}/players/add`)
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
                        <Grid item>
                            <Button
                                type="submit"
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