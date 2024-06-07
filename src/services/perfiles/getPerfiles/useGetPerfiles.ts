import { useQuery } from 'react-query'
import { getAxiosInstance } from '@axios/index'
import { useAppContext } from '@hooks/useAppContext'
import { Perfiles } from '../PerfilesModel'


export async function fetchGetPerfiles(
  id: number,
): Promise<Perfiles> {
  const { data } = await getAxiosInstance().get(
    `/perfiles/${id}`,
  )
  return data
}

export function useGetPerfiles(
  id: number,
): any | undefined {
  const { appState } = useAppContext()
  const response  = useQuery({
    queryKey: ['getPerfiles', id],
    queryFn: () =>
    fetchGetPerfiles ( id )
  }
  )
  return response
}
