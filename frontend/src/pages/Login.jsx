import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const [formData, setFormData]= useState({
        email: '',
        password: ''
    })

    const {email, password}= formData

    const dispatch= useDispatch()
    const navigate= useNavigate()

    const { user, isLoading, isSuccess, isError, message }= useSelector(state=>state.auth)

    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        if(isSuccess){
            navigate('/')
            dispatch(reset())
        }
    }, [isError, isSuccess, user, message, navigate, dispatch]);


    const onChange= (event)=>{
        setFormData((prevState)=>(
            { ...prevState, [event.target.name]: event.target.value }
        ))
    }

    const onSubmit= (event)=>{
        event.preventDefault()
        const userData= {
            email, password
        }
        dispatch(login(userData))
    }

    if (isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder='Enter your email' required />
                        <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder='Enter password' required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}