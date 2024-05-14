import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState(
        {
            username: '',
            img: '',
            level: null,
            owned_units: [],
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchUser = await fetch('http://localhost:3000/users');
                
                if (!fetchUser.ok) {
                    throw new Error('Issue with network response');
                }

                const userData = await fetchUser.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    return useContext(UserContext);
}