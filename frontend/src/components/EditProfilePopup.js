import PopupWithForm from "./PopupWithForm";
import React from "react";
import {UserInfoContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(UserInfoContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [nameValid, setNameValid] = React.useState(true);
    const [descriptionValid, setDescriptionValid] = React.useState(true);

    const [nameErrorMessage,setNameErrorMessage] = React.useState('');
    const [descriptionErrorMessage,setDescriptionErrorMessage] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
        setNameValid(e.target.validity.valid)
        if (!e.target.validity.valid) {
            const errorMessage = e.target.validationMessage;
            setNameErrorMessage(errorMessage);
        }
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
        setDescriptionValid(e.target.validity.valid)
        if (!e.target.validity.valid) {
            const errorMessage = e.target.validationMessage;
            setDescriptionErrorMessage(errorMessage);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(name,description);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setNameValid(true);
        setDescriptionValid(true);
        setNameErrorMessage('');
        setDescriptionErrorMessage('');
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm title='Редактировать профиль' name='edit' buttonvalue={!props.onLoading ? 'Сохранить' : 'Сохранить...'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__inputarea">
                <input id="author" type="text" name="author" className={!nameValid ? `popup__text popup__text_type_error` : `popup__text`} placeholder="Автор" minLength="2" maxLength="40" value={name} onChange={handleNameChange} required />
                <span id="author-error" className="popup__text-error">{!nameValid ? `${nameErrorMessage}` : ``}</span>
            </fieldset>
            <fieldset className="popup__inputarea">
                <input id="description" type="text" name="description" className={!descriptionValid ? `popup__text popup__text_type_error` : `popup__text`} placeholder="Описание" minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} required />
                <span id="description-error" className="popup__text-error">{!descriptionValid ? `${descriptionErrorMessage}` : ``}</span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;