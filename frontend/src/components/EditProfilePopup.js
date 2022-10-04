import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description , setDescription] = React.useState('');
    const [validProfileName, setValidProfileName] = React.useState({valid: true, errorMsg: ''});
    const [validProfileDescription, setValidProfileDescription] = React.useState({valid: true, errorMsg: ''});

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
        setValidProfileName({valid: e.target.validity.valid, errorMsg: e.target.validationMessage})
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
        setValidProfileDescription({valid: e.target.validity.valid, errorMsg: e.target.validationMessage})
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm 
          name="profile" 
          title="Редактировать профиль"
          buttonTxt={props.buttonTxt}
          isOpen={props.isOpen}
          onClose={props.onClose}
          buttonEnabled={validProfileName.valid&&validProfileDescription.valid}
          onSubmit={handleSubmit}
        >
          <>
            <input 
                type="text" 
                placeholder="Имя" 
                className={`popup__input popup__input_profile_name${(!validProfileName.valid) ? " popup__input_type_error" : ""}`} 
                name="profile-name" 
                minLength="2" 
                maxLength="40" 
                value={name}
                onChange={handleChangeName}
                required />
            <span className="popup__input-error profile-name-input-error popup__input-error_active">{validProfileName.errorMsg}</span>
            <input 
                type="text" 
                placeholder="Профессия" 
                className={`popup__input popup__input_profile_description${(!validProfileDescription.valid) ? " popup__input_type_error" : ""}`} 
                name="profile-description" 
                minLength="2" 
                maxLength="200"
                value={description}
                onChange={handleChangeDescription}
                required />
            <span className="popup__input-error profile-description-input-error popup__input-error_active">{validProfileDescription.errorMsg}</span>
          </>
        </PopupWithForm>
    )
}

export default EditProfilePopup;