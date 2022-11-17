import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupAdd from './PopupAdd';
import PopupEdit from './PopupEdit';
import PopupUpdataAvatarForm from './PopupUpdataAvatarForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

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

    return (<>
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}

        />
        <Footer />

        <PopupAdd isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupEdit isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <PopupUpdataAvatarForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
    </>
    );
}

export default App;
