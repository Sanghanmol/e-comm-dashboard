import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                navigate('/login');
            } catch (error) {
                console.error('Logout error:', error);
            }
        };
        performLogout();
    }, [navigate]);
};

export default Logout;
