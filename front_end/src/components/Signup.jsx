import { useState } from "react";
import Style from './Signup.module.css'

function Signup ({ displayLoginForm }) {
    const [formData, setFormData] = useState ({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/users/signup', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });
    
            if (response.ok) {
                    displayLoginForm();  
            } else {
                const errorMessage = await response.text();  
                console.error('Error during signup:', errorMessage);
            }
        } catch (error) {
            console.error('Error during user signup:', error);
        }
    };
    return(
        <div id={Style.main}>
            <form id={Style.signup_form} onSubmit={handleSubmit}>
                <legend>Holo Error Signup</legend>
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
                <p style={{ fontSize: '1.3rem' }}>
                    Already have an account? <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => displayLoginForm()}>Click here to login.</span>
                </p>
            </form>
        </div>
    )
}

export default Signup