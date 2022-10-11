import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from "./Header";
import Main from './Main';
import Footer from './Footer';
import { logout } from "./Auth";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import avatar from "../images/avatar.svg";



function MainPage (props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({})
    const [buttonTxt, setButtonTxt] = React.useState('');


    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i === props.currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
          .then((newCard) => {
            props.setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
          })
          .catch((err) => {
            console.log(`Изменение статуса карточки не выполнено: ${err}`);
          });
    } 
    
    function handleCardDelete(card) {
        setButtonTxt('Удаление...');
        // Отправляем запрос в API на удаление карточки
        api.deleteCard(card._id)
            .then(() => {
            props.setCards(props.cards.filter((c) => c._id !== card._id));
            closeAllPopups();
            })
            .catch((err) => {
            console.log(`Удаление карточки не выполнено: ${err}`);
            })
            .finally(() => {
            setButtonTxt('Да');
            });
    } 

    function handleEditAvatarClick() {
        setButtonTxt('Сохранить');
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setButtonTxt('Сохранить');
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setButtonTxt('Создать');
        setIsAddPlacePopupOpen(true);
    }

    function handleDeletePlaceClick(card) {
        setButtonTxt('Да');
        setSelectedCard({...card});
        setIsDeletePlacePopupOpen(true);

    }

    function handleCardClick(card) {
        setSelectedCard({...card});
        setIsImagePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeletePlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({});
      }

    function handleUpdateAvatar({avatar}) {
        setButtonTxt('Сохранение...');
        api.changeAvatar(avatar)
            .then((result) => {
            props.setCurrentUser(result);
            closeAllPopups();
            })
            .catch((err) => {
            console.log(`Аватар не изменен: ${err}`);
            })
            .finally(() => {
            setButtonTxt('Сохранить');
            });
    }

    function handleUpdateUser({name, about}) {
        setButtonTxt('Сохранение...');
        api.setProfileInfo({name, about})
            .then((result) => {
            props.setCurrentUser(result);
            closeAllPopups();
            })
            .catch((err) => {
            console.log(`Данные пользователя не обновлены: ${err}`);
            })
            .finally(() => {
            setButtonTxt('Создать');
            });
    }

    function handleAddPlaceSubmit(data) {
        setButtonTxt('Загрузка...');
        api.addCard(data)
            .then((result) => {
                props.setCards([result.card, ...props.cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Добавление карточки не выполнено: ${err}`);
            })
            .finally(() => {
                setButtonTxt('Сохранить');
            });
    }

    function isExit () {
        logout()
            .catch((err) => {
                console.log(`Выход пользователя не выполнено: ${err}`);
            });
        props.setLoggetIn(false);

    }
        
    return (
        <CurrentUserContext.Provider value={props.currentUser}>
            <Header>
            <p className="header__logged-email">{props.loggedEmail}</p>
            <Link to="/sign-in" className="header__logged-link" onClick={isExit}>Выйти</Link>
            </Header>
            <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={props.cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeletePlaceClick}
            />
            <Footer />
            <EditAvatarPopup 
            buttonTxt={buttonTxt}
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup 
            buttonTxt={buttonTxt}
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup 
            buttonTxt={buttonTxt}
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            />
            <DeletePlacePopup 
            buttonTxt={buttonTxt}
            isOpen={isDeletePlacePopupOpen}
            card={selectedCard} 
            onClose={closeAllPopups}
            onDeletePlace={handleCardDelete}
            />
            <ImagePopup 
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
            />
        </CurrentUserContext.Provider>
    )
}

export default MainPage;