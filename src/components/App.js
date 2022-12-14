import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupAdd from './PopupAdd';
import PopupEdit from './PopupEdit';
import PopupUpdateAvatarForm from './PopupUpdateAvatarForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.fetchGetMe()
            .then((user) => {
                setCurrentUser(user);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    }, []);

    useEffect(() => {
        api.fetchGetCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    }, []);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(user) {
        api.fetchUpdateMe(user)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    }

    function handleUpdateAvatar(avatar) {
        api.fetchUpdateAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    }

    function handleAddPlaceSubmit(card) {
        api.fetchPostCards(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (isLiked) {
            api.fetchDeleteLikeCards(card._id).then((newCard) => {
                const newCads = cards.map((c) => c._id === card._id ? newCard : c);
                setCards([...newCads]);
            })
                .catch((err) => {
                    console.log('Ошибка. Запрос не выполнен');
                });
        }

        else {
            api.fetchAddLikeCards(card._id).then((newCard) => {
                const newCads = cards.map((c) => c._id === card._id ? newCard : c);
                setCards([...newCads]);
            })
                .catch((err) => {
                    console.log('Ошибка. Запрос не выполнен');
                });
        }

    }

    function handleCardDelete(card) {
        api.fetchDeleteCards(card._id)
            .then(() => {
                setCards(cards => cards.filter(c => c._id !== card._id));
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    };


    return (
        <CurrentUserContext.Provider value={currentUser}>

            <Header />

            <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
            />
            <Footer />

            <PopupAdd
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            <PopupEdit
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <PopupUpdateAvatarForm
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups} />

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />

        </CurrentUserContext.Provider>

    );
}

export default App;
