import React from 'react';
import PopupWithForm from "./PopupWithForm";

function PopupEdit(props) {
    return (<PopupWithForm name="edit" title="Редактировать профиль" submit="Сохранить"  isOpen={props.isOpen}  onClose={props.onClose}>
        <label className="popup__field-input">
            <input className="popup__input" type="text" id="name" name="name" value="Жак-Ив Кусто" placeholder="Имя"
                required minLength="2" maxLength="40" />
            <span className="popup__input-error" id="error-name"></span>
        </label>
        <label className="popup__field-input">
            <input className="popup__input" type="text" id="description" name="description"
                value="Исследователь океана" placeholder="О себе" required minLength="2" maxLength="200" />
            <span className="popup__input-error" id="error-description"></span>
        </label>
    </PopupWithForm>)
}

export default PopupEdit;