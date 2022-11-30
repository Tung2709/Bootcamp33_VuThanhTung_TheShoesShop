import React from 'react'
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props' 
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
	<div className='button-fb'>
		<FacebookLogin
    appId="842869487140861"
    // autoLoad={true}
    fields="name,email,picture"
    // onClick={componentClicked}
    callback={responseFacebook} 
    // render={<button>aaa</button>}
    render={renderProps => (
      <button onClick={renderProps.onClick}><p><i class="fa-brands fa-facebook"></i> Continue with Facebook</p></button>)}
    />
	</div>
  )
}
