import Style from './Title.module.css'
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Link } from 'react-router-dom'

function Title() {
    return (
        <Link to='/main'>
        <div id={Style.title_main}>
                <h1>Holo Error</h1>
                <div id={Style.side_bar}>
                    <SettingsIcon style={{ fontSize: 55 }} />
                    <ExitToAppIcon style={{ fontSize: 55 }}/>
                </div>
                <div id={Style.title_footer}>
                    <p id={Style.click_start}>CLICK TO START</p>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Cover_Corporation_logo.svg/1280px-Cover_Corporation_logo.svg.png'></img>
                </div>
        </div>
        </Link>
    )
}

export default Title