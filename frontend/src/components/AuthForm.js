import React from "react";
import { Link } from "react-router-dom";

function AuthForm (props) {
    return (
        <div className="auth">
            <h2 className="auth__title">{props.titleTxt}</h2>
            <form className="auth__form" name="Auth" onSubmit={props.onSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className={`auth__input auth__input_email`}
                    name="auth-email"
                    value={props.email}
                    onChange={props.handleChangeEmail} 
                    required />
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    className={`auth__input auth__input_password`} 
                    name="auth-password"
                    value={props.pass}
                    onChange={props.handleChangePassword}
                    required />
                <button type="submit" className={`auth__button`}>{props.buttonTxt}</button>
            </form>
            <p className={`auth__text${props.hiddenTxt ? " auth__text_hidden" : ""}`}>Уже зарегистрированы? <Link to="/sign-in" className="auth__link" onClick={props.clearAuthInputs}>Войти</Link></p>
        </div>
    )
}

export default AuthForm;