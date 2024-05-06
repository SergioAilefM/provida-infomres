import { Button } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { useState } from "react";

const ButtonSingOut = () => {
    const { instance } = useMsal();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleLogout = (logoutType: string) => {
        setAnchorEl(null);

        instance.logoutPopup({
            mainWindowRedirectUri: "/",
        });

    };
    return (
        <Button variant="primary" onClick={() => handleLogout("popup")}>Cerrar Session</Button>
    );

}

export default ButtonSingOut;