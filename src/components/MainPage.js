import { Switch, Route, useHistory } from 'react-router-dom'
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
import RosterDisplay from './RosterDisplay'
import PlayerDisplay from './PlayerDisplay'
import Watchlist from './Watchlist'
import { useState, useEffect } from 'react'


const MainPage = ({setCurrentUser, currentUser}) => {

        const history = useHistory()

        const [players, setPlayers] = useState([])
        const [userRosters, setUserRosters] = useState([])
        const [userWatchlist, setUserWatchlist] = useState(null)
        const [playerPredictions, setPlayerPredictions] = useState([])
        const [isNewRoster, setIsNewRoster] = useState(false)

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

        useEffect(() => {
                console.log(currentUser)
                if (currentUser) {
                        const token = localStorage.getItem("token")
                        if (token) {
                                fetch(`http://localhost:3000/users/${currentUser.id}/watchlist`, {
                                        headers: {
                                                Authorization: `Bearer ${token}`
                                        },
                                })
                                        .then(r => r.json())
                                        .then((watchlist) => {
                                                console.log(watchlist)
                                                setUserWatchlist(watchlist)
                                        })
                        } 
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

        const handleUpdateRoster = (id, updatedRoster) => {
                console.log(updatedRoster, id)
                const updatedRosters = userRosters.map((roster) => {
                    if (roster.id === id) {
                        return updatedRoster 
                    } else {
                        return roster
                    }
                })
                console.log(updatedRosters)
                setUserRosters(updatedRosters)
                history.push(`/rosters/${id}`)
        }

        const handleDeleteRoster = (id) => {
                const updatedRosters = userRosters.filter((roster) => {
                        return roster.id !== id
                    })
                    
                setUserRosters(updatedRosters)
                
        }

        const removePlayerFromWatchlist = (rowId) => {
                const token = localStorage.getItem("token")
                if (token) {
                        let playerToDelete = userWatchlist.watchlist_players.filter((wp) => {
                                return wp.player_id === rowId && wp.watchlist_id === userWatchlist.id
                        })
                
                        const [player] = playerToDelete
                        
                        fetch(`http://localhost:3000/watchlist_players/${player.id}`, {
                                method: 'DELETE',
                                headers: {
                                        Authorization: `Bearer ${token}`
                                }
                        })
                                .then(console.log('Removed'))
                }
        }
            
        // const handleRemove = (apiId) => {
        //         let filteredIds = playerIds.filter((id) => {
        //                 return id !== apiId
        //         })
        //         setPlayerIds(filteredIds)
        // }

        console.log(playerPredictions)

        return (
        
                <Grid container item xs={12} spacing={3} >
                        <Switch>
                                <Route exact path='/'>
                                        
                                        <Welcome/>
                                        
                                </Route>
                                <Route exact path='/players'>
                                        
                                        <PlayersTable players={players} currentUser={currentUser} removePlayerFromWatchlist={removePlayerFromWatchlist} />
                                        
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

                                        {currentUser && <RostersList currentUser={currentUser} userRosters={userRosters} setUserRosters={setUserRosters} handleDeleteRoster={handleDeleteRoster} setIsNewRoster={setIsNewRoster} />}
                                        
                                </Route>
                                <Route exact path="/rosters/:id/edit">
                                        
                                        {currentUser && <EditRosterDetails currentUser={currentUser} handleUpdateRoster={handleUpdateRoster} />}
                                        
                                </Route>
                                <Route exact path="/rosters/new">
                                        
                                        {currentUser && <NewRoster currentUser={currentUser} handleNewRoster={handleNewRoster}/>}
                                        
                                </Route>
                                <Route exact path="/rosters/:id/scoring/new">
                                        
                                        {currentUser && <NewScoring currentUser={currentUser} setIsNewRoster={setIsNewRoster}/>}
                                        
                                </Route>
                                <Route exact path="/rosters/:id/players/add">
                                        
                                        {currentUser && <AddRosterPlayers currentUser={currentUser} players={players} isNewRoster={isNewRoster} />}
                                        
                                </Route>
                                <Route exact path="/rosters/:id">
                                        
                                        {currentUser && <RosterDisplay currentUser={currentUser} playerPredictions={playerPredictions} />}
                                        
                                </Route>
                                <Route exact path="/players/:id/">
                                        
                                        <PlayerDisplay />
                                        
                                </Route>
                                <Route exact path="/watchlist">
                                        
                                        {userWatchlist ? <Watchlist currentUser={currentUser} userWatchlist={userWatchlist} removePlayerFromWatchlist={removePlayerFromWatchlist} players={players} /> : <div>Loading</div> }
                                        
                                </Route>
                        </Switch>
                </Grid>
                
        
        )
}

export default MainPage;