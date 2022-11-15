import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupAdd from './PopupAdd';
import PopupConfirmDelete from './PopupConfirmDelete';
import PopupEdit from './PopupEdit';
import PopupUpdataAvatarForm from './PopupUpdataAvatarForm';



function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

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
