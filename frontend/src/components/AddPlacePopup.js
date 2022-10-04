import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeLink , setPlaceLink] = React.useState('');
    const [validPlaceName, setValidPlaceName] = React.useState({valid: true, errorMsg: ''});
    const [validPlaceLink, setValidPlaceLink] = React.useState({valid: true, errorMsg: ''});
    
    function handleChangeName(e) {
        setPlaceName(e.target.value);
        setValidPlaceName({valid: e.target.validity.valid, errorMsg: e.target.validationMessage})
    }

    function handleChangeLink(e) {
        setPlaceLink(e.target.value);
        setValidPlaceLink({valid: e.target.validity.valid, errorMsg: e.target.validationMessage})
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
          name: placeName,
          link: placeLink
        });
    }
    
    return (
        <PopupWithForm 
          name="add-element" 
          title="Новое место"
          buttonTxt={props.buttonTxt} 
          isOpen={props.isOpen}
          onClose={props.onClose}
          buttonEnabled={validPlaceName.valid&&validPlaceLink.valid}
          onSubmit={handleSubmit}
        >
          <>
            <input 
                type="text" 
                placeholder="Название" 
                className={`popup__input popup__input_element_name${(!validPlaceName.valid) ? " popup__input_type_error" : ""}`}
                name="element-name" 
                minLength="2" 
                maxLength="30" 
                onChange={handleChangeName}
                value={placeName}
                required />
            <span className="popup__input-error element-name-input-error popup__input-error_active">{validPlaceName.errorMsg}</span>
            <input 
                type="url" 
                placeholder="Ссылка на картинку" 
                className={`popup__input popup__input_element_src${(!validPlaceLink.valid) ? " popup__input_type_error" : ""}`} 
                name="element-src" 
                onChange={handleChangeLink}
                value={placeLink}
                required />
            <span className="popup__input-error element-src-input-error popup__input-error_active">{validPlaceLink.errorMsg}</span>
          </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;