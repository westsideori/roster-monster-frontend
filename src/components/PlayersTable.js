import MaterialTable from "material-table";
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'


const PlayersTable = ({players, currentUser, removePlayerFromWatchlist}) => {
  console.log(currentUser)

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
        }
    ];

    const handleAddToWatchlist = (playerId) => {
      const token = localStorage.getItem("token")
      if (token) {
        fetch(`http://localhost:3000/watchlist_players/`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            watchlist_id: currentUser.watchlist.id,
            player_id: playerId
          })
        })
          .then(resp => resp.json())
          .then((data) => {
            console.log(data)
          })
      }
      

    }

    const isPlayerInWatchlist = (id) => {
      
      if (currentUser && currentUser.watchlist.watchlist_players) {
        
        const array = currentUser.watchlist.watchlist_players.filter((player) => {
          return player.player_id === id
        })
        
        if (array.length === 1) {
          return true
        } else {
          return false
        }
      
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
          return <Button onClick={() => removePlayerFromWatchlist(rowData.id)} variant="contained" >Remove</Button>
        } else {
          return <Button onClick={() => handleAddToWatchlist(rowData.id)} variant="contained" >Add</Button>
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
      
          <MaterialTable title="Players" data={players} columns={columns} options={{ sorting: true }} />

        </Grid>
        {/* {currentUser ? (
          <Grid item xs={12} >
      
            <MaterialTable title="Players" data={players} columns={columns} options={{ sorting: true }} />
      
          </Grid>
        ) : (
          <Grid item xs={12} >
      
            <MaterialTable title="Players" data={players} columns={columns} options={{ sorting: true }} />
      
          </Grid>
        )} */}
      </Grid>
    )
}

export default PlayersTable;