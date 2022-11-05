import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import { loginApi } from '../../redux/productReducer/userReducer'
export default function Login() {
  const dispatch =useDispatch()
  const frm=useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:yup.object().shape({
      email:yup.string().email('Email không hợp lệ!'),
      // password:yup.string().password('Password không hợp lệ!')
    }),
    onSubmit:(values)=>{
      console.log(values)
      const action =loginApi(values);
      dispatch(action)
    }
  })
  return (
	<form className='container' onSubmit={frm.handleSubmit}>
    <h3>Login</h3>
    <div className="form-group">
      <p>Email</p>
      <input id='email' name='email' className="form-control" onChange={frm.handleChange} />
      {frm.errors.email?<p className=' text text-danger mt-2'>{frm.errors.email}</p>:''}
    </div>
    <div className="form-group">
      <p>Password</p>
      <input id='password' name='password' type='password' className="form-control" onChange={frm.handleChange} />
    </div>
    <div className="form-group"></div>
    <button className="btn btn-success mt-2" type='submit'>Login</button>
  </form>
  )
}
