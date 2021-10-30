import { useHistory } from 'react-router-dom';
import React from 'react';
function Login(props) {
    const history = useHistory();
    function pushToSignIn() {
        history.push('/sign-up');
    }

        const [eMail, setEMail] = React.useState('');
        const [password, setPassword] = React.useState('');

        function handleEMailChange(e) {
            setEMail(e.target.value)
        }

        function handlePasswordChange(e) {
            setPassword(e.target.value)
        }

        function handleSubmit(e) {
            e.preventDefault();
            props.onAuthorize(password, eMail);
        }

    return (
        <div className="authform">
            <button className="authform__signswitch authform__signswitch_toup" onClick={pushToSignIn}>Регистрация</button>
            <h2 className="authform__title">Вход</h2>
            <form className="authform__inputarea" onSubmit={handleSubmit}>
                <input type="e-mail" value = {eMail} onChange={handleEMailChange} className="authform__text" placeholder="Email"></input>
                <input type="password" value = {password} onChange={handlePasswordChange} className="authform__text" placeholder="Пароль"></input>
                <button className="authform__save" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;
