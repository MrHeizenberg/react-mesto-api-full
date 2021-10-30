import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {

    const [avatarName,setAvatarName] = React.useState('');
    const [avatarValid, setAvatarValid] = React.useState(true);
    const [avatarErrorMessage,setAvatarErrorMessage] = React.useState('');

    function handleAvatarChange(e) {
        setAvatarName(e.target.value);
        setAvatarValid(e.target.validity.valid)
        if (!e.target.validity.valid) {
            const errorMessage = e.target.validationMessage;
            setAvatarErrorMessage(errorMessage);
        }
    }

    function resetForm() {
        setAvatarName('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarName,resetForm);
    }

    return (
        <PopupWithForm title='Обновить аватар' name='profileUpdate' buttonvalue={!props.onLoading ? 'Сохранить' : 'Сохранить...'} isOpen={props.isOpen} onClose={props.onClose} onSubmit = {handleSubmit}>
            <fieldset className="popup__inputarea">
                <input id="avatar" type="url" name="avatar" className={!avatarValid ? `popup__text popup__text_type_error` : `popup__text`} placeholder="Название" value = {avatarName} onChange={handleAvatarChange} required />
                <span id="avatar-error" className="popup__text-error">{!avatarValid ? `${avatarErrorMessage}` : ``}</span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;