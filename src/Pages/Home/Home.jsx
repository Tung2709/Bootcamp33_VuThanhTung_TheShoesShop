import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getProductApi } from '../../redux/productReducer/productReducer'

export default function Home() {
  const dispatch = useDispatch()
  const { arrProduct } = useSelector(state => state.productReducer)
  useEffect(() => {
    const action = getProductApi();
    dispatch(action)
  },[])
  return (
    <div>
      {console.log(arrProduct)}
      <div className='carousel'></div>
      <div className="container">
        <div className="row">
          {arrProduct.map((prod, index) => {
            return <div className="col-4" key={index}>
              <div className="card">
                <img src={prod.image} alt="..." />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.price}$</p>
                  <NavLink to={`detail/${prod.id}`} className="btn btn-warning">Add to cart <i className="fa fa-cart-plus"></i></NavLink>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
