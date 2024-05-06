import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import ButtonSingIn from "./ButtonSingIn";
import ButtonSingOut from "./ButtonSingOut";
import { InteractionStatus } from "@azure/msal-browser";

const ButtonSignInSignOut = () => {
    const { inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated) {
        return < ButtonSingOut />;
    } else if (
        inProgress !== InteractionStatus.Startup &&
        inProgress !== InteractionStatus.HandleRedirect
    ) {
        // inProgress check prevents sign-in button from being displayed briefly after returning from a redirect sign-in. Processing the server response takes a render cycle or two
        return <ButtonSingIn />;
    } else {
        return null;
    }
};

export default ButtonSignInSignOut;
