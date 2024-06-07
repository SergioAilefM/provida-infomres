import { useQuery } from 'react-query'
import { getAxiosInstance } from '@axios/index'
import { useAppContext } from '@hooks/useAppContext'
import { Roles } from '../RolesModel'


export async function fetchGetRoles(
  id: number,
): Promise<Roles> {
  const { data } = await getAxiosInstance().get(
    `/roles/${id}`,
  )
  return data
}

export function useGetRoles(
  id: number,
): any | undefined {
  const { appState } = useAppContext()
  const response  = useQuery({
    queryKey: ['getRoles', id],
    queryFn: () =>
    fetchGetRoles ( id )
  }
  )
  return response
}
