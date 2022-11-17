import React from 'react';


function ImagePopup({ card, onClose }) {
    return (<div className="popup popup-img popup_opened" id="image">
        <div className="popup__container-image">
            <button className="popup__close" id="close-image" type="button" onClick={onClose}></button>
            <img src={card.link} alt="Места России" className="popup__image" />
            <h2 className="popup__title popup__image-title">{card.name}</h2>
        </div>
    </div>
    )
}

export default ImagePopup;