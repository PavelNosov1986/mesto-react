import React, { useState, useEffect } from 'react';
import Avatar from '../images/Avatar.jpg';
import api from '../utils/api';




function Main(props) {
    const [userInfo, setUserInfo] = useState();
    const [cards, setCards] = useState(['']);

    useEffect(() => {
       
            api.fetchGetMe().then((response) => {   
                
                setUserInfo(response);           
        })

       

}, [])

    return (<>
        <main className="content">

            <section className="profile">

                <div className="profile__avatar-info">

                    <div className="profile__container-img">
                        <img src={userInfo?.avatar ? userInfo?.avatar : Avatar}
                            alt="Аватар"
                            className="profile__avatar" />
                        <button onClick={props.onEditAvatar} title="Загрузить новый аватар" className="profile__update-avatar">
                        </button>
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

            <section className="cards">
                <template className="template">
                    <li className="element">
                        <button className="element__delete" type="button"></button>
                        <img src="#" alt="Места России" className="element__image" />
                        <div className="element__description">
                            <h2 className="element__title">Название места</h2>
                            <div className="elemments__like-counter">
                                <button className="element__like" type="button"></button>
                                <span className="element__counter" id="counter"></span>
                            </div>
                        </div>
                    </li>
                </template>
            </section>

        </main>








    </>)
}


export default Main;