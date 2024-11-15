import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import AxiosService from './utils/AxiosService';
import ApiRoutes from './utils/ApiRoutes';
import Loader from './components/Loader';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';

function AdminPanel() {

    const { TabPane } = Tabs;
    let navigate = useNavigate()
  return <>
    <TopBar/>
    <div className='mt-3 ml-3 mr-3 bs '>
        <h1 className='text-center'style={{fontSize:'40px'}}>Admin Panel</h1>
    <Tabs defaultActiveKey="1">
          <TabPane tab="Bookings" key="1">
              <h1 style={{fontSize:'25px'}}>Bookings</h1>
              <Bookings/>
          </TabPane>
          <TabPane tab="Users" key="2">
          <h1 style={{fontSize:'25px'}}>List of Users</h1>
          <Users/>
          </TabPane>
          <TabPane tab="Rooms" key="3">
          <h1 style={{fontSize:'25px'}}>Rooms</h1>
          <Rooms/>
          </TabPane>
          <TabPane tab="Add Rooms" key="4">
          <h1 style={{fontSize:'25px'}}>Add Rooms</h1>
          <AddRooms/>
          </TabPane>
      </Tabs>
        
    </div>
      

  
  </>
}

export default AdminPanel

export function Bookings(){ 

    let [bookings,setBookings] = useState([])
    let [loading,setLoading] = useState(false)
    let [error,setError] = useState(true)

    const getData = async()=>{
        try {
           const {data,message} = await AxiosService.get(ApiRoutes.BOOKINGS.path,{authenticate:ApiRoutes.BOOKINGS.auth})
           setBookings(data)
           setLoading(false)
        } catch (error) {
            setError(true)
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    },[])

    return <>
       
       <div className='row'>
        <div className='col-md-10'>
             {loading && (<Loader/>)}
                <table className='table table-bordered table-dark'> 
                    <thead className='bs1'>
                        <tr>
                            <th>#</th>
                            <th>Room</th>
                            <th>Booked By</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Paid</th>
                            <th>Status</th>
                            <th>Booked At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking,index)=>(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{booking.roomName}</td>
                            <td>{booking.userName}</td>
                            <td>{booking.fromDate}</td>
                            <td>{booking.toDate}</td>
                            <td>{booking.totalAmount}</td>
                            <td>{booking.status}</td>
                            <td>{booking.bookedAt}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
        </div>    
       </div>     
    </>
}

export function Users(){

    let [users,setUsers] = useState([])
    let [loading,setLoading] = useState(true)
    let [error,setError] = useState(false)

    const getData = async()=>{
        try {
           const {data,message} = await AxiosService.get(ApiRoutes.ALLUSERS.path,{authenticate:ApiRoutes.ALLUSERS.auth})
           setUsers(data)
           setLoading(false)
        } catch (error) {
            setError(true)
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    },[])

    return<>

<div className='row'>
        <div className='col-md-10'>
             {loading && (<Loader/>)}
                <table className='table table-bordered table-dark'> 
                    <thead className='bs1'>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Id</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Registered On</th>
                        </tr>
                    </thead>
                        <tbody>
                            {users.map((user,index)=>(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.userId}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>{user.createdAt}</td>
                            </tr>
                            ))}
                        </tbody>
                    
                </table>
        </div>
</div>
    </>
}

export function Rooms(){

    let [rooms,setRooms] = useState([])
    let [loading,setLoading] = useState(true)
    let [error,setError] = useState(false)

    const getData = async()=>{
        try {
           const {data,message} = await AxiosService.get(ApiRoutes.ROOMS.path,{authenticate:ApiRoutes.ROOMS.auth})
           setRooms(data)
           setLoading(false)
        } catch (error) {
            setError(true)
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    })

    return<>
        <div className='row'>
        <div className='col-md-10'>
             {loading && (<Loader/>)}
                <table className='table table-bordered table-dark'> 
                    <thead className='bs1'>
                        <tr>
                            <th>#</th>
                            <th>Room Id</th>
                            <th>Room</th>
                            <th>Location</th>
                            <th>Amenities</th>
                            <th>Type</th>
                            <th>Rent</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                        <tbody>
                            {rooms.map((room,index)=>(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{room.roomId}</td>
                            <td>{room.roomName}</td>
                            <td>{room.roomLocation}</td>
                            <td>{room.amenities}</td>
                            <td>{room.roomType}</td>
                            <td>{room.roomRent}</td>
                            <td>{room.phone}</td>
                            </tr>
                            ))}
                        </tbody>
                    
                </table>
        </div>
</div>
    
    </>
}

//Add Rooms

export function AddRooms() {

    let[roomName,setRoomName] = useState("")
    let[roomLocation,setLocation] = useState("")
    let[amenities,setAmenities] = useState("")
    let[roomType,setType] = useState("")
    let[roomCapacity,setCapacity] = useState("")
    let[roomRent,setRent] = useState("")
    let[phone,setMobile] = useState("")
    let[imageUrl1,setImageUrl1] = useState("")
    let[imageUrl2,setImageUrl2] = useState("")
    let[imageUrl3,setImageUr3] = useState("")
    let[address,setAddress] = useState("")
    let[description,setDesc] = useState("")

    const handleSubmit = async() =>{
        try{
            let {message} = await AxiosService.post(ApiRoutes.NEWROOMS.path,{
                roomName,
                roomLocation,
                amenities,
                roomType,
                roomCapacity,
                roomRent,
                phone,
                images:[imageUrl1,imageUrl2,imageUrl3],
                address,
                description
            },{authenticate:ApiRoutes.NEWROOMS.auth})
            swal('Congratulations','Your Room is Added Successfully','success').then(data=>{navigate('/admin')})
            
        }
        catch(error){
            console.log(error)
            swal('Oops','Something Went Wrong','error')
        }   
    }

    return<>
        <div className='row'>
            <div className='col-md-5'>
            <Form>
    <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Room Name" value={roomName} onChange={(e)=>setRoomName(e.target.value)}/>
      </Form.Group>

       <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="City" value={roomLocation} onChange={(e)=>setLocation(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Amenities" value={amenities} onChange={(e)=>setAmenities(e.target.value)} />
      </Form.Group>

      <Form.Group >
        <Form.Label></Form.Label>
         <select  value={roomType} style={{width:"100%",marginTop:"15px",height:"45px"}} onChange={(e)=>setType(e.target.value)}>
            <option value='Delux'>Type</option>
            <option value='Delux'>Delux</option>
            <option value='Non-Delux'>Non-Delux</option>
        </select>
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Capacity" value={roomCapacity} onChange={(e)=>setCapacity(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="phone" placeholder="Rent" value={roomRent} onChange={(e)=>setRent(e.target.value)}/>
      </Form.Group>

    </Form>
            </div>
            
            <div className='col-md-5'>
                <Form>
        <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Mobile" value={phone} onChange={(e)=>setMobile(e.target.value)}/>
      </Form.Group>
            <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Images Url 1" value={imageUrl1} onChange={(e)=>{setImageUrl1(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Images Url 2" value={imageUrl2} onChange={(e)=>setImageUrl2(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Image Url 3" value={imageUrl3} onChange={(e)=>setImageUr3(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Address"value={address} onChange={(e)=>setAddress(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Description" value={description} onChange={(e)=>setDesc(e.target.value)}/>
      </Form.Group>
      <div className='mt-2'>
        <Button variant="success" onClick={()=>handleSubmit()}>
        Add Room
      </Button>
            </div>
    </Form>
    

        </div>
        
        </div>

    </>
}
