import MaterialTable from "material-table";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import { useEffect } from 'react'

const RosterDisplay = ({selectedRoster, playerPredictions}) => {
  console.log(selectedRoster)


  if (!selectedRoster || !selectedRoster.score_setting) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  // roster.players
  // playerPredictions
  // if rosterplayer.api_id === playerPredictions[player].api_id
  // 
  const playerIds = selectedRoster.players.map((player) => {
    return player.api_id
  })

  const filteredPlayerPredictions = playerPredictions.filter((player) => {
    return playerIds.includes(player.api_id)
  })

  
  

  const settings = Object.keys(selectedRoster.score_setting)

  // const settings = []

  let preColumns = [
    {
      title: "Name",
      field: "name",
      render: rowData => <Link to="/">{`${rowData.name}`}</Link>
    },
    {
      title: "Team",
      field: "team"
    },
    {
      title: "Position",
      field: "position",
    },
  ]

  let midColumns = settings.map((setting) => {

    if ( selectedRoster.score_setting[setting] > 0 ) {
        if (setting === 'games_played') {
          return {
            title: "Games",
            field: "Games",
          }
        } else if (setting === 'field_goals_attempted') {
          return {
            title: "FG Attempted",
            field: "FieldGoalsAttempted"
          }
        } else if (setting === 'field_goals_made') {
          return {
            title: "FG Made",
            field: "FieldGoalsMade",
          }
        } else if (setting === 'threes_attempted') {
          return {
            title: "3-Pointers Attempted",
            field: "ThreePointersAttempted"
          }
        } else if (setting === 'threes_made') {
          return {
            title: "3-Pointers Made",
            field: "ThreePointersMade"
          }
        } else if (setting === 'free_throws_attempted') {
          return {
            title: "Free Throws Attempted",
            field: "FreeThrowsAttempted"
          }
        } else if (setting === 'free_throws_made') {
          return {
            title: "Free Throws Made",
            field: "FreeThrowsMade"
          }
        } else if (setting === 'points') {
          return {
            title: "Points", 
            field: "Points",
          }
        } else if (setting === 'rebounds') {
          return {
            title: "Rebounds", 
            field: "Rebounds",
          }
        } else if (setting === 'assists') {
          return {
            title: "Assists", 
            field: "Assists",
          }
        } else if (setting === 'steals') {
          return {
            title: "Steals", 
            field: "Steals",
          }
        } else if (setting === 'blocks') {
          return {
            title: "Blocks", 
            field: "BlockedShots",
          }
        } else if (setting === "turnovers") {
          return {
            title: "Turnovers",
            field: "Turnovers"
          }
        }
      }
  })

  let fantasyColumn = {
    title: "Fantasy Points",
    field: "",
    render: rowData => {
      return Math.round((rowData.Games * selectedRoster.score_setting['games']) + (rowData.FieldGoalsAttempted * selectedRoster.score_setting['field_goals_attempted']) + (rowData.FieldGoalsMade * selectedRoster.score_setting['field_goals_made']) + (rowData.ThreePointersAttempted * selectedRoster.score_setting['threes_attempted']) + (rowData.ThreePointersMade * selectedRoster.score_setting['threes_made']) + (rowData.FreeThrowsAttempted * selectedRoster.score_setting['free_throws_attempted']) + (rowData.FreeThrowsMade * selectedRoster.score_setting['free_throws_made']) + (rowData.Points * selectedRoster.score_setting['points']) + (rowData.Rebounds * selectedRoster.score_setting['rebounds']) + (rowData.Assists * selectedRoster.score_setting['assists']) + (rowData.Steals * selectedRoster.score_setting['steals']) + (rowData.BlockedShots * selectedRoster.score_setting['blocks']) + (rowData.Turnovers * selectedRoster.score_setting['turnovers']))
    }
  
  }
  

  let firstColumnsMerge = [...preColumns, midColumns]

  const columns = [...firstColumnsMerge, fantasyColumn]



    // const columns = [
    //     {
    //       title: "Name",
    //       field: "LastName",
    //       render: rowData => <Link to="/">{`${rowData.FirstName} ${rowData.LastName}`}</Link>
    //     },
    //     {
    //       title: "Team",
    //       field: "Team"
    //     },
    //     {
    //       title: "Position",
    //       field: "Position",
    //     },
    //     {
    //       title: "Games",
    //       field: "Games",
    //     },
    //     {
    //       title: "Points Per Game",
    //       field: "Points",
    //       render: rowData => Math.round(rowData.Points / rowData.Games)
    //     },
    //     {
    //       title: "Rebounds Per Game",
    //       field: "Rebounds",
    //       render: rowData => Math.round(rowData.Rebounds / rowData.Games)
    //     },
    //     {
    //         title: "Assists Per Game",
    //         field: `Assists`,
    //         render: rowData => Math.round(rowData.Assists / rowData.Games)
    //     },
    //     {
    //       title: "Steals Per Game",
    //       field: "Steals",
    //       render: rowData => Math.round(rowData.Steals / rowData.Games)
    //     },
    //     {
    //       title: "Blocks Per Game",
    //       field: "BlockedShots",
    //       render: rowData => Math.round(rowData.BlockedShots / rowData.Games)
    //     },
    //     {
    //       title: "Turnovers Per Game",
    //       field: "Turnovers",
    //       render: rowData => Math.round(rowData.Turnovers / rowData.Games)
    //     },
    //     {
    //         title: "Remove from Roster",
    //         field: "",
    //         render: () => <Button>Remove</Button>
    //     }
    //   ];

   

    return (
        
        <Grid container justify="center" alignItems="center" direction="column">
            <Grid container item xs={10} justify="flex-end" direction="row">
                    <Grid item>
                        <Button variant="contained" color="primary">
                            Add Players
                        </Button>
                    </Grid>
            </Grid>
            <Grid item xs={8} >
                <Typography variant="h4">
                    Team 1
                    League 1
                    Season: 2021
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <MaterialTable title="Team 1" data={filteredPlayerPredictions} columns={columns} options={{ sorting: true }} />
            </Grid>
        </Grid>
        
    )
}

export default RosterDisplay;