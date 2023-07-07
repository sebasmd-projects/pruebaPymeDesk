import Link from 'next/link';

import { useMediaQuery } from '@mui/material';

import ActiveLink from '@/components/utils/active_link/activeLink';

import { list_pages } from './pagesList';

export const LgMainMenu = () => {
    const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            {isScreenSmall ? null : (
                list_pages.map((page) => (
                    <Link key={page.route} href={page.route}>
                        <ActiveLink
                            key={page.label}
                            href={page.route}
                            text={page.label}
                            onClick={handleCloseNavMenu}
                        />
                    </Link>
                ))
            )}
        </>
    )
}
