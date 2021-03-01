import Grid from '@material-ui/core/Grid'
import MaterialTable from "material-table";
// import players from '../players'
import { Typography } from '@material-ui/core';


const PlayerDisplay = () => {
    const columns = [
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
      ];

    return (
        
        <Grid container justify="flex-start"  alignItems="center" spacing={3} >
            
            <Grid container item xs={6} justify="flex-end" >
                <Grid item>
                    <img src={players[0].PhotoUrl}/>
                </Grid>
            </Grid>
            <Grid container item xs={3} justify="center">
                <Grid item xs={12}>
                    
                        <Typography variant="h3">
                            {players[0].LastName}
                        </Typography>
                        <Typography variant="h5">
                            {players[0].Team}
                        </Typography>
                        <Typography variant="h5">
                            {players[0].Position}
                        </Typography>
                    
                </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center" direction="column">
                <MaterialTable title="" data={players.slice(0,1)} columns={columns} options={{ sorting: true, search: false }} />
            </Grid> 
            
        </Grid>
    )
}

export default PlayerDisplay;