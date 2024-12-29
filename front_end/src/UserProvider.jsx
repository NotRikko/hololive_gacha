import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userUnits, setUserUnits] = useState([]);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchUser = await fetch('http://localhost:8080/api/users/user?username=Rikko');
                
                if (!fetchUser.ok) {
                    throw new Error('Issue with network response');
                }

                const userData = await fetchUser.json();
                console.log(userData);
                setUser(userData);

                const fetchUserUnits = await fetch(`http://localhost:8080/api/users/viewUnits?user_id=${userData.id}`);
                if (!fetchUserUnits.ok) {
                    throw new Error('Issue with network response');
                }
                const userUnitsData = await fetchUserUnits.json();
                console.log('UserUnits data:', userUnitsData);
                setUserUnits(userUnitsData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, user, userUnits, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    return useContext(UserContext);
}