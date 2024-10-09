import React, {useEffect, useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import Rooms from './common/Rooms'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { DatePicker, Space } from 'antd'
import Loader from './Loader'
import moment from 'moment'
import Error from './Error'
import TopBar from './TopBar'
import Footer from './Footer'


function Dashboard() {

  moment.suppressDeprecationWarnings = true

  const { RangePicker } = DatePicker
  let [loading,setLoading] = useState(false)
  let [error,setError] = useState(false)
  let[errMsg, seterrMsg] = useState("")

  let [rooms, setRooms] = useState([])
  let [duplicateRooms, setDuplicateRooms] = useState([])


  let [fromDate,setFromDate] = useState("")
  let [toDate,setToDate] = useState("")

  let [searchKey,setSearchKey] =  useState("")
  let [type,setType]= useState("all")
  

const getData = async () => {
  try{
    setLoading(true)
    let {data,message} = await AxiosService.get(ApiRoutes.ROOMS.path,{authenticate:ApiRoutes.ROOMS.auth})
    setRooms(data)
    setDuplicateRooms(data)
    setLoading(false)
  }
  catch(error){
    setError(true)
    // toast.error(error.message)
    seterrMsg(error.message)
    setLoading(false)
  }
}

useEffect(()=>{
    getData()
},[])

function filterByDate(dates) {
  //from date
  // console.log(dates[0].format("DD-MM-YYYY"));
  setFromDate(dates[0].format("DD-MM-YYYY"));
  //to date
  // console.log(dates[1].format("DD-MM-YYYY"));
  setToDate(dates[1].format("DD-MM-YYYY"));

  //tempRooms
  var tempRooms = [];
  
  
  for (const room of duplicateRooms) {
    var availability = false
    if (room.currentBookings.length > 0) {
          for ( const booking of room.currentBookings) {
        // check between or equal to dates
          if (
          !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
            booking.fromDate,
            booking.toDate
          ) &&
          !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
            booking.fromDate,
            booking.toDate
          )
          ) {
            availability = false
          }
          else{
            availability = true
          }
          
          if (
        (dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
        (dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
        (dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
        (dates[1]).format("DD-MM-YYYY") !== booking.toDate
          ){
            availability = true;
           }
        
        
      }
    }

    if (availability === true || room.currentBookings.length === 0 ) {
      tempRooms.push(room);
    }
    setRooms(tempRooms)
  } 
}

function filterBySearch(){
  const roomFilter = duplicateRooms.filter((room)=>(room.roomLocation).toLowerCase().includes(searchKey.toLowerCase())) 
  
  setRooms(roomFilter)
}

function filterByType(e){
    
    setType(e)
    if(e!=='all'){
      const tempRooms = duplicateRooms.filter(room=>(room.roomType).toLowerCase() == e.toLowerCase()) 
    setRooms(tempRooms)
    }
    else{
      setRooms(duplicateRooms)
    }
}


    return <>
    <TopBar/>
    <div className='container mt-5 color1 '>
      <div className='row mt-5 bs bg1'>
          <div className='col-md-4 '>
            <RangePicker className='bs'format='DD-MM-YYYY'onChange={filterByDate}/>
          </div>
          <div className='col-md-4'>
              <input type='text' className='form-control bs' value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} onKeyUp={filterBySearch} placeholder='Search Location'/>
          </div>
          <div className='col-md-4'>
              <select className='bs'style={{width:"100%"}} value={type} onChange={(e)=>{filterByType(e.target.value)}}>
            <option value='all'>All</option>
            <option value='Delux'>Delux</option>
            <option value='non-Delux'>Non-Delux</option>
          </select>
          </div>
          
      </div> 
        
      
    <div className='row justify-content-center mt-5 mb-5 '>
   {loading ? (<Loader/>) :  rooms.length> 0 ?
            (rooms.map((room) => {
                return <div className='col-md-9'>
                  <Rooms room={room}
                         fromDate={fromDate}
                         toDate={toDate}
                          key={room.roomId}/>
                </div> 
              }) 
            ) : <div>
              <h1 style={{textAlign:"center"}}>No Rooms Found</h1>
            </div>
    }
    </div>
    </div>    
    <Footer/>
    </>
}

    

export default Dashboard

// import React, { useEffect, useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import Rooms from './common/Rooms';
// import AxiosService from '../utils/AxiosService';
// import ApiRoutes from '../utils/ApiRoutes';
// import { DatePicker } from 'antd';
// import Loader from './Loader';
// import moment from 'moment';
// import Error from './Error';
// import TopBar from './TopBar';

// function Dashboard() {
//   const { RangePicker } = DatePicker;
//   let [loading, setLoading] = useState(false);
//   let [error, setError] = useState(false);
//   let [errMsg, setErrMsg] = useState('');

//   let [rooms, setRooms] = useState([]);
//   let [duplicateRooms, setDuplicateRooms] = useState([]);

//   let [fromDate, setFromDate] = useState('');
//   let [toDate, setToDate] = useState('');

//   const getData = async () => {
//     try {
//       setLoading(true);
//       let { data } = await AxiosService.get(ApiRoutes.ROOMS.path, {
//         authenticate: ApiRoutes.ROOMS.auth,
//       });
//       setRooms(data);
//       setDuplicateRooms(data);
//       setLoading(false);
//     } catch (error) {
//       setError(true);
//       setErrMsg(error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   function filterByDate(dates) {
//     const fromDate = dates[0].startOf('day');  // Ensure the start of the day is used
//     const toDate = dates[1].endOf('day');      // Ensure the end of the day is used
  
//     setFromDate(fromDate.format('DD-MM-YYYY'));
//     setToDate(toDate.format('DD-MM-YYYY'));
  
//     const tempRooms = [];
  
//     for (let room of duplicateRooms) {
//       let available = true;  // Assume the room is available until proven otherwise
  
//       if (room.currentBookings.length > 0) {
//         for (let booking of room.currentBookings) {
//           const bookingFrom = moment(booking.fromDate, 'DD-MM-YYYY').startOf('day');
//           const bookingTo = moment(booking.toDate, 'DD-MM-YYYY').endOf('day');
  
//           // Check if the selected date range overlaps with the booking range
//           const isOverlap =
//             (fromDate.isBetween(bookingFrom, bookingTo, null, '[]')) ||
//             (toDate.isBetween(bookingFrom, bookingTo, null, '[]')) ||
//             (bookingFrom.isBetween(fromDate, toDate, null, '[]')) ||
//             (bookingTo.isBetween(fromDate, toDate, null, '[]'));
  
//           if (isOverlap) {
//             available = false;  // If there is an overlap, mark the room as unavailable
//             break;  // Exit the loop early if we already know the room isn't available
//           }
//         }
//       }
  
//       if (available) {
//         tempRooms.push(room);  // Only add the room if it is available
//       }
//     }
  
//     setRooms(tempRooms);
//   }
  

//   return (
//     <>
//       <TopBar />
//       <div className="container mt-5">
//         <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
//         <div className="row justify-content-center mt-5">
//           {loading ? (
//             <Loader />
//           ) : rooms ? (
//             rooms.map((room) => (
//               <div className="col-md-9" key={room.roomId}>
//                 <Rooms room={room} fromDate={fromDate} toDate={toDate} />
//               </div>
//             ))
//           ) : (
//             <Error message={errMsg} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;


// function filterByDate(dates) {
//   //from date
//   console.log(dates[0].format("DD-MM-YYYY"));
//   setFromDate(dates[0].format("DD-MM-YYYY"));
//   //to date
//   console.log(dates[1].format("DD-MM-YYYY"));
//   setToDate(dates[1].format("DD-MM-YYYY"));

//   //tempRooms
//   var tempRooms = [];

//   for (const room of duplicateRooms) {
//     var availability = false;

//     if (room.currentBookings.length > 0) {
//       for ( const booking of room.currentBookings) {
//         //check between or equal to dates
//         if (
//           !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
//             booking.checkInDate,
//             booking.checkOutDate
//           ) &&
//           !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
//             booking.checkInDate,
//             booking.checkOutDate
//           )
//         ) {
          
//           if (
//             dates[0].format("DD-MM-YYYY") !== booking.fromDate &&
//             dates[0].format("DD-MM-YYYY") !== booking.toDate &&
//             dates[1].format("DD-MM-YYYY") !== booking.fromDate &&
//             dates[1].format("DD-MM-YYYY") !== booking.toDate
//           ) {
//             availability = true;
//           }
//         }
//       }
//     } else {
//       availability = true;
//     }

//     if (availability === true) {
//       tempRooms.push(room);
//     }
//   }

//   setRooms(tempRooms);
// }