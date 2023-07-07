import React, { useState } from 'react'
import Link from 'next/link';
import { Box, IconButton, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import ActiveLink from '@/components/utils/active_link/activeLink';
import { ActiveUser } from '@/components/utils/active_link/activeUser';

import { list_pages } from './pagesList';

export const SmMainMenu = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const activeUser = ActiveUser()

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' }
                }}
            >
                {list_pages.map((page) => (
                    <Link key={page.label} onClick={handleCloseNavMenu} href={page.route}>
                        <ActiveLink href={page.route} text={page.label} />
                    </Link>
                ))}
                {!activeUser &&
                    <Link key="Iniciar Sesión" onClick={handleCloseNavMenu} href="/accounts/login/">
                        <ActiveLink
                            key="Iniciar Sesión"
                            href="/accounts/login/"
                            text="Iniciar Sesión"
                        />
                    </Link>
                }
            </Menu>
        </Box>
    )
}
