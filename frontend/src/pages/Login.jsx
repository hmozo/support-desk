import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Login(){
    const [formData, setFormData]= useState({
        email: '',
        password: ''
    })

    const {email, password}= formData

    const onChange= (event)=>{
        setFormData((prevState)=>(
            { ...prevState, [event.target.name]: event.target.value }
        ))
    }

    const onSubmit= (event)=>{
        event.preventDefault()
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