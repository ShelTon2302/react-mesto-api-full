import React from "react";
import accept from "../images/accept.svg";
import error from "../images/error.svg";

function InfoTooltip (props) {
    return (
        <div className={`popup${props.isOpen ? ' popup_visible' : ''}`}>
            <div className={`popup__window`}>
                <button type="button" className="popup__close-button" aria-label="Закрыть окно" onClick={props.onClose}></button>
                <img className="popup__icon" alt="Иконка" src={(props.state.error) ? error : accept} />
                <h2 className="popup__text">{props.state.msg}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;