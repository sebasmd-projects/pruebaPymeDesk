import { Toolbar, AppBar, Typography, Container } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

import { UserMenu } from './userMenu';
import { LgMainMenu } from './lgMainMenu';
import { SmMainMenu } from './smMainMenu';


const Navbar = () => {

    return (
        <AppBar position="static" sx={{ bgcolor: 'grey' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'white', textDecoration: 'none', }}>
                        PymeDesk
                    </Typography>

                    <SmMainMenu />

                    <HomeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography variant="h5" noWrap component="a" href="" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
                        PD
                    </Typography>

                    <LgMainMenu />

                    <UserMenu />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
