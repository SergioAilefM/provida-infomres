import React, { useRef } from 'react';
import { USUARIOS_PAGE_LABELS } from '@constants/usuariosPageLabels';
import { Usuarios as dataUsuario } from '@services/usuarios/UsuariosModel';
import { Perfiles } from '@services/perfiles/PerfilesModel';
import SearchGrid from '@molecules/SearchGrid';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import SelectRowCheckbox from '@molecules/SelectRowCheckbox';
import ButtonExcelGestion from '@molecules/ButtonExcelGestion';
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    PaginationState,
    // SortingFn,
    // createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    // sortingFns,
    useReactTable,
} from '@tanstack/react-table';
import {
    RankingInfo,
    rankItem,
    // compareItems,
} from '@tanstack/match-sorter-utils';

import dataUsuarios from './usuariosData.json'
import dataPefil from '../perfil/dataperfil.json'

const defaultData: dataUsuario[] = dataUsuarios.usuarios;
const defaultDataPerfil: Perfiles[] = dataPefil;


declare module '@tanstack/react-table' {
    // add fuzzy filter to the filterFns
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)
    // Store the itemRank info
    addMeta({
        itemRank,
    })
    // Return if the item should be filtered in/out
    return itemRank.passed
};

function Usuarios() {
    // console.log(window.config);
    const [data, setData] = React.useState(() => [...defaultData]);
    const [estadoButtonAgregar, setestadoButtonAgregar] = React.useState(false);
    const [estadoButtonQuitar, setestadoButtonQuitar] = React.useState(false);
    const [detalleGrid, setdetalleGrid] = React.useState(false)
    const [dataPerfil, setDataPerfil] = React.useState(() => [...defaultDataPerfil]);
    const tableRef = useRef(null);
    const tableRefperfil = useRef(null);
    console.log(setData);

    // console.log(setDataPerfil);    // const rerender = React.useReducer(() => ({}), {})[1];
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [rowSelection, setRowSelection] = React.useState({});
    console.log(rowSelection);
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    })

    const columns = React.useMemo<ColumnDef<dataUsuario>[]>(
        () => [
            {
                id: 'select',
                cell: ({ row }) => (
                    <div className="px-1">
                        <SelectRowCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            {

                accessorKey: 'cod_usuario',
                cell: info => info.getValue(),
                header: () => <span>Usuario</span>,
                // footer: props => props.column.id,
            },
            {
                accessorFn: row => row.nombre,
                id: 'nombre',
                cell: info => info.getValue(),
                header: () => <span>Nombre</span>,
                // footer: props => props.column.id,
            },
            {
                accessorKey: 'rut',
                header: () => 'Rut',
                // footer: props => props.column.id,
            }
        ],
        []
    );


    const columnsDetalle = React.useMemo<ColumnDef<Perfiles>[]>(
        () => [
            {
                id: 'select',
                cell: ({ row }) => (
                    <div className="px-1">
                        <SelectRowCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            {

                accessorKey: 'cod_perfil',
                cell: info => info.getValue(),
                header: () => <span>Perfil</span>,
                // footer: props => props.column.id,
            },
            {
                accessorFn: row => row.glosa_perfil,
                id: 'glosa_perfil',
                cell: info => info.getValue(),
                header: () => <span>Glosa perfil</span>,
                // footer: props => props.column.id,
            },
            {
                accessorKey: 'des_perfil',
                cell: info => info.renderValue(),
                header: () => <span>Des. Perfil</span>,
                // footer: info => info.column.id,
            },
            {
                accessorKey: 'des_gerencia',
                header: () => <span>Des. gerencia</span>,
                // footer: info => info.column.id,
            },
            {
                accessorKey: 'comentario',
                header: () => <span>Comenatario</span>,
                // footer: info => info.column.id,
            }
        ],
        []
    );



    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            columnFilters,
            globalFilter,
            rowSelection,
            pagination,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        globalFilterFn: 'fuzzy',
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const tableDetalle = useReactTable({
        data: dataPerfil,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {},
        columns: columnsDetalle,
        getCoreRowModel: getCoreRowModel()
    })

    React.useEffect(() => {
        if (Object.keys(table.getState().rowSelection).length === 0) {
            setestadoButtonAgregar(false);
            setdetalleGrid(false);
            setDataPerfil(defaultDataPerfil);
        } else {
            setestadoButtonAgregar(true);
        }
    }, [table.getState().rowSelection]);

    React.useEffect(() => {
        if (Object.keys(tableDetalle.getState().rowSelection).length === 0) {
            setestadoButtonQuitar(false);
            // setdetalleGrid(false);
           // setDataPerfil(defaultDataPerfil);
        } else {
            setestadoButtonQuitar(true);
        }
    }, [tableDetalle.getState().rowSelection]);

    // table.getSelectedRowModel().flatRows
    // table.getState().rowSelection
    // console.log(Object.keys(table.getState().rowSelection).length);
    const onClickselectdata = () => {
        // console.log(table.getSelectedRowModel().flatRows);
        setdetalleGrid(true);
    };

    const onclickLimpiar = () => {
        table.resetRowSelection(true);
    }


    const removeRows = () => {
        const result = tableDetalle.getSelectedRowModel().rows.map(row =>
            dataPerfil.filter((_row: Perfiles, index: number) => index !== row.index)
        );
       
        console.log(result);
        setDataPerfil(result[0]);
        tableDetalle.resetRowSelection(true);
    }


    React.useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'cod_usuario') {
            if (table.getState().sorting[0]?.id !== 'cod_usuario') {
                table.setSorting([{ id: 'cod_usuario', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id]);

    return (
        <Container>
            <Row>
                <Col>
                    <h3> {USUARIOS_PAGE_LABELS.NAME} </h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ButtonExcelGestion currentTableRef={tableRef} nombreArchivo='Gestion-Usuarios' tituloButton='Excel Usuarios' />
                </Col>
                <Col>
                    <SearchGrid
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        className="p-2 font-lg shadow border border-block"
                        placeholder="Buscar en las columnas..."
                    />
                </Col>

            </Row>
            <Row>
                <Table ref={tableRef} responsive="sm" hover>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </Row>
            <Row>
                <Col md={{ span: 1, offset: 1 }}>
                    <Button onClick={onClickselectdata} disabled={!estadoButtonAgregar} >Agregar</Button>
                </Col>
                <Col md={{ span: 3, offset: 3 }}>
                    <div className="flex items-center gap-2">
                        <button type='button'
                            className="border rounded p-1"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<<'}
                        </button>
                        <button type='button'
                            className="border rounded p-1"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<'}
                        </button>
                        <button type='button'
                            className="border rounded p-1"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>'}
                        </button>
                        <button type='button'
                            className="border rounded p-1"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>>'}
                        </button>

                    </div>

                </Col>
                <Col md={{ span: 3, offset: 0 }}>
                    <span className="flex items-center gap-1">
                        <strong>
                            Pagina  {table.getState().pagination.pageIndex + 1} de {' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                </Col>
            </Row>


            <Row>
                <Col>
                    <Table style={{ visibility: detalleGrid ? 'visible' : 'hidden' }} ref={tableRefperfil} responsive="sm" hover>
                        <thead>
                            {tableDetalle.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {tableDetalle.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </Col>
            </Row>
            <Row style={{ visibility: detalleGrid ? 'visible' : 'hidden' }}>
                <Col md={{ span: 1, offset: 1 }}>
                    <Button onClick={removeRows} disabled={!estadoButtonQuitar}>Quitar</Button>
                </Col>
                <Col>
                    <Button onClick={onclickLimpiar}>Limpiar</Button>
                </Col>
                <Col>
                    <ButtonExcelGestion currentTableRef={tableRefperfil} nombreArchivo='Gestion-Usuarios-Perfil' tituloButton='Excel Usuarios-Perfil' />
                </Col>
            </Row>
        </Container>
    );
};

export default Usuarios;