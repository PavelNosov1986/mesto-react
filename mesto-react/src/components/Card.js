import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
//import { CardsContext } from '../contexts/CardsContext';

function Card({ card, onCardClick, onCardLike }) {

    const currentUser = useContext(CurrentUserContext);
    // const cards = useContext(CardsContext);
    console.log(currentUser)
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    //console.log(currentUser)

    //Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete-active' : 'element__delete-inactive'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    //console.log(isLiked)

    //Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : 'element__like-inactive'}`
    );

    const handleLikeClick = () => {
        onCardLike(card);
    }

    function handleClick() {
        onCardClick(card);
    }

    return (<>
        <div className="element">
            <button className="element__delete" type="button"></button>
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="elemments__like-counter">
                    <button className="element__like" type="button" onClick={() => { onCardLike(card) }}></button>
                    <span className="element__counter" id="counter">{card.likes?.length}</span>
                </div>
            </div>
        </div>
    </>
    )
}

export default Card