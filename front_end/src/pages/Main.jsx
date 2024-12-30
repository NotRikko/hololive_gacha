import Style from './Main.module.css'
import Gold from '../assets/goldcoin.png'
import Gem from '../assets/gem.png'
import Energy from '../assets/energy.png'
import Mail from '../assets/mailicon.png'
import Settings from '../assets/settingsicon.png'
import Notification from '../assets/notificationicon.png'
import House from '../assets/house.png'
import Team from '../assets/teamicon.png'
import Shop from '../assets/shopicon.png'
import Gacha from '../assets/gachaicon.png'
import Expedition from '../assets/expeditionicon.png'
import Archive from '../assets/archiveicon.png'
import AquaBG from '../assets/aquaBG.mp4'
import PlayerCard from '../components/PlayerCard'
import { Link, useNavigate} from 'react-router-dom'
import { useUser } from "../UserProvider";
import { useEffect } from 'react'


function Main () {
    const navigate = useNavigate();
    const { isLoggedIn } = useUser();

    const { user } = useUser();

    useEffect(() => {
        isLoggedIn ? null : navigate('/');
    }, [isLoggedIn, navigate])

    return (
        <div id={Style.main_page}>
            <video autoPlay loop muted>
                <source src={AquaBG} type="video/mp4" />
            </video>
            <div id={Style.main_header}>
                <div id={Style.main_playercard}>
                    <PlayerCard />
                </div>
                <div id={Style.resources}>
                    <div className={Style.resource}>
                        <img src={Energy} />
                        <p>{user.stamina}</p>
                    </div>
                    <div className={Style.resource}>
                        <img src={Gold} />
                        <p>{user.gold}</p>
                    </div>
                    <div className={Style.resource}>
                        <img src={Gem} />
                        <p>{user.gems}</p>
                    </div>
                </div>
            </div>
            <div id={Style.sidebar}>
                <img src={Mail} />
                <img src={Notification} />
                <img src={Settings} />
            </div>
            <div id={Style.bottombar}>
                <div className={Style.menuBtn}>
                    <img src={House}/>
                    <p>Dorm</p>
                </div>
                <div className={Style.menuBtn}>
                    <img src={Shop}/>
                    <p>Shop</p>
                </div>
                <Link to='/gacha' className={Style.menuBtn}>
                    <img src={Gacha}/>
                    <p>Gacha</p>
                </Link>
                <Link to='/team' className={Style.menuBtn}>
                    <img src={Team}/>
                    <p>Team</p>
                </Link>
                <div className={Style.menuBtn}>
                    <img src={Expedition}/>
                    <p>Trips</p>
                </div>
                <div className={Style.menuBtn}>
                    <img src={Archive}/>
                    <p>Archive</p>
                </div>
            </div>
        </div>
    )
}

export default Main