import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import Style from './Login.module.css';

function Login () {
    const [formData, setFormData] = useState({
        username : '',
        password: '',
    });
    
    const {handleLoginStatus, handleUser} = useUser();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('https://hololive-gacha.onrender.com/users/login', {
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
            if(data.authenticated) {
                localStorage.setItem('accesstoken', data.accessToken);
                localStorage.setItem('refreshtoken', data.refreshToken);
                handleLoginStatus();
                handleUser(data.user);
                navigate('/main');
            } else {
                console.log('Incorrect passsword/username');
            }
        } catch (error) {
            console.error(error)
        }
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
            <p>No account? Signup here.</p>
        </div>
    );
}

export default Login