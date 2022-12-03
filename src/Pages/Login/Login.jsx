import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { loginApi } from '../../redux/productReducer/userReducer'
import LoginFacebook from "../../Components/LoginFacebook/LoginFacebook";
import { NavLink } from 'react-router-dom'
export default function Login() {
  const { userProfile } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const[type,settype]=useState(false);
  const[eye,seteye]=useState(true);
  const[password,setpassword]=useState("password");
  const frm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Email không hợp lệ!'),
      // password:yup.string().password('Password không hợp lệ!')
    }),
    onSubmit: (values) => {
      console.log(values)
      const action = loginApi(values);
      dispatch(action)
    }
    
  })
  const Eye=()=>{
    if(password=="password"){
        setpassword("text");
        seteye(false);
        settype(true);
    }
    else{
        setpassword("password");
        seteye(true);
        settype(false);
    }
}
  return (
    <form className='login' onSubmit={frm.handleSubmit}>
      <h3>Login</h3>
      <div className="form-group">
        <p>Email</p>
        <input id='email' name='email' className="form-control" onChange={frm.handleChange} placeholder='email' />
        {frm.errors.email ? <p className=' text text-danger mt-2'>{frm.errors.email}</p> : ''}
      </div>
      <div className="form-group password">
        <p>Password</p>
        <input id='password' name='password' type={password} className="form-control" placeholder='password' onChange={frm.handleChange} />
        <span onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></span>
      </div>
      <div className="form-group">
        <div className='d-flex'>
          <NavLink to='/register'><div className='btn'>Register now ?</div></NavLink>
          <button className="btn btn-success" type='submit'>Login</button>
        </div>
        <LoginFacebook />

      </div>
    </form>
  )
}
