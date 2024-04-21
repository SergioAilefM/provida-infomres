export const usePIPCommunicationChannel = () => {
    function requestAuthentication(): void {
        if (!window.opener) {
            console.log('window.opener is undefined')
            // TODO: handle error
            return
        }
        setTimeout(() => {
            window.opener.postMessage(
                { message: 'requestAuthenticationOrienta' },
                window.config.PIP_URL,
            )
        }, 3000)
    }

    return {
        requestAuthentication,
    }
}
