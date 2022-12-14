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



// setup h???ng s???, s??? h??m x??? l?? chung,...

export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMyIsIkhldEhhblN0cmluZyI6IjA4LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MDkxMjAwMDAwMCIsIm5iZiI6MTY1Mjg5MzIwMCwiZXhwIjoxNjgxMDU5NjAwfQ.YWfEjzumDyUA3XRRvMIkDiD1cOGgRKyAAeOTP3qTT2c'

export const http = axios.create({
	baseURL: 'https://shop.cyberlearn.vn', //t???t c??? c??c h??m khi api ?????u d??ng domain n??y
	timeout: 60000 // s??? request trong 3 ph??t n???u kh??ng nh???n ???????c k???t qu??? s??? h???y request n??y
})

// c???u h??nh cho request : client g???i api ?????n server

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


// c???u h??nh cho response : server tr??? d??? li???u v??? cho client

http.interceptors.response.use((response)=>{

	return response;},
 error =>{
		// th???t b???i c???a t???t c??? http s??? nh???y v??o ????y
		if (error.response?.status === 401){
			// chuy???n h?????ng trang m?? kh??ng reload l???i trang ????? gi??? ???????c c??c state hi???n t???i tr??n redux
			history.push('/login')
		}
		if (error.response?.status === 400){
			// chuy???n h?????ng trang m?? kh??ng reload l???i trang ????? gi??? ???????c c??c state hi???n t???i tr??n redux
			history.push('/')
		}
		return Promise.reject(error);
})

// c??c status l???i th?????ng g???p
/*
	200: request g???i ??i v?? nh???n v??? k???t qu??? th??nh
	201: request g???i ??i v?? th??nh c??ng nh???n ???????c kh???i t???o
	400: bad request => request g???i ??i th??nh c??ng tuy nhi??n kh??ng t??m th???y d??? li???u t??? tham s??? g???i ??i
	404: not found kh??ng t??m th???y api ???? ho???c t????ng t??? 400
	401: Unauthorize token kh??ng h???p l??? kh??ng c?? quy???n truy c???p api ????
	403: Forbiden token h???p l??? tuy nhi??n ch??a ????? quy???n truy c???p api ????
	500: Error server l???i x???y ra tr??n server c?? kh??? n??ng l?? frontend g???i d??? li???u ch??a h???p l??? d???n ?????n backend x??? l?? b??? l???i. Backend code l???i tr??n server => Test b???ng post man ho???c swagger n???u api kh??ng l???i => frontend l???i , ng?????c l???i l?? backend code l???i 
*/