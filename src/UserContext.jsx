// UserContext.jsx
import { createContext, useState } from 'react';
import { useAuthentication, useUser } from './hooks/apiHooks.js';
import { useLocation, useNavigate } from 'react-router'

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { postLogin } = useAuthentication();
    const { getUserByToken } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    
    // login, logout and autologin functions are here instead of components
    const handleLogin = async (credentials) => {
        try {
            const login = await postLogin(credentials);
            localStorage.setItem("token", login.token);
            setUser(login.user);
            navigate('/');
        } catch (e) {
            console.log(e.message);
        }
    };
    
    const handleLogout = () => {
        try {
           localStorage.removeItem('token');
           setUser(null);
           navigate('/');

        } catch (e) {
            console.log(e.message);
        }
    };
    
    // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
    const handleAutoLogin = async () => {
        try {
            const getToken = localStorage.getItem('token');

            if (getToken) {
                const userResponse = await getUserByToken(getToken);
                setUser(userResponse.user);
                navigate(location.pathname);
            }

        } catch (e) {
            handleLogout();
            console.log(e.message);
        }
    };
           
    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};






export { UserProvider, UserContext };