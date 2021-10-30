import vector from '../images/Vector.svg';
import mobileMenu from '../images/mobilemenu.svg';
import closeIcon from '../images/CloseIconmobile.svg';

function Header(props) {
    return (
        <header className="header header_mobile root" style={!props.isMobileMenuOpen ? {paddingTop: 24} : {paddingTop: 169}}>
            {props.loggedIn &&
                <div className="header__info header__info_mobile" style={!props.isMobileMenuOpen ? {display: "none"} : {display: ""}}>
                    <p className="header__email header__email_mobile">{props.eMail}</p>
                    <button className="header__signout" onClick={() => { props.onSignOut() }}>Выйти</button>
                </div>}
            <img src={vector} alt="Лого" className="header__logo" />
            {props.loggedIn &&
                <div className="header__info header__info_fullscreen">
                    <p className="header__email">{props.eMail}</p>
                    <button className="header__signout" onClick={() => { props.onSignOut() }}>Выйти</button>
                </div>}
            {props.loggedIn &&
                    <button type="button" className="header__mobilemenu" style={!props.isMobileMenuOpen ? { backgroundImage: `url(${mobileMenu})`} : { backgroundImage: `url(${closeIcon})`}} onClick = {props.onMobileMenuOpen}></button>}

        </header>
    )
}

export default Header;
