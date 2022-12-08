import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={{ cards, setCards }}>
                <Header />

                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />
                <Footer />

                <PopupAdd
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
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
            </CardsContext.Provider>
        </CurrentUserContext.Provider>

    );
}

export default App;
