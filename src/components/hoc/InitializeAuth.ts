import { AccountInfo, AuthenticationResult, Configuration, EventMessage, EventType, IPublicClientApplication, PopupRequest, PublicClientApplication } from "@azure/msal-browser";

export type AppProps = {
    pca: IPublicClientApplication;
};

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: '5b28215a-b2ae-4f89-b503-64682c855649',
        authority: 'https://login.microsoftonline.com/4afb0768-bd69-41f5-bea5-5cdc2ef41822',
        redirectUri: '/',
        postLogoutRedirectUri: '/',
    },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ["User.Read"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me",
};
// Add here the list of roles used by the app
export const appRoles = {
    PrecontabilidadWrite: "Precontabilidad.write",
    PrecontabilidadRead: "Precontabilidad.read"
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account as AccountInfo;
        msalInstance.setActiveAccount(account);
    }
});