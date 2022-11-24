import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getProductApi } from '../../redux/productReducer/productReducer';
import { getProductFavoriteApi } from '../../redux/productReducer/userReducer';
import  _ from 'lodash';
export default function Search() {
  const dispatch = useDispatch();
  const { arrProduct } = useSelector(state => state.productReducer)
  const { userProductsFavorite } = useSelector(state => state.userReducer)
  const [searchItem, setSearchItem] = useState()
  const [item, setItem] = useState()
  useEffect(() => {
    const action = getProductApi();
    dispatch(action);
  }, [])
  const addProductFavorite = (prod) => {
    const action = getProductFavoriteApi(prod);
    dispatch(action)
  }
  const handleChange = (e) => {
    setSearchItem(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const productSearch = arrProduct.filter(item => {
      const arr = item.name.toLowerCase().split(' ');
      return arr.some(y => searchItem.toLowerCase().includes(y))
    })
    if (productSearch.length !== 0) {
      setItem(productSearch)
    } else {
      setItem([])
    }
  }
  const decreaseItem = () => {
    const decreItem =  _.orderBy(item, ['price'], [ 'desc']);
    setItem(decreItem)
    console.log('item',decreItem)
  }
  const ascreaseItem = () => {
    const ascreItem =  _.orderBy(item, ['price'], [ 'asc']);
    setItem(ascreItem)
    console.log('item',ascreItem)
  }
  return (
    <div className='search'>
      <h3>Search</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name='product' onChange={handleChange} />
        <input type="submit" style={{ color: 'red' }} value='Search' />
      </form>
      <div className="search-result">
        <h2>Search result</h2>
        <p>Price</p>
        <div className="btn" onClick={decreaseItem}>Decrease</div>
        <div className="btn" onClick={ascreaseItem}>Ascending</div>
        <div className="row">
          {item?.map((prod, index) => {
            return <div className="col-4" key={index}>
              <div className="card">
                <i className="fa-regular fa-heart" style={{ display: userProductsFavorite.filter(item => Number(item) === prod.id).length === 0 ? '' : 'none' }} onClick={() => { addProductFavorite(prod) }}>
                </i>
                <i className="fa-solid fa-heart" style={{ display: userProductsFavorite.filter(item => Number(item) === prod.id).length === 0 ? 'none' : '' }} onClick={() => { addProductFavorite(prod) }}>
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
