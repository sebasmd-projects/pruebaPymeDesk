import { useState } from 'react';
import Link from 'next/link';
import { Box, IconButton, Menu, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ActiveUser } from '@/components/utils/active_link/activeUser';


import ActiveLink from '@/components/utils/active_link/activeLink';

export const UserMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const activeUser = ActiveUser()

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Opciones">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <AccountCircleIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {activeUser ? (
                        [
                            <Typography sx={{m:2}}>{localStorage.getItem('first_name')} {localStorage.getItem('last_name')}</Typography>,
                            <Link
                                key="account-link"
                                href={`/clients/${localStorage.getItem('user_id')}`}
                                onClick={handleCloseUserMenu}
                            >
                                <ActiveLink text="Cuenta" />
                            </Link>,
                            <Link
                                key="logout-link"
                                href="/accounts/logout"
                                onClick={handleCloseUserMenu}
                            >
                                <ActiveLink text="Cerrar sesión" />
                            </Link>
                        ]
                    ) : (
                        <Link href="/accounts/login" onClick={handleCloseUserMenu}>
                            <ActiveLink text="Iniciar sesión" />
                        </Link>
                    )}
                </Menu>
            </Box>
        </>
    )
}
