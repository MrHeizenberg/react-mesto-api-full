export const popupEditOpen = document.querySelector('.profile__edit');
export const popupAddCardOpen = document.querySelector('.profile__add');
export const jobInput = document.querySelector('input[name=description]');
export const nameInput = document.querySelector('input[name=author]');
export const formEdit = document.querySelector('.popup__infosave_type_edit');
export const formAddCards = document.querySelector('.popup__infosave_type_addcard');
export const editPopupSaveButton = document.querySelector('.popup__save_edit');
export const addPopupSaveButton = document.querySelector('.popup__save_add');
export const authorError = document.getElementById('author-error');
export const descriptionError = document.getElementById('description-error');
export const cardDelte = document.querySelector('.cards__delete');
export const popupProfileUpdateOpen = document.querySelector('.profile__avatar-link');
export const formWithAvatar = document.querySelector('.popup__infosave_type_profileUpdate');
export const popupButtonSaveEdit = document.querySelector('.popup__save_edit');
export const popupButtonSaveProfileUpdate = document.querySelector('.popup__save_profileUpdate');
export const popupButtonSaveAdd = document.querySelector('.popup__save_add');
export const popupButtonSaveDelete = document.querySelector('.popup__save_deletecard');

export const validConfig = {
    form: '.popup__infosave',
    submitButton: '.popup__save',
    inactiveButton: 'popup__save_disabled',
    inputs: '.popup__text',
    inputError: 'popup__text_type_error'
};

export const cardsTable = document.querySelector('.cards');