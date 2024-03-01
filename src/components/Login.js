import React from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useUserLoginMutation } from '../redux/api/UserApi.js'
const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [userLogin] = useUserLoginMutation()
    const submitForm = (data) => {
        userLogin(data).then((response)=>{ 
            if(response.error == undefined && response?.data?.token != undefined){
                sessionStorage.setItem('token',response.data.token)
                navigate('dashboard')
            }else{
                console.log(response.error.data.message)
            }
        }).catch((err)=>{
            console.log(`Error : ${err.message}`)
        })
    }
   
    return (
        <div className="main-div">
            <div className="row p-4">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="col-md-12">
                        
                        <input type="text" className="form-control" placeholder="Email" {...register("email", { required: true })}/>
                        {errors.email && <span className="error-message">This field is required</span>}

                        <input type="password" className="form-control mt-4" placeholder="Password" {...register("password", { required: true })}/>
                        {errors.password && <span className="error-message">This field is required</span>}

                    </div>
                    <div className="col-md-12 mt-4">
                        <button type="submit" className="btn btn-success w-100">Submit</button>
                    </div>
                    <div className="col-md-12 row mt-4"> 
                        <span className="mt-3 col-md-6 text-left"><Link className="link-style" to='/register'>Register</Link></span>
                        <span className="mt-3 col-md-6 text-left"><Link className="link-style" to='/reset'>Reset Password</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login