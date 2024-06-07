import { PerfilRoles } from "@services/perfiles/PerfilesModel"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<PerfilRoles>()
export const columnsPerfilRoles = [
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
    columnHelper.accessor('cod_rol', {
        header: 'Usuario',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('des_rol', {
        header: 'Rol',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('cod_proceso_rol', {
        header: 'Proceso',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('des_proceso_rol', {
        header: 'Descripcion',
        // footer: info => info.column.id,
    }),
]
