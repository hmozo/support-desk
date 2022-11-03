import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

export default function Register(){
    const [formData, setFormData]= useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const {name, email, password, password2}= formData

    const dispatch= useDispatch()
    const navigate= useNavigate()

    const { user, isLoading, isError, isSuccess, message }= useSelector(state=>state.auth)

    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        if(isSuccess){
            console.log("User: " + user)
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

        if(password!==password2){
            toast.error('Passwords do not match')
        }else{
            const userData={
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if (isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register {user && user.name}
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id='name' name='name' value={name} onChange={onChange} placeholder='Enter your name' required />
                        <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder='Enter your email' required />
                        <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder='Enter password' required />
                        <input type="password" className="form-control" id='password2' name='password2' value={password2} onChange={onChange} placeholder='Confirm password' required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}