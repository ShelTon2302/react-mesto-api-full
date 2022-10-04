import React from "react";
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup(props) {
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        props.onDeletePlace(props.card);
    }

    return (
        <PopupWithForm 
          name="delete-element" 
          title="Вы уверены?" 
          buttonTxt={props.buttonTxt}
          isOpen={props.isOpen}
          onClose={props.onClose}
          buttonEnabled="true"
          onSubmit={handleSubmit}
        />
    )
}

export default DeletePlacePopup;