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

const MainPage = ({setCurrentUser}) => {
    return (
        
        <Grid container item xs={12} spacing={3} >
                <Switch>
                    <Route exact path='/'>
                        
                            <Welcome/>
                        
                    </Route>
                    <Route exact path='/players'>
                        
                            <PlayersTable></PlayersTable>
                        
                    </Route>
                    <Route exact path='/signup'>
                        <Signup/>
                    </Route>
                    <Route exact path='/login'>
                        <Login setCurrentUser={setCurrentUser}/>
                    </Route>
                    <Route exact path='/news'>
                        <News/>
                    </Route>
                    <Route exact path='/users/:id/rosters'>
                        <RostersList />
                    </Route>
                    <Route exact path="/users/:id/rosters/new">
                        
                            <NewRoster />
                        
                    </Route>
                    <Route exact path="/users/:id/rosters/:rostid/scoring/new">
                        
                            <NewScoring />
                        
                    </Route>
                    <Route exact path="/users/:id/rosters/:rostid/players/add">
                        
                            <AddRosterPlayers />
                        
                    </Route>
                    <Route exact path="/users/:id/rosters/:rostid/">
                        
                            <RosterDisplay />
                        
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