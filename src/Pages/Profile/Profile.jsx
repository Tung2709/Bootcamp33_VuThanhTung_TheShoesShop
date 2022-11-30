import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfileApi, getUserUpdateProfileApi } from '../../redux/productReducer/userReducer'
import { Tabs } from 'antd';
import { Pagination } from 'antd';
import { getProductApi } from '../../redux/productReducer/productReducer'
const onChangeTab = (key) => {
  console.log(key);
};
export default function Profile() {
  const { userProfile, userProductsFavorite, userProductsOrder, } = useSelector(state => state.userReducer)
  const { arrProduct } = useSelector(state => state.productReducer)
  const [data, setData] = useState()
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    //gọi api get profile
    const actionAsync = getProfileApi()
    dispatch(actionAsync)
    //gọi api get arrpoduct
    const action = getProductApi();
    dispatch(action);
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const action = getUserUpdateProfileApi(data)
    dispatch(action)
  }
  const handleChange = (e) => {
    const dataProfile = { ...userProfile }
    dataProfile[e.target.id] = e.target.value
    setData(dataProfile)
  }
  return (
    <div>
      <form className='profile' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="row">
          <div className="col-2">
            <img src={userProfile.avatar} alt="..." />
          </div>
          <div className="col">
            <div className="row ">
              <div className="col-6" >
                <div className="form-group">
                  <p>Email</p>
                  <input id={'email'} defaultValue={userProfile.email} className="form-control" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <p>Phone</p>
                  <input id={'phone'} defaultValue={userProfile.phone} className="form-control" onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Name</p>
                  <input id={'name'} defaultValue={userProfile.name} className="form-control" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <p>Password</p>
                  <input id={'password'} className="form-control" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <label className="form-check-label gender" htmlFor="inlineRadio3">Gender</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="gender" value="true" onClick={handleChange} />
                    <label className="form-check-label " htmlFor="inlineRadio1">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="gender" value="false" onClick={handleChange} />
                    <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
      <div>
        <Tabs
          onChange={onChangeTab}
          type="card"
          items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1);
            if (id === '1') {
              return {
                label: `Order history`,
                key: id,
                children: (<div>
                  {userProductsOrder.map((item, index) => {
                    return <table className='table' key={index}>
                      <thead>
                        <tr>
                          <th style={{ width: '5%' }}>id</th>
                          <th style={{ width: '10%', textAlign: 'center' }}>img</th>
                          <th style={{ width: '25%' }}>name</th>
                          <th style={{ width: '5%' }}>price</th>
                          <th style={{ width: '20%', textAlign: 'center' }}>quantity</th>
                          <th style={{ width: '10%' }}>total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {arrProduct.filter(prod => prod.id === Number(item.productId)).map((prod, index) => {
                        return <tr>
                          <tr>
                          <th style={{ width: '5%' }}>id</th>
                          <th style={{ width: '10%', textAlign: 'center' }}>img</th>
                          <th style={{ width: '25%' }}>name</th>
                          <th style={{ width: '5%' }}>price</th>
                          <th style={{ width: '20%', textAlign: 'center' }}>quantity</th>
                          <th style={{ width: '10%' }}>total</th>
                        </tr>
                        </tr>
                          // return <tr key={index}>
                          //   <td >{prod.id}</td>
                          //   <td style={{ textAlign: 'center' }}><img src={prod.image} alt="..." /></td>
                          //   <td>{prod.name}</td>
                          //   <td>{prod.price}</td>
                          //   <td style={{ textAlign: 'center' }}>
                          //     <span> {prod.quantity}</span>
                          //   </td>
                          //   <td>{prod.price * prod.quantity}</td>
                          // </tr>
                        })}
                      </tbody>
                    </table>
                  })}
                </div>),
              };
            } else {
              return {
                label: `Favourite`,
                key: id,
                children: `Content of Tab Pane ${id}`,
              };
            }
          })}
        />
        <Pagination current={current} onChange={onChange} defaultPageSize={10} total={50} />
      </div>
    </div>
  )
}
