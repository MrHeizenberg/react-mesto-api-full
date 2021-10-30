import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    const [nameValid, setNameValid] = React.useState(true);
    const [linkValid, setLinkValid] = React.useState(true);

    const [nameErrorMessage,setNameErrorMessage] = React.useState('');
    const [linkErrorMessage,setLinkErrorMessage] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
        setNameValid(e.target.validity.valid)
        if (!e.target.validity.valid) {
            const errorMessage = e.target.validationMessage;
            setNameErrorMessage(errorMessage);
        }
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
        setLinkValid(e.target.validity.valid)
        if (!e.target.validity.valid) {
            const errorMessage = e.target.validationMessage;
            setLinkErrorMessage(errorMessage);
        }
    }

    function resetForm() {
        setName('');
        setLink('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(name,link,resetForm);
    }

    return(
        <PopupWithForm title='Новое место' name='addcard' buttonvalue={!props.onLoading ? 'Создать' : 'Создать...'} isOpen = {props.isOpen} onClose = {props.onClose} onSubmit={handleSubmit}>
                <fieldset className="popup__inputarea">
                    <input id="area" type="text" value={name} name="area" className={!nameValid ? `popup__text popup__text_type_error` : `popup__text`} placeholder="Название" minLength="2" maxLength="30" onChange = {handleNameChange} required />
                    <span id="area-error" className="popup__text-error">{!nameValid ? `${nameErrorMessage}` : ``}</span>
                </fieldset>
                <fieldset className="popup__inputarea">
                    <input id="imagelink" type="url" value={link} name="imagelink" className={!linkValid ? `popup__text popup__text_type_error` : `popup__text`} placeholder="Ссылка на картинку" onChange = {handleLinkChange} required />
                    <span id="imagelink-error" className="popup__text-error">{!linkValid ? `${linkErrorMessage}` : ``}</span>
                </fieldset>
            </PopupWithForm>
    )
}

export default AddPlacePopup;