import { MutationCache, QueryCache, QueryClient } from 'react-query'
import { useError } from '@hooks/useError'

export const defaultQueryClientOptions = {
    queries: {
        staleTime: 600000,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    },
}

export const useQueryClient = () => {
    const { errorHandler } = useError()

    const getQueryClient = () => {
        return new QueryClient({
            queryCache: new QueryCache({
                onError: error => {
                    errorHandler(error)
                },
            }),
            mutationCache: new MutationCache({
                onError: error => {
                    errorHandler(error)
                },
            }),
            defaultOptions: {
                queries: { ...defaultQueryClientOptions.queries },
            },
        })
    }
    return [getQueryClient]
}
