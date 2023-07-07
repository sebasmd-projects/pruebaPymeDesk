import { useEffect, useState } from 'react';

export const ActiveUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(accessToken !== null);
    }, []);

    return isLoggedIn
}
