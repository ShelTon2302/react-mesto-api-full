import React from "react";
import Auth from "./Auth";

function Register() {
    const [regName, setRegName] = React.useState('');
    const [regPass, setRegPass] = React.useState('');

    function handleChangeName(e) {
        console.log(e);
        setRegName(e.target.value);
        //setValidRegName({valid: e.target.validity.valid, errorMsg: e.target.validationMessage})
    }

    function handleChangePassword(e) {
        setRegPass(e.target.value);
        //setValidProfileDescription({valid: e.target.validity.valid, errorMsg: e.target.validationMessage})
    }

    console.log("reg", regName, regPass);

    return (
        <Auth
            titleTxt="Регистрация"
            buttonTxt="Зарегистрироваться"
            name={regName}
            pass={regPass}
            handleChangeName={handleChangeName}
            handleChangePassword={handleChangePassword}
            hiddenTxt={false}
        />
    )
}

export default Register;