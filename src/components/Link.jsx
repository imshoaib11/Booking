import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap'
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';

function Link() {

  let [email,setEmail] = useState("")

  const sendLink = async() => {
      try{
        let {message} = await AxiosService.post(`${ApiRoutes.SENDLINK.path}`,{
          email
        })
        // if(response.status==201){
          toast.success(message)
        // }
      }


      catch(error){
        toast.error(error.message)
      } 
  }


  return <>
    <div className='row justify-content-center mt-10'>
      <div className='col-md-5'>
        <div className='bs mt-5 color1'>
          <div>
            <h3>Please check your mail a Link will be sent</h3>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={() => sendLink()}>
              Send Link
            </Button>
          </Form>
        </div>
      </div>
    </div>    
  </>

}

export default Link