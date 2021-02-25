import { Switch, Route } from 'react-router-dom'
import PlayersTable from './PlayersTable'
import Welcome from './Welcome'
import Signup from './Signup'
import Login from './Login'
import News from './News'

const MainPage = () => {
    return (
        <div>
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
                    <Login/>
                </Route>
                <Route exact path='/news'>
                    <News/>
                </Route>
            </Switch>
        </div>
    )
}

export default MainPage;