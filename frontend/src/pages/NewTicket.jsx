import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createTicket, reset } from '../features/tickets/ticketSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton"

export default function NewTicket(){
    const authState= useSelector(state=>state.auth)
    const {user}= authState
    const [name]= useState(user.name)
    const [email]= useState(user.email)

    const ticketState= useSelector(state=>state.tickets)
    const {isLoading, isError, isSuccess, message}= ticketState
    const [product, setProduct]= useState('')
    const [description, setDescription]= useState('')

    const dispatch= useDispatch()
    const navigate= useNavigate()

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset())
    },[dispatch, isError, isSuccess, navigate, message])



    const onSubmit= (event)=>{
        event.preventDefault()
        console.log(product)
        dispatch(createTicket({product, description}))
        if(isLoading){
            return <Spinner />
        }
    }

    return (
        <>
            <BackButton url='/' />
             <section className='form'>
                    <div className='form-group'>
                            <label htmlFor='name'>Customer Name</label>
                            <input type='text' className='form-control' value={name} disabled />
                    </div>

                    <div className='form-group'>
                            <label htmlFor='email'>Customer Email</label>
                            <input type='text' className='form-control' value={email} disabled />
                    </div>
            </section>

            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='product'>Product</label>
                    <select
                        name='product'
                        id='product'
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        >
                        <option value='iPhone'>iPhone</option>
                        <option value='Macbook Pro'>Macbook Pro</option>
                        <option value='iMac'>iMac</option>
                        <option value='iPad'>iPad</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description of the issue</label>
                    <textarea
                        name='description'
                        id='description'
                        className='form-control'
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className='form-group'>
                    <button className='btn btn-block'>Submit</button>
                </div>
            </form>
        </>
    )
}