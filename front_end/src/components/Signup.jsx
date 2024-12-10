import { useState } from "react";

function Signup () {
    const [formData, setFormData] = useState ({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://hololive-gacha.onrender.com/users/signup', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
            }),
            });
            const data = await response.json();
        } catch (error) {
            console.error(error);
        };
    };

    return(
        <div id={Style.main}>
            <form id={Style.login_form} onSubmit={handleSubmit}>
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
            </form>
        </div>
    )
}

export default Signup