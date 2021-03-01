import MaterialTable from "material-table";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const RosterDisplay = ({playerPredictions}) => {
  
  
  const {id} = useParams()
  const history = useHistory()

  const [selectedRoster, setSelectedRoster] = useState([])
  const [playerIds, setPlayerIds] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/rosters/${id}`)
      .then(r => r.json())
      .then((roster) => {
        setSelectedRoster(roster)
        let idCollection = roster.players.map((player) => {
          return player.api_id
        })
        setPlayerIds(idCollection)
      })
  }, [id])

  const removePlayer = (rowId, apiId) => {
    let playerToDelete = selectedRoster.roster_players.filter((rp) => {
      return rp.player_id === rowId && rp.roster_id === selectedRoster.id
    })

    const [player] = playerToDelete

    fetch(`http://localhost:3000/roster_players/${player.id}`, {
      method: 'DELETE'
    })
      .then(handleRemove(apiId))
  }

  const handleRemove = (apiId) => {
    let filteredIds = playerIds.filter((id) => {
      return id !== apiId
    })
    setPlayerIds(filteredIds)
  }

  const handleAdd = (e) => {
    history.push(`/rosters/${id}/players/add_new`)
  }


  if (!selectedRoster || !selectedRoster.score_setting) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  console.log("scores", selectedRoster.score_setting)

  
  console.log("Player Ids", playerIds)

  const filteredPlayerPredictions = playerPredictions.filter((player) => {
    return playerIds.includes(player.api_id)
  })

  console.log("Player Predicts", filteredPlayerPredictions)
  

  const preSettings = Object.keys(selectedRoster.score_setting)

  const settings = preSettings.filter((setting) => {
    return setting !== "roster_id" && setting !== "id" && setting !== "created_at" && setting !== "updated_at"
  })
  
  console.log('settings', settings)

  // const settings = []

  const columns = [
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

  let preMidColumns = settings.map((setting) => {

    if ( selectedRoster.score_setting[setting] !== 0 ) {
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
      } else {
        return null
      }
  })

  const midColumns = preMidColumns.filter((column) => {
    return column
  })

  console.log("mid", midColumns)

  let fantasyColumn = {
    title: "Fantasy Points",
    field: "",
    customSort: (a, b) => {
      return (((a.Games * selectedRoster.score_setting['games_played']) + (a.FieldGoalsAttempted * selectedRoster.score_setting['field_goals_attempted']) + (a.FieldGoalsMade * selectedRoster.score_setting['field_goals_made']) + (a.ThreePointersAttempted * selectedRoster.score_setting['threes_attempted']) + (a.ThreePointersMade * selectedRoster.score_setting['threes_made']) + (a.FreeThrowsAttempted * selectedRoster.score_setting['free_throws_attempted']) + (a.FreeThrowsMade * selectedRoster.score_setting['free_throws_made']) + (a.Points * selectedRoster.score_setting['points']) + (a.Rebounds * selectedRoster.score_setting['rebounds']) + (a.Assists * selectedRoster.score_setting['assists']) + (a.Steals * selectedRoster.score_setting['steals']) + (a.BlockedShots * selectedRoster.score_setting['blocks']) + (a.Turnovers * selectedRoster.score_setting['turnovers'])) - ((b.Games * selectedRoster.score_setting['games_played']) + (b.FieldGoalsAttempted * selectedRoster.score_setting['field_goals_attempted']) + (b.FieldGoalsMade * selectedRoster.score_setting['field_goals_made']) + (b.ThreePointersAttempted * selectedRoster.score_setting['threes_attempted']) + (b.ThreePointersMade * selectedRoster.score_setting['threes_made']) + (b.FreeThrowsAttempted * selectedRoster.score_setting['free_throws_attempted']) + (b.FreeThrowsMade * selectedRoster.score_setting['free_throws_made']) + (b.Points * selectedRoster.score_setting['points']) + (b.Rebounds * selectedRoster.score_setting['rebounds']) + (b.Assists * selectedRoster.score_setting['assists']) + (b.Steals * selectedRoster.score_setting['steals']) + (b.BlockedShots * selectedRoster.score_setting['blocks']) + (b.Turnovers * selectedRoster.score_setting['turnovers'])))
    },
    render: rowData => {
      return Math.round((rowData.Games * selectedRoster.score_setting['games_played']) + (rowData.FieldGoalsAttempted * selectedRoster.score_setting['field_goals_attempted']) + (rowData.FieldGoalsMade * selectedRoster.score_setting['field_goals_made']) + (rowData.ThreePointersAttempted * selectedRoster.score_setting['threes_attempted']) + (rowData.ThreePointersMade * selectedRoster.score_setting['threes_made']) + (rowData.FreeThrowsAttempted * selectedRoster.score_setting['free_throws_attempted']) + (rowData.FreeThrowsMade * selectedRoster.score_setting['free_throws_made']) + (rowData.Points * selectedRoster.score_setting['points']) + (rowData.Rebounds * selectedRoster.score_setting['rebounds']) + (rowData.Assists * selectedRoster.score_setting['assists']) + (rowData.Steals * selectedRoster.score_setting['steals']) + (rowData.BlockedShots * selectedRoster.score_setting['blocks']) + (rowData.Turnovers * selectedRoster.score_setting['turnovers']))
    }
  
  }

  let removeColumn = {
    title: "Remove",
    field: "",
    sorting: false,
    render: rowData => <Button color="primary" variant="contained" onClick={() => removePlayer(rowData.id, rowData.api_id)}>Remove</Button> 
  }
  

  midColumns.forEach((col) => {
    columns.push(col)
  })

  columns.push(fantasyColumn)

  columns.push(removeColumn)
  

   

    return (
        
        <Grid container justify="center" alignItems="center" direction="column">
            <Grid container item xs={10} justify="flex-end" direction="row">
                    <Grid item>
                        <Button onClick={handleAdd} variant="contained" color="primary">
                            Add Players
                        </Button>
                    </Grid>
            </Grid>
            <Grid item xs={8} >
                <Typography variant="h4">
                    {selectedRoster.name}
                    {selectedRoster.league}
                    {selectedRoster.season}
                    {selectedRoster.slogan}
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <MaterialTable title={selectedRoster.name} data={filteredPlayerPredictions} columns={columns} options={{ sorting: true }} />
            </Grid>
        </Grid>
        
    )
}

export default RosterDisplay;