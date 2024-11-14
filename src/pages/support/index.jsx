import React from 'react'
import PageTop from '../../components/PageTop'
import DataTable from 'react-data-table-component';
import Empty from '../../components/Empty';
import { MdOutlineContactSupport } from 'react-icons/md';

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