import React, {useState, useEffect} from 'react';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupAdd from './PopupAdd';
import PopupConfirmDelete from './PopupConfirmDelete';
import PopupEdit from './PopupEdit';
import PopupUpdataAvatarForm from './PopupUpdataAvatarForm';



function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

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
    }

    return (<>
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}

        />
        <Footer />

        <PopupAdd isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupEdit isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <PopupUpdataAvatarForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

    </>
    );
}

export default App;
