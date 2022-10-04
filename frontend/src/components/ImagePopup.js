function ImagePopup(props) {
    return (
        <div className={`popup popup_img${(props.isOpen) ? ' popup_visible' : ''}`}>
        <div className="popup__window-img">
          <button type="button" className="popup__close-button popup__close-button_img" aria-label="Закрыть окно" onClick={props.onClose}></button>
          <img className="popup__img" src={props.card.link} alt={props.card.name} />
          <h2 className="popup__description">{props.card.name}</h2>
        </div>
      </div>
    )
}

export default ImagePopup;