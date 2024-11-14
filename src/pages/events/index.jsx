import React, { useState } from 'react'
import PageTop from '../../components/PageTop'
import DataTable from 'react-data-table-component'
import { useFetchedContext } from '../../context/FetchedContext'
import Empty from '../../components/Empty';

function index() {
  const { events, loader, error } = useFetchedContext();

  const [tab, setTab] = useState("all")

  const columns = [
    {
      name: "Event Title",
      selector: row => row?.event_name
    },
    {
      name: "Organizer",
    },
    {
      name: "Country",
    },
    {
      name: "Featured",
    },
    {
      name: "Event Date",
    },
    {
      name: "Actions",
    }
  ]

  return (
    <div>

      <PageTop title="All Events" />

      <DataTable
        data={events}
        columns={columns}
        noDataComponent={<Empty text="No Event Yet" />}
        noTableHead={false}
        fixedHeader
      />

    </div>
  )
}

export default index