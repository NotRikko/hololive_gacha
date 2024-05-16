import { useState } from 'react'
import Style from './Login.module.css';

function Login () {
    const [formData, setFormData] = useState({
        username : '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                mode: 'cors',
                method: 'POST',
                cache: 'no-cache',
                haders: {
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
            } else {
                console.log('Incorrect passsword/username');
            }
        } catch (error) {
            console.error(error);
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
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Login