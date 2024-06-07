import React, { useRef } from 'react';
import { PERFIL_PAGE_LABELS } from '@constants/perfilPageLabels';
// import { Usuarios as dataUsuario } from '@services/usuarios/UsuariosModel';
import { PerfilFuncionalidad, PerfilRoles, Perfiles, PerfilesUsuario } from '@services/perfiles/PerfilesModel';
import SearchGrid from '@molecules/SearchGrid';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
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

import datosPerfilUsuario from './dataperfilusuario.json'
import datosPerfilRoles from './dataperfilroles.json'
import datosPerfilFUncionalidad from './dataperfilfuncionalidad.json'
import dataPefil from './dataperfil.json'
import { columnsPerfilUsuario } from './columnPerfilUsuario';
import { columnsFuncinalidad } from './columnPerfilFuncionalidad';
import { columnsPerfilRoles } from './columnaPerfilRoles';


const defaultDataPerfil: Perfiles[] = dataPefil;
const defaultDataPerfilUsuario: PerfilesUsuario[] = datosPerfilUsuario;
const defaultDataPerfilRoles: PerfilRoles[] = datosPerfilRoles;
const defaultDataPerfilFuncionalidad: PerfilFuncionalidad[] = datosPerfilFUncionalidad;

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

function Perfil() {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(window.config);
    // const [data, setData] = React.useState(() => [...defaultData]);
    const [estadoButtonAgregar, setestadoButtonAgregar] = React.useState(false);
    // const [estadoButtonQuitar, setestadoButtonQuitar] = React.useState(false);
    const [detalleGrid, setdetalleGrid] = React.useState(false)
    const [dataPerfil, setDataPerfil] = React.useState(() => [...defaultDataPerfil]);
    const tableRef = useRef(null);
    const tableRefperfil = useRef(null);
    //  console.log(setData);

     console.log(setDataPerfil);    // const rerender = React.useReducer(() => ({}), {})[1];
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



    const columnsPerfil = React.useMemo<ColumnDef<Perfiles>[]>(
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
        data: dataPerfil,
        columns: columnsPerfil,
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


    const [colunmSelection, setcolunmSelection] = React.useState<any>();
    const [dataSelection, setdataSelection] = React.useState<any>();
    const [isVisible, setisVisible] = React.useState(false);
    const [tituloExcel, settituloExcel] = React.useState('');

    const tableDetalle = useReactTable({
        data: dataSelection,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {},
        columns: colunmSelection,
        getCoreRowModel: getCoreRowModel()
    })
    const onclickAsignarTablas = (codigo: string) => {

        setisVisible(false);
        if (codigo === '000') {
            setcolunmSelection(columnsPerfilUsuario);
            setdataSelection(defaultDataPerfilUsuario);
            settituloExcel('Excel Perfil-Usuario');
            setisVisible(true);
            setdetalleGrid(true);
        } else if (codigo === '001') {
            setcolunmSelection(columnsFuncinalidad);
            setdataSelection(defaultDataPerfilFuncionalidad);
            settituloExcel('Excel Perfil-Funcionalidad');
            setisVisible(true);
            setdetalleGrid(true);
        } else if (codigo === '002') {
            setcolunmSelection(columnsPerfilRoles);
            setdataSelection(defaultDataPerfilRoles);
            settituloExcel('Excel Perfil-Roles');
            setisVisible(true);
            setdetalleGrid(true);
        }

    };
    /*
        React.useEffect(() => {
            if (Object.keys(tableDetalle.getState().rowSelection).length === 0) {
                setestadoButtonQuitar(false);
                // setdetalleGrid(false);
                // setDataPerfil(defaultDataPerfil);
            } else {
                setestadoButtonQuitar(true);
            }
        }, [tableDetalle.getState().rowSelection]);
    */
    React.useEffect(() => {
        if (Object.keys(table.getState().rowSelection).length === 0) {
            setestadoButtonAgregar(false);
            // setdetalleGrid(false);
            // setDataPerfil(defaultDataPerfil);
            setisVisible(false);
            setdetalleGrid(false);
        } else {
            setestadoButtonAgregar(true);
        }
    }, [table.getState().rowSelection]);



    // table.getSelectedRowModel().flatRows
    // table.getState().rowSelection
    // console.log(Object.keys(table.getState().rowSelection).length);

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
                    <h3> {PERFIL_PAGE_LABELS.NAME} </h3>
                    <br />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SearchGrid
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        className="p-2 font-lg shadow border border-block"
                        placeholder="Buscar en la tabla..."
                    />
                </Col>
                <Col>
                    <Form.Group controlId="">
                        <Form.Label>Gerencia </Form.Label>
                        <Form.Select aria-label="Gerencia">
                            <option>Todas</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Sin glosa"
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
                <Col >
                    <Button onClick={() => onclickAsignarTablas('000')} disabled={!estadoButtonAgregar}>Usuarios</Button>
                </Col>
                <Col >
                    <Button onClick={() => onclickAsignarTablas('002')} disabled={!estadoButtonAgregar}>Roles</Button>
                </Col>
                <Col>
                    <Button onClick={() => onclickAsignarTablas('001')} disabled={!estadoButtonAgregar}>Funcionalidades </Button>
                </Col>
                <Col >
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
                <Col >
                    <span className="flex items-center gap-1">
                        <strong>
                            Pagina  {table.getState().pagination.pageIndex + 1} de {' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                </Col>
                <Col>
                    <ButtonExcelGestion currentTableRef={tableRef} nombreArchivo='Gestion-perfil' tituloButton='Excel Perfil' />
                </Col>
                <Col>
                    <Button onClick={handleShow}>Editar</Button>
                </Col>
            </Row>


            <Row>
                <Col>
                    <Table style={{ visibility: detalleGrid ? 'visible' : 'hidden' }} ref={tableRefperfil} responsive="sm" hover>
                        <thead>
                            {isVisible ?
                                tableDetalle.getHeaderGroups().map(headerGroup => (
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
                                ))
                                : ''
                            }
                        </thead>
                        <tbody>
                            {isVisible ?
                                tableDetalle.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                                : ''
                            }
                        </tbody>

                    </Table>
                </Col>
            </Row>
            <Row style={{ visibility: detalleGrid ? 'visible' : 'hidden' }}>

                <Col>
                    <ButtonExcelGestion currentTableRef={tableRefperfil} nombreArchivo='Gestion-Perfil' tituloButton={tituloExcel} />
                </Col>
            </Row>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Perfil XXXXX</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="glosa">
                                <Form.Label>Glosa</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label>Gerencia </Form.Label>
                                <Form.Select aria-label="Gerencia">
                                    <option>Todas</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Comentarios</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default Perfil;