import Style from './Main.module.css'
import Gold from '../assets/goldcoin.png'
import Gem from '../assets/gem.png'
import Energy from '../assets/energy.png'
import Mail from '../assets/mailicon.png'
import Settings from '../assets/settingsicon.png'
import Notification from '../assets/notificationicon.png'

function Main () {
    return (
        <div id={Style.main_page}>
            <div id={Style.resources}>
                <div className={Style.resource}>
                    <img src={Energy} />
                    <p>423</p>
                </div>
                <div className={Style.resource}>
                    <img src={Gold} />
                    <p>52350</p>
                </div>
                <div className={Style.resource}>
                    <img src={Gem} />
                    <p>4320</p>
                </div>
            </div>
            <div id={Style.sidebar}>
                <img src={Mail} />
                <img src={Notification} />
                <img src={Settings} />
            </div>
        </div>
    )
}

export default Main