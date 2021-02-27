import MaterialTable from "material-table";
// import players from '../players'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {useEffect, useState} from 'react'

const PlayersTable = () => {

  const [players, setPlayers] = useState([])

    useEffect(() => {
      fetch(`http://localhost:4000/players`)
        .then(resp => resp.json())
        .then(playerData => {
          setPlayers(playerData)
        })
    }, [])


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
          render: rowData => Math.round(rowData.Rebounds / rowData.Games)
        },
        {
            title: "Assists Per Game",
            field: `Assists`,
            render: rowData => Math.round(rowData.Assists / rowData.Games)
        },
        {
          title: "Steals Per Game",
          field: "Steals",
          render: rowData => Math.round(rowData.Steals / rowData.Games)
        },
        {
          title: "Blocks Per Game",
          field: "BlockedShots",
          render: rowData => Math.round(rowData.BlockedShots / rowData.Games)
        },
        {
          title: "Turnovers Per Game",
          field: "Turnovers",
          render: rowData => Math.round(rowData.Turnovers / rowData.Games)
        },
        {
          title: "Fouls Per Game",
          field: "PersonalFouls",
          render: rowData => Math.round(rowData.PersonalFouls / rowData.Games)
        }
      ];

      // const allPlayers = players.map((player) => {
      //   return 
      // })


    return (
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item xs={12} >
            
            <MaterialTable title="Players" data={players} columns={columns} options={{ sorting: true }} />
        
        </Grid>
      </Grid>
    )
}

export default PlayersTable;