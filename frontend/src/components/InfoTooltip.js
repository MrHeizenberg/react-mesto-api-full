import regok from '../images/Regok.svg';
import regerr from '../images/Regerr.svg';

function InfoTooltip(props) {
    return(
        <div className ={props.isOpen ? `popup popup_type_reg popup_visible_on` : `popup popup_type_reg`}>
            <div className="popup__container popup__container_type_reg">
            <button type="button" className="popup__close" onClick = {props.onClose}></button>
            <img src = {props.onError ? regerr :  regok} alt = "Икнока" className = "popup__icon"/>
            <p className = "popup__notification">{props.onError ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;