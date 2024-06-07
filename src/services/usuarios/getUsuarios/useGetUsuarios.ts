import { useQuery } from 'react-query'
import { getAxiosInstance } from '@axios/index'
import { useAppContext } from '@hooks/useAppContext'
import { Usuarios } from '../UsuariosModel'


export async function fetchGetUsuarios(
  id: number,
): Promise<Usuarios> {
  const { data } = await getAxiosInstance().get(
    `/Usuarios/${id}`,
  )
  return data
}

export function useGetUsuarios(
  id: number,
): any | undefined {
  const { appState } = useAppContext()
  const response  = useQuery({
    queryKey: ['getUsuarios', id],
    queryFn: () =>
    fetchGetUsuarios ( id )
  }
  )
  return response
}
