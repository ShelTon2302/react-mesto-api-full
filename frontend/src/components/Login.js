import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";
import { login } from "./Auth";

function Login (props) {
  const [logEmail, setLogEmail] = React.useState('');
  const [logPass, setLogPass] = React.useState('');


  function handleChangeLogEmail(e) {
      setLogEmail(e.target.value);
  }

  function handleChangeLogPassword(e) {
      setLogPass(e.target.value);
  }

  function clearLogInputs () {
      setLogEmail('');
      setLogPass('');
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    login(logEmail, logPass)
      .then ((res) => {
        console.log(res);
        if(res){
          props.handleChangeLoggedEmail(logEmail);
          props.handleSetCurrentUser({
            about: res.about,
            name: res.name,
            avatar: res.avatar
          })
          props.handleChangeLoggedIn(true);
          props.history.push('/');
        } else {
          props.handleChangeAuthStatus({
            msg: 'Что-то пошло не так! Попробуйте ещё раз.',
            error: true
          });
          props.handleTooltipClick();
        }
      })
      .finally(clearLogInputs());
  }

  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link" onClick={clearLogInputs}>Регистрация</Link>
      </Header>
      <AuthForm
        titleTxt="Вход"
        buttonTxt="Войти"
        name={logEmail}
        pass={logPass}
        handleChangeEmail={handleChangeLogEmail}
        handleChangePassword={handleChangeLogPassword}
        hiddenTxt={true}
        clearAuthInputs={clearLogInputs}
        onSubmit={handleLoginSubmit}
      />
      <InfoTooltip 
        state={props.authStatus}
        isOpen={props.isInfoTooltipOpen}
        onClose={props.closeAllPopups}
      />
    </>
  )
}

export default Login;