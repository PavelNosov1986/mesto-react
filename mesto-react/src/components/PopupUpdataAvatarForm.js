import React,{ useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function PopupUpdataAvatarForm({isOpen, onClose, onUpdateAvatar}) {
    const editAvatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
          avatar: editAvatarRef.current.value,
        })
      }

    return (<PopupWithForm name="updataAvatarFormt" title="Обновить аватар" submit="Сохранить" isOpen={isOpen}
        onClose={onClose}  onSubmit={handleSubmit}>
        <label className="popup__field-input">
            <input className="popup__input" type="url" id="linkAvatar" name="linkImageAvatar"
                placeholder="Ссылка на аватар" required  ref={editAvatarRef}/>
            <span className="popup__input-error" id="error-linkAvatar"></span>
        </label>
    </PopupWithForm>)
}

export default PopupUpdataAvatarForm;