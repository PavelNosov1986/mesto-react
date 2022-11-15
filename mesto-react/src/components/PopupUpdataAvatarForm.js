import React from 'react';
import PopupWithForm from "./PopupWithForm";

function PopupUpdataAvatarForm(props) {
    return (<PopupWithForm name="updataAvatarFormt" title="Обновить аватар" submit="Сохранить" isOpen={props.isOpen}  onClose={props.onClose}>
        <label className="popup__field-input">
            <input className="popup__input" type="url" id="linkAvatar" name="linkImageAvatar"
                placeholder="Ссылка на аватар" required />
            <span className="popup__input-error" id="error-linkAvatar"></span>
        </label>
    </PopupWithForm>)
}

export default PopupUpdataAvatarForm;