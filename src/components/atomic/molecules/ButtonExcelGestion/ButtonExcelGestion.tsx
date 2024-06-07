import React from 'react';
import './ButtonExcelGestion.scss';
import * as XLSX from "xlsx";
import { Button } from 'react-bootstrap';

export interface ButtonExcelGestionProps {
    currentTableRef: React.MutableRefObject<null>,
    nombreArchivo?: string,
    tituloButton: string,
}

function ButtonExcelGestion({ currentTableRef, nombreArchivo, tituloButton }: ButtonExcelGestionProps) {
    const onDescarga = () => {
        const table = currentTableRef.current;
        const data = XLSX.utils.table_to_book(table);
        XLSX.writeFile(data, `${nombreArchivo}.xlsx`);
    }

    return (
        <Button
            variant="primary"
            onClick={onDescarga}
        >
            {tituloButton}
        </Button>

    )
}

export default ButtonExcelGestion
