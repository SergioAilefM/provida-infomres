import { useQuery } from 'react-query'
import { getAxiosInstance } from '@axios/index'
import { SpecialtiesSample } from '../SpecialtiesSampleModel'

export async function fetchGetSpecialtiesSample(): Promise<
    SpecialtiesSample[]
> {
    const { data } = await getAxiosInstance().get(`/specialtiesSample`)
    return data
}

export function useGetSpecialtiesSample(): any | undefined {
    const response = useQuery({
        queryKey: ['getSpecialties'],
        queryFn: () => fetchGetSpecialtiesSample(),
    })
    return response
}
