import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ApiRoutes from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';
import Loader from './Loader';
import Error from './Error';
import Success from './Success'; 


function Signup() {

  let navigate = useNavigate()

  let [name,setName] = useState("")
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let [phone,setPhone] = useState("")
  let [role,setRole] = useState("")

  let[loading,setLoading] = useState(false)
  let[error,setError] = useState(false)
  let [errMsg, seterrMsg] = useState("")


  const handleSubmit = async() => {
      try{
        setLoading(true)
        let {message} = await AxiosService.post(`${ApiRoutes.SIGNUP.path}`,{
          name,
          email,
          password,
          phone,
          role
        })
        // if(res.status===200)
          // console.log(res.body)
          setLoading(false)
          toast.success(message)
          navigate('/login')
        //   console.log(res)
        // }
      }
      catch(error){
        setError(true)
        seterrMsg(error)
        setLoading(false)
      }
  } 

  const login = () => {
        navigate('/login')
  }
  return (

    <div className='row justify-content-center mt-10'>
      {loading && <Loader />}
      <div className='col-md-5'>
        <div className='bs mt-5'>
        {error && <Error message={"Please fill All the fields"} />}
        <h1>Register !!</h1>
        <p style={{marginLeft:'8px',fontSize:"19px",}}>Already Registered? <a className='pointer' onClick={()=>login()}>Login</a></p>

      <Form>
      <Form.Group className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control type="name" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control type="phone" placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label></Form.Label>
        <select value={role} style={{width:"100%",height:"50px"}} onChange={(e)=>setRole(e.target.value)}>
            <option value='Admin'></option>
            <option value='Admin'>Admin</option>
            <option value='User'>User</option>
        </select>
      </Form.Group>

      
      <Button variant="primary" onClick={()=>handleSubmit()}>
        Register
      </Button>
    </Form>
        </div>
        
      </div>
      

    </div>
  )
}

export default Signup
