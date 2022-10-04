import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `button element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `button element__like${isLiked ? ' element__like_active' : ''}`
  
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick () {
    props.onCardDelete(props.card);
  }

  return <div className="card-element">
    <div className="element">
      <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить" onClick={handleDeleteClick}></button>
      <div className="element__image-frame">  
        <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      </div>
      <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-group">
          <button type="button" className={cardLikeButtonClassName} aria-label="Нравится" onClick={handleLikeClick}></button>
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  </div>
}

export default Card;