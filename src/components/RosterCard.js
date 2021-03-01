import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import {Link} from 'react-router-dom'

const RosterCard = ({roster, currentUser}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    

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
                            <MenuItem onClick={handleClose}>
                                Edit Team Details
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
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