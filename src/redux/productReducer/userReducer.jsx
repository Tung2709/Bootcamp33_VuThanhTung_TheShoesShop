import { createSlice } from '@reduxjs/toolkit'
import 'axios'
import { ACCESS_TOKEN, http, setting, USER_LOGIN } from '../../util/config';
const initialState = {
	//nếu localStorage có dữ liệu => load dữ liệu default cho state.userLogin của redux, nếu localStorage không có thì gán object {}
	userLogin: setting.getStorageJSON(USER_LOGIN)? setting.getStorageJSON(USER_LOGIN):{},
	userProfile:{}
}

const userReducer = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		loginAction: (state, action) => {
				const userLogin = action.payload;
				state.userLogin= userLogin
		},
		getProfileAction:(state,action)=>{
			state.userProfile=action.payload;
		}
	}
});

export const { loginAction,getProfileAction } = userReducer.actions

export default userReducer.reducer

/*----------async action---------*/

export const loginApi = (userLogin) => {
	return async dispatch => {
		const result = await http.post('/api/Users/signin', userLogin)
		const action = loginAction(result.data.content)
		dispatch(action)
		// sau khi đăng nhập thành công thì lưu vào localStorage và cookie
		setting.setStorageJSON(USER_LOGIN,result.data.content)
		setting.setStorage(ACCESS_TOKEN,result.data.content.accessToken)
		setting.setCookie(ACCESS_TOKEN,result.data.content.accessToken,30)
	}
}
// cách 1 truyền navigate để chuyển hướng trang khi chưa đăng nhập
export const getProfileApi = () => {
	return async dispatch =>{
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

// cách 2 cấu hình bên trong interceptor
