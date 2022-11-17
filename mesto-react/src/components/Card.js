import React from 'react';

function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (<>
        <div className="element">
            <button className="element__delete" type="button"></button>
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="elemments__like-counter">
                    <button className="element__like" type="button"></button>
                    <span className="element__counter" id="counter">{card.likes?.length}</span>
                </div>
            </div>
        </div>
    </>
    )
}

export default Card