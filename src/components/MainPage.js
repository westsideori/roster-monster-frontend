import { Switch, Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import PlayersTable from './PlayersTable'
import Welcome from './Welcome'
import Signup from './Signup'
import Login from './Login'
import News from './News'
import RostersList from './RostersList'
import EditRosterDetails from './EditRosterDetails'
import NewRoster from './NewRoster'
import NewScoring from './NewScoring'
import AddRosterPlayers from './AddRosterPlayers'
import AddRosterPlayersToExisting from './AddRosterPlayersToExisting'
import RosterDisplay from './RosterDisplay'
import PlayerDisplay from './PlayerDisplay'
import AddWatchlistPlayers from './AddWatchlistPlayers'
import Watchlist from './Watchlist'
import { useState, useEffect } from 'react'


const MainPage = ({setCurrentUser, currentUser}) => {

        const [players, setPlayers] = useState([])
        const [userRosters, setUserRosters] = useState([])

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

        useEffect(() => {
                if (currentUser) {
                        const token = localStorage.getItem("token")
                        fetch(`http://localhost:3000/users/${currentUser.id}/rosters`, {
                                headers: {
                                Authorization: `Bearer ${token}`,
                                },
                        })
                                .then(r => r.json())
                                .then((rosters) => {
                                        setUserRosters(rosters)
                                })
                }
                
        }, [currentUser])

        // useEffect(() => {
        //         if (currentUser) {
        //                 fetch(`http://localhost:3000/users/${currentUser.id}/rosters`)
        //                         .then(r => r.json())
        //                         .then((rosters) => {
        //                                 setUserRosters(rosters)
        //                         })
        //         } else {

        //                 const token = localStorage.getItem("token");
        //                 if (token) {
        //                         console.log(token)
        //                 fetch(`http://localhost:3000/me`, {
        //                         headers: {
        //                         Authorization: `Bearer ${token}`,
        //                         },
        //                 })
        //                         .then((r) => r.json())
        //                         .then((user) => {
        //                         // set the user in state
        //                         setCurrentUser(user)
        //                         });
        //                 }
        // }, [])

        const handleNewRoster = (roster) => {
                setUserRosters([...userRosters, roster])
        }

        console.log(playerPredictions)

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
                                        <Signup setCurrentUser={setCurrentUser} currentUser={currentUser}/>
                                </Route>
                                <Route exact path='/login'>
                                        <Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>
                                </Route>
                                <Route exact path='/news'>
                                        <News/>
                                </Route>
                                <Route exact path='/rosters'>
                                        <RostersList currentUser={currentUser} userRosters={userRosters} setUserRosters={setUserRosters}/>
                                </Route>
                                <Route exact path="/rosters/:id/edit">
                                        
                                        <EditRosterDetails currentUser={currentUser} />
                                        
                                </Route>
                                <Route exact path="/rosters/new">
                                        
                                        <NewRoster currentUser={currentUser} handleNewRoster={handleNewRoster}/>
                                        
                                </Route>
                                <Route exact path="/rosters/:id/scoring/new">
                                        
                                        <NewScoring currentUser={currentUser}/>
                                        
                                </Route>
                                <Route exact path="/rosters/:id/players/add">
                                        
                                        <AddRosterPlayers currentUser={currentUser} players={players}/>
                                        
                                </Route>
                                <Route exact path="/rosters/:id/players/add_new">
                                        
                                        <AddRosterPlayersToExisting currentUser={currentUser} players={players}/>
                                        
                                </Route>
                                <Route exact path="/rosters/:id">
                                        
                                        <RosterDisplay currentUser={currentUser} playerPredictions={playerPredictions}/>
                                        
                                </Route>
                                <Route exact path="/players/:id/">
                                        
                                        <PlayerDisplay />
                                        
                                </Route>
                                <Route exact path="/watchlist/add">
                                        
                                        <AddWatchlistPlayers />
                                        
                                </Route>
                                <Route exact path="/watchlist">
                                        
                                        <Watchlist currentUser={currentUser} players={players}/>
                                        
                                </Route>
                        </Switch>
                </Grid>
                
        
        )
}

export default MainPage;