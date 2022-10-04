function PopupWithForm({ name, title, buttonTxt, isOpen, onClose, buttonEnabled, onSubmit, children}) {
    return (
        <div className={`popup popup_${name}${isOpen ? ' popup_visible' : ''}`}>
            <div className={`popup__window popup__window_${name}`}>
                <button type="button" className={`popup__close-button popup__close-button_${name}`} aria-label="Закрыть окно" onClick={onClose}></button>
                <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
                <form className={`popup__form popup__form_profile" name="${name}`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className={`popup__save-button popup__save-button_${name}`} disabled={!buttonEnabled}>{buttonTxt}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;