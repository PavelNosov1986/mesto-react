import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupAdd from './PopupAdd';
import PopupEdit from './PopupEdit';
import PopupUpdataAvatarForm from './PopupUpdataAvatarForm';
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
            });
    }, []);

    useEffect(() => {
        api.fetchGetCards()
            .then((cards) => {
                setCards(cards);
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
            });
    }

    function handleUpdateAvatar(avatar) {
        api.fetchUpdateAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            });
    }

    function handleAddPlaceSubmit(card) {
        api.fetchPostCards(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            });
    }

    function handleCardLike(card) {
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

            <PopupUpdataAvatarForm
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
