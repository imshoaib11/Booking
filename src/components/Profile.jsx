import React,{useState,useEffect} from 'react'
import { Tabs,Radio } from 'antd';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import TopBar from './TopBar'
import toast from 'react-hot-toast';
import { Divider, Flex, Tag } from 'antd';



function Profile() {

    const { TabPane } = Tabs    
    const id = sessionStorage.getItem('userId')
    const userName = sessionStorage.getItem('currentUser')
    const email = sessionStorage.getItem('email')
    const mobile = sessionStorage.getItem('mobile')
    const profile = sessionStorage.getItem('profile')
    const placeholder = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    
  return <>
      <TopBar/>
     <div className='mt-3 ml-3'>
         <Tabs defaultActiveKey="2" >
     <TabPane tab="Profile" key="1">
      <div className='row'>
        <div className='col-md-6'>
              <div className='bs color1'>
              <h5>Name: {userName}</h5>
              <h5>Email: {email}</h5>
              <h5>Mobile: {mobile}</h5>
          </div>
        </div>      
      </div>      
     </TabPane> 
     <TabPane tab="Bookings" key="2">
       <MyBookings/> 
     </TabPane>
   </Tabs>
     </div>
  

  </>
}

export default Profile

export function MyBookings(){
  const userId = sessionStorage.getItem('userId');

  let [bookings,setBookings] = useState([])

  const userBookings = async()=> {
    try{
      const {data,message} = await AxiosService.get(ApiRoutes.USERBOOKINGS.path,{authenticate:ApiRoutes.USERBOOKINGS.auth})
      setBookings(data)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    userBookings()
  },[])

  const cancelBookings = async(bookingId,roomId)=>{
      try{
        const {data,message} = await AxiosService.post(ApiRoutes.CANCELBOOKINGS.path,{bookingId,roomId},{authenticate:ApiRoutes.CANCELBOOKINGS.auth})
        toast.success(message)
        window.location.reload()        
      }
      catch(error){
        toast.error(error)
      }
  }

  return<>
  <div>
      <div className='row '>
        <div className='col-md-6 '>
          {
            bookings.length>0? (bookings.map(booking=>{

              return <div className='bs color1'>
              <h5>Room: {booking.roomName}</h5>
              <h5>Booking Name: {booking.userName}</h5>
              <h5>Booking Id: {booking.bookingId}</h5>
             <h5>CheckIn: {booking.fromDate}</h5>
              <h5>CheckOut: {booking.toDate}</h5>
              <h5>Paid: {booking.totalAmount}/-</h5>
              <h5>TransactionId: {booking.transId}</h5>
             <h5>Status: {booking.status == 'Cancelled'?(<Tag color='red'><h5>Cancelled</h5></Tag>):
                                                        (<Tag color='green'><h5>Confirmed</h5></Tag>)}</h5>
              {
                booking.status !== "Cancelled" && (
                  <div className='justify-content-right'>
                    <button  className="btn btn-danger" onClick={()=>{cancelBookings(booking.bookingId,booking.roomId)}}>CANCEL</button>
                    </div>
                )
              }
              
             </div>
            } ))              
             :
             <div>
              (<h1 style={{textAlign:"center"}}>No Bookings Yet</h1>)
            </div>
          }
              
         
        </div>
      </div>
  </div>
  
  </>
}




