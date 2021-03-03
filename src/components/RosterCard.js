import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

const RosterCard = ({roster, handleDeleteRoster}) => {

    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {

        setAnchorEl(null);
    };

    const handleDeleteClick = (id) => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:3000/rosters/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            })
                .then((data) => {
                    handleClose()
                    handleDeleteRoster(id)
                    history.push('/rosters')
                })
        }
    };

    const handleEdit = () => {
        history.push(`/rosters/${roster.id}/edit`)
    }

    

    return (
        
            <Card>
                    <CardContent>
                        <IconButton onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleEdit}>
                                Edit Team Details
                            </MenuItem>
                            <MenuItem onClick={() => handleDeleteClick(roster.id)}>
                                Delete
                            </MenuItem>
                        </Menu>
                    <Link to={`/rosters/${roster.id}`}>
                        <Typography variant="h5" component="h2">
                            {roster.name}
                        </Typography>
                        <Typography color="textSecondary">
                            {roster.season}
                        </Typography>
                        <Typography  color="textSecondary" gutterBottom>
                            {roster.league}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {roster.slogan}
                        </Typography>
                    </Link>
                    </CardContent>
                    
                </Card>
        
    )
}

export default RosterCard;