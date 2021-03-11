import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const LineupOptimizer = ({ playerPredictions, currentUser }) => {
  const { id } = useParams();

  const [selectedRoster, setSelectedRoster] = useState([]);
  const [playerIds, setPlayerIds] = useState([]);
  const [formShowing, setFormShowing] = useState(true);
  const [lineupShowing, setLineupShowing] = useState(false);
  const [optimizedLineup, setOptimizedLineup] = useState([]);
  const [lineupForm, setLineupForm] = useState({
    guards: 0,
    pointGuards: 0,
    shootingGuards: 0,
    forwards: 0,
    smallForwards: 0,
    powerForwards: 0,
    centers: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        `${process.env.REACT_APP_RAILS_URL}/users/${currentUser.id}/rosters/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((r) => r.json())
        .then((roster) => {
          console.log(roster);
          setSelectedRoster(roster);
          let idCollection = roster.players.map((player) => {
            return player.api_id;
          });
          setPlayerIds(idCollection);
        });
    }
  }, [id, currentUser]);

  // const removePlayer = (rowId, apiId) => {
  //   const token = localStorage.getItem("token")
  //   if (token) {
  //     let playerToDelete = selectedRoster.roster_players.filter((rp) => {
  //       return rp.player_id === rowId && rp.roster_id === selectedRoster.id
  //     })

  //     const [player] = playerToDelete

  //     fetch(`http://localhost:3000/roster_players/${player.id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //       .then(handleRemove(apiId))
  //   }
  // }

  // const handleRemove = (apiId) => {
  //   let filteredIds = playerIds.filter((id) => {
  //     return id !== apiId
  //   })
  //   setPlayerIds(filteredIds)
  // }

  // const handleAdd = (e) => {
  //   history.push(`/rosters/${id}/players/add`)
  // }

  if (!selectedRoster || !selectedRoster.score_setting) {
    return (
      <Grid container xs={12} justify="center">
        <Grid item>
          Loading...
          <img
            src="https://media.giphy.com/media/H75Uk3F2X1PATByXrk/giphy.gif"
            alt="Basketball"
          />
        </Grid>
      </Grid>
    );
  }

  console.log("Player Ids", playerIds);

  const filteredPlayerPredictions = playerPredictions.filter((player) => {
    return playerIds.includes(player.api_id);
  });

  console.log("Player Predicts", filteredPlayerPredictions);

  const preSettings = Object.keys(selectedRoster.score_setting);

  const settings = preSettings.filter((setting) => {
    return (
      setting !== "roster_id" &&
      setting !== "id" &&
      setting !== "created_at" &&
      setting !== "updated_at"
    );
  });

  console.log("settings", settings);

  // const settings = []

  const columns = [
    {
      title: "",
      field: "",
      sorting: false,
      render: (rowData) => (
        <img
          src={rowData.image}
          alt={rowData.name}
          style={{ height: "50px", widht: "50px" }}
        />
      ),
    },
    {
      title: "Name",
      field: "name",
      render: (rowData) => (
        <Link to={`/players/${rowData.id}`}>{`${rowData.name}`}</Link>
      ),
    },
    {
      title: "Team",
      field: "team",
    },
    {
      title: "Position",
      field: "position",
    },
  ];

  let preMidColumns = settings.map((setting) => {
    if (selectedRoster.score_setting[setting] !== 0) {
      if (setting === "games_played") {
        return {
          title: "Games",
          field: "Games",
        };
      } else if (setting === "field_goals_attempted") {
        return {
          title: "FG Attempted",
          field: "FieldGoalsAttempted",
        };
      } else if (setting === "field_goals_made") {
        return {
          title: "FG Made",
          field: "FieldGoalsMade",
        };
      } else if (setting === "threes_attempted") {
        return {
          title: "3-Pointers Attempted",
          field: "ThreePointersAttempted",
        };
      } else if (setting === "threes_made") {
        return {
          title: "3-Pointers Made",
          field: "ThreePointersMade",
        };
      } else if (setting === "free_throws_attempted") {
        return {
          title: "Free Throws Attempted",
          field: "FreeThrowsAttempted",
        };
      } else if (setting === "free_throws_made") {
        return {
          title: "Free Throws Made",
          field: "FreeThrowsMade",
        };
      } else if (setting === "points") {
        return {
          title: "Points",
          field: "Points",
        };
      } else if (setting === "rebounds") {
        return {
          title: "Rebounds",
          field: "Rebounds",
        };
      } else if (setting === "assists") {
        return {
          title: "Assists",
          field: "Assists",
        };
      } else if (setting === "steals") {
        return {
          title: "Steals",
          field: "Steals",
        };
      } else if (setting === "blocks") {
        return {
          title: "Blocks",
          field: "BlockedShots",
        };
      } else if (setting === "turnovers") {
        return {
          title: "Turnovers",
          field: "Turnovers",
        };
      }
    } else {
      return null;
    }
  });

  const midColumns = preMidColumns.filter((column) => {
    return column;
  });

  console.log("mid", midColumns);

  let fantasyColumn = {
    title: "Fantasy Points",
    field: "fantasyPoints",
    // customSort: (a, b) => {
    //   return (((a.Games * selectedRoster.score_setting['games_played']) + (a.FieldGoalsAttempted * selectedRoster.score_setting['field_goals_attempted']) + (a.FieldGoalsMade * selectedRoster.score_setting['field_goals_made']) + (a.ThreePointersAttempted * selectedRoster.score_setting['threes_attempted']) + (a.ThreePointersMade * selectedRoster.score_setting['threes_made']) + (a.FreeThrowsAttempted * selectedRoster.score_setting['free_throws_attempted']) + (a.FreeThrowsMade * selectedRoster.score_setting['free_throws_made']) + (a.Points * selectedRoster.score_setting['points']) + (a.Rebounds * selectedRoster.score_setting['rebounds']) + (a.Assists * selectedRoster.score_setting['assists']) + (a.Steals * selectedRoster.score_setting['steals']) + (a.BlockedShots * selectedRoster.score_setting['blocks']) + (a.Turnovers * selectedRoster.score_setting['turnovers'])) - ((b.Games * selectedRoster.score_setting['games_played']) + (b.FieldGoalsAttempted * selectedRoster.score_setting['field_goals_attempted']) + (b.FieldGoalsMade * selectedRoster.score_setting['field_goals_made']) + (b.ThreePointersAttempted * selectedRoster.score_setting['threes_attempted']) + (b.ThreePointersMade * selectedRoster.score_setting['threes_made']) + (b.FreeThrowsAttempted * selectedRoster.score_setting['free_throws_attempted']) + (b.FreeThrowsMade * selectedRoster.score_setting['free_throws_made']) + (b.Points * selectedRoster.score_setting['points']) + (b.Rebounds * selectedRoster.score_setting['rebounds']) + (b.Assists * selectedRoster.score_setting['assists']) + (b.Steals * selectedRoster.score_setting['steals']) + (b.BlockedShots * selectedRoster.score_setting['blocks']) + (b.Turnovers * selectedRoster.score_setting['turnovers'])))
    // },
    // render: rowData => {
    //   return Math.round((rowData.Games * selectedRoster.score_setting['games_played']) + (rowData.FieldGoalsAttempted * selectedRoster.score_setting['field_goals_attempted']) + (rowData.FieldGoalsMade * selectedRoster.score_setting['field_goals_made']) + (rowData.ThreePointersAttempted * selectedRoster.score_setting['threes_attempted']) + (rowData.ThreePointersMade * selectedRoster.score_setting['threes_made']) + (rowData.FreeThrowsAttempted * selectedRoster.score_setting['free_throws_attempted']) + (rowData.FreeThrowsMade * selectedRoster.score_setting['free_throws_made']) + (rowData.Points * selectedRoster.score_setting['points']) + (rowData.Rebounds * selectedRoster.score_setting['rebounds']) + (rowData.Assists * selectedRoster.score_setting['assists']) + (rowData.Steals * selectedRoster.score_setting['steals']) + (rowData.BlockedShots * selectedRoster.score_setting['blocks']) + (rowData.Turnovers * selectedRoster.score_setting['turnovers']))
    // }
  };

  // 1. separate players into arrays by position
  // 2. decide which positions constitute starting lineup
  //    a. have user select lineup breakdown
  //    b. save choices in state
  // 3. map arrays to calculate total fantasy points
  // 4. return max from each relevant array
  // 5. create table data from maxes, and render table with ideal lineup

  const playersWithFantasyPoints = filteredPlayerPredictions.map((player) => {
    return {
      ...player,
      fantasyPoints:
        player.Games * selectedRoster.score_setting["games_played"] +
        player.FieldGoalsAttempted *
          selectedRoster.score_setting["field_goals_attempted"] +
        player.FieldGoalsMade *
          selectedRoster.score_setting["field_goals_made"] +
        player.ThreePointersAttempted *
          selectedRoster.score_setting["threes_attempted"] +
        player.ThreePointersMade * selectedRoster.score_setting["threes_made"] +
        player.FreeThrowsAttempted *
          selectedRoster.score_setting["free_throws_attempted"] +
        player.FreeThrowsMade *
          selectedRoster.score_setting["free_throws_made"] +
        player.Points * selectedRoster.score_setting["points"] +
        player.Rebounds * selectedRoster.score_setting["rebounds"] +
        player.Assists * selectedRoster.score_setting["assists"] +
        player.Steals * selectedRoster.score_setting["steals"] +
        player.BlockedShots * selectedRoster.score_setting["blocks"] +
        player.Turnovers * selectedRoster.score_setting["turnovers"],
    };
  });

  let guards = [];
  let pointGuards = [];
  let shootingGuards = [];
  let forwards = [];
  let smallForwards = [];
  let powerForwards = [];
  let centers = [];

  playersWithFantasyPoints.forEach((player) => {
    if (player.position_category === "G") {
      guards.push(player);
    }
    if (player.position === "PG") {
      pointGuards.push(player);
    }
    if (player.position === "SG") {
      shootingGuards.push(player);
    }
    if (player.position_category === "F") {
      forwards.push(player);
    }
    if (player.position === "SF") {
      smallForwards.push(player);
    }
    if (player.position === "PF") {
      powerForwards.push(player);
    }
    if (player.position === "C") {
      centers.push(player);
    }
  });

  const guardsPoints = guards.sort((a, b) => b.fantasyPoints - a.fantasyPoints);
  const pointGuardsPoints = pointGuards.sort(
    (a, b) => b.fantasyPoints - a.fantasyPoints
  );
  const shootingGuardsPoints = shootingGuards.sort(
    (a, b) => b.fantasyPoints - a.fantasyPoints
  );
  const forwardsPoints = forwards.sort(
    (a, b) => b.fantasyPoints - a.fantasyPoints
  );
  const smallForwardsPoints = smallForwards.sort(
    (a, b) => b.fantasyPoints - a.fantasyPoints
  );
  const powerForwardsPoints = powerForwards.sort(
    (a, b) => b.fantasyPoints - a.fantasyPoints
  );
  const centersPoints = centers.sort(
    (a, b) => b.fantasyPoints - a.fantasyPoints
  );

  let preLineup = [];

  const optimizeMyLineup = () => {
    if (lineupForm.guards > 0) {
      const topGuardsPoints = guardsPoints.slice(0, lineupForm.guards);
      // for (x = 0; x < topGuardsPoints.length; x++) {
      //   for (y = 0; y < guards.length; y++) {
      //     if (topGuardsPoints[x] === guards[y].fantasyPoints) {
      //       preLineup.push(guards[y])
      //     }
      //   }
      // }
      preLineup = preLineup.concat(topGuardsPoints);
      console.log("top g points", topGuardsPoints);
      console.log("prelineup", preLineup);
    }
    if (lineupForm.pointGuards > 0) {
      const topPointGuardsPoints = pointGuardsPoints.slice(
        0,
        lineupForm.pointGuards
      );
      preLineup = preLineup.concat(topPointGuardsPoints);
    }
    if (lineupForm.shootingGuards > 0) {
      const topShootingGuardsPoints = shootingGuardsPoints.slice(
        0,
        lineupForm.shootingGuards
      );
      preLineup = preLineup.concat(topShootingGuardsPoints);
    }
    if (lineupForm.forwards > 0) {
      const topForwardsPoints = forwardsPoints.slice(0, lineupForm.forwards);
      preLineup = preLineup.concat(topForwardsPoints);
    }
    if (lineupForm.smallForwards > 0) {
      const topSmallForwardsPoints = smallForwardsPoints.slice(
        0,
        lineupForm.smallForwards
      );
      preLineup = preLineup.concat(topSmallForwardsPoints);
    }
    if (lineupForm.powerForwards > 0) {
      const topPowerForwardsPoints = powerForwardsPoints.slice(
        0,
        lineupForm.powerForwards
      );
      preLineup = preLineup.concat(topPowerForwardsPoints);
    }
    if (lineupForm.centers > 0) {
      const topCentersPoints = centersPoints.slice(0, lineupForm.centers);
      preLineup = preLineup.concat(topCentersPoints);
    }
    return preLineup;
  };

  const handleLineupFormChange = (e) => {
    setLineupForm({
      ...lineupForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLineupFormSubmit = (e) => {
    e.preventDefault();
    setFormShowing((formShowing) => !formShowing);
    setLineupShowing((lineupShowing) => !lineupShowing);
    setOptimizedLineup(optimizeMyLineup());
  };

  // let removeColumn = {
  //   title: "Remove",
  //   field: "",
  //   sorting: false,
  //   render: rowData => <Button color="primary" variant="contained" onClick={() => removePlayer(rowData.id, rowData.api_id)}>Remove</Button>
  // }

  midColumns.forEach((col) => {
    columns.push(col);
  });

  columns.push(fantasyColumn);

  // columns.push(removeColumn)

  const inputProps = {
    min: 0,
  };

  console.log("Best Lineup:", optimizedLineup);
  console.log("guard points:", guardsPoints);
  // console.log("Best Lineup:", optimizedLineup)

  return (
    <>
      {formShowing ? (
        <Grid container justify="center" alignItems="center" direction="column">
          <Typography
            variant="h3"
            color="primary"
            style={{ marginBottom: "30px" }}
          >
            Set Lineup Layout
          </Typography>
          <form onSubmit={handleLineupFormSubmit}>
            <Grid container justify="center">
              <Grid container item xs={5} spacing={3} direction="row">
                <Grid item>
                  <InputLabel>Guards</InputLabel>
                  <Input
                    name="guards"
                    variant="outlined"
                    type="number"
                    inputProps={inputProps}
                    onChange={handleLineupFormChange}
                    value={lineupForm.guards}
                  />
                </Grid>
                <Grid item>
                  <InputLabel>Point Guards</InputLabel>
                  <Input
                    name="pointGuards"
                    variant="outlined"
                    type="number"
                    inputProps={inputProps}
                    onChange={handleLineupFormChange}
                    value={lineupForm.pointGuards}
                  />
                </Grid>
                <Grid item>
                  <InputLabel>Shooting Guards</InputLabel>
                  <Input
                    name="shootingGuards"
                    variant="outlined"
                    type="number"
                    inputProps={inputProps}
                    onChange={handleLineupFormChange}
                    value={lineupForm.shootingGuards}
                  />
                </Grid>
                <Grid item>
                  <InputLabel>Forwards</InputLabel>
                  <Input
                    name="forwards"
                    variant="outlined"
                    type="number"
                    inputProps={inputProps}
                    onChange={handleLineupFormChange}
                    value={lineupForm.forwards}
                  />
                </Grid>
                <Grid item>
                  <InputLabel>Small Forwards</InputLabel>
                  <Input
                    name="smallForwards"
                    variant="outlined"
                    type="number"
                    inputProps={inputProps}
                    onChange={handleLineupFormChange}
                    value={lineupForm.smallForwards}
                  />
                </Grid>
                <Grid item>
                  <InputLabel>Power Forwards</InputLabel>
                  <Input
                    name="powerForwards"
                    variant="outlined"
                    type="number"
                    inputProps={inputProps}
                    onChange={handleLineupFormChange}
                    value={lineupForm.powerForwards}
                  />
                </Grid>
                <Grid item>
                  <InputLabel>Centers</InputLabel>
                  <Input
                    name="centers"
                    variant="outlined"
                    type="number"
                    inputProps={inputProps}
                    onChange={handleLineupFormChange}
                    value={lineupForm.centers}
                  />
                </Grid>
              </Grid>
              <Grid container justify="center" item>
                <Button
                  style={{ marginTop: "20px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Optimize Lineup
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : null}
      {lineupShowing ? (
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid
            container
            item
            xs={12}
            justify="flex-start"
            style={{ marginBottom: "15px" }}
          >
            <Grid item>
              <Typography variant="h3" color="primary">
                {`Optimized ${
                  selectedRoster.name
                } Lineup for ${new Date().toLocaleDateString()}`}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">
                {selectedRoster.league} | {selectedRoster.season}
              </Typography>
              <Typography variant="h6">
                <i>"{selectedRoster.slogan}"</i>
              </Typography>
              <Link to={`/rosters/${selectedRoster.id}/`}>
                <Button variant="contained" color="primary">
                  Back To Roster
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <MaterialTable
              title={`*Players with no games tonight won't show up in prediction table`}
              data={optimizedLineup}
              columns={columns}
              style={{ width: "100%" }}
              options={{
                sorting: true,
                maxBodyHeight: "500px",
                pageSize: 10,
                headerStyle: {
                  backgroundColor: "#ff9800",
                  color: "#FFF",
                },
              }}
            />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default LineupOptimizer;
