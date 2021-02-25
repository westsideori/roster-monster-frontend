import {NavLink} from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="w3-bar w3-orange">
            <NavLink className="w3-bar-item w3-button" exact to="/">RosterMonster</NavLink>
            <NavLink className="w3-bar-item w3-button" to="/players">Players</NavLink>
            <NavLink className="w3-bar-item w3-button" to="/news">Latest News</NavLink>
            <NavLink className="w3-bar-item w3-button w3-right" to="/login">Login</NavLink>
            <NavLink className="w3-bar-item w3-button w3-right" to="/signup">Signup</NavLink>
            
        </nav>
    )
}

export default NavBar;