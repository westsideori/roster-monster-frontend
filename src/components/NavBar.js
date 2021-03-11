import { NavLink, Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
});

const NavBar = ({ currentUser, setCurrentUser }) => {
  const history = useHistory();

  function logout() {
    // remove the token
    localStorage.removeItem("token");
    // clear currentUser
    setCurrentUser(null);
    history.push("/");
  }

  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <ToolBar>
          <NavLink className={classes.a} exact to="/">
            <MenuItem color="secondary">
              <Typography variant="h6">RosterMonster</Typography>
            </MenuItem>
          </NavLink>
          <NavLink to="/players">
            <MenuItem color="secondary">
              <Typography variant="h6">Players</Typography>
            </MenuItem>
          </NavLink>
          <NavLink to="/news">
            <MenuItem color="secondary">
              <Typography variant="h6">Latest News</Typography>
            </MenuItem>
          </NavLink>
          {currentUser ? (
            <>
              <NavLink
                className={classes.rightToolbar}
                style={{ marginRight: "5px" }}
                to="/rosters"
              >
                <MenuItem color="secondary">
                  <Typography variant="h6">
                    {currentUser.username}'s Rosters
                  </Typography>
                </MenuItem>
              </NavLink>
              <NavLink to="/watchlist">
                <MenuItem color="secondary">
                  <Typography variant="h6">Watchlist</Typography>
                </MenuItem>
              </NavLink>
              <Link to="/">
                <MenuItem onClick={logout} color="secondary">
                  <Typography variant="h6">Logout</Typography>
                </MenuItem>
              </Link>
            </>
          ) : (
            <>
              <NavLink className={classes.rightToolbar} to="/signup">
                <MenuItem color="secondary">
                  <Typography variant="h6">Signup</Typography>
                </MenuItem>
              </NavLink>
              <NavLink to="/login">
                <MenuItem color="secondary">
                  <Typography variant="h6">Login</Typography>
                </MenuItem>
              </NavLink>
            </>
          )}
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default NavBar;
