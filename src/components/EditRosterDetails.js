import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'



const EditRosterDetails = ({currentUser, handleUpdateRoster}) => {


    const {id} = useParams()


    
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`${process.env.REACT_APP_RAILS_URL}/users/${currentUser.id}/rosters/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then((roster) => {
                    setFormData({
                        user_id: currentUser.id,
                        name: roster.name,
                        league: roster.league,
                        season: roster.season,
                        slogan: roster.slogan
                    })
                })
        }
    }, [id, currentUser])

    
    

    const [errors, setErrors] = useState([])

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
            fetch(`${process.env.REACT_APP_RAILS_URL}/rosters/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData),
            })
            .then((r) => r.json())
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors)
                } else {
                    handleUpdateRoster(data.id, data)
                    
                }
            })
        }
    }

    return (
        <Grid container justify="center" alignItems="center" direction="column">
            <form onSubmit={handleSubmit}>
                <Grid container >
                    <Grid container item xs={12} spacing={3} direction="column">
                        <Typography variant="h4">Edit Roster</Typography>
                        <Grid item xs={12}>
                            <InputLabel>
                                Roster Name
                            </InputLabel>
                            <Input
                                name="name"                              
                                variant="outlined"
                                type="text"
                                onChange={handleChange}
                                value={formData.name}
                            />
                           
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                League Name
                            </InputLabel>
                            <Input
                                name="league"                              
                                variant="outlined"
                                type="text"
                                onChange={handleChange}
                                value={formData.league}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                Season
                            </InputLabel>
                            <Input
                                name="season"                              
                                variant="outlined"
                                type="text"
                                onChange={handleChange}
                                value={formData.season}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>
                                Slogan
                            </InputLabel>
                            <Input
                                name="slogan"                              
                                variant="outlined"
                                type="text"
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