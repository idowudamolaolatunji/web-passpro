import React from 'react'
import PageTop from '../../components/PageTop'
import DataTable from 'react-data-table-component'
import { BiMoneyWithdraw } from 'react-icons/bi';
import Empty from '../../components/Empty';

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
      />

    </>
  )
}

export default index