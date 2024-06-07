import React, { useRef } from 'react'
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
import './GridGestion.scss'
import SearchGrid from '@molecules/SearchGrid';
import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import SelectRowCheckbox from '@molecules/SelectRowCheckbox';
import ButtonExcelGestion from '@molecules/ButtonExcelGestion';

export interface GridGestionProps {
    hexCode?: string
    width?: string,
    height?: string
};

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
};

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

// const columnHelper = createColumnHelper<Person>()

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

/* const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank!,
            rowB.columnFiltersMeta[columnId]?.itemRank!
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}; */

function GridGestion() {
    // console.log(window.config);
    const [data, setData] = React.useState(() => [...defaultData]);
    const tableRef = useRef(null);
    console.log(setData);
    // const rerender = React.useReducer(() => ({}), {})[1];
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

    const columns = React.useMemo<ColumnDef<Person>[]>(
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

                accessorKey: 'firstName',
                cell: info => info.getValue(),
                // footer: props => props.column.id,
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => info.getValue(),
                header: () => <span>Last Name</span>,
                // footer: props => props.column.id,
            },
            {
                accessorKey: 'age',
                header: () => 'Age',
                // footer: props => props.column.id,
            },
            {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                // footer: props => props.column.id,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                // footer: props => props.column.id,
            },
            {
                accessorKey: 'progress',
                header: 'Profile Progress',
                // footer: props => props.column.id,
            },
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

    React.useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'fullName') {
            if (table.getState().sorting[0]?.id !== 'fullName') {
                table.setSorting([{ id: 'fullName', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id]);

    return (
        <Container>
            <Row>
                <Col>
                    <ButtonExcelGestion currentTableRef={tableRef} nombreArchivo='Gestion-Usuarios' tituloButton='Excel Usuarios' />
                </Col>
                <Col>
                    <SearchGrid
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        className="p-2 font-lg shadow border border-block"
                        placeholder="Search all columns..."
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
                <Col md={{ span: 4, offset: 4 }}>
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
                <Col md={{ span: 2, offset: 2 }}>
                    <span className="flex items-center gap-1">
                        <strong>
                            Pagina  {table.getState().pagination.pageIndex + 1} de {' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                </Col>
            </Row>


        </Container>
    )
}

export default GridGestion;
