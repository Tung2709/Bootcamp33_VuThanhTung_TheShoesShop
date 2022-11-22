import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getProductApi } from '../../redux/productReducer/productReducer'
import { Carousel } from "antd";
import 'antd/dist/antd.min.css'
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getProductFavoriteApi } from '../../redux/productReducer/userReducer';
import { setting, USER_PRODUCTS_FAVORITE } from '../../util/config';

export default function Home() {
  const dispatch = useDispatch()
  const { arrProduct } = useSelector(state => state.productReducer)
  const {userProductsFavorite} = useSelector(state => state.userReducer)
  console.log('khởi tạo ban đầu',userProductsFavorite)
  useEffect(() => {
    const action = getProductApi();
    dispatch(action);
  }, [])
  const addProductFavorite =(prod)=>{
    const action = getProductFavoriteApi(prod);
    dispatch(action)
  }
  return (
    <div>
      <div className='carousel w-100' style={{ padding: '76px 0px 101px' }} >
        <Carousel arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
          {arrProduct.map((prod, index) => {
            return <div className='d-flex flex-row justify-content-between' key={index}>
              <div className=" h-100" style={{ paddingLeft: 102, width: '70%' }} >
                <img src={prod.image} style={{ width: 689, height: 383, objectFit: 'cover' }} alt="..." />
              </div>
              <div className=" product-detail" style={{ paddingTop: 48, width: '30%' }}>
                <h3>{prod.name}</h3>
                <p>{prod.description}</p>
                <NavLink to={`detail/${prod.id}`} className="btn">Buy now </NavLink>
              </div>
            </div>
          })}
        </Carousel>

      </div>
      <div className="product-feature">
        <h1>Product Feature</h1>
        <div className="row">
          {arrProduct.map((prod, index) => {
            return <div className="col-4" key={index}>
              <div className="card">
                <i className="fa-regular fa-heart" style={{display:userProductsFavorite.filter(item=>Number(item)===prod.id).length===0?'':'none'}} onClick={()=>{addProductFavorite(prod)}}>      
                 </i>
                 <i className="fa-solid fa-heart" style={{display:userProductsFavorite.filter(item=>Number(item)===prod.id).length===0?'none':''}} onClick={()=>{addProductFavorite(prod)}}>      
                 </i>
                <img src={prod.image} alt="..." />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.shortDescription}</p>
                </div>
                <div className="card-footer d-flex">
                  <NavLink to={`detail/${prod.id}`} className="btn">Buy now</NavLink>
                  <p >{prod.price}$</p>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
