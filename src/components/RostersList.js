import RosterCard from "./RosterCard";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";

const RostersList = ({
  currentUser,
  userRosters,
  handleDeleteRoster,
  setIsNewRoster,
}) => {
  const rosters = userRosters.map((roster) => {
    return (
      <Grid item xs={4} key={roster.id}>
        <RosterCard
          id={roster.id}
          roster={roster}
          currentUser={currentUser}
          handleDeleteRoster={handleDeleteRoster}
        />
      </Grid>
    );
  });

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Grid container item xs={6} direction="row">
        <Grid container item xs={8} justify="flex-start">
          <Grid item>
            <Typography variant="h3" color="primary">
              {currentUser.username}'s Rosters
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={4} justify="flex-end">
          <Grid item>
            <Link to={`/rosters/new`}>
              <IconButton
                onClick={() => setIsNewRoster(true)}
                variant="contained"
                color="primary"
              >
                <AddCircleSharpIcon style={{ height: "50px", width: "50px" }} />
              </IconButton>
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {rosters}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RostersList;
