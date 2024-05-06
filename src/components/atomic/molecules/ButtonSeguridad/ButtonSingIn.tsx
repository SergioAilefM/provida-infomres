import { Button } from "react-bootstrap";
import { Config } from "@services/index";
import { useMsal } from "@azure/msal-react";

const ButtonSingIn = () => {
    const { instance } = useMsal();

    //const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    //const open = Boolean(anchorEl);
  
    const handleLogin = (loginType: string) => {
     // setAnchorEl(null);    
        instance.loginPopup(Config.loginRequest);
     
    };
    return (
        <Button variant="primary" onClick={() => handleLogin("popup")} >Iniciar Session</Button>
    );

}

export default ButtonSingIn;