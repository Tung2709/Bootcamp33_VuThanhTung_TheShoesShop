import { createSlice } from '@reduxjs/toolkit'
import 'axios'
import { ACCESS_TOKEN, http, setting, USER_LOGIN } from '../../util/config';
const initialState = {
	//nếu localStorage có dữ liệu => load dữ liệu default cho state.userLogin của redux, nếu localStorage không có thì gán object {}
	userLogin: setting.getStorageJSON(USER_LOGIN) ? setting.getStorageJSON(USER_LOGIN) : {},
	userProfile: {},
	userProductsFavorite: [],
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
		getProductFavoriteAction:  (state, action) => {
			const addProductFavorite = action.payload
			if(state.userProductsFavorite.filter(user=> user===addProductFavorite.productsFavorite).length===0){
				console.log('add')
				state.userProductsFavorite.push(addProductFavorite.productsFavorite)
				console.log('đây nè',state.userProductsFavorite)
			}else{
				console.log('remove')
				state.userProductsFavorite=state.userProductsFavorite.filter(user => user!==addProductFavorite.productsFavorite)
				console.log('đây nè',state.userProductsFavorite)
			}
			
		}
		,
	}
});

export const { loginAction, getProfileAction, getProductFavoriteAction } = userReducer.actions

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
			result.data.content.productsFavorite=prod.id
		}
		const action = getProductFavoriteAction(result.data.content)
		dispatch(action)
	}
}