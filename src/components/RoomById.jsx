import React,{useEffect,useState} from 'react'
import AxiosService from '../utils/AxiosService'
import {useParams,useNavigate} from 'react-router-dom'
import Loader from './Loader'
import Error from './Error'
import moment from 'moment'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert';
import TopBar from './TopBar';



function RoomById() {
    let navigate = useNavigate()
    let[loading,setLoading] = useState(false)
    let[error,setError] = useState(false)
    let[errMsg,seterrMsg] = useState("")
    let[totalAmount,setTotalAmount] = useState(0)
    let[room,setRoom] = useState([])

    let {id} = useParams()
    let {fromDate} = useParams()
    let {toDate} = useParams()
    let {roomName} = useParams()
    let {roomRent} = useParams()

    let checkInDate = moment(fromDate, 'DD-MM-YYYY')
    let checkOutDate = moment(toDate, 'DD-MM-YYYY')

    let totalDays = moment.duration(checkOutDate.diff(checkInDate)).asDays()+1
     
    
   
    const userName = sessionStorage.getItem('currentUser')
    const userId = sessionStorage.getItem('userId')

   
        const getData = async(id)=>{
            try{
                setLoading(true)
                let {data,message} = await AxiosService.get(`${ApiRoutes.ROOMBYID.path}/${id}`,{authenticate:ApiRoutes.ROOMBYID.auth})
                
                setRoom(data)
                console.log(room)
                setTotalAmount(data.roomRent*totalDays)
                setLoading(false)
            }
            catch(error){
                setError(true)
                seterrMsg(error)
                setLoading(false)
            }
        }

    useEffect(()=>{
    if(id)
        getData(id)
    },[]) 
    
    useEffect(() => {
        document.body.classList.add('black-background');
        return () => {
            document.body.classList.remove('black-background');
        };
    }, []);

    // const roomBooking = async() =>{
    //     const bookRooms = {
    //         userId,
    //         userName
    //     }
    //     try {
    //         let {data,message} = await AxiosService.post(`${ApiRoutes.NEWBOOKING.path}/${id}/${fromDate}/${toDate}/${roomName}/${roomRent}`,
    //             bookRooms,
    //             {authenticate:ApiRoutes.NEWBOOKING.auth}
                
    //         )
    //         swal('Congratulations','Your Room is Booked Successfully','success').then(data=>{window.location.href='/profile'})
            
    //     } catch (error) {
    //         swal('Oops','Something Went Wrong','error')
    //     }    
    // }    

   async function onToken(token){
            const bookRooms = {
                userId,
                userName,
                totalAmount,
                token
            }
            try {
                let {data,message} = await AxiosService.post(`${ApiRoutes.NEWBOOKING.path}/${id}/${fromDate}/${toDate}/${roomName}/${roomRent}`,
                    bookRooms,
                    {authenticate:ApiRoutes.NEWBOOKING.auth}
                    
                )
                swal('Congratulations','Your Room is Booked Successfully','success').then(data=>{window.location.href=`/profile`})
                
            } catch (error) {
                swal('Oops','Something Went Wrong','error')
            }    
   
    }
    
  return <>
            <TopBar/>
          {loading ? (<Loader />) : room ?
              // <div className="row bs justify-content-center mt-10">
              //     <div className='col-md-12'>
              <div className='row bs justify-content-center color '>
              <div className='col-md-8'>
                {/* <div className='row justify-content-center mt-10 color '> */}
                  <div className='col-md ' >
                      {room.images?.[0] ? (
                          <img src={room.images[0]} className='bigimage bs1' alt="Room" />
                      ) : (
                          <p>No image available</p>
                      )}
                   </div>
                   <br/>
                {/* </div> */}
                
                  <div className='col-md'>
                      <div>
                          <h1>Booking Details</h1>

                          <h3>{room.roomName}</h3>
                          <h5>{room.description}</h5>
                          <hr />
                          <b>
                              <p>Booking Name: {userName} </p>
                              <p>From Date: {fromDate}</p>
                              <p>To Date: {toDate}</p>
                              <p>Max Count: {room.roomCapacity}</p>
                              <p>Address: {room.address}</p>
                              
                          </b>

                      </div>
                      <br />
                  </div>
                  
                  {!isNaN(totalDays) && (
                      <div>
                          <h2>Amount</h2>
                          <hr />
                          <b>
                              <p>No.of Days: {totalDays}</p>
                              <p>Rent Per Day: {room.roomRent}</p>
                              <p>Total Amount: {totalDays * room.roomRent}</p>
                          </b>
                          <div>
                              {/* <button className="btn btn-primary" onClick={()=>roomBooking()}>Pay Now</button> */}
                              <StripeCheckout
                                  token={onToken}
                                  amount={totalAmount * 100}
                                  currency='INR'
                                  stripeKey="pk_test_51Q5t0mLtVKPRe7yOYsE3knT4HsbBNl9vak8PAaHPNhJjePxHAs37JTA6oPIG1NNg5ZLNlomLBpUCh2IlyxIJWKS300VFTG3n5y"
                              >
                                  <button className="btn btn-success">Pay Now</button>
                              </StripeCheckout>

                          </div>
                      </div>
                  )}
                </div>
              </div>
              :
              (<Error message={errMsg} />)
          }
        
  </>
}

export default RoomById