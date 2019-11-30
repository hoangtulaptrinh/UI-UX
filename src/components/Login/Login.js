import React, { useRef } from 'react'
import './Login.css'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

function Login(props) {
  let history = useHistory();
  function handleClick() {
    props.login(userNameLogin.current.value, passWordLogin.current.value, checkRememberMe.current.checked)
  }
  if (props.allowLogin === true) {
    props.setAllowLogin()
    history.push('/App')
  }
  const letRegister = () => {
    props.register(userNameRegister.current.value, emailRegister.current.value, passWordRegister.current.value, repeatPassWordRegister.current.value)
  }
  //login
  const userNameLogin = useRef();
  const passWordLogin = useRef();
  const checkRememberMe = useRef();
  //register
  const userNameRegister = useRef();
  const emailRegister = useRef();
  const passWordRegister = useRef();
  const repeatPassWordRegister = useRef();
  // error login
  if (props.statusLogin.length !== 0) {
    alert(props.statusLogin.join('\n'))
    props.setStatusLogin()
  }
  // error register
  if (props.statusRegister.length !== 0) {
    alert(props.statusRegister.join('\n'))
    props.setStatusRegister()
  }
  return (
    <div className='Login' >
      <div className="login-wrap">
        <div className="login-html">
          <input id="tab-1" type="radio" name="tab" className="sign-in height" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
          <input id="tab-2" type="radio" name="tab" className="sign-up height" /><label htmlFor="tab-2" className="tab">Sign Up</label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label" >Username</label>
                <input id="user" type="text" className="input height" ref={userNameLogin} />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label" >Password</label>
                <input id="pass" type="password" className="input height" data-type="password" ref={passWordLogin} />
              </div>
              <div className="group">
                <input id="check" type="checkbox" className="check height" defaultChecked ref={checkRememberMe} />
                <label htmlFor="check"><span className="icon" /> Keep me Signed in</label>
              </div>
              <div className="group">
                <input type="submit" className="button height" value="SIGN IN" onClick={handleClick} />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">Username</label>
                <input id="user" type="text" className="input height" ref={userNameRegister} />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Email Address</label>
                <input id="pass" type="text" className="input height" ref={emailRegister} />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" className="input height" data-type="password" ref={passWordRegister} />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Repeat Password</label>
                <input id="pass" type="password" className="input height" data-type="password" ref={repeatPassWordRegister} />
              </div>
              <div className="group">
                <input type="submit" className="button height" value="SIGN UP" onClick={letRegister} />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <label htmlFor="tab-1">Already Member?
              </label></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    allowLogin: state.allowLogin,
    statusLogin: state.statusLogin,
    statusRegister: state.statusRegister
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (userName, passWord, checkRememberMe) => { dispatch(actions.login({ userName: userName, passWord: passWord, checkRememberMe: checkRememberMe })) },
    setAllowLogin: () => { dispatch(actions.setAllowLogin(false)) },
    register: (name, mail, pass, repeatPass) => { dispatch(actions.register({ name: name, mail: mail, pass: pass, repeatPass: repeatPass })) },
    setStatusLogin: () => { dispatch(actions.setStatusLogin([])) },
    setStatusRegister: () => { dispatch(actions.setStatusRegister([])) }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Login);