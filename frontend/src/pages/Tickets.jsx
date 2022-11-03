import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton"
import { Navigate } from 'react-router-dom'
import TicketItem from '../components/TicketItem'

export default function Tickets(){

    const dispatch= useDispatch()
    const ticketState= useSelector(state=>state.tickets)
    const {tickets,  isSuccess, isLoading}= ticketState

    /*useEffect(()=>{
        if (isSuccess){
            dispatch(reset())
        }
    }, [dispatch, isSuccess])*/

    useEffect(()=>{
        dispatch(getTickets())
    }, [dispatch])

    if(isLoading){
        //return <Spinner />
    }

    return (
        <div>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
            ))}        
        </div>
    )
}