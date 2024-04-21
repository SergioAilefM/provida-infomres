import { useQuery } from 'react-query'
import type { Response } from '@axios/types'
import { getAxiosInstance } from '@axios/index'
import { queryKeys } from './reactQuery/queryKeys'

export async function getSpecialtyDataById(
    specialtyId: number,
): Promise<Response> {
    const { data } = await getAxiosInstance().get(`/specialty/${specialtyId}`)

    return data.specialty
}

export function useGetSpecialtyDataById(specialtyId: number): any | undefined {
    const data = useQuery([queryKeys.necessity, specialtyId], () =>
        getSpecialtyDataById(specialtyId),
    )

    return data
}
