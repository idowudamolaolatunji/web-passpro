import React from 'react'
import Modal from './Modal'
import SpinnerMini from './SpinnerMini'
import { useOutsideClick } from '../hooks/useOutsideClick'

function SearchModal({ setClose, results, loader, message }) {
  console.log(results)
  const isData = results?.events?.length > 0 || results?.tickets?.length > 0

  const ref = useOutsideClick(handleClose);

  function handleClose() {
    setClose(false)
  }


  return (
    <div className="search-bar" ref={ref}>
      {loader && <SpinnerMini />}

      {(!loader && message && !isData) && (
        <p>{message}</p>
      )}

      {(!loader && isData) && (
        <>
          <div>
            <h4>Events</h4>

            {results?.events?.length > 0 ? (
              <div>
                {results?.events?.map(el => (
                  <p>{el?.event_name}</p>
                ))}
              </div>
            ) : (
              <div>
                <p>No Event found</p>
              </div>
            )}
          </div>

          <div>
            <h4>Tickets</h4>

            {results?.tickets?.length > 0 ? (
              <div>
                {results?.tickets?.map(el => (
                  <p>{el?.ticket_name}</p>
                ))}
              </div>
            ) : (
              <div>
                <p>No Ticket found</p>
              </div>
            )}
          </div>

        </>
      )}
    </div>
  )
}

export default SearchModal