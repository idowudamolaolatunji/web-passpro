import React from 'react'
import DataTable from 'react-data-table-component';
import SpinnerMini from './SpinnerMini';


const customStyles = {
    table: {
        style: {
            overflowX: 'auto',
            fontFamily: "inherit",
            color: "inherit",
        },
    },
    head: {
        style: {
            fontSize: "1.38rem",
            fontWeight: "500",
            height: "5rem",
        },
    },
    rows: {
        style: {
            minHeight: "6rem",
            cursor: 'pointer',
            fontSize: "1.32rem",
            fontWeight: 500,
            color: "#444444"
        },
    },
    headCells: {
        style: {
            paddingRight: '0.5rem',
            backgroundColor: '#FC6435',
            color: '#fff',
            height: "5rem",
        },
    },
    cells: {
        style: {
            textAlign: 'center'
        }
    }
};

function TableUI({ title, data, columns, loader, EmptyComponent, pagination=true }) {
  return (
    <div className="table--container">
        <DataTable
            title={title}
            data={data}
            columns={columns}
            noDataComponent={EmptyComponent}
            fixedHeader
            pagination={pagination}
            progressComponent={<SpinnerMini />}
            progressPending={loader}
            customStyles={customStyles}
        />
    </div>
  )
}

export default TableUI