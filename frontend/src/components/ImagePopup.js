function ImagePopup(props) {
    return (
        <div className={props.card.isOpen ? `popup popup_type_image popup_visible_on` : `popup popup_type_image`}>
            <div className="popup__container popup__container_type_image">
                <button type="button" className="popup__close popup__close_type_image" onClick = {props.onClose}></button>
                <img className="popup__image" src={props.card.link} alt={props.card.title} />
                <p className="popup__subtitle">{props.card.title}</p>
            </div>
        </div>
    )
}

export default ImagePopup;