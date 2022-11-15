import React from 'react';
import PopupWithForm from "./PopupWithForm";

function PopupAdd(props) {
    return (<PopupWithForm name="add-cards" title="Новое место" submit="Создать" isOpen={props.isOpen}  onClose={props.onClose}>
        <label className="popup__field-input">
            <input className="popup__input" type="text" id="title" name="title" placeholder="Название" minLength="2"
                maxLength="30" required />
            <span className="popup__input-error" id="error-title"></span>
        </label>
        <label className="popup__field-input">
            <input className="popup__input" type="url" id="link-image" name="linkImage"
                placeholder="Ссылка на картинку" required />
            <span className="popup__input-error" id="error-link-image"></span>
        </label>
    </PopupWithForm>)
}

export default PopupAdd;