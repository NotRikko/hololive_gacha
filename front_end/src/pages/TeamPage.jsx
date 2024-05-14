import { useUser } from "../UserProvider";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Style from './TeamPage.module.css';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

function TeamPage () {
    const { user, isLoggedIn } = useUser();
    const [units, setUnits] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIn ? null : navigate('/');
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (user?.owned_units) {
            setUnits(user.owned_units);
        } else {
            setUnits([]); 
        }
    }, [user]);

    const handleUnits = (rarity) => {
        setSelectedFilter(rarity);
        let filteredUnits = user.owned_units;
        if (rarity !== 'All') {
            filteredUnits = filteredUnits.filter(unit => unit.unit.rarity === rarity);
        }
        setUnits(filteredUnits);
    };

    return (
        <div id={Style.main}>
            <Link to='/main' style={{margin: '1.3%'}}><ExitToAppRoundedIcon style={{color:'white', fontSize:'3.4rem'}}/></Link>
            <div id={Style.filter_container}>
                <button onClick={() => handleUnits('All')} className={selectedFilter === 'All' ? Style.selected : ''}>All</button>
                <button onClick={() => handleUnits('Common')} className={selectedFilter === 'Common' ? Style.selected : ''}>Common</button>
                <button onClick={() => handleUnits('Epic')} className={selectedFilter === 'Epic' ? Style.selected : ''}>Epic</button>
                <button onClick={() => handleUnits('Legendary')} className={selectedFilter === 'Legendary' ? Style.selected : ''}>Legendary</button>
            </div>
            <div id={Style.units_container}>
            {units.map((unit, index) => (
                <div key={index}>
                <img src={unit.unit.img} alt={`Unit ${index}`} />
                </div>
            ))}
            </div>
        </div>
    )
}

export default TeamPage