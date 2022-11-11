import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getProductApi } from '../../redux/productReducer/productReducer'

export default function Home_Mobile() {
  const dispatch = useDispatch()
  const { arrProduct } = useSelector(state => state.productReducer)
  useEffect(() => {
    const action = getProductApi();
    dispatch(action)
  },[])
  return (
    <div>
      {console.log(arrProduct)}
      <div className='carousel'>

	  </div>

      <div className="container">
        <div className="product-list">
          {arrProduct.map((prod, index) => {
            return <div className="d-flex mt-2" key={index}>
              <div style={{width:'25%',height:'100%'}}>
				<img style={{objectFit:'cover'}} className='w-100 h-100' src={prod.image} alt="..." />
			  </div>
			  <div className="content">
				<h6>{prod.name}</h6>
				<p>{prod.description.length>75?prod.description.substr(0,75)+'...':prod.description}</p>
				<div className="w-100 text-right">
					<NavLink className='btn btn-dark' to={`/detail/${prod.id}`}>View detail</NavLink>
				</div>
			  </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
