/* eslint-disable react-hooks/rules-of-hooks */
import { QueryClient } from 'react-query'

export const defaultQueryClientOptions = {
    queries: {
        staleTime: 600000,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    },
}

export const queryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: { ...defaultQueryClientOptions.queries },
        },
    })
}
