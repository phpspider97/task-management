import React from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import {useUserRegisterationMutation} from '../redux/api/UserApi.js'
const Register = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [userRegister] = useUserRegisterationMutation()
    const submitForm = (data) => {
        userRegister(data).then((response)=>{
            navigate('/')
        }).catch((err)=>{
            console.log(`Error : ${err.message}`)
        })
    }
    return (
        <div className="main-div">
            <div className="row p-4">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Name" {...register("name", { required: true })}/>
                        {errors.name && <span className="error-message">This field is required</span>}

                        <input type="text" className="form-control mt-4" placeholder="Email" {...register("email", { required: true })}/>
                        {errors.email && <span className="error-message">This field is required</span>}

                        <input type="password" className="form-control mt-4" placeholder="Password" {...register("password", { required: true })}/>
                        {errors.password && <span className="error-message">This field is required</span>}
                    </div>
                    <div className="col-md-12 mt-4">
                        <button type="submit" className="btn btn-success w-100">Submit</button>
                    </div>
                    <div className="col-md-12 row mt-4"> 
                        <span className="mt-3 col-md-6 text-left"><Link className="link-style" to='/'>Login</Link></span>
                        <span className="mt-3 col-md-6 text-left"><Link className="link-style" to='/reset'>Reset Password</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register