import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { getProfileApi } from '../../redux/productReducer/userReducer'
export default function Profile() {
  // const navigate = useNavigate()
  const {userProfile} = useSelector(state=>state.userReducer)
  const dispatch=useDispatch();
  useEffect(()=>{
    //gọi api get profile
    const actionAsync=getProfileApi()
    dispatch(actionAsync)
  },[])
  return (
	<div className='container'>
    <h3>Profile</h3>
      <div className="row">
          <div className="col-4">
            <img src="" alt="" />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <p>Email</p>
                  <input name={'email'} className="form-control" />
                </div>
                <div className="form-group">
                  <p>Name</p>
                  <input name={'name'} className="form-control" />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Email</p>
                  <input name={'email'} className="form-control" />
                </div>
                <div className="form-group">
                  <p>Name</p>
                  <input name={'name'} className="form-control" />
                </div>
              </div>
              
            </div>
          </div>
      </div>
  </div>
  )
}
