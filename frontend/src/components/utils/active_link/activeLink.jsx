import { Button, MenuItem } from '@mui/material';
import { usePathname } from 'next/navigation';
import styles from "./activeLink.module.css";

export default function ActiveLink({ href, text }) {
    const path = usePathname();
    const isActive = path === href;

    return (
        <MenuItem
            className={`${isActive ? styles.active : ""} ${isActive ? styles.disabled : ""}`}
            aria-disabled={isActive}>
            <Button sx={{ color: 'black' }}>{text}</Button>
        </MenuItem>
    );
};