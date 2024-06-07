import { useQuery } from 'react-query'
import { getAxiosInstance } from '@axios/index'
import { useAppContext } from '@hooks/useAppContext'
import { Funcionalidad } from '../FuncionalidadModel'


export async function fetchGetFuncionalidad(
  id: number,
): Promise<Funcionalidad> {
  const { data } = await getAxiosInstance().get(
    `/funcionalidad/${id}`,
  )
  return data
}

export function useGetFuncionalidad(
  id: number,
): any | undefined {
  const { appState } = useAppContext()
  const response  = useQuery({
    queryKey: ['getFuncionalidad', id],
    queryFn: () =>
    fetchGetFuncionalidad ( id )
  }
  )
  return response
}
