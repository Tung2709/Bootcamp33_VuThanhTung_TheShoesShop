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
    <div className='container'>
      <div className="row">
        <div className="col-4 mt-2">
          <img src={productDetail.image} width='100%' alt="" />
        </div>
        <div className="col-8 mt-2">
          <h3>{productDetail.name}</h3>
          <p>{productDetail.description}</p>
        </div>
      </div>
      <h3 className='mt-2'>Related Products</h3>
      <div className="row mt-2">
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
  )
}
