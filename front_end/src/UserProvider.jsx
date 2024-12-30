import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userUnits, setUserUnits] = useState(null);
    const [isGuest, setIsGuest] = useState(false);
    const [user, setUser] = useState(
        {
            username: '',
            image: '',
            level: null,
            gems: null,
            gold: null,
            stamina: null,
        }
    );

    const handleLoggedInUser = async (loggedUserID, token) => {
        const fetchUser = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/user/${loggedUserID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        if(!fetchUser.ok) {
            throw new Error('Issue with network response');
        }

        const userData = await fetchUser.json();
        setUser(userData);
        
        const fetchUserUnits = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/viewUnits?user_id=${userData.id}`);
        if (!fetchUserUnits.ok) {
            throw new Error('Issue with network response');
        }
        const userUnitsData = await fetchUserUnits.json();
        console.log('UserUnits data:', userUnitsData);
        setUserUnits(userUnitsData);
        setIsLoggedIn(true);
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, user, handleLoggedInUser, userUnits, setUser, setIsLoggedIn, setUserUnits, isGuest, setIsGuest }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    return useContext(UserContext);
}