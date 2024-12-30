import Style from './Gacha.module.css';
import Gem from '../assets/gem.png';
import GachaAnimation from '../assets/gacha_animation.gif';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AllPulls from '../components/AllPulls';
import Pull from '../components/Pull';
import Banner from '../components/Banner';
import Nerissa from '../assets/Nerissa_Plush.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from "../UserProvider";

function Gacha () {
    const [banners, setBanners] = useState(null);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSummoning, setIsSummoning] = useState(false);
    const [summonAnimationComplete, setsummonAnimationComplete] = useState(true);
    const [gachaPulls, setGachaPulls] = useState([]);
    const [currentPullIndex, setCurrentPullIndex] = useState(0);
    const [isViewingPulls, setIsViewingPulls] = useState(false);

    const navigate = useNavigate();
    const { user, isGuest, isLoggedIn, setUserUnits } = useUser();

    useEffect(() => {
        isLoggedIn ? null : navigate('/');
    }, [isLoggedIn, navigate])

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const bannersResponse = await fetch('http://localhost:8080/api/banners/all', { mode: 'cors' });

                if (!bannersResponse.ok) {
                    throw new Error('Issue with network response');
                }

                const bannersData = await bannersResponse.json();
                setBanners(bannersData);
                setSelectedBanner(bannersData[0]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching banners', error);
            }
        };
        fetchBanners(); 
    }, []);

    const handleBannerChange = (banner) => {
        setSelectedBanner(banner);
    };

    const handleCurrentPull = () => {
        if (currentPullIndex < gachaPulls.length - 1) {
            setCurrentPullIndex(currentPullIndex+1);
        } else {
            setCurrentPullIndex(0);
            setIsSummoning(false);
            setIsViewingPulls(true);
        }
    };

    const handleViewingPulls = () => {
        setIsViewingPulls(!isViewingPulls);
    }

    const summon = async () => {
        try {
            const baseURL = 'http://localhost:8080/api/units/rarity';
            const commonUnitsRequest = fetch(`${baseURL}?rarity=Common`, { mode: 'cors' });
            const epicUnitsRequest = fetch(`${baseURL}?rarity=Epic`, { mode: 'cors' });
            const legendaryUnitsRequest = fetch(`${baseURL}?rarity=Legendary`, { mode: 'cors' });

            const [commonUnitsResponse, epicUnitsResponse, legendaryUnitsResponse] = await Promise.all([commonUnitsRequest, epicUnitsRequest, legendaryUnitsRequest]);

            if (!commonUnitsResponse.ok || !epicUnitsResponse.ok || !legendaryUnitsResponse.ok) {
                throw new Error('Issue with network response');
            }
            
            const commonPool = await commonUnitsResponse.json();
            const epicPool = await epicUnitsResponse.json();
            const legendaryPool = await legendaryUnitsResponse.json();
            const newGachaPulls = [];

            const choosePool = () => {
                const randomNum = Math.random();
                
                if (randomNum <= 0.85) {
                    return commonPool;
                } else if (randomNum <= 0.95) {
                    return epicPool;
                } else {
                    return legendaryPool;
                }
            };
            const getRandomIndex = (pool) => {
                return Math.floor(Math.random() * pool.length);
            };
    
            for (let i = 0; i < 10; i++) {
                const chosenPool = choosePool();
                const randomIndex = getRandomIndex(chosenPool);
                const randomUnit = chosenPool[randomIndex];
                newGachaPulls.push(randomUnit);
            }

            setGachaPulls(newGachaPulls);
            const newGachaPullsIDs = newGachaPulls.map(unit => unit.id);
            setIsSummoning(true);
            setsummonAnimationComplete(false);
            user.gems = user.gems -10;

            if(isGuest) {
                const uniqueGachaPullsIDs = [...new Set(newGachaPullsIDs)];
                const queryString = uniqueGachaPullsIDs.join('&ids=');
                const getUnitsResponse = await fetch(`http://localhost:8080/api/units/unitsByIds?ids=${queryString}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!getUnitsResponse.ok) {
                    throw new Error('Failed to fetch units by IDs');
                }
        
                const units = await getUnitsResponse.json();
                setUserUnits(units);

            } else {
                const postResponse = await fetch('http://localhost:8080/api/users/addUnits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: user.username, gachaPulls: newGachaPullsIDs })
                });
        
                if (!postResponse.ok) {
                    throw new Error('Failed to post gacha pulls to user');
                }
            }
    
            setTimeout(() => {
                setsummonAnimationComplete(true);
            }, 6200);
    
            console.log('Gacha pulls posted successfully to user');
        } catch (error) {
            console.error('Error during summon:', error.message);
        }
    };

    const currentPull = gachaPulls[currentPullIndex]

    if(isLoading) {
        return <img src='https://i.redd.it/nkmgg4gttnb91.png'id={Style.loading} />
    }


    return (
        <div>
            {isSummoning && (
                !summonAnimationComplete ? (
                    <img src={GachaAnimation} id={Style.summon_container} />
                ) : (
                    summonAnimationComplete && (
                        <Pull
                            currentPull={currentPull}
                            handleClick={handleCurrentPull}
                        />
                    )
                )
            )}

            {isViewingPulls ? 
                <AllPulls pulls={gachaPulls} handleClick={handleViewingPulls}/>
            :
            <div id={Style.main}>
            <img src={selectedBanner.image} id={Style.container}/>
            <div id={Style.header}>
                <Link to='/main' style={{marginLeft: '10%'}}><ExitToAppRoundedIcon style={{color:'white', fontSize:'3.4rem'}}/></Link>
                <div>
                    <img src={Gem}/>
                    <p>{user.gems}</p>
                </div>
            </div>
            <div id={Style.banners}>
            {banners.map((banner, index) => (
                <img 
                    key={index} 
                    src={banner.image} 
                    alt={`Banner ${index}`} 
                    onClick={() => handleBannerChange(banner)}
                    style={banner === selectedBanner ? {filter:'brightness(1)'} : null}
                />
            ))}
            </div>
            <Banner key={selectedBanner.title} selectedBanner={selectedBanner} />
            <div id={Style.gacha_buttons}>
                <div>
                    <button><p>Exchange</p></button>
                    <button><p>View Details</p></button>
                </div>
                <div>
                    <button onClick={summon}><img src={Gem} className={Style.button_icon}/><p>x1</p></button>
                    <button onClick={summon}><img src={Gem} className={Style.button_icon}/><p>x10</p></button>
                </div>
            </div> 
            </div>
            }
        </div>
    )
}

export default Gacha