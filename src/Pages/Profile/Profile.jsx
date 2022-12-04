import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfileApi, getUserUpdateProfileApi } from '../../redux/productReducer/userReducer'
import { Tabs } from 'antd';
import { Pagination } from 'antd';
import { getProductApi } from '../../redux/productReducer/productReducer'
import { setting, USER_PROFILE } from '../../util/config'
const onChangeTab = (key) => {
  console.log(key);
};
export default function Profile() {
  const { userProfile, userProductsFavorite } = useSelector(state => state.userReducer)
  const { arrProduct } = useSelector(state => state.productReducer)
  const productFavorite=arrProduct.filter(item=>userProductsFavorite.includes(item.id.toString()))
  //tổng sô trang hiển thị
  const profileData= setting.getStorageJSON(USER_PROFILE)
  // const totalPage=userProfile.ordersHistory?.length
  //dữ liệu hiển thị trong trang
  const [source,setSource]=useState()
  const [data, setData] = useState({})
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setCurrent(page);
    // setSource(userProfile.ordersHistory?.slice(2*page-2,page*2))
    setSource(profileData.ordersHistory?.slice(2*page-2,page*2))
  };

  const dispatch = useDispatch();
  useEffect(() => {
    //gọi api get profile
    const actionAsync = getProfileApi()
    dispatch(actionAsync)
    //gọi api get arrpoduct
    const action = getProductApi();
    dispatch(action);
    onChange(current)
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
                  <table className='table'>
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
                    {source?.map((prod, index) => {
                      return (prod.orderDetail.map((item,i)=>{
                        return <tbody key={i}>
                        <tr>
                          <td >{prod.id}</td>
                          <td style={{ textAlign: 'center' }}><img style={{width:'100px'}} src={item.image} alt="..." /></td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td style={{ textAlign: 'center' }}>
                            <span> {item.quantity}</span>
                          </td>
                          <td>{item.price * item.quantity}</td>
                        </tr>
                      </tbody>
                      }))
                    })}
                  </table>
                  <Pagination current={current} onChange={onChange} defaultPageSize={2} total={userProfile.ordersHistory?.length} />
                </div>),
              };
            } else {
              return {
                label: `Favourite`,
                key: id,
                children: (
                  <div>
                    <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: '10%' }}>id</th>
                        <th style={{ width: '20%', textAlign: 'center' }}>img</th>
                        <th style={{ width: '40%' }}>name</th>
                        <th style={{ width: '15%' }}>price</th>
                        <th style={{ width: '15%'}}>quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productFavorite?.map((prod, index) => {
                        return <tr key={index}>
                          <td >{prod.id}</td>
                          <td style={{ textAlign: 'center' }}><img style={{width:"100px"}} src={prod.image} alt="..." /></td>
                          <td>{prod.name}</td>
                          <td>{prod.price}</td>
                          <td>{prod.quantity}</td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                  <Pagination current={current} onChange={onChange} defaultPageSize={5} total={productFavorite.length} />
                  </div>
                ),
              };
            }
          })}

        />
        
      </div>
    </div>
  )
}
