import React from 'react';
import { Button } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@hoc/InitializeAuth";

function ButtonSingIn() {
    const { instance } = useMsal();
    const handleLogin = (loginType: string) => {
        instance.loginPopup(loginRequest);
        console.log(loginType);
    };
    return (
        <Button variant="primary" onClick={() => handleLogin("popup")} >Iniciar Session</Button>
    );

}

export default ButtonSingIn;