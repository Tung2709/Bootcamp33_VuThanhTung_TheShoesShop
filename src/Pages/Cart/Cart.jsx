import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAction, getOrderProductApi, getProductsOrderAction, getProductsSelectedAction, getProfileApi } from '../../redux/productReducer/userReducer'

export default function Cart() {
  const dispatch = useDispatch();
  const { userProductsSelected } = useSelector(state => state.userReducer)
  const [checkedAll, setCheckedAll] = useState(userProductsSelected.filter(item=>item.checked===false).length===0?true:false)
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
    if (!checkedAll) {
      for (var i = 0; i < userProductsSelected.length; i++) {
        if (userProductsSelected[i].checked === false) {
          const action = getProductsSelectedAction({ ...userProductsSelected[i], quantity: 0, checked: true });
          dispatch(action)
        }
      }
    }
    if (checkedAll) {
      for (var i = 0; i < userProductsSelected.length; i++) {
        if (userProductsSelected[i].checked === true) {
          const action = getProductsSelectedAction({ ...userProductsSelected[i], quantity: 0, checked: false });
          dispatch(action)
        }
      }
    }
  }

  //chọn hoặc bỏ 1 sản phẩm
  const handleSelect = (e) => {
    const newChecked = [...checked]
    newChecked[e.target.name] = !newChecked[e.target.name]
    if (newChecked.includes(false)) {
      setCheckedAll(false)
    }
    if (!newChecked.includes(false)) {
      setCheckedAll(true)
    }
    setChecked(newChecked)
    const action = getProductsSelectedAction({ ...userProductsSelected[e.target.name], quantity: 0, checked: newChecked[e.target.name] });
    dispatch(action)
  }

  // Xóa sản phẩm đã chọn
  const deleteItem = (idItem) => {
    const action = deleteProductAction(idItem);
    dispatch(action)
  }
  const orderProduct = () => {
    const action = getOrderProductApi(userProductsSelected)
    dispatch(action)
  }
  return (
    <div className='cart-item'>
      <h2>Cart</h2>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th style={{width:'5%'}}><input className="form-check-input" type="checkbox" value="" checked={checkedAll} onChange={handleSelectAll} /></th>
            <th style={{width:'5%'}}>id</th>
            <th style={{width:'10%', textAlign:'center'}}>img</th>
            <th style={{width:'25%'}}>name</th>
            <th style={{width:'5%'}}>price</th>
            <th style={{width:'20%', textAlign:'center'}}>quantity</th>
            <th style={{width:'10%'}}>total</th>
            <th style={{width:'20%', textAlign:'center'}}>action</th>
          </tr>
        </thead>
        <tbody>
          {userProductsSelected.map((prod, index) => {
            return <tr key={index}>
              <td><input className="form-check-input" name={index} type="checkbox" value="" checked={prod.checked} onChange={handleSelect} /></td>
              <td >{prod.id}</td>
              <td style={{textAlign:'center'}}><img  src={prod.image} alt="..." /></td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td style={{textAlign:'center'}}><div className="btn quantity" onClick={() => { quantityItem({ ...prod }, 1) }}>+</div>
                <span> {prod.quantity}</span>
                <div className="btn quantity" onClick={prod.quantity > 1 ? () => { quantityItem({ ...prod }, -1) } : null}>-</div>
              </td>
              <td>{prod.price * prod.quantity}</td>
              <td style={{textAlign:'center'}}>
                <div className="btn edit">EDIT</div>
                <div className="btn del" onClick={() => { deleteItem(prod.id) }}>DELETE</div>
              </td>
            </tr>
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td >
              <div className="btn" onClick={orderProduct}>SUBMIT ORDER</div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
