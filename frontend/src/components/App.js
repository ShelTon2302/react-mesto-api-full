import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/Api";
import Register from "./Register";
import Login from "./Login";
import MainPage from "./MainPage";
import { getContent } from "./Auth";
import avatar from "../images/avatar.svg";

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    about: "Исследователь океана",
    name: "Жак-Ив Кусто",
    avatar
  });
  const [cards, setCards] = React.useState([]);
  const [authStatus, setAuthStatus] = React.useState({});
  const [loggedIn, setLoggetIn] = React.useState(false);
  const [loggedEmail, setLoggetEmail] = React.useState('')
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  React.useEffect(() => {
    api.getCardList()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.log(`Данные карточек не загружены: ${err}`);
      });
  
    api.getProfileInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(`Данные пользователя не загружены: ${err}`);
      });

    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      // здесь будем проверять токен
      getContent(token)
        .then((res) => {
          if (res) {
            setLoggetIn(true);
            setLoggetEmail(res.data.email);
            history.push('/');
          }
        });
    }
  },[]);

  function handleChangeAuthStatus(data) {
    setAuthStatus({
      msg: data.msg,
      error: data.error
    });
  }

  function handleChangeLoggedIn(data) {
    setLoggetIn(data);
  }

  function handleSetCard (data) {
    setCards(data);
  }

  function handleSetCurrentUser (data) {
    setCurrentUser(data);
  }

  function closeTooltipPopup() {
    setIsInfoTooltipOpen(false);
  }

  function handleTooltipClick () {
    setIsInfoTooltipOpen(true);
  }
  
  return (
    <div className="page">
      <Switch>
        <Route path="/sign-up">
            <Register 
              authStatus={authStatus}
              handleChangeAuthStatus={handleChangeAuthStatus}
              handleTooltipClick={handleTooltipClick}
              history={history}
              isInfoTooltipOpen={isInfoTooltipOpen}
              closeAllPopups={closeTooltipPopup}
            />
        </Route>
        <Route path="/sign-in">
            <Login 
              authStatus={authStatus}
              handleChangeAuthStatus={handleChangeAuthStatus}
              handleChangeLoggedIn={handleChangeLoggedIn}
              setLoggetIn={setLoggetIn}
              handleTooltipClick={handleTooltipClick}
              history={history}
              isInfoTooltipOpen={isInfoTooltipOpen}
              closeAllPopups={closeTooltipPopup}
            />

        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={MainPage}
          currentUser={currentUser}
          setCurrentUser={handleSetCurrentUser}
          cards={cards}
          setCards={handleSetCard}
          loggedEmail={loggedEmail}
          setLoggetIn={handleChangeLoggedIn}
        />
      </Switch>
    </div>
  );
}

export default App;
