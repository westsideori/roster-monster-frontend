import MaterialTable from "material-table"
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Watchlist = ({players, userWatchlist, removePlayerFromWatchlist, currentUser}) => {

  const history = useHistory()

  const playerIds = userWatchlist.players.map((player) => {
    return player.api_id
  })

  const filteredPlayers = players.filter((player) => {
    return playerIds.includes(player.api_id)
  })

  const columns = [
    {
      title: "Name",
      field: "name",
      render: rowData => <Link to={`/players/${rowData.id}`}>{`${rowData.name}`}</Link>
    },
    {
      title: "Team",
      field: "team"
    },
    {
      title: "Position",
      field: "position",
    },
    {
      title: "Games",
      field: "Games",
    },
    {
      title: "Points Per Game",
      field: "Points",
      customSort: (a, b) => (a.Points/a.Games) - (b.Points/b.Games),
      render: rowData => {

        if (rowData.Points) {
          return Math.round(rowData.Points / rowData.Games)
        } else {
          return 0
        }
        
      }
    },
    {
      title: "Rebounds Per Game",
      field: "Rebounds",
      customSort: (a, b) => (a.Rebounds/a.Games) - (b.Rebounds/b.Games),
      render: rowData => {

        if (rowData.Rebounds) {
          return Math.round(rowData.Rebounds / rowData.Games)
        } else {
          return 0
        }
        
      }
    },
    {
      title: "Assists Per Game",
      field: `Assists`,
      customSort: (a, b) => (a.Assists/a.Games) - (b.Assists/b.Games),
      render: rowData => {

        if (rowData.Assists) {
          return Math.round(rowData.Assists / rowData.Games)
        } else {
          return 0
        }
        
      }
    },
    {
      title: "Steals Per Game",
      field: "Steals",
      customSort: (a, b) => (a.Steals/a.Games) - (b.Steals/b.Games),
      render: rowData => {

        if (rowData.Steals) {
          return Math.round(rowData.Steals / rowData.Games)
        } else {
          return 0
        }
        
      }
    },
    {
      title: "Blocks Per Game",
      field: "BlockedShots",
      customSort: (a, b) => (a.BlockedShots/a.Games) - (b.BlockedShots/b.Games),
      render: rowData => {

        if (rowData.BlockedShots) {
          return Math.round(rowData.BlockedShots / rowData.Games)
        } else {
          return 0
        }
        
      }
    },
    {
      title: "Turnovers Per Game",
      field: "Turnovers",
      customSort: (a, b) => (a.Turnovers/a.Games) - (b.Turnovers/b.Games),
      render: rowData => {

        if (rowData.Turnovers) {
          return Math.round(rowData.Turnovers / rowData.Games)
        } else {
          return 0
        }
        
      }
    },
    {
      title: "Fouls Per Game",
      field: "PersonalFouls",
      customSort: (a, b) => (a.PersonalFouls/a.Games) - (b.PersonalFouls/b.Games),
      render: rowData => {

        if (rowData.PersonalFouls) {
          return Math.round(rowData.PersonalFouls / rowData.Games)
        } else {
          return 0
        }
        
      }
    },
    {
      title: "Remove",
      field: "",
      sorting: false,
      render: rowData => {
          return <Button onClick={() => removePlayerFromWatchlist(rowData.id)} variant="contained" >Remove</Button>
      }
    }
  ];

  if (!currentUser) {
    return (
      <div>
        Loading...
      </div>
    )
  }


    return (
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item xs={12} >
            
            <MaterialTable title="Players" data={filteredPlayers} columns={columns} options={{ sorting: true }} />
        
        </Grid>
      </Grid>
    )
}

export default Watchlist;