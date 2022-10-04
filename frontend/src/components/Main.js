import React from "react";
import Card from "./Card";
import editImg from "../images/edit.svg"
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-area">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
                    <div className="profile__avatar-cover" onClick={props.onEditAvatar}>
                        <img className="profile__avatar-edit" src={editImg} alt="Редактировать аватар" />
                    </div>
                </div>
                <div className="profile-info">
                    <div className="profile-info__group">
                        <h1 className="profile-info__name">{currentUser.name}</h1>
                        <button 
                            type="button" 
                            className="profile-info__edit-button" 
                            aria-label="Редактировать профиль"
                            onClick={props.onEditProfile}
                        />
                    </div>
                    <p className="profile-info__description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" aria-label="Добавить"
                    onClick={props.onAddPlace}
                ></button>
            </section>
            <section className="elements">
                {props.cards.map(item => <Card 
                        key={item._id}
                        card={item}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                )}
            </section>
        </main>
    )
}

export default Main;