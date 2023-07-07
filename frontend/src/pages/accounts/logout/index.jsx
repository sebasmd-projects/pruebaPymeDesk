import { useRouter } from 'next/router';
import LoginPage from '../login';
import { useEffect } from 'react';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        if (router.pathname === '/accounts/logout') {
            handleLogout();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        router.push('/accounts/login');
    };

    return <LoginPage />;
}