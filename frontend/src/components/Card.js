import {UserInfoContext} from '../contexts/CurrentUserContext';
import React from 'react';

function Card(props) {
    const userInfo = React.useContext(UserInfoContext);
    const isOwn = props.card.owner === userInfo._id;
    const isLiked = props.likes.some(i => i === userInfo._id);
    const cardLikeButtonClassName = (`cards__like ${isLiked ? 'cards__like_active' : ''}`);
    const cardDeleteButtonClassName = (`cards__delete ${isOwn ? 'cards__delete_visible' : ''}`);
    return (
        <article className="cards__card">
            <button type="button" className="cards__fullphoto" style={{backgroundImage: `url(${props.card.link})`}} onClick={() => props.onCardClick(props)}></button>
            <div className="cards__description">
                <h2 className="cards__title">{props.card.name}</h2>
                <div className="cards__like-fullinfo">
                    <button type="button" className={cardLikeButtonClassName} onClick={() => props.onCardLike(props)}></button>
                    <div className={props.card.likesSum > 0 ? `cards__like-counter cards__like-counter_visible` : `cards__like-counter`}>{props.card.likesSum}</div>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick = {() => props.onDeleteCardPopup(props.card.cardId)}></button>
        </article>
    )
}

export default Card;