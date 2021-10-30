import React from "react";
function PopupWithForm(props) {
    const form = React.useRef();
    const [isFormValid,setIsFormValid] = React.useState(false)
    React.useEffect(() => {
        setIsFormValid(form.current.checkValidity())
    },[props.isOpen])

    function checkValidity() {
        setIsFormValid(form.current.checkValidity())
    }

    return (
        <div className={props.isOpen ? `popup popup_type_${props.name} popup_visible_on` : `popup popup_type_${props.name}`}>
                <div className={`popup__container popup__container_type_${props.name}`}>
                    <button type="button" className="popup__close" onClick = {props.onClose}></button>
                    <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
                    <form ref = {form} onChange = {checkValidity} name={`infosave-${props.name}`} className={`popup__infosave popup__infosave_type_${props.name}`}>
                        {props.children}
                        <button type="submit" className= {!isFormValid ? `popup__save popup__save_disabled` : `popup__save`} onClick = {props.onSubmit} disabled = {!isFormValid}>{props.buttonvalue}</button>
                    </form>
                </div>
            </div>
    )
}

export default PopupWithForm;