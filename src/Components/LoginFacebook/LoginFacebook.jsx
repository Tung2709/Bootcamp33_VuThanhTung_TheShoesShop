import React from 'react'
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFacebook } from '../../redux/productReducer/userReducer';


export default function LoginFacebook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const responseFacebook = async (response) => {
		console.log(response);
    const action=loginFacebook(response.accessToken);
    await dispatch(action)
    // chuyển hướng về profile
    navigate('/profile')
    /*
      ./: về đầu thư mục chữa nó
      /: root
      name: đi qua lại giữ các tập tin chung thư mục
    */
	  }
  return (
	<div>
		<FacebookLogin
    appId="842869487140861"
    // autoLoad={true}
    fields="name,email,picture"
    // onClick={componentClicked}
    callback={responseFacebook} 
    render={<button>aaa</button>}
    />
	</div>
  )
}
