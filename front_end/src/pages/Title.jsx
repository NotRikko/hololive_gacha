import Style from './Title.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import { useState } from 'react';

function Title() {
    const { isLoggedIn } = useUser();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);

    const navigate = useNavigate();


    const handleDivClick = () => {
        if (isLoggedIn) {
            navigate('/main');
        } else {
            setShowLoginForm(true);
        }
    };

    const handleSignupForm = () => {
        setShowLoginForm(false);
        setShowSignupForm(true);
    }

    const handleLoginForm = () => {
        setShowLoginForm(true);
        setShowSignupForm(false);
    }

    return (
        <div id={Style.title_main} onClick={handleDivClick}>
                <h1>Holo Error</h1>
                <div id={Style.side_bar}>
                    <SettingsIcon style={{ fontSize: 55 }} />
                    <ExitToAppIcon style={{ fontSize: 55 }}/>
                </div>
                <div id={Style.title_footer}>
                    <p id={Style.click_start}>CLICK TO START</p>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Cover_Corporation_logo.svg/1280px-Cover_Corporation_logo.svg.png'></img>
                </div>
                {showLoginForm ? <Login displaySignupForm={handleSignupForm}/> : null}
                {showSignupForm ? <Signup displayLoginForm={handleLoginForm}/> : null}
        </div>
    )
}

export default Title