import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import Style from './Login.module.css';

function Login ({ displaySignupForm }) {
    const [formData, setFormData] = useState({
        username : '',
        password: '',
    });
    
    const {setIsLoggedIn, setUser, handleLoggedInUser, setIsGuest} = useUser();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, {
                mode: 'cors',
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });
            if(!response.ok) {
                throw new Error('Error fetching response from server');
            }
            const data = await response.json();
            console.log(data);
            if(data.token) {
                localStorage.setItem('accesstoken', data.token);
                await handleLoggedInUser(data.userID, data.token);
                navigate('/main');
            } else {
                console.log('Incorrect passsword/username');
            }
        } catch (error) {
            console.error(error)
        }
    };

    const handleGuestClick = () => {
        const testUser = {
            username: 'Holofan',
            image: 'https://i.redd.it/90c051twqpo51.jpg',
            level: 1,
            gems: 8000,
            gold: 10000,
            stamina: 250,
        };

        setUser(testUser);
        setIsLoggedIn(true);
        setIsGuest(true);
        navigate('/main');
    };

    return (
        <div id={Style.main}>
            <form id={Style.login_form} onSubmit={handleSubmit}>
                <legend>Holo Error Login</legend>
                <div></div>
                <div className={Style.form_sec}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' onChange={handleInputChange}/>
                </div>
                <div className={Style.form_sec}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' onChange={handleInputChange}/>
                </div>
                <button type='submit'>Submit</button>
            </form>
            <p style={{ fontSize: '1.3rem' }}>
                No account? <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => displaySignupForm()}>Click here to signup.</span>
            </p>
            <p style={{ fontSize: '1.3rem' }}>
                Just browsing? <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleGuestClick}>Click here to continue as guest!</span>
            </p >
        </div>
    );
}

export default Login