import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  deleteProductAction, getOrderProductApi, getProductsOrderAction, getProductsSelectedAction, getProfileApi } from '../../redux/productReducer/userReducer'

export default function Cart() {
  const dispatch = useDispatch();
  const { userProductsSelected } = useSelector(state => state.userReducer)
  const [checkedAll, setCheckedAll] = useState(false)
  const [checked, setChecked] = useState(new Array(userProductsSelected.length).fill(false))
  useEffect(() => {
    //gọi api get profile
    const actionAsync = getProfileApi()
    dispatch(actionAsync)
  }, [])
  const quantityItem = (prod, x) => {
    prod.quantity = x
    const action = getProductsSelectedAction(prod);
    dispatch(action)
  }

  // chọn hoặc bỏ tất cả sản phẩm
  const handleSelectAll = () => {
    setCheckedAll(!checkedAll)
    checked.fill(!checkedAll)
    setChecked(checked)
    if(!checkedAll){
      for(var i=0;i<userProductsSelected.length;i++){
        if(userProductsSelected[i].checked===false){
          const action = getProductsSelectedAction({...userProductsSelected[i],quantity:0,checked:true});
      dispatch(action)
        }
      }
    }
    if(checkedAll){
      for(var i=0;i<userProductsSelected.length;i++){
        if(userProductsSelected[i].checked===true){
          const action = getProductsSelectedAction({...userProductsSelected[i],quantity:0,checked:false});
      dispatch(action)
        }
      }
    }
  }

  //chọn hoặc bỏ 1 sản phẩm
  const handleSelect = (e) => {
    const newChecked = [...checked]
    newChecked[e.target.name] = !newChecked[e.target.name]
    if(newChecked.includes(false)){
      setCheckedAll(false)
    }
    if(!newChecked.includes(false)){
      setCheckedAll(true)
    }
    setChecked(newChecked)
    const action = getProductsSelectedAction({...userProductsSelected[e.target.name],quantity:0,checked:newChecked[e.target.name]});
    dispatch(action)
  }

  // Xóa sản phẩm đã chọn
  const deleteItem=(idItem)=>{
    const action=deleteProductAction(idItem);
    dispatch(action)
  }
  const orderProduct =()=>{
    const action=getOrderProductApi(userProductsSelected)
    dispatch(action)
  }
  return (
    <div className='cart-item'>
      <h2>Cart</h2>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th><input className="form-check-input" type="checkbox" value="" checked={checkedAll} onChange={handleSelectAll} /></th>
            <th>id</th>
            <th>img</th>
            <th>name</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {userProductsSelected.map((prod, index) => {
            return <tr key={index}>
              <th><input className="form-check-input-body" name={index} type="checkbox" value="" checked={prod.checked} onChange={handleSelect} /></th>
              <td>{prod.id}</td>
              <td><img src={prod.iamge} alt="..." /></td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td><div className="btn" onClick={() => { quantityItem({ ...prod }, 1) }}>+</div>
                <span> {prod.quantity}</span>
                <div className="btn" onClick={prod.quantity > 1 ? () => { quantityItem({ ...prod }, -1) } : null}>-</div>
              </td>
              <td>{prod.price * prod.quantity}</td>
              <td>
                <div className="btn">EDIT</div>
                <div className="btn" onClick={()=>{deleteItem(prod.id)}}>DELETE</div>
              </td>
            </tr>
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div className="btn" onClick={orderProduct}>SUBMIT ORDER</div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
