import { Button } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { getProductDetailApi } from '../../redux/productReducer/productReducer';

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams()
  const { productDetail } = useSelector(state => state.productReducer)

  useEffect(() => {
    const action = getProductDetailApi(id)
    dispatch(action)
  }, [id])

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
          {productDetail.size?.map((size,index)=>{
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
              <img src={prod.image} alt="..." />
              <div className="card-body">
                <h3>{prod.name}</h3>
                <p>{prod.price}</p>
                <NavLink to={`/detail/${prod.id}`} className='btn btn-warning'>Add to cart <i className="fa fa-cart-plus"></i></NavLink>
              </div>
            </div>
          </div>
        })}
      </div>
      </div>
    </div>
  )
}
