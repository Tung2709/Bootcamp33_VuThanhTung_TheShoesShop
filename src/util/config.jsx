import axios from "axios";
import { history } from "../index";

export const USER_LOGIN = 'userLogin'
export const ACCESS_TOKEN = 'accessToken'
export const USER_PRODUCTS_FAVORITE='userProductsFavorite'
export const USER_PRODUCTS_SELECTED='userProductsSelected'
export const USER_PRODUCTS_ORDER='userProductsOrder'
export const USER_PROFILE='userProfile'

export const setting = {
	setStorageJSON: (name, data) => {
		data = JSON.stringify(data)
		localStorage.setItem(name, data)
	},
	setStorage: (name, data) => {
		localStorage.setItem(name,data)
	},
	getStorageJSON: (name) => {
		if (localStorage.getItem(name)) {
			const data = JSON.parse(localStorage.getItem(name))
			return data
		}
		return;
	},
	getStorage: (name) => {
		if (localStorage.getItem(name)) {
			const data = localStorage.getItem(name)
			return data
		}
		return;
	},
	setCookieJSON: (name, value, days) => {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		value = JSON.stringify(value)
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	},
	setCookie: (name, value, days) => {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	},
	getCookieJSON: (name) => {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
		}
		return null;
	},
	getCookie: (name) => {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	},
	eraseCookie: (name) => {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}



// setup hằng số, số hàm xử lý chung,...

export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMyIsIkhldEhhblN0cmluZyI6IjA4LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MDkxMjAwMDAwMCIsIm5iZiI6MTY1Mjg5MzIwMCwiZXhwIjoxNjgxMDU5NjAwfQ.YWfEjzumDyUA3XRRvMIkDiD1cOGgRKyAAeOTP3qTT2c'

export const http = axios.create({
	baseURL: 'https://shop.cyberlearn.vn', //tất cả các hàm khi api đều dùng domain này
	timeout: 60000 // sẽ request trong 3 phút nếu không nhận được kết quả sẽ hủy request này
})

// cấu hình cho request : client gửi api đến server

http.interceptors.request.use((config) => {
	config.headers = { ...config.headers, 
		TokenCybersoft: TOKEN_CYBERSOFT,
		Authorization : "Bearer " + [setting.getStorage(ACCESS_TOKEN)]
	}
	return config;
}, err => {
	console.log(err)
	return Promise.reject(err)
}
)


// cấu hình cho response : server trả dữ liệu về cho client

http.interceptors.response.use((response)=>{

	return response;},
 error =>{
		// thất bại của tất cả http sẽ nhảy vào đây
		if (error.response?.status === 401){
			// chuyển hướng trang mà không reload lại trang đẻ giữ được các state hiện tại trên redux
			history.push('/login')
		}
		if (error.response?.status === 400){
			// chuyển hướng trang mà không reload lại trang đẻ giữ được các state hiện tại trên redux
			history.push('/')
		}
		return Promise.reject(error);
})

// các status lỗi thường gặp
/*
	200: request gửi đi và nhận về kết quả thành
	201: request gửi đi và thành công nhận được khởi tạo
	400: bad request => request gửi đi thành công tuy nhiên không tìm thấy dữ liệu từ tham số gửi đi
	404: not found không tìm thấy api đó hoặc tương tự 400
	401: Unauthorize token không hợp lệ không có quyền truy cập api đó
	403: Forbiden token hợp lệ tuy nhiên chưa đủ quyền truy cập api đó
	500: Error server lỗi xảy ra trên server có khả năng là frontend gửi dữ liệu chưa hợp lệ dẫn đến backend xử lý bị lỗi. Backend code lỗi trên server => Test bằng post man hoặc swagger nếu api không lỗi => frontend lỗi , ngược lại là backend code lỗi 
*/