import React,{ useEffect, useState } from 'react' 
import LeftBar from './common/LeftBar'
import { useForm } from 'react-hook-form'
import { useUserUpdateMutation, useUserDetailQuery } from '../redux/api/UserApi.js'

const EditProfile = () => {
    const [imageUrl, setImageUrl] = useState('');
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [updateUser] = useUserUpdateMutation()
    const {data:getUserData} = useUserDetailQuery()
      
    useEffect(()=>{  
        setValue('name',getUserData?.data?.name)
        setValue('email',getUserData?.data?.email)
        setImageUrl(`${process.env.REACT_APP_BACKEND_USER__URL}/${getUserData?.data?.image}`) 
    },[getUserData])

    const submitForm = (data) => { 
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('userImage', data.userImage[0])

        updateUser(formData).then((response)=>{
            console.log('Updated successfully!!') 
        }).catch((err)=>{
            console.log(`Error : ${err.message}`)
        })
    }  
    return (
        <div className="row"> 
            <div className="col-md-2">
                <LeftBar />
            </div>
            <div className="col-md-10">
                <form onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
                    <div className="form-container">
                        <h3><u>Edit Profile</u></h3><br />
                        <input type="text" className="form-control" placeholder="Name" {...register("name", { required: true })}/>
                        {errors.name && <span className="error-message">This field is required</span>}

                        <input type="email" className="form-control mt-4" placeholder="Email" {...register("email", { required: true })} disabled/>
                        {errors.email && <span className="error-message">This field is required</span>}

                        <input className="form-control mt-4" placeholder="Image" {...register("userImage", { required: false })} type="file"/>
                        {errors.userImage && <span className="error-message">This field is required</span>}
                        {
                            (imageUrl)?<img src={imageUrl} className="custom-image-size"/>:''
                        }
                        <button type="submit" className="btn btn-secondary w-100 mt-4">Edit Profile</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditProfile