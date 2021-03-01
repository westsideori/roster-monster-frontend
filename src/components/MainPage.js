import { Switch, Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import PlayersTable from './PlayersTable'
import Welcome from './Welcome'
import Signup from './Signup'
import Login from './Login'
import News from './News'
import RostersList from './RostersList'
import NewRoster from './NewRoster'
import NewScoring from './NewScoring'
import AddRosterPlayers from './AddRosterPlayers'
import RosterDisplay from './RosterDisplay'
import PlayerDisplay from './PlayerDisplay'
import AddWatchlistPlayers from './AddWatchlistPlayers'
import Watchlist from './Watchlist'
import { useState, useEffect } from 'react'


const MainPage = ({setCurrentUser, currentUser}) => {

        const [players, setPlayers] = useState([])

        const [playerPredictions, setPlayerPredictions] = useState([])

        useEffect(() => {
                fetch(`http://localhost:3000/players`)
                        .then(resp => resp.json())
                        .then(playerData => {
                                setPlayers(playerData)
                        })
                }, [])

        useEffect(() => {
                fetch(`http://localhost:3000/predictions`)
                        .then(resp => resp.json())
                        .then((predictionData) => {
                                setPlayerPredictions(predictionData)
                        })
        }, [])

        const [selectedRoster, setSelectedRoster] = useState(null)

        return (
        
                <Grid container item xs={12} spacing={3} >
                        <Switch>
                                <Route exact path='/'>
                                        
                                        <Welcome/>
                                        
                                </Route>
                                <Route exact path='/players'>
                                        
                                        <PlayersTable players={players}/>
                                        
                                </Route>
                                <Route exact path='/signup'>
                                        <Signup/>
                                </Route>
                                <Route exact path='/login'>
                                        <Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>
                                </Route>
                                <Route exact path='/news'>
                                        <News/>
                                </Route>
                                <Route exact path='/users/:id/rosters'>
                                        <RostersList />
                                </Route>
                                <Route exact path="/users/:id/rosters/new">
                                        
                                        <NewRoster selectedRoster={selectedRoster} setSelectedRoster={setSelectedRoster}/>
                                        
                                </Route>
                                <Route exact path="/users/:id/rosters/:rostid/scoring/new">
                                        
                                        <NewScoring selectedRoster={selectedRoster} setSelectedRoster={setSelectedRoster}/>
                                        
                                </Route>
                                <Route exact path="/users/:id/rosters/:rostid/players/add">
                                        
                                        <AddRosterPlayers selectedRoster={selectedRoster} setSelectedRoster={setSelectedRoster} players={players}/>
                                        
                                </Route>
                                <Route exact path="/users/:id/rosters/:rostid/">
                                        
                                        <RosterDisplay selectedRoster={selectedRoster} players={playerPredictions}/>
                                        
                                </Route>
                                <Route exact path="/players/:id/">
                                        
                                        <PlayerDisplay />
                                        
                                </Route>
                                <Route exact path="/users/:id/watchlist/add">
                                        
                                        <AddWatchlistPlayers />
                                        
                                </Route>
                                <Route exact path="/users/:id/watchlist">
                                        
                                        <Watchlist />
                                        
                                </Route>
                        </Switch>
                </Grid>
                
        
        )
}

export default MainPage;