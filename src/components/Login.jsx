import React, { useEffect,useState } from 'react';
import { Form,Button,Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast'
import AxiosService from '../utils/AxiosService';
import Error from './Error';
import Loader from './Loader';

function Login() {
  let navigate = useNavigate()
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")

  let[loading,setLoading] = useState(false)
  let[error,setError] = useState(false)
  let[errMsg, seterrMsg] = useState("")

  useEffect(()=>{
    sessionStorage.clear()
  },[])

  const handleLogin = async() => {
        try{
        // setLoading(true)
        let {message,role,token,userName,userId,phone,img} = await AxiosService.post(`${ApiRoutes.LOGIN.path}`,{
          email,
          password
        },{authenticate:ApiRoutes.LOGIN.auth})
        sessionStorage.setItem('token',token)
        sessionStorage.setItem('role',role)
        sessionStorage.setItem('currentUser',userName)
        sessionStorage.setItem('userId',userId)
        sessionStorage.setItem('email',email)
        sessionStorage.setItem('profile',img)
        sessionStorage.setItem('mobile',phone)
       
        // setLoading(false)
        // if(response.status === 200){
          toast.success("Welcome Sir")
          if(role=='User')
          navigate('/dashboard')
         else
          navigate('/admin')
        // }
      }
      catch(error){
        setError(true)
        seterrMsg(error.message)
        // toast.error(error.message)
        setLoading(false)
      }

  }

  const forgotPassword = () => {
    navigate('/link')
  }

  const signIn = () => {
    navigate('/signup')
  }
  
  return (
    
    <div className='row justify-content-center mt-10'>
      {/* {loading && <Loader/>} */}
      <div className='col-md-5'>
        <div className='bs mt-5 color1'>
        {error && <Error message= {errMsg} />}
      <Form>
       <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="success"className='mt-10' onClick={()=>handleLogin()} >
        Log On
      </Button>
      
      <p style={{marginLeft:'8px',fontSize:"19px",}}>New User? <a className='pointer' onClick={()=>signIn()}>Register</a></p>
     
      <p style={{marginLeft:'8px',fontSize:"19px"}}>Forgot Password? <a style={{color:"green"}} className='pointer' onClick={()=>forgotPassword}>Click here</a></p>
    </Form>

    </div>
    </div>
    </div>
  )
}

export default Login
