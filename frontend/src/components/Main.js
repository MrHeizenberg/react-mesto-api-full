import React from "react";
import Card from "./Card";
import {UserInfoContext} from '../contexts/CurrentUserContext';
function Main(props) {
    const userInfo = React.useContext(UserInfoContext);
    
    return (
        <main className="content root">
            <section className="profile">
                <div className="profile__avatar-link" onClick = {props.onEditAvatar} style={{backgroundImage: `url(${userInfo.avatar})`}}></div>
                <div className="profile__info">
                    <h1 className="profile__title">{userInfo.name}</h1>
                    <p className="profile__subtitle">{userInfo.about}</p>
                    <button type="button" className="profile__edit" onClick = {props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add" onClick = {props.onAddPlace}></button>
            </section>
            <section className="cards">
                {props.cards.map(function(card) {
                const cardinfo = {link: card.link, name: card.name, cardId: card._id, likesSum: card.likes.length, owner: card.owner};
                return (<Card 
                    card = {cardinfo} 
                    onCardClick = {props.onCardClick} 
                    likes = {card.likes} 
                    onDeleteCardPopup = {props.onDeleteCardPopup} 
                    onCardLike = {props.onCardLike} 
                    onCardDelete = {props.onCardDelete} key = {card._id}/>
                )})}
            </section>
        </main>
    )
}

export default Main;