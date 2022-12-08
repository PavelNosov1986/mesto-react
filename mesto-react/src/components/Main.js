import React, { useState, useEffect, useContext } from 'react';
import Avatar from '../images/Avatar.jpg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import api from '../utils/api';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    const { cards, setCards } = useContext(CardsContext);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (isLiked) {
            api.fetchDeleteLikeCards(card._id).then((newCard) => {
                const newCads = cards.map((c) => c._id === card._id ? newCard : c);
                setCards([...newCads]);
            });
        }
        else {
            api.fetchAddLikeCards(card._id).then((newCard) => {
                const newCads = cards.map((c) => c._id === card._id ? newCard : c);
                setCards([...newCads]);
            });
        }
    }

    function handleCardDelete(card) {
        api.fetchDeleteCards(card._id)
            .then(() => {
                setCards(cards => cards.filter(c => c._id !== card._id));
            });
    }

    return (<>
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-info">
                    <div className="profile__container-img">
                        <img src={currentUser?.avatar ? currentUser?.avatar : Avatar}
                            alt="Аватар"
                            className="profile__avatar" />
                        <button className="profile__update-avatar" onClick={props.onEditAvatar} title="Загрузить новый аватар" type="button" ></button>
                    </div>

                    <div className="profile__info">
                        <div className="profile__name-edit-button">
                            <h1 className="profile__name">{currentUser?.name}</h1>
                            <button className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
                        </div>
                        <p className="profile__about-me">{currentUser?.about}</p>
                    </div>

                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} title="Добавить новые карточки" type="button"></button>
            </section>


            {cards && cards.length > 0
                && <section className="cards">
                    {cards.map((card) => {
                        return <Card
                            onCardClick={props.onCardClick}
                            key={card._id}
                            card={card}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                    })}
                </section>}

        </main>
    </>)
}

export default Main;