import { useAppContext } from '@hooks/useAppContext'
import { useError } from '@hooks/useError'
import { getAxiosInstanceOAUTH } from '@axios/index'

export const useInitSiteMinderSession = () => {
    const {
        appState,
        setCode,
        setAccessToken,
        setUserId,
        setIdToken,
        setExpiredIn,
        setIsLoggedIn,
        setTokenType,
    } = useAppContext()
    const { errorHandler } = useError()
    const { session, configuration } = appState
    const { RESPONSE_TYPE, SCOPE, CLIENT_ID, REDIRECT_URI } = window.config
        .SECURITY?.TOKEN_OAUTH_2_USER_ID || {
        RESPONSE_TYPE: null,
        SCOPE: null,
        CLIENT_ID: null,
        REDIRECT_URI: null,
    }

    const axiosInstance = getAxiosInstanceOAUTH()

    // This function calls the token endpoint of the OIDC service to exchange the authorization code for an access token
    // It is called after the user is redirected back to the application with the authorization code
    // The authorization code is passed in the query string
    // It uses the axios library to make a request to the token endpoint
    // The token endpoint requires the following parameters:
    //   - response_type: "code"
    //   - scope: "openid"
    //   - client_id: the client id of the application
    //   - redirect_uri: the redirect uri of the application
    //   - grant_type: "authorization_code"
    //   - code: the authorization code returned from the authorization endpoint
    //   - authorization_code: the authorization code returned from the authorization endpoint
    async function callToken() {
        const response = await axiosInstance.post(
            `/affwebservices/CASSO/oidc/token?response_type=${RESPONSE_TYPE}&scope=${SCOPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code&code=${session.code}&authorization_code`,
        )
        return response
    }

    // The function callRevocationEndPoint() calls the revocation endpoint of the OIDC provider to revoke the access token.
    // It uses the access token that is stored in the session to authenticate with the OIDC provider and revoke the access token.
    // The function is called when a user clicks on the Logout button.

    async function callRevocationEndPoint() {
        const response = await axiosInstance.post(
            `/affwebservices/CASSO/oidc/revoke?token=${session.accessToken}&token_type_hint=access_token&client_id=${CLIENT_ID}`,
        )
        return response
    }

    // This function is used to clear all the user states and logs out the user.
    // It also redirects the user to the local logout page if the app is running in local environment.
    function cleanLogout() {
        setCode(null)
        setAccessToken(null)
        setUserId(null)
        setIdToken(null)
        setExpiredIn(null)
        setIsLoggedIn(false)
        setTokenType(null)

        if (window.config.APP_ENV !== 'local')
            window.open(
                `${configuration?.OAUTH_API_BASE_URL}/siteminderagent/forms/msrlogout.fcc`,
                '_self',
            )
    }

    // siteMinderLogin()  that performs an authentication process using the SiteMinder API. The function follows the OAuth2 authorization flow and requests information from the user. Here is a detailed description of each step of the process:
    // The siteMinderLogin function is declared as asynchronous, which allows you to use await to wait for promises to resolve before continuing with code execution.
    // A try block is used to handle errors. If something goes wrong during execution, the control flow will go to the catch block and the error will be handled.
    // Inside the try block, a GET request is made using axiosInstance to get the authorization URL. Parameters such as response_type, scope, client_id, and redirect_uri are included.
    // A URL object named responseURL is created from the response URL obtained in the previous step. Then, the value of the URL parameter code is extracted using searchParams.get.
    // The code value is saved using Promise.all and setCode(code).
    // The callToken() function is called to get an access token and waits for it to resolve using await.
    // A POST request is made to get user information using the access token obtained in the previous step.
    // accessToken, idToken, expiresIn, tokenType, and userId are extracted from the responses obtained in steps 6 and 7. The format of the userId is also adjusted by removing leading zeros.
    // All information obtained in step 8 is saved using Promise.all and various set functions (such as setAccessToken, setIdToken, etc.).
    // If something goes wrong during execution, the catch block catches the error and handles it using the errorHandler function, with the DIRECTCALL.LOGIN parameter indicating the context in which the error occurred.
    // This siteMinderLogin function can be used to authenticate users in applications that use SiteMinder as an authentication provider.

    async function siteMinderLogin() {
        try {
            const responseAuthorize = await axiosInstance.get(
                `/affwebservices/CASSO/oidc/authorize?response_type=${RESPONSE_TYPE}&scope=${SCOPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
            )
            const responseURL = new URL(responseAuthorize.request.responseURL)
            const code = responseURL.searchParams.get('code')
            await Promise.all([setCode(code)])
            const responseToken = await callToken()
            const responseUserInfo = await axiosInstance.post(
                `/affwebservices/CASSO/oidc/userinfo?access_token=${responseToken.data?.access_token}`,
            )
            const [accessToken, idToken, expiresIn, tokenType, userId] = [
                responseToken.data?.access_token,
                responseToken.data?.id_token,
                new Date().getTime() + responseToken.data?.expires_in * 1000,
                responseToken.data?.token_type,
                responseUserInfo.data?.UserID.replace(/^(0+)/g, ''),
            ]

            await Promise.all([
                setAccessToken(accessToken),
                setIdToken(idToken),
                setExpiredIn(expiresIn),
                setTokenType(tokenType),
                setUserId(userId),
            ])
        } catch (error) {
            errorHandler(error)
        }
    }

    // this function is used to log out a user
    // it calls the revocation endpoint to log out the user from the auth server
    // and then cleans up the session
    function logOut() {
        if (window.config.APP_ENV !== 'local') {
            callRevocationEndPoint()
                .then(res => {
                    cleanLogout()
                })
                .catch(err => {
                    cleanLogout()
                })
        } else {
            cleanLogout()
        }
    }

    return {
        callToken,
        siteMinderLogin,
        logOut,
    }
}
