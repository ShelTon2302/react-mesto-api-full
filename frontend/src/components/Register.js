import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";
import { register } from "./Auth";

function Register (props) {
    const [regEmail, setRegEmail] = React.useState('');
    const [regPass, setRegPass] = React.useState('');

    function handleChangeRegEmail(e) {
        setRegEmail(e.target.value);
    }

    function handleChangeRegPassword(e) {
        setRegPass(e.target.value);
    }

    function clearRegInputs () {
        setRegEmail('');
        setRegPass('');
    }
    
    function handleRegSubmit(e) {
        e.preventDefault();
        register(regEmail, regPass)
          .then ((res) => {
            if(res){
                props.handleChangeAuthStatus({
                    msg: 'Вы успешно зарегистрировались!',
                    error: false
                });
                props.handleTooltipClick();
                props.history.push('/sign-in');
            } else {
                props.handleChangeAuthStatus({
                    msg: 'Что-то пошло не так! Попробуйте ещё раз.',
                    error: true
                });
                props.handleTooltipClick();
            }
          })
          .finally(clearRegInputs());
          
      }

    return (
        <>
            <Header>
                <Link to="/sign-in" className="header__link" onClick={clearRegInputs}>Войти</Link>
            </Header>
            <AuthForm
                titleTxt="Регистрация"
                buttonTxt="Зарегистрироваться"
                email={regEmail}
                pass={regPass}
                handleChangeEmail={handleChangeRegEmail}
                handleChangePassword={handleChangeRegPassword}
                hiddenTxt={false}
                clearAuthInputs={clearRegInputs}
                onSubmit={handleRegSubmit}
            />
            <InfoTooltip 
                state={props.authStatus}
                isOpen={props.isInfoTooltipOpen}
                onClose={props.closeAllPopups}
            />
        </>
    )
}

export default Register;