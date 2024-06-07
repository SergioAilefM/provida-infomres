import React from 'react';
import { Button } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";

function ButtonSingOut() {
    const { instance } = useMsal();    
    const handleLogout = (logoutType: string) => {
         console.log(logoutType);
        instance.logoutPopup({
            mainWindowRedirectUri: "/",
        });

    };
    return (
        <Button variant="primary" onClick={() => handleLogout("popup")}>Cerrar Session</Button>
    );

}

export default ButtonSingOut;