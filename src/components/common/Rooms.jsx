import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import {useNavigate} from 'react-router-dom';


function Rooms({room,fromDate,toDate}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate = useNavigate()

    let noFromDate = "Please selet a from Date";
    let noToDate = "Please select a to Date";

    
    

  return (

    <div className = 'row bs ' >
        <div className = 'col-md-4'>
            <img src={room.images[0]} className='smallimg'/>
        </div>
        <div className = 'col-md-7 text-left' >
            <h2>{room.roomName}</h2>
            <p>Amenities: {room.amenities}</p>
            <p>Location: {room.roomLocation}</p>
            <p>Rent Per Day: {room.roomRent}</p>
            <p>Room Type: {room.roomType}</p>
        </div>

        <div>
            <button style={{float:'right',marginRight:"3px"}} className='btn btn-primary btn1 'onClick={()=>navigate(`/room/${room.roomId}/${fromDate?fromDate:noFromDate}/${toDate?toDate:noToDate}/${room.roomName}/${room.roomRent}`)}>Book Now</button>
           
            <button style={{float:'right',marginRight:"3px"}} className='btn btn-primary btn1 'onClick={handleShow}>View Details</button>
        </div>

        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.roomName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel prevLable='' nextLable=''>

        {room.images.map((urls,i) =>{
            return <Carousel.Item>
            <img 
                key={i}
                className="d-block w100 bigimg"
                src={urls}
                alt="First Slide"
            />
          </Carousel.Item>
        })}
      
    </Carousel>
    <h3 style={{textAlign:"center"}}>{room.description}</h3> 
    <br/>
    <h5>Facilities - {room.amenities}</h5>
    <br/>
    <h5>At Just {room.roomRent}</h5>
    <br/>
    <h5>Located At {room.roomLocation}</h5>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
    </Modal>
    </div>

  )
}

export default Rooms