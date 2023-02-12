import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../redux/slice";
import './login.css';

const LoginCompoenent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store)=> store.counter.tenantsData)

  const [userName,setUserName] = useState("")
  const [password,setPassword] = useState("")
  const[userNameError, setUserNameError]=useState(false)
  const[passwordError, setPasswordError]=useState(false)
  var todayObj= new Date();
  var today =todayObj.getDate() + '/' + (todayObj.getMonth() + 1) + '/' + todayObj.getFullYear();
  var time = todayObj.getHours() + ':' + todayObj.getMinutes();

  
  const authCheck =(e)=>{
    e.preventDefault()
    const CheckUser = userData.findIndex((user)=> user.Tname == userName)
    if(userName === 'admin' && password==="abcd1234"){
      dispatch(logIn({username : userName}))
      navigate('/admin')
    }else if(userName && CheckUser >-1){
      console.log(userData[CheckUser].password === password)
      if(password.length >=8 && userData[CheckUser].password === password){
        dispatch(logIn({username : userName}))
        navigate('/home')
      }else{
        setPasswordError(true)
      }
    }else{
      setUserNameError(true)
    }
  }

  return (
    <div className="text-center">
      <h1>Login</h1>
      <Form className="p-5">
        <Form.Control type="email" placeholder="Username" className="mb-3" isInvalid={userNameError}  isValid={userName.length >=8 ? true : false} value={userName} onChange={(e)=>{setUserName(e.target.value);setUserNameError(false);}}/>
        {userNameError && <Form.Text variant="danger" class="d-block">Invalid User </Form.Text>}
        <Form.Control type="password"  isInvalid={passwordError}  isValid={password.length >=8 ? true : false} placeholder="Password" className="mb-3 text-danger" value={password} onChange={(e)=>{setPassword(e.target.value); setPasswordError(false);}}/>
        {passwordError&& <Form.Text variant="danger"  class="d-block"> Paasword Is Invalid </Form.Text>}
        <Button variant="primary"
        
          className="mb-3"
          size="lg"
          onClick={authCheck}
        >
          Submit
        </Button>

        <Link to="/home" className="d-block mb-3">
          forgot Password?
        </Link>
      </Form>
    </div>
  );
};

export default LoginCompoenent;
