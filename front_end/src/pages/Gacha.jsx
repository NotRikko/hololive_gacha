import Style from './Gacha.module.css'
import Gem from '../assets/gem.png'
import GachaAnimation from '../assets/gacha_animation.gif'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AllPulls from '../components/AllPulls'
import Pull from '../components/Pull'
import Banner from '../components/Banner'
import Nerissa from '../assets/Nerissa_Plush.png'

function Gacha () {
    const [banners, setBanners] = useState(null);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSummoning, setIsSummoning] = useState(false);
    const [summonAnimationComplete, setsummonAnimationComplete] = useState(true);
    const [gachaPulls, setGachaPulls] = useState([]);
    const [currentPullIndex, setCurrentPullIndex] = useState(0);
    const [isViewingPulls, setIsViewingPulls] = useState(false);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const bannersResponse = await fetch('http://localhost:3000/gacha/banners', { mode: 'cors' });

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
            console.log('finished');
        }
    };

    const handleViewingPulls = () => {
        setIsViewingPulls(!isViewingPulls);
    }

    const summon = async () => {
        const unitsResponse = await fetch('http://localhost:3000/gacha/units', { mode: 'cors' });
        
        if(!unitsResponse.ok) {
            throw new Error('Issue with network response')
        }

        const pulledUnits = await unitsResponse.json();
        const newGachaPulls = [];
        const getRandomIndex = () => {
            return Math.floor(Math.random() * pulledUnits.length);
        };
        for (let i = 0; i <10; i++) {
            const randomIndex = getRandomIndex();
            const randomUnit = pulledUnits[randomIndex];
            newGachaPulls.push(randomUnit);
        }
        console.log(newGachaPulls);
        setGachaPulls(newGachaPulls);
        setIsSummoning(true);
        setsummonAnimationComplete(false);
        setTimeout(() => {
            setsummonAnimationComplete(true);
        }, 6200);
    }

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
            <img src={selectedBanner.img} id={Style.container}/>
            <div id={Style.header}>
                <Link to='/main' style={{marginLeft: '10%'}}><ExitToAppRoundedIcon style={{color:'white', fontSize:'3.4rem'}}/></Link>
                <div>
                    <img src={Gem}/>
                    <p>1420</p>
                </div>
            </div>
            <div id={Style.banners}>
            {banners.map((banner, index) => (
                <img 
                    key={index} 
                    src={banner.img} 
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