import React from 'react'
import PageTop from '../../components/PageTop'
import DataTable from 'react-data-table-component';
import Empty from '../../components/Empty';
import { MdOutlineContactSupport } from 'react-icons/md';


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
          backgroundColor: '#FFEDE5',
          color: '#555',
          height: "5rem",
      },
  },
  cells: {
      style: {
          textAlign: 'center'
      }
  }
};

function index() {
  const supportTickets = []
  const columns = [];
  return (
    <>
    <PageTop title="All Support Tickets" />

    <DataTable
        data={supportTickets}
        columns={columns}
        noDataComponent={<Empty text="No Support Ticket Yet" icon={<MdOutlineContactSupport />} />}
        fixedHeader
      />
    </>
  )
}

export default index