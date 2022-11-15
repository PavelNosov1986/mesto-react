import React from 'react';


function ImagePopup() {
    return (<div className="popup popup_for-image" id="image">
    <div className="popup__container-image">
        <button className="popup__close" id="close-image" type="button"> </button>
        <img src="#" alt="Места России" className="popup__image" />
        <h2 className="popup__image-title">Название места</h2>
    </div>
</div>
)
}

export default ImagePopup;