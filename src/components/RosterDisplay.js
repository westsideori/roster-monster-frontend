import MaterialTable from "material-table";
import players from '../players'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography'

const RosterDisplay = () => {

    const columns = [
        {
          title: "Name",
          field: "LastName",
          render: rowData => <Link to="/">{`${rowData.FirstName} ${rowData.LastName}`}</Link>
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
            title: "Remove from Roster",
            field: "",
            render: () => <Button>Remove</Button>
        }
      ];


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
                <MaterialTable title="Team 1" data={players} columns={columns} options={{ sorting: true }} />
            </Grid>
        </Grid>
        
    )
}

export default RosterDisplay;