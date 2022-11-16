import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { getProductDetailApi } from '../../redux/productReducer/productReducer';
import { getProductFavoriteApi } from '../../redux/productReducer/userReducer';
import { setting, USER_PRODUCTS_FAVORITE } from '../../util/config';

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams()
  const { productDetail } = useSelector(state => state.productReducer)
  const {userProductsFavorite} = useSelector(state => state.userReducer)
  useEffect(() => {
    const action = getProductDetailApi(id)
    dispatch(action)
  }, [id])

  const addProductFavorite =(prod)=>{
    const action = getProductFavoriteApi(prod);
    dispatch(action)
  }

  return (
    <div className='detail'>
      <div className="row item-current">
        <div className="col-4 p-0">
          <img src={productDetail.image} alt="" />
        </div>
        <div className="col-8 ">
          <h3>{productDetail.name}</h3>
          <p>{productDetail.description}</p>
          <h4>Available size</h4>
          {productDetail.size?.map((size, index) => {
            return <div className="btn size" key={index} >
              {size}
            </div>
          })}
          <h2>{productDetail.price}$</h2>
          <div className="btn inc">+</div>
          <span>1</span>
          <div className="btn dec">-</div>
          <br />
          <div className="btn add">Add to cart</div>
        </div>

      </div>
      <div className="item-related">
        <h3 >Related Products</h3>
        <div className="row">
          {productDetail.relatedProducts?.map((prod, index) => {
            return <div className="col-4" key={index}>
              <div className="card">
              <i className="fa-regular fa-heart" style={{display:userProductsFavorite.filter(item=>Number(item)===prod.id).length===0?'':'none'}} onClick={()=>{addProductFavorite(prod)}}>      
                 </i>
                 { console.log(setting.getStorage(USER_PRODUCTS_FAVORITE))}
                 <i className="fa-solid fa-heart" style={{display:userProductsFavorite.filter(item=>Number(item)===prod.id).length===0?'none':''}} onClick={()=>{addProductFavorite(prod)}}>      
                 </i>
                <img className='card-img-top' src={prod.image} alt="..." />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.shortDescription}</p>
                </div>
                <div className="card-footer d-flex">
                  <NavLink to={`/detail/${prod.id}`} className='btn'>Buy now</NavLink>
                  <p>{prod.price}$</p>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
