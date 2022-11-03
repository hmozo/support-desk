import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

export default function Ticket(){

    const { ticket } = useSelector((state) => state.tickets)

    const navigate = useNavigate()
  const dispatch = useDispatch()
  const { ticketId } = useParams()

    useEffect(() => {
        dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
      }, [ticketId, dispatch])

    const onTicketClose = () => {
        // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
        // isSuccess state
        dispatch(closeTicket(ticketId))
          .unwrap()
          .then(() => {
            toast.success('Ticket Closed')
            navigate('/tickets')
          })
          .catch(toast.error)
      }

      if (!ticket) {
        return <Spinner />
      }

    return (
        <div className='ticket-page'>
          <header className='ticket-header'>
            <BackButton />
            <h2>
              Ticket ID: {ticket._id}
              <span className={`status status-${ticket.status}`}>
                {ticket.status}
              </span>
            </h2>
            <h3>
              Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
            </h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className='ticket-desc'>
              <h3>Description of Issue</h3>
              <p>{ticket.description}</p>
            </div>
            <h2>Notes</h2>
          </header>
    
    
          {ticket.status !== 'closed' && (
            <button onClick={onTicketClose} className='btn btn-block btn-danger'>
              Close Ticket
            </button>
          )}
        </div>
      )
}
