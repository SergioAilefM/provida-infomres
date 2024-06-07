import { PerfilesUsuario } from "@services/perfiles/PerfilesModel"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<PerfilesUsuario>()
export const columnsPerfilUsuario = [
    columnHelper.accessor('des_perfil', {
        header: 'Perfil',
    }),
    columnHelper.accessor(row => row.cod_perfil, {
        id: 'cod_perfil',
        // cell: info => <i>{info.getValue()}</i>,
        header: 'Codigo',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('des_gerencia', {
        header: 'Gerencia',

        // footer: info => info.column.id,
    }),
    columnHelper.accessor('glosa_perfil', {
        header: 'Glosa',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('cod_usuario', {
        header: 'Usuario',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('nombre', {
        header: 'Nombre',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('rut', {
        header: 'Rut',
        // footer: info => info.column.id,
    }),
]