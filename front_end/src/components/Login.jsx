import Style from './Login.module.css';

function Login () {
    return (
        <div id={Style.main}>
            <form id={Style.login_form}>
                <legend>Holo Error Login</legend>
                <div></div>
                <div className={Style.form_sec}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' />
                </div>
                <div className={Style.form_sec}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' />
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Login