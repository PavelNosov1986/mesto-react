import React, { useState, useEffect } from 'react';
import Avatar from '../images/Avatar.jpg';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
    const [userInfo, setUserInfo] = useState();
    const [cards, setCards] = useState();

    useEffect(() => {
        Promise.all([api.fetchGetMe(),
        api.fetchGetCards()])
            .then(([response, response1]) => {
                setUserInfo(response);
                setCards(response1);
            });
    }, []);

    return (<>
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-info">
                    <div className="profile__container-img">
                        <img src={userInfo?.avatar ? userInfo?.avatar : Avatar}
                            alt="Аватар"
                            className="profile__avatar" />
                        <button className="profile__update-avatar" onClick={props.onEditAvatar} title="Загрузить новый аватар" type="button" ></button>
                    </div>

                    <div className="profile__info">
                        <div className="profile__name-edit-button">
                            <h1 className="profile__name">{userInfo?.name}</h1>
                            <button className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
                        </div>
                        <p className="profile__about-me">{userInfo?.about}</p>
                    </div>

                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} title="Добавить новые карточки" type="button"></button>
            </section>

            {cards && cards.length > 0
                && <section className="cards">
                    {cards.map((card, i) => { return <Card onCardClick={props.onCardClick} key={i} card={card} /> })}
                </section>}

        </main>
    </>)
}

export default Main;