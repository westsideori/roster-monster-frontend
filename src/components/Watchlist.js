import MaterialTable from "material-table";
// import players from '../players'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const Watchlist = ({players}) => {

    const columns = [
        {
          title: "Name",
          field: "LastName",
          render: rowData => <Link to={`/players/${rowData.id}`}>{`${rowData.FirstName} ${rowData.LastName}`}</Link>
        },
        {
          title: "Team",
          field: "Team"
        },
        {
          title: "Position",
          field: "Position",
        },
        {
          title: "Games",
          field: "Games",
        },
        {
          title: "Points Per Game",
          field: "Points",
          render: rowData => Math.round(rowData.Points / rowData.Games)
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
            title: "Remove from Watchlist",
            field: "",
            render: () => <Button>Remove</Button>
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

export default Watchlist;