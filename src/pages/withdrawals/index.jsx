import React from 'react'
import PageTop from '../../components/PageTop'
import DataTable from 'react-data-table-component'
import { BiMoneyWithdraw } from 'react-icons/bi';
import Empty from '../../components/Empty';


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
  const withdrawals = [];

  const columns = [];


  return (
    <>
    <PageTop title="Withdrawal History" />
  

    <DataTable
        data={withdrawals}
        columns={columns}
        noDataComponent={<Empty text="No Withdrawal Yet" icon={<BiMoneyWithdraw />} />}
        fixedHeader
        customStyles={customStyles}
      />

    </>
  )
}

export default index