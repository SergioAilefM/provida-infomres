import { PerfilFuncionalidad } from "@services/perfiles/PerfilesModel"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<PerfilFuncionalidad>()
export const columnsFuncinalidad = [
    columnHelper.accessor('cod_perfil', {
        header: 'Perfil',
    }),
    columnHelper.accessor(row => row.cod_perfil, {
        id: 'des_perfil',
        // cell: info => <i>{info.getValue()}</i>,
        header: 'Codigo',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('glosa_perfil', {
        header: 'Gerencia',

        // footer: info => info.column.id,
    }),
    columnHelper.accessor('cod_rol', {
        header: 'Glosa',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('des_rol', {
        header: 'Usuario',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('glosa_rol', {
        header: 'Nombre',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('cod_proceso_rol', {
        header: 'Rut',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('des_proceso_rol', {
        header: 'Gerencia',

        // footer: info => info.column.id,
    }),
    columnHelper.accessor('cod_funcionalidad', {
        header: 'Glosa',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('des_funcionalidad', {
        header: 'Usuario',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('glosa_funcionalidad', {
        header: 'Nombre',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('cod_proceso_funcionalidad', {
        header: 'Rut',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('des_proceso_funcionalidad', {
        header: 'Glosa',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('glosa_final', {
        header: 'Usuario',
        // footer: info => info.column.id,
    }),
    columnHelper.accessor('des_criticidad', {
        header: 'Nombre',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('comentario_criticidad', {
        header: 'Rut',
        // footer: info => info.column.id,
    }),
]