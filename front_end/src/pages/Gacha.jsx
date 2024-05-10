import Style from './Gacha.module.css'
import Gem from '../assets/gem.png'
import GachaAnimation from '../assets/gacha_animation.gif'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Gacha () {
    const [banners, setBanners] = useState(null);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSummoning, setIsSummoning] = useState(false);
    const [gachaPulls, setGachaPulls] = useState([]);

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

    const handleGachaPulls = async () => {
    }
        
    const summon = async () => {
        setIsSummoning(true);
        setTimeout(() => {
            setIsSummoning(false);
        }, 6000);
    }

    if(isLoading) {
        return <img src='https://i.redd.it/nkmgg4gttnb91.png'id={Style.loading} />
    }

    return (
        <div>
            {isSummoning ? 
            (<img src={GachaAnimation} id={Style.summon_container}/>)
            :
            ( 
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
            <div id={Style.banner}> 
                <div id={Style.banner_info}>
                    <h1 style={{ fontSize: '2.8rem'}}>{selectedBanner.title}</h1>
                    <p style={{ fontSize: '2rem'}}>6d 23h</p>
                    <p style={{ fontSize: '2rem'}}>Every <span style={{color:'orange'}}>10</span> summons guarantees a <span style={{color:'orange'}}>4</span> star or above unit.</p>
                    <div id={Style.featured_units}>
                        <img src='https://images-ng.pixai.art/images/orig/2927c1b2-d5f2-41f5-a58a-3352eb90741a'/>
                        <img src='https://media.tenor.com/UdhF0AkQiKgAAAAe/fuwamoco-lets-go.png'/>
                        <img src='https://img3.gelbooru.com//samples/e3/05/sample_e30567fffb89ba33496c3ff1abdc57f8.jpg'/>
                    </div>
                </div>
                <img src={selectedBanner.img}></img>
            </div>
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
        )}
        </div>
    )
}

export default Gacha