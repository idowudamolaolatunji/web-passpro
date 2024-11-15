import React, { useState } from 'react'
import PageTop from '../../components/PageTop'
import DataTable from 'react-data-table-component'
import { useFetchedContext } from '../../context/FetchedContext'
import Empty from '../../components/Empty';
import { BsCalendarEvent } from 'react-icons/bs';

function index() {
  const { events, loader, error } = useFetchedContext();

  // const events = ["id"] 
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
    <>

      <PageTop title="All Events" />

    <div className="table--container">
      <DataTable
        data={events}
        columns={columns}
        noDataComponent={<Empty text="No Events Yet" icon={<BsCalendarEvent />} />}
        fixedHeader
        />
      </div>

    </>
  )
}

export default index