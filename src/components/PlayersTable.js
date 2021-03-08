import MaterialTable from "material-table";
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'


const PlayersTable = ({players, currentUser, userWatchlist, handleWatchlistChanges}) => {

    const columns = [
        {
          title: "",
          field: "",
          sorting: false,
          render: rowData => <img src={rowData.image} alt={rowData.name} style={{height: "50px", widht: "50px"}} />
        },
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
        }
    ];

    const addPlayerToWatchlist = (rowId) => {
      const token = localStorage.getItem("token")
      if (token) {
        fetch(`http://localhost:3000/watchlist_players/`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            watchlist_id: userWatchlist.id,
            player_id: rowId
          })
        })
          .then(resp => resp.json())
          .then((data) => {
            handleWatchlistChanges()
          })
      }
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
          .then(() => handleWatchlistChanges())
      }
    }

    const isPlayerInWatchlist = (id) => {
      
        const foundPlayer = userWatchlist.watchlist_players.filter((player) => {
          return player.player_id === id
        })
        
        if (foundPlayer.length === 1) {
          return true
        } else {
          return false
        }
    }

    let watchlistColumn = {
      title: "Watchlist",
      field: "",
      sorting: false,
      render: rowData => {
        
        if (isPlayerInWatchlist(rowData.id)) {
          return <Button onClick={() => removePlayerFromWatchlist(rowData.id)} variant="contained" color="primary">Remove</Button>
        } else {
          return <Button onClick={() => addPlayerToWatchlist(rowData.id)} variant="contained" color="primary">Add</Button>
        }
      }
    }

    // const columnsWithUser = [...columns]

    if (currentUser) {
      columns.push(watchlistColumn)
    }


    return (
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item xs={12} >
      
          <MaterialTable title={`Player Stats as of ${new Date().toLocaleDateString()}`} data={players} columns={columns} options={{ sorting: true, maxBodyHeight: '500px', pageSize: 10 }} />

        </Grid>
      </Grid>
    )
}

export default PlayersTable;