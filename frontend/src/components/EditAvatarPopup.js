import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    //создаеф реф
    const avatarLink = React.useRef({current: ''});
    const [validAvatarLink, setValidAvatarLink] = React.useState({valid: true, errorMsg: ''});

    function handleChangeLink() {
        setValidAvatarLink({valid: avatarLink.current.validity.valid, errorMsg: avatarLink.current.validationMessage})
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
          avatar: avatarLink.current.value
        });

        avatarLink.current.value = '';
    }

    return (
        <PopupWithForm 
        name="avatar" 
        title="Обновить аватар" 
        buttonTxt={props.buttonTxt}
        isOpen={props.isOpen}
        onClose={props.onClose}
        buttonEnabled={validAvatarLink.valid}
        onSubmit={handleSubmit}
        >
            <>
                <input 
                    type="url"
                    ref={avatarLink} 
                    placeholder="Ссылка на аватар" 
                    className={`popup__input popup__input_avatar_src${(!validAvatarLink.valid) ? " popup__input_type_error" : ""}`} 
                    name="avatar-src"
                    onChange={handleChangeLink}
                    required />
                <span className="popup__input-error avatar-src-input-error popup__input-error_active">{validAvatarLink.errorMsg}</span>
            </>
        </PopupWithForm>
    )
    
}

export default EditAvatarPopup;