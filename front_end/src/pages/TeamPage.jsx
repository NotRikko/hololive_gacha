import { useUser } from "../UserProvider";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Style from './TeamPage.module.css';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import UnitDetail from '../components/UnitDetail';


function TeamPage () {
    const { userUnits, isLoggedIn } = useUser();
    const [units, setUnits] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [viewingUnitState, setViewingUnitState] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIn ? null : navigate('/');
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (!userUnits) {
            setUnits([]);
            return;
        }
        setUnits(userUnits);
    }, [userUnits]);

    const handleUnits = (rarity) => {
        setSelectedFilter(rarity);
        let filteredUnits = userUnits;
        if (rarity !== 'All') {
            filteredUnits = filteredUnits.filter(unit => unit.rarity === rarity);
        }
        setUnits(filteredUnits);
    };

    const handleViewingUnitState = (unit) => {
        setViewingUnitState(true);
        setSelectedUnit(unit);
    };

    const handleCloseUnitDetail = () => {
        setViewingUnitState(false);
        setSelectedUnit(null); 
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
                {userUnits ? units.map((unit, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleViewingUnitState(unit)}
                    >
                    <img src={unit.image} alt={`Unit ${index}`} />
                    </div>
                )) : null}
            </div>
            <UnitDetail 
            selectedUnit={selectedUnit}
            viewingUnitState={viewingUnitState} 
            onClose={handleCloseUnitDetail}
            />
        </div>
    )
}

export default TeamPage