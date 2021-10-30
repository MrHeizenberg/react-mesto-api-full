import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onCardDelete();
    }

    return(
        <PopupWithForm title='Вы уверены?' name='deletecard' buttonvalue={!props.onLoading ? 'Да' : 'Да...'} isOpen={props.isOpen} onClose={props.onClose} onSubmit = {handleSubmit} classButton = 'popup__save_deletecard'/>
    )
}

export default DeleteCardPopup;