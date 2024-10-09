import React,{useState} from 'react';
import {Form,Button,Breadcrumb} from 'react-bootstrap'
import ApiRoutes from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';

function Reset() {

  let [token,setToken] = useState("")

  let [newPassword,setnewPassword] = useState("")

  let navigate = useNavigate()
  

  const resetPassword = async() => {
    try{
        let {message} = await AxiosService.post(`${ApiRoutes.RESET.path}`,{
            token,
            newPassword
        })
            // if(response.status === 201){
                toast.success(message)
                navigate('/login')
            // }
    }
    catch(error){
        toast.error(error.message)
    }
  }


  return <>
      <div className='row justify-content-center'>
        <div className='col-md-7'>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Token</Form.Label>
            <Form.Control type="email" placeholder="Enter your token" onChange={(e) => setToken(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Enter New Password" onChange={(e) => setnewPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" onClick={() => resetPassword()} >
            Reset
          </Button>
          <Breadcrumb>
      <Breadcrumb.Item href="https://profound-tiramisu-1b7042.netlify.app">Click Here</Breadcrumb.Item><span>&nbsp;</span>To Login with your New Password<span></span>
      </Breadcrumb>
        </Form>
      </div>
    </div>
      
  </>

}

export default Reset