import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavBarElementListProps } from './Interface';
import './Navbar.css'

const Navbar = (navBarElements: NavBarElementListProps) => {

    return (
        <AppBar component="nav" className="appBarMain">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 2, display: { xs: 'block'} }}
                >
                    Apside
                </Typography>
                <Box sx={{ display: { xs: 'block' } }}>
                    {navBarElements.navBarElements.map((item, index) => (
                        <Link className='nav-bar-links' key={index} to={item.url}>{item.name}</Link>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar