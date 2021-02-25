import MaterialTable from "material-table";
import players from '../players'
import { Link } from 'react-router-dom'

const PlayersTable = () => {

    const columns = [
        {
          title: "Name",
          field: "LastName",
          render: rowData => <Link to="/">{rowData.LastName}</Link>
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
          title: "Points",
          field: "Points",
        },
        {
            title: "Assists",
            field: `Assists`,
            render: rowData => rowData["Assists"] + 5
        }
      ];


    return (
        <div className="w3-container w3-display-container w3-card-4 w3-display-middle">
          <br></br>
          <MaterialTable className="w3-display-middle"  title="Players" data={players} columns={columns} options={{ sorting: true }} />
          <br></br>
        </div>

    )
}

export default PlayersTable;