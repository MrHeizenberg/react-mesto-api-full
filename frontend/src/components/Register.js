import {useHistory} from 'react-router-dom';
import React from 'react';
function Register(props) {
    const history = useHistory();

    const [eMail,setEMail] = React.useState('');
    const [password,setPassword] = React.useState('');

    function handleEMailChange(e) {
        setEMail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(password,eMail);
    }

    function pushToSignIn() {
        history.push('/sign-in');
    }
    return(
        <div className="authform authform_signup">
            <button className="authform__signswitch" onClick={pushToSignIn}>Войти</button>
            <h2 className="authform__title authform__title_signup">Регистрация</h2>
            <form className="authform__inputarea authform__inputarea_signup" onSubmit={handleSubmit}>
                <input type="e-mail" value = {eMail} onChange={handleEMailChange} className="authform__text authform__text_signup" placeholder="Email"></input>
                <input type="password" value = {password} onChange={handlePasswordChange} className="authform__text authform__text_signup" placeholder="Пароль"></input>
                <button className="authform__save auth__save_signup" type="submit">Зарегистрироваться</button>
            </form>
            <p className="authform__linktosignin" onClick={pushToSignIn}>Уже зарегистрированы? Войти</p>
        </div>
    )
}

export default Register;