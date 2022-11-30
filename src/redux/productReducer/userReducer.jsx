import { createSlice } from '@reduxjs/toolkit'
import 'axios'
import { ACCESS_TOKEN, http, setting, USER_LOGIN, USER_PRODUCTS_FAVORITE, USER_PRODUCTS_ORDER, USER_PRODUCTS_SELECTED, USER_PROFILE } from '../../util/config';
import { history } from "../../index";
const initialState = {
	//nếu localStorage có dữ liệu => load dữ liệu default cho state.userLogin của redux, nếu localStorage không có thì gán object {}
	userLogin: setting.getStorageJSON(USER_LOGIN) ? setting.getStorageJSON(USER_LOGIN) : {},
	userProfile: {},
	userProductsFavorite: setting.getStorage(USER_PRODUCTS_FAVORITE) ? setting.getStorage(USER_PRODUCTS_FAVORITE).split(",") : [],
	userProductsSelected: setting.getStorageJSON(USER_PRODUCTS_SELECTED) ? setting.getStorageJSON(USER_PRODUCTS_SELECTED) : [],
	// userProductsOrder: setting.getStorageJSON(USER_PRODUCTS_ORDER) ? setting.getStorageJSON(USER_PRODUCTS_ORDER) : [],
	userProductsOrder: setting.getStorageJSON(USER_PRODUCTS_ORDER) ? setting.getStorageJSON(USER_PRODUCTS_ORDER) : [],
	userRegister:{},
	userUpdate:{},
}

const userReducer = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		loginAction: (state, action) => {
			const userLogin = action.payload;
			state.userLogin = userLogin
		},
		getProfileAction: (state, action) => {
			state.userProfile = action.payload;
		}
		,
		getProductFavoriteAction: (state, action) => {
			const addProductFavorite = action.payload
			if (state.userProductsFavorite.filter(user => Number(user) === addProductFavorite.productsFavorite).length === 0) {
				state.userProductsFavorite.push(addProductFavorite.productsFavorite)
				setting.setStorage(USER_PRODUCTS_FAVORITE, state.userProductsFavorite)
				setting.setCookie(USER_PRODUCTS_FAVORITE, state.userProductsFavorite, 30)
			} else {
				state.userProductsFavorite = state.userProductsFavorite.filter(user => Number(user) !== addProductFavorite.productsFavorite)

				setting.setStorage(USER_PRODUCTS_FAVORITE, state.userProductsFavorite)
				setting.setCookie(USER_PRODUCTS_FAVORITE, state.userProductsFavorite, 30)
			}

		}
		,
		getProductsSelectedAction: (state, action) => {
			let itemSelected = action.payload
			if (state.userProductsSelected?.filter(item => item.id === itemSelected.id).length !== 0) {
				state.userProductsSelected?.filter(item => item.id === itemSelected.id).forEach((item) => {
					item.quantity = item.quantity + itemSelected.quantity;
					item.checked = itemSelected.checked
				})
			} else {
				state.userProductsSelected.push(itemSelected)
			}
			setting.setStorageJSON(USER_PRODUCTS_SELECTED, state.userProductsSelected)
		}
		,
		deleteProductAction: (state, action) => {
			const idItem = action.payload;
			const product = setting.getStorageJSON(USER_PRODUCTS_SELECTED);
			state.userProductsSelected = product.filter(item => item.id !== idItem)
			setting.setStorageJSON(USER_PRODUCTS_SELECTED, state.userProductsSelected)
		}
		,
		getProductsOrderAction: (state, action) => {
			let product = action.payload
			state.userProductsOrder = product
			//Xóa các sản phẩm đã order trong list cart
			const productOrder = setting.getStorageJSON(USER_PRODUCTS_SELECTED);
			state.userProductsSelected = productOrder.filter(item => item.checked !== true)
			setting.setStorageJSON(USER_PRODUCTS_SELECTED, state.userProductsSelected)
		}
		,
		getUserRegisterAction:(state,action)=>{
			state.userRegister=action.payload
		}
		,
		getUserUpdateAction:(state,action)=>{
			state.userUpdate=action.payload
		}
	}
});

export const { loginAction, getProfileAction, getProductFavoriteAction, getProductsSelectedAction, getProductsOrderAction, deleteProductAction,getUserRegisterAction,getUserUpdateAction } = userReducer.actions

export default userReducer.reducer

/*----------async action---------*/

export const loginApi = (userLogin) => {
	return async dispatch => {
		const result = await http.post('/api/Users/signin', userLogin)
		const action = loginAction(result.data.content)
		await dispatch(action)
		// dispatch lại logic của 1 action async
		// thay vì sau khi đăng nhập xong gọi api get profile thì logic đó mình đã code rồi => bây giờ chỉ cần dùng dispatch để gọi lại
		const actionGetProfile = getProfileApi()
		dispatch(actionGetProfile)
		// sau khi đăng nhập thành công thì lưu vào localStorage và cookie
		setting.setStorageJSON(USER_LOGIN, result.data.content)
		setting.setStorage(ACCESS_TOKEN, result.data.content.accessToken)
		setting.setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30)
		if(result.data.statusCode===200){
			history.push('/profile')
		}
	}
}
// cách 1 truyền navigate để chuyển hướng trang khi chưa đăng nhập
// cách 2 cấu hình bên trong interceptor
export const getProfileApi = () => {
	return async dispatch => {
		// try{
		const result = await http.post('/api/Users/getProfile')
		const action = getProfileAction(result.data.content)
		dispatch(action)
		// } catch(err){
		// 	if(err?.response?.status === 401 ){
		// 		alert('Đặng nhập')
		// 		navigate('/login')
		// 	}
		// }
	}
}

export const loginFacebook = (tokenFBApp) => {
	return async dispatch => {
		const result = await http.post('/api/Users/facebooklogin', { facebookToken: tokenFBApp });
		const action = loginAction(result.data.content)
		await dispatch(action)
		// dispatch lại logic của 1 action async
		// thay vì sau khi đăng nhập xong gọi api get profile thì logic đó mình đã code rồi => bây giờ chỉ cần dùng dispatch để gọi lại
		const actionGetProfile = getProfileApi()
		dispatch(actionGetProfile)
		// sau khi đăng nhập thành công thì lưu vào localStorage và cookie
		setting.setStorageJSON(USER_LOGIN, result.data.content)
		setting.setStorage(ACCESS_TOKEN, result.data.content.accessToken)
		setting.setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30)
	}
}

export const getProductFavoriteApi = (prod) => {
	return async dispatch => {
		const result = await http.get('/api/Users/getproductfavorite');
		const productFavorite = result.data.content.productsFavorite
		if (productFavorite.filter(item => item === prod.id).length === 0) {
			result.data.content.productsFavorite = prod.id
		}
		const action = getProductFavoriteAction(result.data.content)
		dispatch(action)
	}
}

export const getOrderProductApi = (product) => {
	return async dispatch => {
		const orderItem = product.filter(item => item.checked === true).map(({ id, quantity }) => ({ productId: id.toString(), quantity: quantity }))
		const email = setting.getStorageJSON(USER_LOGIN).email
		const userOrderItem = {
			"orderDetail": orderItem
			,
			email
		}
		const result = await http.post('/api/Users/order', userOrderItem)
		console.log('ket qua', result.data)
		const action = getProductsOrderAction(result.data.content)
		dispatch(action)
		const orderItemComplete = { ...userOrderItem, dateTime: result.data.dateTime }
		// const userOrderItemPrev = setting.getStorageJSON(USER_PRODUCTS_ORDER) ? setting.getStorageJSON(USER_PRODUCTS_ORDER) : void(0)
		if (result.data.statusCode === 200) {
			const userOrderItemComplete = setting.getStorageJSON(USER_PRODUCTS_ORDER) ? [setting.getStorageJSON(USER_PRODUCTS_ORDER), orderItemComplete]:[orderItemComplete]
			setting.setStorageJSON(USER_PRODUCTS_ORDER, userOrderItemComplete)
		}
	}
}

// API user register

export const getUserRegisterApi = (data)=>{
	return async dispatch =>{
		const result = await http.post('/api/Users/signup',data)
		const action = getUserRegisterAction(result.data.content)
		dispatch(action)
		
	}
}

//API user update profile
export const getUserUpdateProfileApi=(data)=>{
	return async dispatch =>{
		const result = await http.post('/api/Users/updateProfile',data)
		const action=getUserUpdateAction(result.data.content)
		dispatch(action)
	}
}